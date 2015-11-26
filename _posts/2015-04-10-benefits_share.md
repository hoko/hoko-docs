---
title: Share on Social Networks
categories: benefits
layout: documentation
permalink: /:categories/ios/share
description: Sharing your app content on social media (such as Twitter or Facebook) helps you to find new customers, expand audience and increase brand awareness.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/share/" class="tab">Android</a>

By letting your users share amazing content through social networks, you can get immediate
recognition and increase brand awareness. One simple share can reach thousands of users and,
as so, drive traffic to your app.

![Social network sharing](/assets/images/social-sharing.jpg)

Sharing your app content on social media (such as Twitter or Facebook) helps you to find
**new customers, expand audience** and **increase brand awareness**. With HOKO it's so simple that
anyone can do it.

## Step 1: Sharing on social media

In this example, our app is a restaurant booking application where users can share with their
friends where they are enjoying a nice meal. Share is done by using a smart
link that redirects users to that specific restaurant inside the app.

Let's start by creating a mobile deep link for this item using the `deeplinkWithRoute` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlinkForDeeplink` function.

![Sharing](/assets/images/share-ios.png)

Finally, we are going to share the post using iOS `UIActivityViewController`.
Thus, the user can pick the best Social Network app. Let's have a look at the complete code needed
to generate and share the smart link:

{% highlight objective-c %}
- (IBAction)shareToSocialNetworksButtonTapped:(id)sender {
  // First, we'll create a new deep link with the restaurant ID so
  // we can generate a smart link from it.
  // For this example, we will use the route "restaurant/:restaurant_id"
  // for the deep links.
  //
  // NOTE: Make sure you're already mapping that route (in your AppDelegate.m,
  // for instance) before executing the following code,
  // otherwise the smart link generation won't work.
  NSNumber *restaurantID = @(self.currentRestaurant.uniqueID);
  HOKDeeplink *restaurantDeeplink = [HOKDeeplink deeplinkWithRoute:@"restaurant/:restaurant_id"
                                                  routeParameters:@{@"restaurant_id": restaurantID}];

  // Ask HOKO to generate a new Smart link
  [[Hoko deeplinking] generateSmartlinkForDeeplink:restaurantDeeplink success:^(NSString *smartlink) {
    // The restaurant Smart link was generated successfully. Let's share it.

    NSString *shareMessage = [NSString stringWithFormat:@"Currently having dinner at %@ and it's great!", self.currentRestaurant.name];
    NSURL *smartURL = [NSURL URLWithString:smartlink];
    UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:@[shareMessage, smartURL]
                                                                                  applicationActivities:nil];

    // And... it's ready! The following line displays the share
    // popup to the user and your smart links will start flying
    [self presentViewController:shareController animated:YES completion:nil];

  } failure:^(NSError *error) {
    // Oopsie, an error occurred while generating your awesome Smart link.
    // But fear not, peak into the error's description to see what went wrong.
    NSLog(@"%@", error.description);
  }];
}
{% endhighlight %}

{% highlight swift %}
@IBAction func shareToSocialNetworksButtonTapped(sender: AnyObject) {
  // First, we'll create a new deep link with the restaurant ID so
  // we can generate a smart link from it.
  // For this example, we will use the route "restaurant/:restaurant_id"
  // for the deep links.
  //
  // NOTE: Make sure you're already mapping that route (in your
  // AppDelegate.swift, for instance) before executing the following code,
  // otherwise the smart link generation won't work.
  let restaurantID = String(currentRestaurant.uniqueID)
  let restaurantDeeplink = HOKDeeplink(route: "restaurant/:restaurant_id", routeParameters: ["restaurant_id": restaurantID])

  // Ask HOKO to generate a new Smart link
  Hoko.deeplinking().generateSmartlinkForDeeplink(restaurantDeeplink, success: { smartlink in
    // The restaurant Smart link was generated successfully. Let's share it.

    if let smartURL = NSURL(string: smartlink) {
      let shareMessage = "Currently having dinner at \(self.currentRestaurant.name) and it's great!"
      let shareController = UIActivityViewController(activityItems: [shareMessage, smartURL], applicationActivities: nil)

      // And... it's ready! The following line displays the share
      // popup to the user and your smart links will start flying
      self.presentViewController(shareController, animated: true, completion: nil)
    }

  }) { error in
    // Oopsie, an error occurred while generating your awesome Smart link.
    // But fear not, peak into the error's description to see what went wrong.
    println(error.description)
  }
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

Map routes using the deep linking module's `mapRoute:toTarget` method
inside the `application:didFinishLaunchingWithOptions:` of your application `AppDelegate` subclass.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"restaurant/:restaurant_id"
                    toTarget:^(HOKDeeplink *deeplink) {
  NSString* productId = deeplink.routeParameters[@"restaurant_id"];

  // Do something when deeplink is opened
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("restaurant/:restaurant_id", toTarget: {
  (deeplink: HOKDeeplink) -> Void in
    if let productId = deeplink.routeParameters?["restaurant_id"] {
      // Do something when deep link is opened
    }
})
{% endhighlight %}

This will map a `restaurant/:restaurant_id` route to an executable `target` block. This `target`
will always be executed when a deep link matching the route is opened in the user's device,
e.g. opening `hoko://restaurant/pizza`. You can find more information about
[Route Mapping](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping) in the
documentation.

Further more, we provide utility methods to help you handling smart links, like presenting the
correct view or setting the root view, based on the route parameters, query parameters or metadata.
Check the documentation about [Deeplink Utilities](http://support.hokolinks.com/ios/ios-utilities/)
to know more.
