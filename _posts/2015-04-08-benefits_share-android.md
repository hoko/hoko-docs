---
title: Share on Social Networks
categories:
layout: documentation
permalink: /benefits/android/share
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/share/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Sharing your app content on social media (such as Twitter or Facebook) helps you to find **new customers, expand audience** and **increase brand awareness**. With HOKO, doing it is so **simple** that anybody can do it.  

In this example, our app is a restaurant booking application where users can share with their friends, trough social media, where they are enjoying a nice meal. Share is done by using a smart link that redirects users to that specific restaurant inside the app.

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
