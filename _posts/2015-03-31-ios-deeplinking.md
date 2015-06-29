---
title: Deep linking
categories: ios
layout: documentation
permalink: /:categories/:title
description: Learn how to make your app deep linkable and can you create smart links directly from the HOKO SDK.
---

To allow an application to be deep linkable, aside from registering a **URL Scheme**, as seen on [quickstart](/quickstart/ios) and setting up the SDK, it needs to map **routes**. These **routes** should follow the convention `static/path/:variable/:another_variable`.

## Route mapping

To map routes with HOKO you should call the **deep linking** module's `mapRoute:toTarget` method after setting up the SDK in your application's `AppDelegate` subclass on the `application:didFinishLaunchingWithOptions:` method.

If an application which has a **product detail view controller** it should somehow map a product route by calling `mapRoute:toTarget:` to the **deep linking** module.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"products/:product_id"
                    toTarget:^(HOKDeeplink *deeplink) {
  // Do something when deeplink is opened
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("products/:product_id", toTarget: {
  (deeplink: HOKDeeplink!) -> Void in
    // Do something when deep link is opened
})
{% endhighlight %}

This will map a `products/:product_id` route to an executable `target` block. This `target` will always be executed when a deep link matching the route is opened in the user's device. (e.g. opening `hoko://products/42?referrer=hokolinks.com`).

### HOKDeeplink

When a `target` block is executed, a `HOKDeeplink` object is passed as an argument.

This `HOKDeeplink` object will contain 3 parameters. The `route` to which the deep linking was matched against (in this case `products/:product_id`).

The `routeParameters`, a dictionary containing all the route format variables which were mapped to the incoming deep link (in this case `{"product_id": 42}`).

And finally the `queryParameters`, a dictionary which contains all the **optional** parameters which might passed through the query string in the deep link (in this example `{"referrer": "hokolinks.com"}`).

### Target

The main purpose of a `target` execution block is for the app to create the navigation path and instantiate the proper view controllers to create the designed user experience. If a `hoko://products/42?referrer=hokolinks.com` deep linking is opened the target should provide the user with a product detail view controller representing the product opened.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"products/:product_id"
                    toTarget:^(HOKDeeplink *deeplink) {
  BLKProductViewController *productViewController = [[BLKProductViewController alloc] initWithProductId:deeplink.routeParameters[@"product_id"]]; // always exists
  productViewController.referrer = deeplink.queryParameters[@"referrer"]; // might not exist
  [HOKNavigation pushViewController:productViewController animated:YES];
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("products/:product_id", toTarget: {
  (deeplink: HOKDeeplink!) -> Void in
    let productViewController = BLKPRoductViewController(productId: deeplink.routeParameters["product_id"]) // always exists
    productViewController.referrer = deeplink.queryParameters["referrer"] // might not exist
    HOKNavigation.pushViewController(productViewController, animated: true)
})
{% endhighlight %}

### Default route

In case you want to provide a given behavior for when an unmapped deep linking opens the app you can do so by using the `mapDefaultRouteToTarget:` method. Only deep links that do not match any existing **routes** will trigger the default route.

{% highlight objective-c %}
[[Hoko deeplinking] mapDefaultRouteToTarget:^(HOKDeeplink *deeplink) {
  BLKLandingViewController *landingViewController = [BLKProductViewController new];
  [HOKNavigation setRootViewController:landingViewController];
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapDefaultRouteToTarget { (deeplink: HOKDeeplink!) -> Void in
  let landingViewController = BLKLandingViewController()
  HOKNavigation.setRootViewController(landingViewController)
}
{% endhighlight %}

### Handlers

In order to execute code that is common to any incoming deep link (e.g. analytics tracking, referrer tracking, etc), the **deeplinking** module allows delegating and block execution of **handlers**.

If a class object implements the `HOKHandlerProtocol` interface and that object is added to the handler list, its `handleDeeplink:` method will be executed.

{% highlight objective-c %}
// Analytics.h
@interface Analytics: NSObject <HOKHandlerProtocol>
...
@end
// Analytics.m
@implementation Analytics
...
- (void)handleDeeplink:(HOKDeeplink *)deeplink
{
  [self track:"deeplink" parameters:@{@"route": deeplink.route}];
}
// AppDelegate.m
...
[[Hoko deeplinking] addHandler:[Analytics sharedInstance]];
{% endhighlight %}

{% highlight swift %}
// Analytics.swift
class Analytics: HOKHandlerProtocol {
...
func handleDeeplink(deeplink: HOKDeeplink!) {
  track("deeplink", parameters: ["route": deeplink.route])
}
// AppDelegate.swift
...
Hoko.deeplinking().addHandler(Analytics.sharedInstance())
{% endhighlight %}

Aside from interface implementation, HOKO also allows adding `handler` blocks to be executed.

{% highlight objective-c %}
[[Hoko deeplinking] addHandlerBlock:^(HOKDeeplink *deeplink) {
  [[Analytics sharedInstance] track:"deeplink" parameters:@{@"route": deeplink.route}];
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().addHandlerBlock { (deeplink: HOKDeeplink!) -> Void in
  Analytics.sharedInstance().track("deeplink", parameters: ["route": deeplink.route])
}
{% endhighlight %}

## Deep link delegation

To save time integrating HOKO in an application, HOKO **does not require** delegation of the `application:openURL:sourceApplication:annotation:` (or its iOS < 4.2 counterpart `application:handleOpenURL:`) from the `AppDelegate`, this is automatically done through method swizzling. Should you choose to delegate manually, you must make sure to return `true` in case the deep link was handled, by either HOKO or other deep link frameworks and `false` otherwise.

{% highlight objective-c %}
// AppDelegate.m
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  if ([FBSession.activeSession handleOpenURL:url])
    return YES;
  return [[Hoko deeplinking] openURL:url sourceApplication:sourceApplication annotation:annotation];
}
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
  if FBSession.activeSession().handleOpenUrl(url) {
    return true
  }
  return Hoko.deeplinking().openURL(url, sourceApplication:sourceApplication, annotation: annotation)
}
{% endhighlight %}

## Smart link Generation

Smart links may be created on the dashboard or through the HOKO SDK, in order to allow users to share platform independent links directly to the relevant content.

### Smart links from templates

To generate Smart links through templates, the application needs a **route format**, the corresponding **route parameters** and optional **query parameters**.

{% highlight objective-c %}
HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"products/:product_id"
                                     routeParameters:@{@"product_id":@(self.product.identifier)}
                                     queryParameters:@{@"referrer": self.user.name}];
[[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {
  [[Social sharedInstance] shareProduct:self.product link:smartlink];
} failure:^(NSError *error) {
  // Share web link instead
  [[Social sharedInstance] shareProduct:self.product link:self.product.webLink];
}];
{% endhighlight %}

{% highlight swift %}
let deeplink = HOKDeeplink("products/:product_id", routeParameters: ["product_id": product.identifier],
                                                 queryParameters:["referrer": user.name])
Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String!) -> Void in
  Social.sharedInstance().shareProduct(product, link: smartlink)
}) { (error: NSError!) -> Void in
  // Share web link instead
  Social.sharedInstance().shareProduct(product, link: self.product.webLink)
}
{% endhighlight %}

### Smartlinks from URLs

To allow applications to link to content without the use of templates, the HOKO SDK allows the creation of `HOKDeeplink` objects and the manual addition of platform dependent URLs.

{% highlight objective-c %}
HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"products/:product_id"
                                     routeParameters:@{@"product_id":@(self.product.identifier)}
                                     queryParameters:@{@"referrer": self.user.name}];
[deeplink addURL:@"http://awesomeapp.com/the_perfect_product" forPlatform:HOKDeeplinkPlatformWeb];
[deeplink addURL:@"http://awesomeapp.com/no_android_app_yet" forPlatform:HOKDeeplinkPlatformAndroid];

[[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {
  [[Social sharedInstance] shareProduct:self.product link:smartlink];
} failure:^(NSError *error) {
  // Share web link instead
  [[Social sharedInstance] shareProduct:self.product link:self.product.webLink];
}];
{% endhighlight %}

{% highlight swift %}
let deeplink = HOKDeeplink("products/:product_id", routeParameters: ["product_id": product.identifier],
                                                 queryParameters:["referrer": user.name])
deeplink.addURL("http://awesomeapp.com/the_perfect_product" forPlatform:.Web)
deeplink.addURL("http://awesomeapp.com/no_android_app_yet" forPlatform:.Android)

Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String!) -> Void in
  Social.sharedInstance().shareProduct(product, link: smartlink)
}) { (error: NSError!) -> Void in
  // Share web link instead
  Social.sharedInstance().shareProduct(product, link: self.product.webLink)
}
{% endhighlight %}

