---
title: Deep linking
categories: android
layout: documentation
permalink: /:categories/:title
description: Learn how to make your app deep link ready and create smart links directly from the SDK.
---

To allow an application to be deep linkable, aside the mandatory additions to the
**AndroidManifest.xml** file and setting up the HOKO SDK (check the
[Android Quickstart](/quickstart/android) if you haven't already), it also needs to map
**routes**. These **routes** should follow the convention `static/path/:variable/:another_variable`.

## Route mapping (using Annotations)

One way to start mapping your routes with HOKO is to use our simple and straightforward
**annotations** at the beginning of your `Activities` and `Fragments` (we will talk about each one
of them later in this page):

- `@DeeplinkRoute`
- `@DeeplinkDefaultRoute`
- `@DeeplinkFragmentActivity`
- `@DeeplinkMultipleRoute`

### Variable Injection

HOKO works by injecting deep link parameters into your `Activity/Fragment` variables. To use this
feature, we have created **3 new annotations** that you can implement in your **variables**.

*(We will use the route `"products/:product_id"` and the link
`yourapp://products/42?referrer=hokolinks.com` for demonstration purposes)*

- `@DeeplinkRouteParameter` &#8594; marks your variable to receive the deep link's route parameter
(in this example, `product_id` is a route parameter)
- `@DeeplinkQueryParameter` &#8594; marks your variable to receive the deep link's query parameter
(in this example, `referrer` is a query parameter)
- `@DeeplinkMetadata` &#8594; marks your `JSONObject` variable to receive the deep link's metadata

In order to tell HOKO to give the annotated variables the values from the opened deep links, you
will need to call the `Hoko.deeplinking().inject(this)` method.
This method returns a boolean value that indicates whether the Activity was activated through a
deep link (`true`) or not (`false`).

### DeeplinkRoute

The DeeplinkRoute annotation (`@DeeplinkRoute`) receives a String parameter that describes which
**route** a deep link must conform in order for the current `Activity/Fragment` to be automatically
shown by HOKO.

The following code shows an example of this:

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

When `inject(...)` is called, and the `ProductActivity` was started from a deep link such as
`hoko://products/42?referrer=hokolinks.com`, it will set the `mProductId` as `42` and the
`mReferrer` as `"hokolinks.com"`.

The difference between **route parameters** and **query parameters** is how they appear in the
actual deep link and if they are required or not for a route to be triggered.

**Route parameters** must always be matched and as such, if an `Activity` was injected with a deep
link, a `@DeeplinkRouteParameter` variable will always have a value.

**Query parameters** are completely optional and may be `null` or `0`, even if the `Activity` was
injected with a given deep link.

Additionally we provide you with **Metadata** which consists on invisible information transferred
from the Smart link creation onto the actual opening of the contained deep link. This object is
represented by a `JSONObject` and may contain whatever information you provided beforehand. This
type of data is especially useful to guarantee data integrity (e.g. coupons, rewards, discounts) in
order to avoid harmful users from exploiting visible deep linking mechanics in your app.

**NOTE:** the **metadata** object can be `null` when the deep link does not contain this kind of
information. We advise you to null check it before trying to access its data.

### DeeplinkFragmentActivity

In order to be able to deep link into fragments, HOKO has a `@DeeplinkFragmentActivity`. This
annotation serves the purpose of identifying which `View` to replace with which possible
`DeeplinkRoute` annotated `Fragments`.

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
      // This code will be executed if the activity was not started by HOKO
      mProductId = getArguments().getInt("product_id", 0);
    }
    return rootView;
  }
}
{% endhighlight %}

### DeeplinkDefaultRoute

In case you want to provide a given behavior for when an unmapped deep link opens your app you can
do so by using the `@DeeplinkDefaultRoute` annotation (this annotation does not have any
parameters). Only deep links that do not match any existing **routes** will trigger the default
route.

{% highlight java %}
@DeeplinkDefaultRoute
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

### DeeplinkMultipleRoute

In order to map several routes to the same `Activity`, we provide you with a `DeeplinkMultipleRoute`
annotation. This annotation should receive an array of strings corresponding to the `routes`
parameter.

{% highlight java %}
@DeeplinkMultipleRoute(routes = {"landing", "splash", "splash/:invite_id"})
public class SplashActivity extends Activity {

  @DeeplinkRouteParameter("invite_id")
  String mInviteId;

  @Override
    public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      Hoko.deeplinking().inject(this);
    }

}
{% endhighlight %}

## Route mapping (manually)

If you wish to manually manage the deep linking logic, all you have to do is map **each route** to
a `DeeplinkCallback` object after your `Hoko.setup()` call in your `Application` subclass.
To do this, use the `Hoko.deeplinking().mapRoute()` call:

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

Using this method, if you would like to show something to the user, you will need to start the
Activity, inside the `deeplinkOpened()` method, that will process the deep link action.

### Handlers

In order to execute code that is common to any incoming deep link (e.g. analytics tracking,
referrer tracking, etc), the **deeplinking** module allows delegating and block execution of
**handlers**.

If a class object implements the `DeeplinkCallback` interface and that object is added to the
handler list, its `deeplinkOpened(deeplink)` method will be executed.

