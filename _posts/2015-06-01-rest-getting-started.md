---
title: Getting started
categories: api
layout: documentation
permalink: /:categories/:title
description: Learn how to use HOKO REST API to automate your smart links generation.
---

You can use our REST API to automate the process of creating smart links. This can be useful if you
will need to automatically create thousands of smart links directly from your back-end system or
mobile app.

If you haven't installed the SDK yet, please head over to the [iOS QuickStart](/quickstart/ios) or
[Android QuickStart](/quickstart/android) guide to get our SDK up and running.

<a href="http://support.hokolinks.com/api/smartlinks/" class="btn-next">Automate your smart links generation &#8594;</a>

## Authentication

To interact with our REST API you need to authenticate each request with a token. You must use the
appropriate token for the platform on which you are doing the request, e.g. if you are doing a
request from your back-end you should use your ‘Web’ platform’s token, but if you are doing from
your iOS app you should use the ‘iPhone’ platform’s token.

You can find the individual tokens for each platform under the ‘Settings’ section of the dashboard.
You must then set the authentication header with the following format `Token <YOUR_PLATFORM_TOKEN>`
like such:

{% highlight java %}
curl -s
  -H "Authorization: Token <YOUR_PLATFORM_TOKEN>"
  -H "Content-Type: application/json"
  -d '{ "uri": "/products/398291" }'
  https://api.hokolinks.com/v2/smartlinks/
{% endhighlight %}

If you don't provide us with your platform token on each request, we will response with an error
code 3.

{% highlight java %}
{
  "error": "Unknown platform token",
  "status": 3
}
{% endhighlight %}

## HTTP Status Codes

You may experience the following HTTP status codes:

<table>
  <thead>
    <tr>
      <th>HTTP Status Code</th>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>200</td>
      <td>OK</td>
      <td>Everything worked out successfully.</td>
    </tr>
    <tr>
      <td>400</td>
      <td>Bad request</td>
      <td>We could not process the action.</td>
    </tr>
    <tr>
      <td>404</td>
      <td>Not found</td>
      <td>We could not find the requested record.</td>
    </tr>
  </tbody>
</table>

In case of 400 and 404 requests we will return a JSON blob with the following format:

{% highlight java %}
{
  "error": "Error description goes here",
  "status": 1
}
{% endhighlight %}

## Errors Status Codes

Currently these are the errors codes and messages that we support:


| Status | Description                                            |
|--------|--------------------------------------------------------|
| 1      | Replaced previously registered route                   |
| 2      | Missing parameters                                     |
| 3      | Unknown platform token                                 |
| 4      | Unsupported method                                     |
| 5      | There was a problem in the JSON you submitted          |
| 6      | Could not save object                                  |
| 7      | Could not find record                                  |
| 8      | Could not save route                                   |
