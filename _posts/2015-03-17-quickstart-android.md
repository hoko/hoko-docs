---
title: Integrate Android SDK
categories: quickstart
layout: documentation
permalink: /:categories/android
---

To integrate HOKO in your app, simply follow the 3 simple steps below.

# Install HOKO in your project

Download [the latest AAR](https://oss.sonatype.org/service/local/repositories/releases/content/com/hokolinks/hoko/1.2.1/hoko-1.2.1.aar) or grab via Maven:

{% highlight xml %}
<dependency>
  <groupId>com.hokolinks</groupId>
  <artifactId>hoko</artifactId>
  <version>1.2.1</version>
</dependency>
{% endhighlight %}

or Gradle:

{% highlight groovy %}
compile 'com.hokolinks:hoko:1.2.1'
{% endhighlight %}

# Setting up the AndroidManifest.xml

## Deep linking

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

## Push Notifications

To make sure push notifications work with HOKO make sure you have the following permissions in your `AndroidManifest.xml`

{% highlight xml %}
<permission
  android:name="com.faberventures.hokotestbed.permission.C2D_MESSAGE"
  android:protectionLevel="signature" />

<uses-permission android:name="===YOUR-PACKAGE-NAME===.permission.C2D_MESSAGE" />
<uses-permission android:name="com.google.android.c2dm.permission.RECEIVE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
{% endhighlight %}

And the following `Service` and `Receiver` declared as well.

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

# SDK Setup

In your `Application` subclass setup the Hoko Framework in the `onCreate()` method:

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
}
{% endhighlight %}
