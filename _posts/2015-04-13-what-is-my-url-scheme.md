---
title: What is my URL scheme?
categories: advanced
layout: learning_center
permalink: /:title
---

A URL scheme is what identifies your app deep links and how other apps can link into it. All of URL
schemes are formed by a scheme name, followed by a colon character (":"), and the remainder of the
URI called the scheme-specific part.

The scheme name is a string that you choose for your own apps
(usually for your own company) so if your company is called *MyCompany* you can use `com.mycompany`
and your complete URL scheme would look like:

{% highlight java %}
com.mycompany://
{% endhighlight %}


