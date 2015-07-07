---
title: Creating lazy smart links
categories: api
layout: documentation
permalink: /:categories/:title
description: Lazy smart links endpoint
---

## Lazy smart links

Lazy smart links are links that will only be created on-demand, i.e. once there is the first
request to resolve a link. This method to create smart links is very handy if you need to quickly
create a link based on a URL or if you need a lot of links that may not be clicked by your users, e.g. actionable buttons in newsletters.

Creating a lazy smart link is very easy. Make a request to your domain, e.g. `http://app.hoko.link`
followed by an encoded full URL like `http%3A%2F%2Fwww.yourdomain.com%2Fproducts%2F12345` and we
will create a smart link based on the URL even if it follows any existing template.

Example request:

{% highlight bash %}
GET "http://app.hoko.link/http%3A%2F%2Fwww.yourdomain.com%2Fproducts%2F12345"
{% endhighlight %}

This request will trigger the creation of smart link and redirect the user either to your app or web site. Lazy smart links are unique, i.e. if you make the same request twice, only one smart link
is created in the background and the second request will re-use the first link.
