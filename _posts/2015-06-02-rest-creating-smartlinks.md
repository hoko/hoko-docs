---
title: Creating smart links
categories: api
layout: documentation
permalink: /:categories/:title
description: Smart links endpoint
---

## Smartlinks endpoint

To create smart links with the REST API you just have to make a `POST` request to the following
endpoint:

{% highlight bash %}
POST https://api.hokolinks.com/v2/smartlinks
{% endhighlight %}

In the body of the request you should send a JSON that has the following fields:

| Field     | Description                                                                          |
|:----------|:-------------------------------------------------------------------------------------|
| **uri**   | The base URI for the smart link (full or relative HTTP or mobile deep link)          |
| routes    | Custom links and fallback for each platform                                          |
| unique    | Boolean value indicating if this should be an unique smart link                      |

Bold parameter `uri` is the only mandatory one, that you have to include in every request. The
other ones are optional and you'll see when you can use them in the examples below.

## Examples

### Default

The default use case where you only send the original URI. It can be an HTTP link or only the path
of the link on any of your configured platforms. If you have a
[template](http://support.hokolinks.com/what-is-a-template/) it will use the route mapping for the
matching template, otherwise it will copy the exact same path to every platform.

Example request:

{% highlight json %}
{
  "uri": "/products/398291"
}
{% endhighlight %}

Example response:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/TCw1RoX"
}
{% endhighlight %}

It will return the full address of the created smart link.

### Custom routes

Create a smart link based on a URI using a custom set of routes. These given routes will override
any of the default ones (either given by a template or based on the same path).

Example request:

{% highlight json %}
{
  "uri": "/products/398291",
  "routes": {
    "web": {
      "link": "http://www.app-web.com/398291",
      "fallback": ""
    },
    "iphone": {
      "link": "com.app.iphone://products/398",
      "fallback": "https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1783"
    },
    "android": {
      "link": "com.app.android://pp/398",
      "fallback": "http://www.app-web.com/398"
    }
  }
}
{% endhighlight %}

Example response:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

In this example we are overriding every platform’s default route. You could always just override a sub set of routes and all but those would adopt the default route value.

### Unique smart links

Create an unique smart link based on a URI, i.e. only one smart link will be created and returned
for multiple requests using the same URI. 

Example of multiple requests with:

{% highlight json %}
{
  "uri": "/products/398291",
  "unique": true
}
{% endhighlight %}

Example response for every request:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

Without this option, we will create smart links with different codes for each request, even if every
request have the same URI.
