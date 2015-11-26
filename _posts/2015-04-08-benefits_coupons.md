---
title: Coupons
categories: benefits
layout: documentation
permalink: /:categories/ios/coupons
description: E-commerce and deals applications can take advantage of HOKO by embedding coupons or discounts in their links.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/coupons/" class="tab">Android</a>

Create coupons links that can be reused throughout the mobile and desktop arena
seamlessly. All you need to do is create a smart link with metadata,
prepare you app to handle coupons and share the link.

We will take care of driving both new users and current users directly to your app, even if they
need to go through the app store in between. Inside the app we will delegate the coupon so you can
presented it to the user.

![Coupons](/assets/images/use-case-coupon.png)

As soon as your app is ready to handle any kind of coupons, you can focus only on creating and
sharing their links. We provide you with a sample app that demonstrates what we are going to discuss
here in-depth.

<a href="https://github.com/hokolinks/HOKOstore" class="btn-next" target="_blank">Demo app using coupons (Swift) &#8594;</a>

## Step 1: Creating the smart link for the coupon

Let's keep it simple and say that is a seasonally discount, e.g. cyber Monday. Thus, we must create the smart link and add the necessary metadata. You can either create the smart link through the dashboard or through the SDK. For the sake of simplicity, we are creating the link through the dashboard like so:

<iframe width="630" height="450" src="https://www.youtube.com/embed/fpesz5VhrS0" frameborder="0" allowfullscreen></iframe>

## Step 2: Prepare your app to handle the coupon

The following snippet depicts how our SDK delegates the coupon to your app, so you can then
do whatever you think it's best. In this simple example, we are just going to display a success
popup.

{% highlight objective-c %}
// AppDelegate.m

// addHandlerBlock: is going to be called every time your application opens a
// deep link. if you prefer, you can focus on specific deep link routes,
// to give a coupon/discount, by using mapRoute:toTarget:
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

// addHandlerBlock() is going to be called every time your application opens a
// deeplink. if you prefer, you can focus on specific deeplink routes, to give
// a coupon/discount, by using mapRoute(_:toTarget:)
Hoko.deeplinking().addHandlerBlock { (deeplink: HOKDeeplink) -> Void in
    // check if the deeplink has metadata for 'coupon'
    if let coupon = deeplink.metadata?["coupon"] {
        // notify the user that they successfully redeemed your coupon
        let alertController = UIAlertController(title: "Congratulations",
                                                message: "You just earned a $\(coupon) through a coupon because you clicked on the right link!", preferredStyle: .Alert)
        let action = UIAlertAction(title: "Awesome!", style: .Default, handler: nil)
        alertController.addAction(action)
        self.window?.rootViewController?.presentViewController(alertController, animated: true, completion: nil)
  }
}
{% endhighlight %}

If you intend to create a more complex structure of deep links we recommend you have a separate
route just for coupons. In this case you would be using the `mapRoute:toTarget:` delegation method.

<a href="http://support.hokolinks.com/ios/ios-deeplinking/#metadata" class="btn-next">Metadata documentation &#8594;</a>

## Step 3: (Optional) Limit the number of redeems

In use cases like coupons, we want to control the access to the metadata. You can define
how many times your users can redeem the metadata through the `Dashboard` under `Redeem limit` when
editing the smart link. Hence, we guarantee that the coupon is only going to be redeemed the right
amount of times.

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

Please check our
[metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata) documentation to learn more.
