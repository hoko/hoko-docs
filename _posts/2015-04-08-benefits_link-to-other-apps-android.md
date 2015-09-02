---
title: Link to Other Apps
categories:
layout: documentation
permalink: /benefits/android/link-to-other-apps
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/link-to-other-apps/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Linking to other apps, commonly known as **Outbound Traffic**, is the flux of users that exit your app to another app or website to perform some action or just to continue your business workflow.  

With that in mind, HOKO SDK provides a very simple interface that allows you to quickly generate smart links with custom URLs for each platform (iOS universal, iPhone, iPad, Android and/or Web), which makes it easier to create and share platform-personalized links for your outbound traffic needs. The process to achieve that is fairly simply to execute with just a few of line codes:

{% highlight java %}
// create your deeplink object with the twitter URLs for each platform.
// we will use Tweetbot on iOS, Twitter on Android and twitter.com on Web
Deeplink outboundDeeplink = Deeplink.deeplink();
outboundDeeplink.addURL("tweetbot://hokolinks/timeline", DeeplinkPlatform.IOS_UNIVERSAL);
outboundDeeplink.addURL("twitter://user?screen_name=hokolinks", DeeplinkPlatform.ANDROID);
outboundDeeplink.addURL("https://twitter.com/hokolinks", DeeplinkPlatform.WEB);

// now that it is created, generate a smart link
// and let HOKO do the hard work for you
Hoko.deeplinking().generateSmartlink(outboundDeeplink, new LinkGenerationListener() {
    @Override
    public void onLinkGenerated(String smartlink) {
      System.out.println(smartlink);
    }

    @Override
    public void onError(Exception e) {
      System.out.println(e.getMessage());
    }
});
{% endhighlight %}
