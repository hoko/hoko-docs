---
title: Deeplinking
categories: ios
layout: documentation
permalink: /:categories/:title
---

To allow an application to be deeplinkable, aside from registering a **URL Scheme**, as seen on [quickstart](/quickstart/ios) and setting up the SDK, it needs to map **routes**. These **routes** should follow the convention `static/path/:variable/:another_variable`. 

## Route mapping

To map routes with HOKO you should call the **deeplinking** module's `mapRoute:toTarget` method after setting up the SDK in your application's `AppDelegate` subclass on the `application:didFinishLaunchingWithOptions:` method.

If an application which has a **product detail view controller** it should somehow map a product route by calling `mapRoute:toTarget:` to the **deeplinking** module. 

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"product/:product_id" 
                    toTarget:^(HKDeeplink *deeplink) {
  // Do something when deeplink is opened
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("product/:product_id", toTarget: { 
  (deeplink: HKDeeplink!) -> Void in
    // Do something when deeplink is opened
})
{% endhighlight %}

This will map a `product/:product_id` route to an executable `target` block. This `target` will always be executed when a deeplink matching the route is opened in the user's device. (e.g. opening `hoko://product/42?referrer=hokolinks.com`).

### HKDeeplink

When a `target` block is executed a `HKDeeplink` object is passed as an argument. 

This `HKDeeplink` object will contain 3 parameters. The `route` to which the deeplinking was matched against (in this case `product/:product_id`). 

The `routeParameters`, a dictionary containing all the route format variables which were mapped to the incoming deeplink (in this case `{"product_id": 42}`). 

And finally the `queryParameters`, a dictionary which contains all the **optional** parameters which might passed through the query string in the deeplink (in this example `{"referrer": "hokolinks.com"}`).

### Target

The main purpose of a `target` execution block is for the app to create the navigation path and instantiate the proper view controllers to create the designed user experience. If a `hoko://product/42?referrer=hokolinks.com` deeplinking is opened the target should provide the user with a product detail view controller representing the product opened.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"product/:product_id" 
                    toTarget:^(HKDeeplink *deeplink) {
  BLKProductViewController *productViewController = [[BLKProductViewController alloc] initWithProductId:deeplink.routeParameters[@"product_id"]]; // always exists
  productViewController.referrer = deeplink.queryParameters[@"referrer"]; // might not exist
  [HKNavigation pushViewController:productViewController animated:YES];
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("product/:product_id", toTarget: { 
  (deeplink: HKDeeplink!) -> Void in
    let productViewController = BLKPRoductViewController(productId: deeplink.routeParameters["product_id"]) // always exists
    productViewController.referrer = deeplink.queryParameters["referrer"] // might not exist
    HKNavigation.pushViewController(productViewController, animated: true)
})
{% endhighlight %}
