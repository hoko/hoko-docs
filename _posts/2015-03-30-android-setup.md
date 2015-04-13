---
title: Setup
categories: android
layout: documentation
permalink: /:categories/:title
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

In case you want to use HOKO's push notifications as well, you have to setup the SDK with a [Google Cloud Messaging Sender Id](http://developer.android.com/google/gcm/gs.html). 

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN", "YOUR-GCM-SENDER-ID");
  // The rest of your code goes here...
}
{% endhighlight %}

Calling `setup(context, token)` or `setup(context, token, gcmSenderId)` will automatically check if your application is in **debug mode** by checking for the automatically generated `BuildConfig` class and its `DEBUG` property. In case it is found and `true` in the running application, the SDK will be sure to upload your deep linking routes and application icon to the HOKO dashboard. This can be reverted to a manual mode if `setup(context, token, gcmSenderId, debugMode)` is called instead.

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN", "YOUR-GCM-SENDER-ID", false);
  // The rest of your code goes here...
}
{% endhighlight %}

