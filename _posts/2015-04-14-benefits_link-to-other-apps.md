---
title: Link to Other Apps
categories: benefits
layout: documentation
permalink: /:categories/ios/link-to-other-apps
description: Linking to other apps, commonly known as Outbound Traffic, is the flux of users that exit your app to another app or website to perform some action or just to continue your business workflow.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/link-to-other-apps/" class="tab">Android</a>

Linking to other apps, commonly known as **Outbound Traffic**, is the flux of users that exit your app to another app or website to perform some action or just to continue your business workflow.  

With that in mind, HOKO SDK provides a very simple interface that allows you to quickly generate smart links with custom URLs for each platform (iOS universal, iPhone, iPad, Android and/or Web), which makes it easier to create and share platform-personalized links for your outbound traffic needs. The process to achieve that is fairly simply to execute with just a few of line codes:

{% highlight objective-c %}
// create your deeplink object with the twitter URLs for each platform.
// we will use Tweetbot on iOS, Twitter on Android and twitter.com on Web
HOKDeeplink *deeplink = [HOKDeeplink deeplink];
[deeplink addURL:@"tweetbot://hokolinks/timeline" forPlatform:HOKDeeplinkPlatformIOSUniversal];
[deeplink addURL:@"twitter://user?screen_name=hokolinks" forPlatform:HOKDeeplinkPlatformAndroid];
[deeplink addURL:@"https://twitter.com/hokolinks" forPlatform:HOKDeeplinkPlatformWeb];

// now that it is created, generate a smart link
// and let HOKO do the hard work for you
[[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink
                                         success:^(NSString *smartlink) {
  // your smart link was generated successfully
  NSLog(@"smartlink: %@", smartlink);
} failure:^(NSError *error) {
  // an error occurred while trying to generate the smart link
  NSLog(@"%@", error.description);
}];
{% endhighlight %}

{% highlight swift %}
// create your deeplink object with the twitter URLs for each platform.
// we will use Tweetbot on iOS, Twitter on Android and twitter.com on Web
let deeplink = HOKDeeplink()
deeplink.addURL("tweetbot://hokolinks/timeline", forPlatform: .IOSUniversal)
deeplink.addURL("twitter://user?screen_name=hokolinks", forPlatform: .Android)
deeplink.addURL("https://twitter.com/hokolinks", forPlatform: .Web)

// now that it is created, generate a smart link
// and let HOKO do the hard work for you
Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { (smartlink: String) -> Void in
  // your smart link was generated successfully
  println("smartlink: \(smartlink)")
}) { (error: NSError) -> Void in
  // an error occurred while trying to generate the smart link
  println(error.description)
}
{% endhighlight %}
