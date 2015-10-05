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
  (deeplink: HOKDeeplink) -> Void in
    // Do something when deep link is opened
})
{% endhighlight %}

This will map a `products/:product_id` route to an executable `target` block. This `target` will always be executed when a deep link matching the route is opened in the user's device. (e.g. opening `hoko://products/42?referrer=hokolinks.com`).

### HOKDeeplink

When a `target` block is executed, a `HOKDeeplink` object is passed as an argument.

This `HOKDeeplink` object will contain 3 parameters. The `route` to which the deep linking was matched against (in this case `products/:product_id`).

The `routeParameters`, a dictionary containing all the route format variables which were mapped to the incoming deep link (in this case `{"product_id": 42}`).

The `queryParameters`, a dictionary which contains all the **optional** parameters which might passed through the query string in the deep link (in this example `{"referrer": "hokolinks.com"}`).

And finally the `metadata`, a dictionary which contains all the privately passed parameters when the **Smartlink** was generated.

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
  (deeplink: HOKDeeplink) -> Void in
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
Hoko.deeplinking().mapDefaultRouteToTarget { (deeplink: HOKDeeplink) -> Void in
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
func handleDeeplink(deeplink: HOKDeeplink) {
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
Hoko.deeplinking().addHandlerBlock { (deeplink: HOKDeeplink) -> Void in
  Analytics.sharedInstance().track("deeplink", parameters: ["route": deeplink.route])
}
{% endhighlight %}

## Deep link delegation

To save time integrating HOKO in an application, HOKO **does not require** delegation of the `application:openURL:sourceApplication:annotation:` (or its iOS < 4.2 counterpart `application:handleOpenURL:`) from the `AppDelegate`, this is automatically done through method swizzling. Should you choose to delegate manually, you must make sure to return `true` in case the deep link was handled, by either HOKO or other deep link frameworks and `false` otherwise.

{% highlight objective-c %}
// AppDelegate.m
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation])
    return YES;
  return [[Hoko deeplinking] openURL:url sourceApplication:sourceApplication annotation:annotation];
}
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication, openURL url: NSURL, sourceApplication: String?, annotation: AnyObject?) -> Bool {
  if FBSDKApplicationDelegate.sharedInstance().application(application, openURL: url, sourceApplication: sourceApplication annotation: annotation) {
    return true
  }
  return Hoko.deeplinking().openURL(url, sourceApplication: sourceApplication, annotation: annotation)
}
{% endhighlight %}

## Universal Links Delegation (NSUserActivity)

HOKO is all about saving your development time and, with that in mind, our SDK also **does not require** you to delegate the `application:continueUserActivity:restorationHandler:` method from the `AppDelegate` in order to work with Apple's Universal Links (HOKO handles all of this automatically via method swizzling). Although that delegate method is used for Universal Links, keep in mind that it is also used for `Handoff` and `iOS 9's` search.  
When this method is called, HOKO verifies that the link associated with the `NSUserActivity`, generated and passed by `iOS`, is a proper HOKO link. If it's not, the SDK will redirect the method's call to your `AppDelegate`, if implemented.  
Should you choose to delegate manually, you must make sure to return `true` in case the `NSUserActivity` was handled, by either HOKO or by any framework/method and `false` otherwise.

{% highlight objective-c %}
// AppDelegate.m
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *))restorationHandler
{
    // 'processUserActivity:' would be one of your methods that
    // would check if the activity received is what you're expecting.
    if ([self processUserActivity:userActivity]) {
        return YES;
    }
    return [[Hoko deeplinking] continueUserActivity:userActivity restorationHandler:restorationHandler];
}
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication, continueUserActivity userActivity: NSUserActivity, restorationHandler: ([AnyObject]?) -> Void) -> Bool {
    // 'processUserActivity()' would be one of your methods that
    // would check if the activity received is what you're expecting.
    if (processUserActivity(userActivity)) {
        return true
    }
    return Hoko.deeplinking().continueUserActivity(userActivity, restorationHandler:restorationHandler)
}
{% endhighlight %}

## Smart link Generation

Smart links may be created on the dashboard or through the HOKO SDK, in order to allow users to share platform independent links directly to the relevant content.

### Smart links from templates

To generate Smart links through templates, the application needs a **route format**, the corresponding **route parameters** and optional **query parameters** and **metadata**.

{% highlight objective-c %}
HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"products/:product_id"
                                       routeParameters:@{@"product_id": @(self.product.identifier)}
                                       queryParameters:@{@"referrer": self.user.name}
                                              metadata:@{@"coupon": @"20"}];
[[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {
  [[Social sharedInstance] shareProduct:self.product link:smartlink];
} failure:^(NSError *error) {
  // Share web link instead
  [[Social sharedInstance] shareProduct:self.product link:self.product.webLink];
}];
{% endhighlight %}

{% highlight swift %}
let deeplink = HOKDeeplink("products/:product_id", routeParameters: ["product_id": product.identifier],
                                                 queryParameters:["referrer": user.name],
                                                 metadata: ["coupon": "20"])
Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String) -> Void in
  Social.sharedInstance().shareProduct(product, link: smartlink)
}) { (error: NSError) -> Void in
  // Share web link instead
  Social.sharedInstance().shareProduct(product, link: self.product.webLink)
}
{% endhighlight %}

### Smartlinks from URLs

To allow applications to link to content without the use of templates, the HOKO SDK allows the creation of `HOKDeeplink` objects and the manual addition of platform dependent URLs.

{% highlight objective-c %}
HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"products/:product_id"
                                       routeParameters:@{@"product_id": @(self.product.identifier)}
                                       queryParameters:@{@"referrer": self.user.name}
                                              metadata:@{@"coupon": @"20"}];
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
                                                 queryParameters:["referrer": user.name],
                                                 metadata: ["coupon": "20"])
deeplink.addURL("http://awesomeapp.com/the_perfect_product" forPlatform:.Web)
deeplink.addURL("http://awesomeapp.com/no_android_app_yet" forPlatform:.Android)

Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String) -> Void in
  Social.sharedInstance().shareProduct(product, link: smartlink)
}) { (error: NSError) -> Void in
  // Share web link instead
  Social.sharedInstance().shareProduct(product, link: self.product.webLink)
}
{% endhighlight %}

### Resolving Smart links

Should you want to open a Smart link (e.g. `https://yourapp.hoko.link/example`) and have it work as a deeplink that is processed by your `route handler`, you can call `openSmartlink:completion:`.