### Resolving Smart links

Should you want to open a Smart link (e.g. `https://yourapp.hoko.link/example`) and have it work as a deeplink that is processed by your `route handler`, you can call `openSmartlink:completion:`.

{% highlight objective-c %}
[[Hoko deeplinking] openSmartlink: completion:^(HOKDeeplink *deeplink) {
  if (!deeplink) {
    // deepling was opened
  } else {
    // could not resolve Smartlink
  }
}];

{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().openSmartlink(deeplink, completion: { (deeplink: HOKDeeplink?) -> Void in
  if let link = deeplink {
    // deepling was opened
  } else {
    // could not resolve Smart link
  }
}
{% endhighlight %}

If you choose not to have a completion block, you can use the `openSmartlink:` method without the 2nd parameter.

## Universal Links (NSUserActivity)

With iOS 9, Apple introduced Universal Links that allows an app to be opened directly when a link with a specific host (specified in the `Associated Domains`) is tapped on the user's device. With this, Apple generates a `NSUserActivity` object with the property `webpageURL` filled with that URL and passes it to your application's App Delegate by calling the `application:continueUserActivity:restorationHandler:` delegate method. Hoko listens to this call (via swizzling) and automatically does the hard work for you: converts that link into a deeplink and calls your `route handler` that processes it.
Keep in mind that Hoko won't do anything if the `host` of the `NSUserActivity's webpageURL` doesn't contain `"hoko.link"`. If that's the case, `application:continueUserActivity:restorationHandler:` is then passed to your App Delegate, like it normally would.

<a href="http://support.hokolinks.com/ios/ios-utilities/" class="btn-next">View Hoko Utilities &#8594;</a>
