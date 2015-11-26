---
title: Newsletters
categories: benefits
layout: documentation
permalink: /:categories/newsletters
description: Re-engage with your users with smart newsletters.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/newsletters/" class="tab">Android</a>

Newsletters with smart links are a great to re-engage your users and drive traffic from e-mails to
your app. But smart links must be created beforehand to be shared later.
Hence, sending thousands of e-mails would require you to generate a lot of smart links, where most
would probably never be used.

![Newsletter](/assets/images/newsletters.png)

We are introducing Lazy Smart Links for Newsletters that will generate smart links
on-demand. Tapping on a lazy smart link triggers the creation of smart link that will follow your
pre-configured templates and drive the user to your app.

## Step 1: Creating lazy smart links

Creating a lazy smart link is extremely easy. All you need to do is to create an `HTML` hyperlink
that follows a specific format and includes the **encoded** mobile deep link that will drive the
user to your view inside your app, in the `uri` query parameter.

{% highlight bash %}
<a href="http://yourapp.hoko.link/lazy?uri=products%2F">Buy Now</a>
{% endhighlight %}

You can find more information about [Lazy Smart Links](http://support.hokolinks.com/api/rest-creating-lazy-smartlinks/) in its reference section.

## Step 2: Handling smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

Map routes using the deep linking module's `mapRoute:toTarget` method
inside the `application:didFinishLaunchingWithOptions:` of your application `AppDelegate` subclass.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"products/:product_id"
                    toTarget:^(HOKDeeplink *deeplink) {
  NSString* productId = deeplink.routeParameters[@"product_id"];

  // Do something when deeplink is opened
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("products/:product_id", toTarget: {
  (deeplink: HOKDeeplink) -> Void in
    if let productId = deeplink.routeParameters?["product_id"] {
      // Do something when deep link is opened
    }
})
{% endhighlight %}

This will map a `products/:product_id` route to an executable `target` block that
will always be executed when a deep link matching the route is opened in the user's device,
e.g. opening `hoko://products/amazing-case`. You can find more information about
[Route Mapping](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping) in the
documentation.

Further more, we provide utility methods to help you handling smart links, like presenting the
correct view or setting the root view, based on the route parameters, query parameters or metadata.
Check the documentation about [Deeplink Utilities](http://support.hokolinks.com/ios/ios-utilities/)
to know more.

### More information

Need to know more about this? You can find more information in the following pages:

- [Mapping routes with callbacks](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping)
- [Generating smart links](http://support.hokolinks.com/ios/ios-deeplinking/#smart-link-generation)
- [Utilities](http://support.hokolinks.com/ios/ios-utilities/)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
