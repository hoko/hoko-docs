---
title: Push Notifications
categories: benefits
layout: documentation
permalink: /:categories/ios/push-notifications
description: Another way of using HOKO smart links inside your app is to send them via your push notifications. In this guide, we will show you how to do it with Parse and Mixpanel.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/push-notifications/" class="tab">Android</a>


![](/assets/images/push-notification-use-case.png)

Another way of using HOKO smart links inside your app is to send them via your push notifications. In this guide, we will show you how to do it with **Parse** and **Mixpanel**.

### With Parse:

To setup your push notifications with Parse, check out <a href="https://parse.com/tutorials/ios-push-notifications" target="_blank">this great guide</a>, created by the folks at Parse, to get started with their push service.  

After setting up your application, your notifications' `JSON` data should contain, at least, the following `key / value` entries (note that you can use your own custom domain on `smartlink`):

{% highlight json %}
{
  "alert": "Hi! This is my super awesome notification title.",
  "uri": "https://yourapp.hoko.link/superawesomelink"
}
{% endhighlight %}  

### With Mixpanel:

Check out <a href="https://mixpanel.com/help/reference/ios-push-notifications" target="_blank">this great guide</a> to setup your app in order to start receiving Push Notifications and this <a href="https://mixpanel.com/help/questions/articles/how-do-i-send-custom-parameters-like-emoji-in-my-push-notifications" target="_blank">guide</a> to start sending them from your Dashboard.

After setting up your application, your notifications' `JSON` data should contain, at least, the following `key / value` entries (note that you can use your own custom domain on `smartlink`):

{% highlight json %}
{"aps": {"alert": "Hi! This is my super awesome notification title.", "uri": "https://yourapp.hoko.link/superawesomelink"}}
{% endhighlight %}

### Finally, for both services:

To decode and process your notifications on the user's device, make sure you have the `application:didReceiveRemoteNotification:` delegate method implemented and the rest is easy as pie! The following code shows you how:

{% highlight objective-c %}
// AppDelegate.m
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // check if the push notification has the key "smartlink"
  if (userInfo[@"smartlink"]) {
    // if so, call HOKO's openSmartlink: and we'll take care of it for you
    // by sending the request to the appropriate route for that smartlink
    [[Hoko deeplinking] openSmartlink:userInfo[@"smartlink"]];
  } else {
    // otherwise, process the notification with your own code
    // in this case, processUserActivity: would be one of your methods
    [self processPushNotification:userInfo];
  }
}
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication, didReceiveRemoteNotification userInfo: [NSObject : AnyObject]) {
  // check if the push notification has the key "smartlink"
  if let smartlink = userInfo["smartlink"] as? String {
    // if so, call HOKO's openSmartlink() and we'll take care of it for you
    // by sending the request to the appropriate route for that smartlink
    Hoko.deeplinking().openSmartlink(smartlink)
  } else {
    // otherwise, process the notification with your own code
    // in this case, processUserActivity() would be one of your methods
    processPushNotification(userInfo)
  }
}
{% endhighlight %}

After this, you're finally ready to become a Push Notifications Sensei.
