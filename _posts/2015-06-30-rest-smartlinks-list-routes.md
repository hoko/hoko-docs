---
title: List smart link routes
categories: api
layout: documentation
permalink: /:categories/:title
description: List smart link routes
---

## List routes endpoint

Sometimes you may know the smart link address but you want know what is the corresponding deep link.
You can 'resolve' a smart link into a deep link for the platform associated with the token provided
within the request:

{% highlight bash %}
GET https://api.hokolinks.com/v2/smartlinks/:code
{% endhighlight %}

Request the details about a smart link and its routes. Replace `:code` parameter with the smart
link code.

## Example

Example request for code `JZz97u6`:

{% highlight bash %}
GET https://api.hokolinks.com/v2/smartlinks/JZz97u6
{% endhighlight %}

Example response:

{% highlight json %}
{
  "smartlink": {
    "code": "JZz97u6",
    "tags": [],
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
}
{% endhighlight %}
