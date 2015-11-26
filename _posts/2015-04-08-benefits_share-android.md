---
title: Share on Social Networks
categories:
layout: documentation
permalink: /benefits/android/share
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/share/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Let your users share your app's content on social media like Facebook and Twitter and
use smart links to drive traffic back into your app.

![Social network sharing](/assets/images/social-sharing.jpg)

In the following sections we are going to learn how to share smart links using the
operating system's native share controllers.

## Step 1: Sharing on social media

In this example, our app is a restaurant booking application where users can share with their
friends where they are enjoying a nice meal. Share is done by using a smart
link that redirects users to that specific restaurant inside the app.

Let's start by creating a mobile deep link for this item using the `Deeplink.deeplink` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlink` function.

![Sharing](/assets/images/share-android.png)

Finally, we are going to share the post using Android `Intent.ACTION_SEND`.
Thus, the user can pick the best Social Network app. Let's have a look at the code needed
to generate and share the smart link:

{% highlight java %}
private void setupShareButton() {
  // R.id.shareButton would be the ID you would give to that button
  mShareButton = (Button) findViewById(R.id.shareButton);

  // Add a click event listener to generate smart links
  mShareButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      HashMap routeParameters = new HashMap();
      routeParameters.put("restaurant_id", Integer.toString(mRestaurant.getId()));

      Deeplink restaurantDeeplink = Deeplink.deeplink("restaurant/:restaurant_id", routeParameters);

      // Generate the smart link based on a deep link
      Hoko.deeplinking().generateSmartlink(restaurantDeeplink, new LinkGenerationListener() {
        @Override
        public void onLinkGenerated(String smartlink) {
          // Build the message together with the smart link
          String shareText = "Currently having dinner at " + mRestaurant.getName() + " and it's great! " + smartlink;

          Intent shareIntent = new Intent(Intent.ACTION_SEND);
          shareIntent.setType("text/plain");
          shareIntent.putExtra(Intent.EXTRA_TEXT, shareText);

          // And... it's ready! Let's present the share popup to the user
          startActivity(Intent.createChooser(shareIntent, "Share"));
        }

        @Override
        public void onError(Exception e) {
          System.out.println(e.getMessage());
        }
      });
    }
  });
}
{% endhighlight %}

If the item shared through your app is also available on your website, we will automatically
parse your website and attach any metatag available to the smart link, like `og:image`,
`og:description`, `image` or any other present.

This way, when you include smart links in social media
posts you can have extra data like thumbnails and descriptions. Make sure you have a `Web`
platform and a `Template` configured. Check the documentation about
[templates](http://support.hokolinks.com/what-is-a-template/) to know more.

## Step 2: Handling smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

#### Route mapping with annotations

One way to start mapping your routes with HOKO is to use our simple and straightforward
annotations at the beginning of your `Activities` and `Fragments`.

{% highlight java %}
@DeeplinkRoute("restaurant/:restaurant_id")
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
Hoko.deeplinking().mapRoute("restaurant/:restaurant_id", new DeeplinkCallback() {
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

### More information

Need to know more about this? You can find more information in the following pages:

- [Mapping routes with callbacks](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
- [Generating smart links](http://support.hokolinks.com/android/android-deeplinking/#smart-link-generation)
- [Utilities](http://support.hokolinks.com/android/android-utilities/)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
