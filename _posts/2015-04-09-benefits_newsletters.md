---
title: Newsletters
categories: benefits
layout: documentation
permalink: /:categories/newsletters
description: Re-engage with your users with smart newsletters.
---

Newsletters are a great way to re-engage your users and make them aware of your products.
Nevertheless it’s important to provide a great experience once the user engages with the newsletter
to increase its effectiveness and further re-engagements.

Newsletters usually drive traffic from e-mail clients to your website or app but most of the times
is either one way of the other. Moreover, mobile deep links to apps usually drive users to welcome
or sign up views. Truth be told, mobile deep links don't work if the app is not installed.

All these jumps hinder the experience. Mobile developers create beautiful apps that are designed for
premium experiences on mobile devices. Hence, the optimal experience should in fact be taking users
from Newsletters to Apps and straight to the product view and through the App Store to install the
app if they have to.

![Newsletter](/assets/images/newsletters.png)

We are introducing Lazy Smart Links for Newsletters that will make this as easy as pie.
Tapping on a lazy smart link triggers the creation of smart link that will follow your templates
and rules and drive the user to your app. When the user opens the app, the SDK will call your
app to present the appropriate view.

## Creating the lazy smart link

You will probably create hundreds of newsletters using your e-mail campaign software. Creating smart
links manually for every link in a newsletter would then require a lot of copy and paste work.

Creating a lazy smart link is extremely easy. All you need to do is to create a hyperlink that
follows a specific format and includes the mobile deep link that will direct the user to your app.

{% highlight bash %}
<a href="http://app.hoko.link/lazy?uri=products%2Famazing-case">Buy Now</a>
{% endhighlight %}

<a href="http://support.hokolinks.com/api/rest-creating-lazy-smartlinks/" class="btn-next">More information about Lazy Smart Links</a>

## Handle smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to support
and we will do the rest.

More information about Route Mapping:

<a href="http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations" class="tab active">Android</a>

Further more, we provide utility methods to help you handling smart links, like presenting the correct view
or setting the root view, based on the route parameters, query parameters or metadata.
Check the documentation about [Deeplink Utilities](http://support.hokolinks.com/ios/ios-utilities/) to know more.


