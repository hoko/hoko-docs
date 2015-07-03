---
title: Integrate Android SDK
categories: quickstart
layout: documentation
permalink: /:categories/android
description: To integrate HOKO open source SDK in your app you just have to follow 3 simple steps (either using the lastest AAR or via Maven).
---

To integrate HOKO in your app, simply follow the 3 simple steps below.

## Install HOKO in your project

Download [the latest AAR](https://oss.sonatype.org/service/local/repositories/releases/content/com/hokolinks/hoko/1.2.1/hoko-1.2.1.aar) or grab via Maven:

{% highlight xml %}
<dependency>
  <groupId>com.hokolinks</groupId>
  <artifactId>hoko</artifactId>
  <version>2.0.1</version>
</dependency>
{% endhighlight %}

or Gradle:

{% highlight groovy %}
compile 'com.hokolinks:hoko:2.0.1'
{% endhighlight %}

## Setting up the AndroidManifest.xml

Add the following lines to your `AndroidManifest.xml` to make sure to have the following permissions:

{% highlight xml %}
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
{% endhighlight %}

Now for the actual deeplinking, please add the `Activity` and `Receiver` to the `application` of your `AndroidManifest.xml`

{% highlight xml %}
<activity
  android:name="com.hokolinks.activity.HokoActivity"
  android:alwaysRetainTaskState="true"
  android:launchMode="singleTask"
  android:noHistory="true"
  android:theme="@android:style/Theme.Translucent.NoTitleBar">
  <intent-filter>
    <data android:scheme="bananas" />
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
  </intent-filter>
  
  <intent-filter> <!-- Android M Users add android:autoVerify="true" for AppLinks on this intent-filter-->
    <data android:scheme="http" android:host="bananas.hoko.link" /> <!-- Or your own custom domain -->
    <data android:scheme="https" android:host="bananas.hoko.link" />
    <action android:name="android.intent.action.VIEW" />
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

The subdomain will be used to avoid request the user on which app to open the link and to avoid going through an HTML page redirect. Everytime a link with `http://yourapp.hoko.link` domain gets opened, it will automatically open your app and resolve the Smartlink into an actual `Deeplink`, redirecting the user to the proper `Activity` or `Fragment`.

More info on [Why do I need a subdomain](http://support.hokolinks.com/why-do-i-need-a-subdomain/)

## SDK Setup

In your `Application` subclass setup the Hoko Framework in the `onCreate()` method:

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
}
{% endhighlight %}

Note: Check the Logs for your device token so you can upload routes into HOKO!

<a href="http://support.hokolinks.com/android/android-setup/" class="btn-next">Setup Android app &#8594;</a>
