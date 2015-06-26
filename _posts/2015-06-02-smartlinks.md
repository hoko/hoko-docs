---
title: Smart Links
categories: api
layout: documentation
permalink: /:categories/:title
description: Smart links endpoint.
---

## /smartlinks

*POST https://api.hokolinks.com/v2/smartlinks*

Create a smart link based on a URI. The API will process the URI and figure out if it follows a template or not and create the necessary routes automatically.

### Fields

<table>
  <tbody>
    <tr>
      <td>uri</td>
      <td>The base URI for the smart link (full or relative HTTP or mobile deep link)</td>
    </tr>
    <tr>
      <td>required</td>
      <td>String</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        /products/398291<br>
        http://www.app-web.com/products/398291<br>
        com.app://products/398291</td>
    </tr>
  </tbody>
</table>

### Examples

#### Request

{% highlight java %}
{
  "uri": "/products/398291"
}
{% endhighlight %}

#### Response

{% highlight java %}
{
  "smartlink": "http://app.hoko.link/TCw1RoX"
}
{% endhighlight %}

## /smartlinks (with custom routes)

*POST https://api.hokolinks.com/v2/smartlinks*

Create a smart link based on a URI using a custom set of routes.

### Fields

<table>
  <tbody>
    <tr>
      <td>uri</td>
      <td>The base URI for the smart link (full or relative HTTP or mobile deep link)</td>
    </tr>
    <tr>
      <td>required</td>
      <td>String</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        /products/398291<br>
        http://www.app-web.com/products/398291<br>
        com.app://products/398291</td>
    </tr>

    <tr>
      <td>routes</td>
      <td>Custom links and fallbacks for each platform.</td>
    </tr>
    <tr>
      <td>optional</td>
      <td>Hash</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        routes: {<br/>
          web: { link: 'http://www.app-web.com/398291', fallback: ''},<br/>
          iphone: { link: 'com.app.iphone://products/398', fallback: 'http://www.app-web.com/398'},<br/>
          android: { link: 'com.app.android://pp/398', fallback: 'http://www.app-web.com/398'}<br/>
        }<br/>
      </td>
    </tr>
  </tbody>
</table>

### Examples

#### Request

{% highlight java %}
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

#### Response

{% highlight java %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}


## /smartlinks (lazy creation)

*POST https://api.hoko.link/v2/smartlinks*

Create a lazy smart link based on a URI that it will only be created on-demand, i.e. once there is an initial request to open the link.

### Fields

<table>
  <tbody>
    <tr>
      <td>uri</td>
      <td>The base URI for the smart link (full or relative HTTP or mobile deep link)</td>
    </tr>
    <tr>
      <td>required</td>
      <td>String</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        /products/398291<br>
        http://www.app-web.com/products/398291<br>
        com.app://products/398291</td>
    </tr>

    <tr>
      <td>lazy</td>
      <td>Flag to generate a lazy smart link URL.</td>
    </tr>
    <tr>
      <td>optional</td>
      <td>String</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        true
      </td>
    </tr>
  </tbody>
</table>

### Examples

#### Request

{% highlight java %}
{
  "uri": "/products/398291",
  "lazy": true
}
{% endhighlight %}

#### Response

{% highlight java %}
{
  "smartlink": "http://app.hoko.link/Ft8Mzkg/%2Fproducts%2F398291"
}
{% endhighlight %}

## /smartlinks/resolve

*POST https://api.hokolinks.com/v2/smartlinks/resolve*

Resolves a smart link into a mobile deep link for the platform associated with the token provided with in the request. This can be used when the developer needs to resolve the smart link from a push notification into a mobile deeplink.

### Fields

<table>
  <tbody>
    <tr>
      <td>smartlink</td>
      <td>The smartlink that you want to resolve into a mobile deep link</td>
    </tr>
    <tr>
      <td>required</td>
      <td>String</td>
    </tr>
    <tr>
      <td>e.g.</td>
      <td>
        http://app.hoko.link/querty
      </td>
    </tr>
  </tbody>
</table>

### Examples

#### Request

{% highlight java %}
{
  "smartlink": "http://app.hoko.link/JZz97u6"
}
{% endhighlight %}

#### Response

{% highlight java %}
{
  "deeplink": "com.app.iphone://products/398"
}
{% endhighlight %}

## /smartlinks/:id

*GET https://api.hokolinks.com/v2/smartlinks/:id*

Request the details about a smart link and its routes.

### Examples

#### Request

{% highlight java %}
GET http://app.hoko.link/JZz97u6
{% endhighlight %}

#### Response

{% highlight java %}
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
