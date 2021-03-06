---
title: Push Notifications
categories:
layout: documentation
permalink: /benefits/android/push-notifications
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/push-notifications/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Another way of using HOKO smart links inside your app is to send them via your push notifications. In this guide, we will show you how to do it with **Parse** and **Mixpanel**.

## With Parse

To setup your push notifications with Parse, check out <a href="https://parse.com/tutorials/android-push-notifications" target="_blank">this great guide</a>, created by the folks at Parse, to get started with their push service.

After setting up your application, your push notification should contain the following data:

{% highlight json %}
{
  "alert": "Hi! This is my super awesome notification title.",
  "uri": "https://yourapp.hoko.link/superawesomelink"
}
{% endhighlight %}

## With Mixpanel

Check out <a href="https://mixpanel.com/help/reference/android-push-notifications" target="_blank">this great guide</a> to setup your app in order to start receiving Push Notifications and this <a href="https://mixpanel.com/help/questions/articles/how-do-i-send-custom-parameters-like-emoji-in-my-push-notifications" target="_blank">guide</a> to start sending them from your Dashboard.

After setting up your application, your push notification should contain the following data:

{% highlight json %}
{
  "mp_message": "Hi! This is my super awesome notification title.",
  "mp_cta": "https://yourapp.hoko.link/superawesomelink"
}
{% endhighlight %}

After this, you're finally ready to become a Push Notifications Sensei.