{% highlight java %}
// Analytics.java
public class Analytics implements DeeplinkCallback {
  ...
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    trackEvent("deeplink", deeplink.getRoute());
  }
}
{% endhighlight %}

If your class implements the interface you can then add it to the deep linking module after your
`Hoko.setup(...)` method call.

{% highlight java %}
Hoko.deeplinking().addHandler(Analytics.getInstance());
{% endhighlight %}

You can also use `DeeplinkCallback` as an anonymous class.

{% highlight java %}
Hoko.deeplinking().addHandler(new DeeplinkCallback() {
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    Analytics.getInstance().trackEvent("deeplink", deeplink.getRoute());
  }
});
{% endhighlight %}

## Deep link delegation

To save time integrating HOKO in an application, HOKO **does not require** delegation of actual
deep links, as long as `HokoActivity` is added to the `AndroidManifest.xml` with a valid
**URL scheme**. In case you want a better control of how HOKO should operate, you can manually
delegate deep links through the deep linking module.

{% highlight java %}
Hoko.deeplinking().openURL(deeplink);
{% endhighlight %}

## Smart link generation

Smart links may be created on the dashboard or directly through the HOKO SDK, in order to allow
users to share platform independent links directly to the relevant content.

### Smart links from templates

To generate Smart links through templates, the application needs a **route format**, the
corresponding **route parameters** and optional **query parameters**.

#### From @DeeplinkRoute

To generate Smart links from a `@DeeplinkRoute` annotated `Activity` or `Fragment` you can pass the
object to the `generateSmartlink(...)` call.

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

To allow applications to link to content without the use of templates, the HOKO SDK allows the
creation of `Deeplink` objects and the manual addition of platform dependent URLs (iOS universal,
iPhone, iPad, Android and/or Web).

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

Should you want to manually open a Smart link by code (e.g. `https://yourapp.hoko.link/example`)
and have it work as a deeplink in regards to the routing of `Activities` and `Fragments`, you can
call the method `openSmartlink(smartlink, smartlinkResolveListener)`.

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

## Metadata

The passing of `metadata` through **Smartlinks** involves securely saving data on the HOKO platform
and retrieving it when the smart link is opened in the application. This allows the developer to
pass sensitive information through deep link.

To make sure that developers have greater control on how this metadata is consumed, upon generating
a smart link through a `Deeplink` object, you can specify the `redeemLimit` of a given `Deeplink`
object.

This allows you to control how many times a given smart link is opened and can actually retrieve
sensitive information saved in the metadata field.

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

// Redeem limit is 3
Deeplink deeplink = Deeplink.deeplink("products/:product_id", routeParameters, queryParameters, metadata, 3);

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

When a deeplink with metadata is opened you can `redeem` it to make sure the redeem limit is respected upon opening a deeplink.

{% highlight java %}
Hoko.deeplinking().mapRoute("products/:product_id", , new DeeplinkCallback() {
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    // Show your desired activity
    if (deeplink.getMetadata() != null) {
      String coupon = deeplink.getMetadata().optString("coupon_code");
      if (coupon != null) {
        MyCoupon.apply(coupon);
        deeplink.redeem();
        return;
      }
    }
    MyCoupon.couldNotApply();
  }
})
{% endhighlight %}

## Deep link filtering (optional)

A filter allows you to explicitly control if a deep link should be open right away or not. Simply add a new filter block calling `addFilter(FilterCallback)` for any kind of validation that you may need.  
Each of your **filters** will be called by the SDK when a deep link is about to open (passing that deep link object as the block's parameter) and you should return `true` if that deep link should be processed or `false` otherwise.

For instance, a deep link for a friend’s profile page in a chat app should not be open if the user is not logged in at the moment. To accomplish this behavior, you should check if the user is not signed in and return `false` to stop the opening of the deep link or return `true` to open it right away.
After the user signed up, you can retrieve the latest deep link, processed by SDK, by accessing the `getCurrentDeeplink()` property in `Hoko.deeplinking()` and check if it `wasOpened()`. If it was not, simply call `Hoko.deeplinking().openCurrentDeeplink()` to open it.

If **all** of your filters return a truthy response it means that your application is ready to open the deep link (and consequently that deep link's route will be called as usual), otherwise the deep link will be saved in the SDK's `getCurrentDeeplink()` which can be manually accessed and opened later on.  

{% highlight java %}
Hoko.deeplinking().addFilter(new FilterCallback() {
  public boolean openDeeplink(Deeplink deeplink) {
    // check if the filtered deep link's route is the friends' route
    if (deeplink.getRoute() == "friends/:friend_id") {
      // if so, return true if your user is logged in, false otherwise
      return user.isLoggedIn();
    } else {
      // otherwise, since we're not interested in filtering a deep link that
      // does not match the friends' route, simply return true
      return true
    }
}});

...


// after the user logged in, check if the latest deep link processed by
// the SDK was opened or not
if (Hoko.deeplinking().getCurrentDeeplink() != null &&
    !Hoko.deeplinking().getCurrentDeeplink().wasOpened()) {

  //if not, tell HOKO to open it
  Hoko.deeplinking().openCurrentDeeplink()
}

{% endhighlight %}

**NOTE:** filters are completely optional, you don't need to use them to achieve HOKO's deep linking power.
