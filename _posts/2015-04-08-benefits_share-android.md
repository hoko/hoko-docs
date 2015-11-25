---
title: Share on Social Networks
categories:
layout: documentation
permalink: /benefits/android/share
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/share/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

By letting your users share amazing content through social networks, you can get immediate
recognition and increase brand awareness. One simple share can reach thousands of users and,
as so, drive traffic to your app.

![Social network sharing](/assets/images/social-sharing.jpg)

Sharing your app content on social media (such as Twitter or Facebook) helps you to find
**new customers, expand audience** and **increase brand awareness**. With HOKO it's so simple that
anyone can do it.

## 1. Sharing on social media

In this example, our app is a restaurant booking application where users can share with their
friends where they are enjoying a nice meal. Share is done by using a smart
link that redirects users to that specific restaurant inside the app.

Let's start by creating a mobile deep link for this item using the `Deeplink.deeplink` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlink` function.

![Sharing](/assets/images/share-android.png)

Finally, we are going to share the post using Android `Intent.ACTION_SEND`.
Thus, the user can pick the best Social Network app. Let's have a look at the complete code needed
to generate and share the smart link:

{% highlight java %}
// This private method would be called inside your Activity's onCreate()
// method and it's used to setup the share button to generate a new
// HOKO Smart link when tapped.
private void setupShareButton() {
  // R.id.shareButton would be the ID you would give to that button
  mShareButton = (Button) findViewById(R.id.shareButton);

  // Add a click event listener so you know when to ask HOKO to generate
  // your awesome smart links
  mShareButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      // First, we'll create a new deep link with the restaurant ID so
      // we can generate a smart link from it.
      // For this example, we will use the route "restaurant/:restaurant_id"
      // for the deep links.
      //
      // NOTE: Make sure you're already mapping that route before executing
      // the following code, otherwise the smart link generation won't work.

      HashMap routeParameters = new HashMap();
      routeParameters.put("restaurant_id", Integer.toString(mRestaurant.getId()));

      Deeplink productDeeplink = Deeplink.deeplink("restaurant/:restaurant_id", routeParameters);

      // Now, you just need to call the generate smart link method and the SDK
      // will take care of that
      Hoko.deeplinking().generateSmartlink(productDeeplink, new LinkGenerationListener() {
        @Override
        public void onLinkGenerated(String smartlink) {
          // The restaurant Smart link was generated successfully.
          // Let's share it.

          String shareText = "Currently having dinner at " + mRestaurant.getName() + " and it's great! " + smartlink;
          Intent shareIntent = new Intent(Intent.ACTION_SEND);
          shareIntent.setType("text/plain");
          shareIntent.putExtra(Intent.EXTRA_TEXT, shareText);
          startActivity(Intent.createChooser(shareIntent, "Share"));
        }

        @Override
        public void onError(Exception e) {
          // Oopsie, an error occurred while generating your awesome
          // Smart link. But fear not, peak into the error's description
          // to see what went wrong.
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

## 2. Handle smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

We will take care of everything else. Be sure to check the documentation about
[Route Mapping](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
to know how to handle smart links inside your app.
