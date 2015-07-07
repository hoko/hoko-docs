---
title: Deep linking
categories: android
layout: documentation
permalink: /:categories/:title
description: Learn how to make your app deep linkable and can you create smart links directly from the HOKO SDK.
---

To allow an application to be deep linkable, aside the mandatory additions to **AndroidManifest.xml**, as seen on [quickstart](/quickstart/android) and setting up the SDK, it needs to map **routes**. These **routes** should follow the convention `static/path/:variable/:another_variable`.

## Route mapping

### Annotations

To map routes with HOKO through annotations you should add `@DeeplinkRoute`, `@DeeplinkDefaultRoute` `@DeeplinkFragmentActivity` annotations to your `Activities` and `Fragments`.

If an application which has a **wishlist activity** it should somehow map a product route by adding `@DeeplinkRoute` to your `WishlistActivity`.

{% highlight java %}
@DeeplinkRoute("wishlist")
public class WishlistActivity extends Activity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Hoko.deeplinking().inject(this);
  }

}
{% endhighlight %}

This will map a `wishlist` route to the `WishlistActivity`. This `WishlistActivity` will always be started when a deep link matching the route is opened in the user's device. (e.g. opening `hoko://wishlist`).

#### Injection

HOKO works by injecting deep link parameters into `Activity` or `Fragment` variables. This happens on the `inject(...)` method on the deep linking module.

##### DeeplinkRoute

On classes annotated with `@DeeplinkRoute`, the injection will look for variables annotated `@DeeplinkRouteParameter`, `@DeeplinkQueryParameter` and a `JSONObject` annotated with `@DeeplinkMetadata`.

{% highlight java %}
@DeeplinkRoute("products/:product_id")
public class ProductActivity extends Activity {

  @DeeplinkRouteParameter("product_id")
  private int mProductId;

  @DeeplinkQueryParameter("referrer")
  public String mReferrer;

  @DeeplinkMetadata
  public JSONObject metadata;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (!Hoko.deeplinking().inject(this)) {
      // This code will be executed if the activity was not started by Hoko
      mProductId = getIntent().getIntExtra("product_id", 0);
    } else {
      String coupon = metadata.optString("coupon");
      useCoupon(coupon);
    }
  }
}
{% endhighlight %}

When `inject(...)` is called, and the `ProductActivity` was started from a deep link such as `hoko://products/42?referrer=hokolinks.com`, it will set the `mProductId` as `42` and the `mReferrer` as `"hokolinks.com"`.

The difference between **route parameters** and **query parameters** is how they appear in the actual deep link and if they are required or not for a route to be triggered.

**Route parameters** must always be matched and as such, if an `Activity` was injected with a deep link, a `@DeeplinkRouteParameter` variable will always have a value.

**Query parameters** are completly optional and may be `null` or `0`, even if the `Activity` was injected with a given deep link.

Additionally we provide you with `Metadata` which consists on invisible information transfered from the Smartlink creation onto the actual opening of the contained deep link. This object is represented by a `JSONObject` and may contain whatever information you provided beforehand. This type of data is especially useful to guarantee data integrity (e.g. coupons, rewards, discounts) in order to avoid harmful users from exploiting visible deeplinking mechanics in your app.

##### DeeplinkFragmentActivity

In order to be able to deep link into fragments, HOKO has a `@DeeplinkFragmentActivity`. This annotation serves the purpose of identifying which `View` to replace with which possible `DeeplinkRoute` annotated `Fragments`.

{% highlight java %}
@DeeplinkFragmentActivity(id = R.id.frame_layout, fragments = {WishlistFragment.class, ProductFragment.class})
public class MainActivity extends FragmentActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    Hoko.deeplinking().inject(this);
  }

}
{% endhighlight %}

In which `ProductFragment` and `WishlistFragment` classes are annotated with `@DeeplinkRoute`.

{% highlight java %}
@DeeplinkRoute("products/:product_id")
public class ProductFragment extends Fragment {

  @DeeplinkRouteParameter("product_id")
  String mProductId;

  @Override
  public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
    View rootView = inflater.inflate(R.layout.fragment_product, container, false);
    if (!Hoko.deeplinking().inject(this)) {
      // This code will be executed if the activity was not started by Hoko
      mProductId = getArguments().getInt("product_id", 0);
    }
    return rootView;
  }
}
{% endhighlight %}

##### Default route

In case you want to provide a given behavior for when an unmapped deep linking opens the app you can do so by using the `@DeeplinkDefaultRoute` annotation. Only deep links that do not match any existing **routes** will trigger the default route.

{% highlight java %}
@DeeplinkDefaultRoute()
public class SplashActivity extends Activity {

  @DeeplinkQueryParameter("referrer")
  String mReferrer;

  @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Hoko.deeplinking().inject(this);
    }

}
{% endhighlight %}

### DeeplinkCallback

If you want to manually manage the deeplinking logic, all you have to do is map a route format to a `DeeplinkCallback` object after your `Hoko.setup()` call in your Application subclass.

{% highlight java %}
Hoko.deeplinking().mapRoute("invite/:user_id", new DeeplinkCallback() {
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    String userId = deeplink.getRouteParameters().get("user_id");
    String inviteMessage = deeplink.getQueryParameters().get("invite_message");
    String friendCoupon = deeplink.getMetadata().optString("coupon_code")
    Social.getInstance().showInvitePopup(userId, inviteMessage, friendCoupon);
  }
})
{% endhighlight %}

