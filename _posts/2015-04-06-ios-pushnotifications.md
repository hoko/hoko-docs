---
title: Push Notifications
categories: ios
layout: documentation
permalink: /:categories/:title
---

HOKO allows the creation of push notification campaigns which, with the help of deep links, take users to a specified content. By taking advantage of the user metrics, push notification campaigns can target specific users with specific content to maximize conversion rate.

The HOKO SDK retrieves the push notification token automatically if you have it enabled in your app. 

### Requesting Token

In case your app does not support push notifications yet, you can use a helper function to request the token independent of iOS version. You will then receive the token on your `AppDelegate` and HOKO will receive it automatically.

{% highlight objective-c %}
[[Hoko pushNotifications] registerForRemoteNotificationTypes:HKRemoteNotificationTypeBadge | HKRemoteNotificationTypeSound | HKRemoteNotificationTypeAlert];
{% endhighlight %}

{% highlight swift %}
Hoko.pushNotifications().registerForRemoteNotificationTypes(.Badge | .Sound | .Alert)
{% endhighlight %}

### Registering Token

Should you want to manually provide a push notification token HOKO provides an API to manually set the token for the device, and consequently the current user.

{% highlight objective-c %}
// AppDelegate.m
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  [[Hoko pushNotifications] applicationDidRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication!, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: NSData! ) {
  Hoko.pushNotifications().applicationDidRegisterForRemoteNotificationsWithDeviceToken(deviceToken)
}
{% endhighlight %}

### Handling Push Notifications

As with everything else, even push notifications are handled automatically. HOKO will try to handle every incoming notification, and if it is a HOKO push notification it will perform its associated logic, else it will call the `didReceiveRemoteNotification` method in your `AppDelegate` as common practice.

Should you want to manually delegate the received push notification, just call the corresponding method in the push notifications module.

{% highlight objective-c %}
// AppDelegate.m
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
  [[Hoko pushNotifications] applicationDidReceiveRemoteNotification:userInfo];
}
{% endhighlight %}


{% highlight swift %}
// AppDelegate.swift
func application(application: UIApplication!, didReceiveRemoteNotification userInfo: NSDictionary!) {
  Hoko.pushNotifications().applicationDidReceiveRemoteNotification(userInfo)
}
{% endhighlight %}

