---
title: Setup
categories: android
layout: documentation
permalink: /:categories/:title
description: Full Android Setup Guide. Learn how to integrate HOKO SDK in your app.
---

If you haven't installed the SDK yet, please head over to the [QuickStart](/quickstart/android) guide to get our SDK up and running in Android Studio. Note that we support Android 1.6 (API level 4) and up.

# HOKO

HOKO is an application-wide framework. To provide this behavior with a simple integration, HOKO works by setting up a singleton and accessing its modules through convenience accessors. The setup should occur on your `Application` subclass on the `onCreate()` method.

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
  // The rest of your code goes here...
}
{% endhighlight %}


Calling `setup(context, token)` will automatically check if your application is in **debug mode** by checking for the automatically generated `BuildConfig` class and its `DEBUG` property. In case it is found and `true` in the running application, the SDK will be sure to upload your deep linking routes and application icon to the HOKO dashboard. This can be reverted to a manual mode if `setup(context, token, debugMode)` is called instead.

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN", false);
  // The rest of your code goes here...
}
{% endhighlight %}

<a href="http://support.hokolinks.com/android/android-deeplinking/" class="btn-next">Add deep linking to your Android app &#8594;</a>