{% highlight objective-c %}
[[Hoko deeplinking] openSmartlink:slink completion:^(HOKDeeplink *deeplink) {
  if (!deeplink) {
    // deepling was opened
  } else {
    // could not resolve Smartlink
  }
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().openSmartlink(slink, completion: { (deeplink: HOKDeeplink?) -> Void in
  if let link = deeplink {
    // deepling was opened
  } else {
    // could not resolve Smart link
  }
}
{% endhighlight %}

If you choose not to have a completion block, you can use the `openSmartlink:` method without the 2nd parameter.

## Metadata

The passing of `metadata` through **Smartlinks** involves securely saving data on the HOKO platform and retrieving it when the smartlink is opened in the application. This allows the developer to pass sensitive information through deeplink.

To make sure that developers have greater control on how this metadata is consumed, upon generating a Smartlink through a `HOKDeeplink` object, you can specify the `redeemLimit` of a given `HOKDeeplink` object.
This allows you to control how many times a given Smartlink is opened and can actually retrieve sensitive information saved in the metadata field.

## Deep link filtering (optional)

A filter allows you to explicitly control if a deep link should be open right away or not. Simply add a new filter block calling `addFilterBlock` for any kind of validation that you may need.  
Each of your **filter blocks** will be called by the SDK when a deep link is about to open (passing that deep link object as the block's parameter) and you should return `true` if that deep link should be processed or `false` otherwise.

For instance, a deep link for a friend’s profile page in a chat app should not be open if the user is not logged in at the moment. To accomplish this behavior, you should check if the user is not signed in and return `false` to stop the opening of the deep link or return `true` to open it right away.
After the user signed up, you can retrieve the latest deep link, processed by SDK, by accessing the `currentDeeplink` property in `HOKDeeplinking` and check if it `wasOpened`. If it was not, simply call `[[Hoko deeplinking] openCurrentDeeplink]` to open it.

If **all** of your filter blocks return a truthy response it means that your application is ready to open the deep link (and consequently that deep link's route will be called as usual), otherwise the deep link will be saved in the SDK's `currentDeeplink` which can be manually accessed and opened later on.  

{% highlight objective-c %}
[[Hoko deeplinking] addFilterBlock:^BOOL (HOKDeeplink *deeplink) {
  // check if the filtered deep link's route is the friends' route
  if ([deeplink.route isEqualToString:@"friends/:friend_id"]) {
    // if so, return YES if your user is logged in, NO otherwise
    return currentUser.isLoggedIn;
  } else {
    // otherwise, since we're not interested in filtering a deep link that
    // does not match the friends' route, simply return YES
    return YES;
  }
}];

...

// after the user logged in, check if the latest deep link processed by
// the SDK was opened or not
if ([[Hoko deeplinking] currentDeeplink] &&
    ![[Hoko deeplinking] currentDeeplink].wasOpened) {

  //if not, tell HOKO to open it
  [[Hoko deeplinking] openCurrentDeeplink];
}
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().addFilterBlock { (deeplink: HOKDeeplink) -> Bool in
  // check if the filtered deep link's route is the friends' route
  if deeplink.route == "friends/:friend_id" {
    // if so, return YES if your user is logged in, NO otherwise
    return currentUser.isLoggedIn
  } else {
    // otherwise, since we're not interested in filtering a deep link that
    // does not match the friends' route, simply return YES
    return true
  }
}

...

// after the user logged in, check if the latest deep link processed by
// the SDK was opened or not
if let deeplink = Hoko.deeplinking().currentDeeplink()
    where !deeplink.wasOpened {

  //if not, tell HOKO to open it
  Hoko.deeplinking().openCurrentDeeplink()
}
{% endhighlight %}

**NOTE:** filters are completely optional, you don't need to use them to achieve HOKO's deep linking power.
