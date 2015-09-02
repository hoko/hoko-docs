---
title: Coupons
categories: benefits
layout: documentation
permalink: /:categories/ios/coupons
description: E-commerce and deals applications can take advantage of HOKO by embedding coupons or discounts in their links.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/coupons/" class="tab">Android</a>

E-commerce and deals applications can take advantage of HOKO by embedding **coupons or discounts** in their links. To do this, start by creating a new smart link and adding a new `metadata` entry to it, as shown below:

{% highlight json %}
{
  "coupon": "save20",
  "value": "20"
}
{% endhighlight %}

![](/assets/images/use-case-coupon.png)

As soon as you do it, your link will be ready to transmit metadata to your users. The following code shows how you can put this into practice with a very simple and straightforward example that displays an alert to the user, with the amount they receive with your coupon:


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

<a href="https://github.com/hokolinks/HOKOstore" class="btn-next" target="_blank">Demo app using coupons (Swift) &#8594;</a>
