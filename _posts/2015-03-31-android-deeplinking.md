---
title: Deeplinking
categories: android
layout: documentation
permalink: /:categories/:title
---

To allow an application to be deep linkable, aside the mandatory additions to **AndroidManifest.xml**, as seen on [quickstart](/quickstart/android) and setting up the SDK, it needs to map **routes**. These **routes** should follow the convention `static/path/:variable/:another_variable`. 

## Route mapping

To map routes with HOKO you should add `@DeeplinkRoute`, `@DeeplinkDefaultRoute` `@DeeplinkFragmentActivity` and annotations to your `Activities` and `Fragments`.

If an application which has a **product detail activity** it should somehow map a product route by adding `@DeeplinkRoute` to your `ProductDetailActivity`.

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

This will map a `products/:product_id` route to the `ProductDetailActivity`. This `ProductDetailActivity` will always be started when a deep link matching the route is opened in the user's device. (e.g. opening `hoko://wishlist`).

### Injection

HOKO works by injecting deep link parameters into `Activity` or `Fragment` variables. This happens on the `inject(...)` method on the deep linking module.

#### DeeplinkRoute

On classes annotated with `@DeeplinkRoute`, the injection will look for variables annotated `@DeeplinkRouteParameter` and `@DeeplinkQueryParameter`.

{% highlight java %}
@DeeplinkRoute("products/:product_id")
public class ProductActivity extends Activity {

  @DeeplinkRouteParameter("product_id")
  private int mProductId;

  @DeeplinkQueryParameter("referrer")
  public String mReferrer;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (!Hoko.deeplinking().inject(this)) {
      // This code will be executed if the activity was not started by Hoko
      mProductId = getIntent().getIntExtra("product_id", 0);
    }
  }
}
{% endhighlight %}

When `inject(...)` is called, and the `ProductActivity` was started from a deep link such as `hoko://products/42?referrer=hokolinks.com`, it will set the `mProductId` as `42` and the `mReferrer` as `"hokolinks.com"`.

The difference between **route parameters** and **query parameters** is how they appear in the actual deep link and if they are required or not for a route to be triggered. 

**Route parameters** must always be matched and as such, if an `Activity` was injected with a deep link, a `@DeeplinkRouteParameter` variable will always have a value.

**Query parameters** are completly optional and may be `null` or `0`, even if the `Activity` was injected with a given deep link.

#### DeeplinkFragmentActivity

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

#### Default route

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

### Handlers

In order to execute code that is common to any incoming deep link (e.g. analytics tracking, referrer tracking, etc), the **deeplinking** module allows delegating and block execution of **handlers**. 

If a class object implements the `Handler` interface and that object is added to the handler list, its `handle(deeplink)` method will be executed.

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

## Smartlink Generation

Smartlinks may be created on the dashboard or through the HOKO SDK, in order to allow users to share platform independent links directly to the relevant content.

### Smartlinks from templates

To generate Smartlinks through templates, the application needs a **route format**, the corresponding **route parameters** and optional **query parameters**.

#### From @DeeplinkRoute

To generate Smartlinks from a `@DeeplinkRoute` annotated `Activity` or `Fragment` you can pass the object to the `generateSmartlink(...)` call.

{% highlight java %}
Hoko.deeplinking().generateSmartlink(this, new LinkGenerationListener() {
  @Override
  public void onLinkGenerated(String smartlink) {
    Social.getInstance().shareProduct(mProduct.getName(), smartlink);
  }

  // Share product link in case smartlink fails
  @Override
  public void onError(Exception exception) {
    Social.getInstance().shareProduct(mProduct.getName(), mProduct.getLink());
  }
});
{% endhighlight %}

#### From Deeplink

Another way is to generate Smartlinks from a `Deeplink` object.

{% highlight java %}
HashMap routeParameters = new HashMap();
routeParameters.put("product_id", mProduct.getId());

HashMap queryParameters = new HashMap();
queryParameters.put("referrer", "app");

Deeplink deeplink = Deeplink.deeplink("products/:product_id", routeParameters, queryParameters);
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

### Smartlinks from URLs

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