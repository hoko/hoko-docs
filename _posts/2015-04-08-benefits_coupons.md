---
title: Coupons
categories: benefits
layout: documentation
permalink: /:categories/ios/coupons
description: E-commerce and deals applications can take advantage of HOKO by embedding coupons or discounts in their links.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/coupons/" class="tab">Android</a>

Create coupons that can be reused throughout the mobile and desktop arena
seamlessly. All you need to do is create a smart link with metadata, prepare you app to handle
coupons and share the link. We will take care of driving both new users and current users directly
to your app, even if they need to go through the app store in between.

![Coupons](/assets/images/use-case-coupon.png)

Inside your app, the SDK will delegate the coupon so you can presented it to the user.
You can view this use case in-depth in a sample app provided here.

<a href="https://github.com/hokolinks/HOKOstore" class="btn-next" target="_blank">Sample app with coupons (Swift) &#8594;</a>

## Step 1: Creating the smart link for the coupon

Let's keep it simple and say that is a seasonally discount, e.g. cyber Monday. Thus, we must create the smart link and add the necessary metadata. You can either create the smart link through the dashboard or through the SDK. For the sake of simplicity, we are creating the link through the dashboard like so:

<iframe width="630" height="450" src="https://www.youtube.com/embed/fpesz5VhrS0" frameborder="0" allowfullscreen></iframe>

## Step 2: Prepare your app to handle the coupon

The following snippet depicts how our SDK delegates the coupon to your app, so you can then
do whatever you think it's best. In this simple example, we are just going to display a
popup with a success message.

{% highlight objective-c %}
// AppDelegate.m
[[Hoko deeplinking] addHandlerBlock:^(HOKDeeplink *deeplink) {
    // check if the deeplink has metadata for coupons
    if (deeplink.metadata[@"coupon"] && deeplink.metadata[@"value"]) {
        NSString *couponName = deeplink.metadata[@"coupon"];
        NSNumber *discountValue = deeplink.metadata[@"value"];

        // notify the user that they successfully redeemed your coupon
        UIAlertController *alertController = [UIAlertController
                                              alertControllerWithTitle:@"Congratulations"
                                              message:[NSString stringWithFormat:@"You just earned a $%@ through the coupon '%@' because you clicked on the right link!", discountValue, couponName]
                                              preferredStyle:UIAlertControllerStyleAlert];
        UIAlertAction *action = [UIAlertAction actionWithTitle:@"Awesome!" style:UIAlertActionStyleDefault handler:nil];
        [alertController addAction:action];
        [self.window.rootViewController presentViewController:alertController animated:YES completion:nil];
    }
}];
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
Hoko.deeplinking().addHandlerBlock { (deeplink: HOKDeeplink) -> Void in
    // Check if the deeplink has metadata for 'coupon'
    if let coupon = deeplink.metadata?["coupon"] {
        // Notify the user that they successfully redeemed your coupon
        let alertController = UIAlertController(title: "Congratulations",
                                                message: "You just earned a $\(coupon) through a coupon because you clicked on the right link!", preferredStyle: .Alert)
        let action = UIAlertAction(title: "Awesome!", style: .Default, handler: nil)
        alertController.addAction(action)
        self.window?.rootViewController?.presentViewController(alertController, animated: true, completion: nil)
  }
}
{% endhighlight %}

The `addHandlerBlock()` is going to be called every time your application opens a
deeplink. If you prefer, you can focus on one specific deeplink routes at the time using the
`mapRoute(_:toTarget:)` delegation method. Please check our
[metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata) documentation to learn more.

## Step 3: (Optional) Limit the number of redeems

In use cases like coupons, we want to control the access to the metadata. You can define
how many times your users can redeem the metadata through the `Dashboard` under `Redeem limit` when
editing the smart link. Hence, we guarantee that the coupon is only going to be redeemed the right
amount of times.

![Redeem limit](/assets/images/redeem-limit.png)

If you are creating the smart link through the SDK you can also define this limit through the
`redeemLimit` parameter when creating the `HOKDeeplink` object.

{% highlight objective-c %}
HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"products/:product_id"
                                       routeParameters:@{@"product_id": @(self.product.identifier)}
                                       queryParameters:@{@"referrer": self.user.name}
                                              metadata:@{@"coupon": @"20"}
                                           redeemLimit:3];
[[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {
  // Do something with the smart link
} failure:^(NSError *error) {
  // Oops, something went wrong
}];
{% endhighlight %}

{% highlight swift %}
let deeplink = HOKDeeplink("products/:product_id", routeParameters: ["product_id": product.identifier],
                                                 queryParameters:["referrer": user.name],
                                                 metadata: ["coupon": "20"],
                                                 redeemLimit: 3)
Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String) -> Void in
  // Do something with the smart link
}) { (error: NSError) -> Void in
  // Oops, something went wrong
}
{% endhighlight %}

### More information

Need to know more about these subjects? Check the following pages for more information:

- [Mapping routes with callbacks](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping)
- [Generating smart links](http://support.hokolinks.com/ios/ios-deeplinking/#smart-link-generation)
- [Smart links with Metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata)
- [Utilities](http://support.hokolinks.com/ios/ios-utilities/)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
