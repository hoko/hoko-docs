---
title: Analytics
categories: android
layout: documentation
permalink: /:categories/:title
---

To allow the creation of Smartlinks with associated user targets HOKO implements a simple form of **Analytics**. It only tracks **users**, their **devices**, **deep linking sessions** and associated **key events**. This also provides a better result analysis, with a breakdown of Smartlink user metrics.

## Users

In HOKO there are two kinds of users, the **identified** and the **anonymous** users. Every user is an anonymous user until it is identified, and it will stay identified until the app is uninstalled or it is identified as an anonymous user once again.

### Anonymous Users

To identify a user as an anonymous user the app should identify the user without an identifier. Should the app identify two anonymous users in sequence, they will be considered the same anonymous user to avoid replication whereas it is not necessary.

{% highlight java %}
Hoko.analytics().identifyUser();
{% endhighlight %}

### Identified Users

If your app identifies its users to the HOKO SDK, the HOKO platform will be able to provide you with better usage metrics and better user targeting when creating Smartlinks. To identify users the app needs to provide a few user details, namely an identifier, which can be an e-mail, a numeric id or even a username.

{% highlight java %}
Hoko.analytics().identifyUser("johnappleseed");
{% endhighlight %}

Should you want to provide information on which account type the user is logged in from, you can do it by providing an additional `accountType` parameter.

{% highlight java %}
Hoko.analytics().identifyUser("johnappleseed", UserAccountType.GITHUB);
{% endhighlight %}

The app may also provide a few optional parameters to provide finer control over the user targeting mechanics in the HOKO platform, extra parameters are `name`, `email, `birthDate` and `gender`.

{% highlight java %}
Hoko.analytics().identifyUser("johnappleseed", UserAccountType.GITHUB, "John Appleseed", 
                "john.appleseed@hokolinks.com", new Date(), UserGender.MALE);
{% endhighlight %}

## Sessions

In HOKO, sessions have a different meaning when compared to common analytics platforms. HOKO only creates a session if the app was opened or resumed from a Smartlink. The deep linking session serves the purpose of tracking app usage **after** a user opens a deep link, namely, how much time the user spent on the app and if the user performed certain key events (e.g. purchasing a product or sharing it on a social network).

Note: Sessions are tracked automatically and there is no code required to implement sessions with the HOKO SDK.

## Events

To add meaning to the automatically gathered information from **sessions**, the app should manually track the key events associated. This will allow HOKO to measure the success or failure of a deep link session. 

{% highlight java %}
Hoko.analytics().trackKeyEvent("facebook_share");
{% endhighlight %}

You can also track events with associated currency value.

{% highlight java %}
Hoko.analytics().trackKeyEvent("dress_purchase", 29.99);
{% endhighlight %}
