---
title: Smart links resolve
categories: api
layout: documentation
permalink: /:categories/:title
description: Smart links resolve
---

## Resolve endpoint

Sometimes you may know the smart link address but you want know what is the corresponding deep link.
You can 'resolve' a smart link into a deep link for the platform associated with the token provided
within the request:

{% highlight bash %}
POST https://api.hokolinks.com/v2/smartlinks/resolve
{% endhighlight %}

In the body of the request you should send a JSON that has just one field:

| Field           | Description                       |
|:----------------|:----------------------------------|
| **smartlink**   | The full URL of the smart link    |

## Example

Example request:

{% highlight java %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

Example response:

{% highlight java %}
{
  "deeplink": "com.app.iphone://products/398"
}
{% endhighlight %}
