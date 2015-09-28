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
| metadata  | Custom metadata associated with the smart link                                       |
| unique    | Boolean value indicating if this should be an unique smart link                      |

Bold parameter `uri` is the only mandatory one, that you have to include in every request. The
other ones are optional and you'll see when you can use them in the examples below.

## Examples

### Default

The default use case where you only send the original URI. It can be an HTTP link or only the path
of the link on any of your configured platforms. If you have a
[template](http://support.hokolinks.com/what-is-a-template/) it will use the route mapping for the
matching template, otherwise it will copy the exact same path to every platform.

Request example:

{% highlight json %}
{
  "uri": "/products/398291"
}
{% endhighlight %}

Response example:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/TCw1RoX"
}
{% endhighlight %}

It will return the full address of the created smart link.

### Custom routes

Create a smart link with a custom set of routes. These given routes will override
any normal platform configuration. The platforms that we currently accept are:
`web`, `iphone`, `ipad`, `universal`, and `android`.

Request example:

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

Response example:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

In this example we are overriding the `web`, `iphone` and `android` platform's default routes. You can always just override a sub set of routes and all but those will adopt the default route values.

### Metadata

A smart link can hold a custom set of metadata that is going to be available to your app later on. Metadata is a JSON object, i.e. a set of key-value elements that can hold a key and an associated string, number or array of other elements.

This can be very handy if you need to save some custom data regarding each smart link, e.g. the value of a coupon or the referral’s id. Have a look some at use cases that use metadata in [iOS](http://support.hokolinks.com/ios/use-cases/) and [Android](http://support.hokolinks.com/android/android-use-cases/) to know more.

Request example:

{% highlight json %}
{
  "uri": "/products/398291",
  "metadata": {
    "referral": "user1",
    "coupon": 10
  }
}
{% endhighlight %}

Response example:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/atZy1ui"
}
{% endhighlight %}

You can change the posted metadata by editing the smart link at any time in the dashboard through the Tree editor or the Text Editor.

### Redeems

Creating smart links with a limit of times for reading its metadata is critic for some use cases, e.g. when you’re creating a smart link to be used once as a coupon.

When you create a smart link with metadata, you can specify the maximum number of times for its metadata to be redeem through the `redeem_limit` parameter.

Request example:

{% highlight json %}
{
  "uri": "/products/398291",
  "redeem_limit": 1
}
{% endhighlight %}

Response example:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/JcqTZ2U"
}
{% endhighlight %}

After creating the smart link, you can redeem its metadata through the SDK.

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

Example of a response for each request:

{% highlight json %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

Without this option, we will create smart links with different codes for each request, even if every
request have the same URI.
