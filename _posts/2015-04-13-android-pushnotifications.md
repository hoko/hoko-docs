---
title: Push Notifications
categories: android
layout: documentation
permalink: /:categories/:title
---

HOKO allows the creation of push notification campaigns which, with the help of deep links, take users to a specified content. By taking advantage of the user metrics, push notification campaigns can target specific users with specific content to maximize conversion rate.

The HOKO SDK retrieves the push notification token automatically, so long as you provide the `Google Cloud Messaging Sender Id`, on the `Hoko.setup(...)` call.

### Handling Push Notifications

As with everything else, even push notifications are handled automatically. HOKO will try to handle every incoming notification, and if it is a HOKO push notification it will perform its associated logic.

All you are required to do is include `HokoNotificationReceiver` and `HokoNotificationHandler` on your `AndroidManifest.xml`

{% highlight xml %}
<receiver
  android:name="com.hoko.pushnotifications.HokoNotificationReceiver"
  android:permission="com.google.android.c2dm.permission.SEND">
  <intent-filter>
    <action android:name="com.google.android.c2dm.intent.RECEIVE" />
    <category android:name="com.faberventures.hokotestbed" />
  </intent-filter>
</receiver>

<service
  android:name="com.hoko.pushnotifications.HokoNotificationHandler"
  android:exported="true" />
{% endhighlight %}

Should you want to manually delegate the received push notification, just call `openPushNotification(WakefulBroadcastReceiver, context, intent)` from your push notification `WakefulBroadcastReceiver` subclass' `onReceive(Context, Intent)` overriden method.

{% highlight java %}
public class YourCustomNotificationReceiver extends WakefulBroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    if (!Hoko.pushNotifications().openPushNotification(this, context, intent)) {
      // Handle the push notification yourself.
    }
  }
}
{% endhighlight %}
