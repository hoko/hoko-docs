---
title: What is my URL scheme?
categories: advanced
layout: learning_center
permalink: /:title
description: A URL scheme is what identifies your app deep links and how other apps can link into it.
---

A URL scheme is what identifies your app deep links and how other apps can link into it. All of URL
schemes are formed by a scheme name, followed by a colon character (":"), and the remainder of the
URI called the scheme-specific part.

The scheme name is a string that you choose for your own apps, so if your app is called **Megastore** your URL scheme should be **megastore** and its identifier should be **com.company.megastore**.

{% highlight java %}
megastore://
{% endhighlight %}

## Setup your URL Scheme on iOS

**Open your Xcode project settings and under the "Info" tab expand the "URL Types" section.** You can skip this step if you already configured a URL type.

If this section is empty, click in the "+" icon to add a new URL type. Let's say that we want to open the app via *"hoko://"*. Hence we need to enter *"hoko"* in *URL Schemes*.

We also should assign a unique *Identifier* to this URL type. Apple recommends that you use reverse DNS notation to ensure that there are no name collisions between types. In this example we are going to use "com.hoko.app".

Take note of your URL Scheme because we will ask you for it, when you are creating an app through the dashboard, e.g. "hoko".


![URL Scheme](/assets/images/ios_url_schemes.png)  
<br>
<a href="http://support.hokolinks.com/quickstart/ios/" class="btn-next" target="_blank">Read the full iOS SDK setup &#8594;</a>


## Setup your URL Scheme on Android

In order to setup your URL Scheme on Android you need to add the following lines in your `AndroidManifest.xml`, inside the `<application>` element, where `YourCustomActivity` will be the `Activity` that will be called when your app is opened through your URL Scheme.

{% highlight xml %}
<activity android:name="YourCustomActivity">
  <intent-filter>
      <data android:scheme="yourapp" />
      <!-- yourapp:// will be your URL Scheme -->
      
      <action android:name="android.intent.action.VIEW"/>
      <category android:name="android.intent.category.DEFAULT"/>
      <category android:name="android.intent.category.BROWSABLE"/>
  </intent-filter>
</activity>
{% endhighlight %}

<a href="http://support.hokolinks.com/quickstart/android/" class="btn-next" target="_blank">Read the full Android SDK setup &#8594;</a>
