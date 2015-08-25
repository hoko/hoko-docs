---
title: Share on Social Networks
categories: benefits
layout: documentation
permalink: /:categories/ios/share
description: Sharing your app content on social media (such as Twitter or Facebook) helps you to find new customers, expand audience and increase brand awareness.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/share/" class="tab">Android</a>

Sharing your app content on social media (such as Twitter or Facebook) helps you to find **new customers, expand audience** and **increase brand awareness**. With HOKO, doing it is so **simple** that anybody can do it.  

In this example, our app is a restaurant booking application where users can share with their friends, trough social media, where they are enjoying a nice meal. Share is done by using a smart link that redirects users to that specific restaurant inside the app.

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
