---
title: One Click Login
categories: benefits
layout: documentation
permalink: /:categories/ios/one-click-login
description: Nowadays, most modern apps and APIs use some sort of OAuth or another token-based login session. With HOKO you can leverage it to the next level.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/one-click-login/" class="tab">Android</a>

Nowadays, most modern apps and APIs use some sort of OAuth or another token-based login session. With HOKO you can leverage it to the next level. Let's take an approach similar to Slack's Magical Link login.

![](/assets/images/slack-one-click-login.png)

After inputting your email you are presented with a **Send Magic Link** button and a **Type password instead** button. Let's focus on the first one. What this does is request the server to send an email to the user's account, which contains a link carrying the user's token to be passed to the app through their deep linking logic.

For this to work on your app you need to integrate with HOKO on both your back-end and your app. First you need to add a "request one click login" API, which will most likely receive the user's email and some other meta-data. Then, when a request comes in, the server will email the user's email with a lazy smart link (e.g. `http://app.hoko.link/lazy?uri=%2Flogin%2F<user-authentication-token>`). Learn more about lazy smart links <a href="http://support.hokolinks.com/api/rest-creating-lazy-smartlinks" target="_blank">here</a>.

For the application itself, all we need to do is map a `login/:auth_token` route and set the user's token without ever needing the user's password.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"login/:auth_token"
                    toTarget:^(HOKDeeplink *deeplink) {
  // This should request the app's server for the user information regarding this authentication token
  // and let the user see the app's content.
  [[LoginHelper sharedInstance] loginWithToken:deeplink.routeParameters[@"auth_token"]];
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("login/:auth_token", toTarget: {
  (deeplink: HOKDeeplink) -> Void in
    // This should request the app's server for the user information regarding this authentication token
    // and let the user see the app's content.
    LoginHelper.sharedInstance().loginWithToken(deeplink.routeParameters["auth_token"])
})
{% endhighlight %}
