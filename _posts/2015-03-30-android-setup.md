---
title: Setup
categories: android
layout: documentation
permalink: /:categories/:title
description: Full Android Setup Guide. Learn how to integrate HOKO SDK in your app.
---

If you haven't installed the SDK yet, please head over to the [QuickStart](/quickstart/android) guide to get our SDK up and running in Android Studio. Note that we support <u>Android 1.6</u> (API level 4) <u>and up</u>.

## HOKO

HOKO is an application-wide framework. To provide this behavior with a simple integration, HOKO works by setting up a singleton and accessing its modules through convenience accessors. The setup should occur on your `Application` subclass on the `onCreate()` method.

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
  // The rest of your code goes here...
}
{% endhighlight %}


In order to trigger HOKO's debug mode, you need to call the `setup(context, token, testDevices)`, where your test devices ids are printed in the log upon running the app. In case the current device is found in the test devices list, the SDK will be sure to upload your deep linking routes to the HOKO dashboard.

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN", "11B92EE4-20F1-4CA8-AB9E-64928FA2ABFF-1434379190");
  // The rest of your code goes here...
}
{% endhighlight %}

<a href="http://support.hokolinks.com/android/android-deeplinking/" class="btn-next">Add deep linking to your Android app &#8594;</a>
