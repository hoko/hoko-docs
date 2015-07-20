---
title: Creating lazy smart links
categories: api
layout: documentation
permalink: /:categories/:title
description: Lazy smart links endpoint
---

## Lazy smart links

Smart links are links that take the user into different paths depending on the
environment where the link is opened thus making the user move forward without breaking the
experience. You can create smart links in advance using the dashboard or the mobile SDK and they will
look like `http://black.hoko.link/RcZPZz6`.

Lazy smart links are smart links that are only created on-demand, i.e. once there is a need to open the link. This is a very handy methodology to create smart links quickly based on a URL or if you need a lot of smart links that may not be clicked/used by your users, e.g. actionable buttons in newsletters.

Creating a lazy smart link is very easy. Just create a hyperlink with the format
`http://app.hoko.link/lazy?uri=%2Fproducts%2F0` where the `uri` parameter is an encoded full or relative
URL or mobile deep link, for example
`uri=http%3A%2F%2Fwww.blackisthenewapp.com%2Fproducts%2F0`,
`uri=%2Fproducts%2F0`, or `uri=black%3A%2F%2Fproducts%2F0` respectively.

Example request:

{% highlight bash %}
GET "http://app.hoko.link/lazy?uri=%2Fproducts%2F0"
{% endhighlight %}

The request will trigger the creation of a smart link and redirect the user either to your app or web site accordantly with your current templates. The redirect behavior experienced with smart links created with dashboard will be the same using lazy smart links.

Lazy smart links are unique, i.e. if you make the same request twice, only one smart link
is created and the second request will just re-use the first one.

