---
title: Integrate Android SDK
categories: quickstart
layout: documentation
permalink: /:categories/android
---

To integrate HOKO in your app, simply follow the 3 simple steps below after adding it to your project.

# Install HOKO in your project

## Gradle

{% highlight groovy %}
compile 'com.hokolinks:hoko:1.2'
{% endhighlight %}

## Maven

{% highlight xml %}
<dependency>
  <groupId>com.hokolinks</groupId>
  <artifactId>hoko</artifactId>
  <version>1.2</version>
</dependency>
{% endhighlight %}

# Setting up the AndroidManifest.xml

Add the following lines to your `AndroidManifest.xml` while making sure to have the `android.permission.INTERNET` and `android.permission.ACCESS_NETWORK_STATE` permissions.

{% highlight xml %}
<activity
  android:name="com.hoko.activity.HokoActivity"
  android:alwaysRetainTaskState="true"
  android:launchMode="singleTask"
  android:noHistory="true"
  android:theme="@android:style/Theme.NoDisplay">
  <intent-filter>
    <data android:scheme="===YOUR-URL-SCHEME===" />
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
  </intent-filter>
</activity>

<receiver android:name="com.hokolinks.deeplinking.DeferredDeeplinkingBroadcastReceiver"
  android:exported="true">
  <intent-filter>
    <action android:name="com.android.vending.INSTALL_REFERRER" />
  </intent-filter>
</receiver>
{% endhighlight %}

# SDK Setup

In your `Application` subclass setup the Hoko Framework in the `onCreate(...)` method:

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
}
{% endhighlight %}