This code will be executed on the `HokoActivity` class, if you want to create show something to the user you have to start an `Activity` on the `deeplinkOpened()` method.

### Handlers

In order to execute code that is common to any incoming deep link (e.g. analytics tracking, referrer tracking, etc), the **deeplinking** module allows delegating and block execution of **handlers**.

If a class object implements the `Handler` interface and that object is added to the handler list, its `handle(deeplink)` method will be executed.
p
{% highlight java %}
// Analytics.java
public class Analytics implements Handler {
  ...
  @Override
  public void handle(Deeplink deeplink) {
    trackEvent("deeplink", deeplink.getRoute());
  }
}
{% endhighlight %}

If your class implements the interface you can then add it to the deep linking module after your `Hoko.setup(...)` method call.

{% highlight java %}
Hoko.deeplinking().addHandler(Analytics.getInstance());
{% endhighlight %}

You can also use `Handler` as an anonymous class.

{% highlight java %}
Hoko.deeplinking().addHandler(new Handler() {
  @Override
  public void handle(HokoDeeplink deeplink) {
    Analytics.getInstance().trackEvent("deeplink", deeplink.getRoute());
  }
});
{% endhighlight %}

## Deep link delegation

To save time integrating HOKO in an application, HOKO **does not require** delegation of actual deep links, as long as `HokoActivity` is added to the `AndroidManifest.xml` with a **URL scheme**. In case you want a better control of how HOKO should operate, you can manually delegate deep links through the deep linking module.

{% highlight java %}
Hoko.deeplinking().openURL(deeplink);
{% endhighlight %}

## Smart link generation

Smart links may be created on the dashboard or through the HOKO SDK, in order to allow users to share platform independent links directly to the relevant content.

### Smart links from templates

To generate Smart links through templates, the application needs a **route format**, the corresponding **route parameters** and optional **query parameters**.

#### From @DeeplinkRoute

To generate Smart links from a `@DeeplinkRoute` annotated `Activity` or `Fragment` you can pass the object to the `generateSmartlink(...)` call.

{% highlight java %}
Hoko.deeplinking().generateSmartlink(this, new LinkGenerationListener() {
  @Override
  public void onLinkGenerated(String smartlink) {
    Social.getInstance().shareProduct(mProduct.getName(), smartlink);
  }

  // Share product link in case smart link fails
  @Override
  public void onError(Exception exception) {
    Social.getInstance().shareProduct(mProduct.getName(), mProduct.getLink());
  }
});
{% endhighlight %}

#### From deep link

Another way is to generate Smart links from a `Deeplink` object.

{% highlight java %}
HashMap routeParameters = new HashMap();
routeParameters.put("product_id", mProduct.getId());

HashMap queryParameters = new HashMap();
queryParameters.put("referrer", "app");

JSONObject metadata = new JSONObject();
try {
  metadata.putOpt("coupon_code", "hokosale30");
} catch (JSONException e) {
  e.printStackTrace();
}

Deeplink deeplink = Deeplink.deeplink("products/:product_id", routeParameters, queryParameters, metadata);
Hoko.deeplinking().generateSmartlink(deeplink, new LinkGenerationListener() {
  @Override
  public void onLinkGenerated(String smartlink) {
    Social.getInstance().shareProduct(mProduct.getName(), smartlink);
  }

  @Override
  public void onError(Exception e) {
    Social.getInstance().shareProduct(mProduct.getName(), mProduct.getLink());
  }
});
{% endhighlight %}

### Smart links from URLs

To allow applications to link to content without the use of templates, the HOKO SDK allows the creation of `Deeplink` objects and the manual addition of platform dependent URLs.

{% highlight java %}
HashMap routeParameters = new HashMap();
routeParameters.put("product_id", mProduct.getId());

HashMap queryParameters = new HashMap();
queryParameters.put("referrer", "app");

Deeplink deeplink = Deeplink.deeplink("products/:product_id", routeParameters, queryParameters);

deeplink.addURL("http://awesomeapp.com/the_perfect_product", DeeplinkPlatform.WEB);
deeplink.addURL("http://awesomeapp.com/no_ios_app_yet", DeeplinkPlatform.IOS);

Hoko.deeplinking().generateSmartlink(deeplink, new LinkGenerationListener() {
  @Override
  public void onLinkGenerated(String smartlink) {
    Social.getInstance().shareProduct(mProduct.getName(), smartlink);
  }

  @Override
  public void onError(Exception e) {
    Social.getInstance().shareProduct(mProduct.getName(), mProduct.getLink());
  }
});
{% endhighlight %}

### Resolving Smart links

Should you want to open a Smartlink (e.g. `https://yourapp.hoko.link/example`) and have it work as a deeplink in regards to the routing of Activities and Fragments, you can call openSmartlink(smartlink, smartlinkResolveListener).

{% highlight java %}
Hoko.deeplinking().openSmartlink("https://yourapp.hoko.link/example", new SmartlinkResolveListener() {
  @Override
  public void onLinkResolved(String deeplink) {
    // deeplink was opened
  }

  @Override
  public void onError(Exception e) {
    // could not resolve Smartlink
  }
})
{% endhighlight %}
