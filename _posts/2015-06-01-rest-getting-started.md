---
title: Getting started
categories: api
layout: documentation
permalink: /:categories/:title
description: Learn how to use HOKO REST API to automate your smart links generation.
---

You can use our REST API to automate the process of creating smart links. This can be useful if you
will need to automatically create thousands of smart links directly from your back-end.

Of course the smart links are still dependent on mobile deep links so you have to route your apps
first. If you haven't installed the SDK yet, please head over to the
[iOS QuickStart](/quickstart/ios) or [Android QuickStart](/quickstart/android) guide to get our SDK
up and running.

## Authentication

To interact with our REST API you need to authenticate each request with a token. You must use the
appropriate token for the platform on which you are doing the request, e.g. if you are doing a
request from your back-end **you should use your 'Web' platform’s token**, but if you are doing from
your iOS app you should use the 'iPhone' platform’s token.

You can find the individual tokens for each platform under the 'Settings' section of the dashboard:

![Web token](/assets/images/rest_token.png)

You must then set the authentication header with the following format `Token c466541181db7fa84fd6b12a8a0b48995d01af1d`
like such:

{% highlight bash %}
curl -s
  -H "Authorization: Token c466541181db7fa84fd6b12a8a0b48995d01af1d"
  -H "Content-Type: application/json"
  -d "{ 'uri': '/products/398291' }"
  https://api.hokolinks.com/v2/smartlinks/
{% endhighlight %}

If you don't provide us with your platform token on each request, we will response with an error
code 3.

{% highlight json %}
{
  "error": "Unknown platform token",
  "status": 3
}
{% endhighlight %}

## Errors status codes

In case of an error or warning, the response includes a JSON like the one in the previous section.
Currently these are the errors codes and messages that you may get:

| Status code | Error                                         | Description                                                         |
|:-----------:|:----------------------------------------------|:--------------------------------------------------------------------|
| 1           | Replaced previously registered route          | The route that was registered replaced another equivalent one       |
| 2           | Missing parameters                            | There are missing parameters on the body                            |
| 3           | Unknown platform token                        | You are using a wrong platform token in the 'Authorization' header  |
| 4           | Unsupported method                            | The method you're trying to invoke is not supported                 |
| 5           | There was a problem in the JSON you submitted | Errors on JSON format. Make sure your JSON is valid                 |
| 6           | Could not save object                         | Some error occurred on the server and the object was not saved      |
| 7           | Could not find record                         | The record you're trying to find does not exist                     |
| 8           | Could not save route                          | Some error occurred on the server and the route was not saved       |
| 9           | Could not create a smart link                 | The smart link you're trying to create is invalid                   |
| 10          | Too many redeems                              | The redeem limit of your smart link's metadata has been reached    |
| 11          | Wrong platform token                          | You are not using the appropriate authorization token in your requests |

You can now start using our REST API to create your smart links.

<a href="http://support.hokolinks.com/api/rest-creating-smartlinks/" class="btn-next">Automate your smart links generation &#8594;</a>
