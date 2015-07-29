---
title: Integrate Android SDK
categories: quickstart
layout: documentation
permalink: /:categories/android
description: To integrate HOKO open source SDK in your app you just have to follow 3 simple steps (either using the lastest AAR or via Maven).
---

To integrate HOKO in your app (only <u>Android 1.6</u> — API level 4 — <u>and higher</u>), simply follow the 3 simple steps below.

## Install HOKO in your project

Download [the latest AAR](https://oss.sonatype.org/service/local/repositories/releases/content/com/hokolinks/hoko/2.2/hoko-2.2.aar) or grab via **Maven**:

<div class="highlight"><pre><code class="language-xml" data-lang="xml"><span class="nt">&lt;dependency&gt;</span>
  <span class="nt">&lt;groupId&gt;</span>com.hokolinks<span class="nt">&lt;/groupId&gt;</span>
  <span class="nt">&lt;artifactId&gt;</span>hoko<span class="nt">&lt;/artifactId&gt;</span>
  <span class="nt">&lt;version&gt;</span><span class="android-version">...</span><span class="nt">&lt;/version&gt;</span>
<span class="nt">&lt;/dependency&gt;</span></code></pre></div>

or **Gradle** ( *in order to install using Gradle, you will need to add the following line in your `build.gradle (Module: app)` file inside the `dependencies { }` block* ):

<div class="highlight"><pre><code class="language-groovy" data-lang="groovy"><span class="n">compile</span> <span class="s1">'com.hokolinks:hoko:<span class="android-version">...</span>'</span></code></pre></div>

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
    <data android:scheme="yourapp" />
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
  </intent-filter>
</activity>
<activity
  android:name="com.hokolinks.activity.HokoAppLinksActivity"
  android:alwaysRetainTaskState="true"
  android:launchMode="singleTask"
  android:noHistory="true"
  android:theme="@android:style/Theme.Translucent.NoTitleBar">
  <intent-filter> <!-- Android M Users add android:autoVerify="true" for AppLinks on this intent-filter-->
    <data android:scheme="http" android:host="yourapp.hoko.link" /> <!-- Or your own custom domain -->
    <data android:scheme="https" android:host="yourapp.hoko.link" />
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

See the [Why do I need a subdomain](http://support.hokolinks.com/why-do-i-need-a-subdomain/) section for more information regarding this.

## SDK Setup

In your `Application` subclass setup the HOKO Framework in the `onCreate()` method:

{% highlight java %}
@Override
public void onCreate() {
  super.onCreate();
  Hoko.setup(this, "YOUR-APP-TOKEN");
}
{% endhighlight %}

We advise you to setup the SDK on your `Application's` subclass `onCreate()` method because it guarantees that the SDK will be initialized when the application is launched.  

Note: Check the Logs for your device token so you can upload routes into HOKO!

<a href="http://support.hokolinks.com/android/android-deeplinking/" class="btn-next">Setup your mobile deep linking &#8594;</a>
