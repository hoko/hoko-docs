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

![Web token](https://s3-eu-west-1.amazonaws.com/hoko-docs/rest_token.png)

You must then set the authentication header with the following format `Token <YOUR_PLATFORM_TOKEN>`
like such:

{% highlight bash %}
curl -s
  -H "Authorization: Token <YOUR_PLATFORM_TOKEN>"
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

| Status code | Description                                            |
|:-----------:|:-------------------------------------------------------|
| 1           | Replaced previously registered route                   |
| 2           | Missing parameters                                     |
| 3           | Unknown platform token                                 |
| 4           | Unsupported method                                     |
| 5           | There was a problem in the JSON you submitted          |
| 6           | Could not save object                                  |
| 7           | Could not find record                                  |
| 8           | Could not save route                                   |

You can now start using our REST API to create your smart links.

<a href="http://support.hokolinks.com/api/smartlinks/" class="btn-next">Automate your smart links generation &#8594;</a>
