---
title: Getting Started
categories: api
layout: documentation
permalink: /:categories/:title
description: Learn how to use HOKO REST Api to automate smart links generation.
---

TODO - What is the REST API for

If you haven't installed the SDK yet, please head over to the [iOS QuickStart](/quickstart/ios) or [Android QuickStart](/quickstart/android) guide to get our SDK up and running.

<a href="http://support.hokolinks.com/api/smartlinks/" class="btn-next">Automate your smart links generation &#8594;</a>

## Authentication

TODO - Where to go to get the platform tokens and how to set them.

If you don't provide us with your platform token on each request, we will response with an error code 3.

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

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Replaced previously registered route</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Missing parameters</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Unknown platform token</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Unsupported method</td>
    </tr>
    <tr>
      <td>5</td>
      <td>There was a problem in the JSON you submitted</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Could not save object</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Could not find record</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Could not save route</td>
    </tr>
  </tbody>
</table>
