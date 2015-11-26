---
title: Newsletters
categories:
layout: documentation
permalink: /benefits/android/newsletters
description: Re-engage with your users with smart newsletters.
---

<a href="http://support.hokolinks.com/benefits/newsletters/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Newsletters with smart links are a great to re-engage your users and drive traffic from e-mails to
your app. But smart links must be created beforehand to be shared later.
Hence, sending thousands of e-mails would require you to generate a lot of smart links, where most
would probably never be used.

![Newsletter](/assets/images/newsletters.png)

We are introducing Lazy Smart Links for Newsletters that will generate smart links
on-demand. Tapping on a lazy smart link triggers the creation of smart link that will follow your
pre-configured templates and drive the user to your app.

## Step 1: Creating lazy smart links

Creating a lazy smart link is extremely easy. All you need to do is to create an `HTML` hyperlink
that follows a specific format and includes the **encoded** mobile deep link that will drive the
user to your view inside your app, in the `uri` query parameter.

{% highlight bash %}
<a href="http://yourapp.hoko.link/lazy?uri=products%2F">Buy Now</a>
{% endhighlight %}

You can find more information about [Lazy Smart Links](http://support.hokolinks.com/api/rest-creating-lazy-smartlinks/) in its reference section.

## Step 2: Handling smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

#### Route mapping with annotations

One way to start mapping your routes with HOKO is to use our simple and straightforward
**annotations** at the beginning of your `Activities` and `Fragments`.

{% highlight java %}
@DeeplinkRoute("products/:product_id")
public class ProductActivity extends Activity {

  @DeeplinkRouteParameter("product_id")
  private int mProductId;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    mProductId = getIntent().getIntExtra("product_id", 0);

    // Do something when deeplink is opened
  }
}
{% endhighlight %}

#### Route mapping without annotations

If you wish to manage the deep linking mapping logic manually, all you have to do is to map each
route with `Hoko.deeplinking().mapRoute()` and a `DeeplinkCallback` callback object.

{% highlight java %}
Hoko.deeplinking().mapRoute("products/:product_id", new DeeplinkCallback() {
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    String productId = deeplink.getRouteParameters().get("product_id");

    // Start the activity to show the item
  }
})
{% endhighlight %}

You can find more information about
[Route Mapping](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
in the documentation.
