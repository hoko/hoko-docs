---
title: Integrate iOS SDK
categories: quickstart
layout: documentation
permalink: /:categories/ios
description: To integrate HOKO open source SDK in your app you just have to follow 3 simple steps (either using cocoapods or doing it manually).
---

To integrate HOKO open source SDK in your app (only <u>iOS 5 and higher</u>) you just have to follow 3 simple steps (either using
[cocoapods][cocoapods] or doing it manually).

### Using CocoaPods

1- Install [CocoaPods][cocoapods] in your system

2- Open your Xcode project folder and create a file called `Podfile` with the following content:

<div class="highlight"><pre><code class="language-ruby" data-lang="ruby"><span class="n">pod</span> <span class="s1">'Hoko'</span><span class="p">,</span> <span class="s1">'~&gt; <span class="ios-version">...</span>'</span></code></pre></div>

3- Run `pod install` and wait for **CocoaPods** to install **HOKO SDK**. From this moment on, instead of using `.xcodeproj` file, you should start using `.xcworkspace`.

### Manual integration

1- Download the [Hoko SDK](https://github.com/hokolinks/hoko-ios/archive/master.zip).

2- Drag the `Hoko` folder to your project.

3- Be sure to also add `SystemConfiguration.framework` and `zlib.dylib` in case your project does not include it already.

### Integrating the SDK with your Swift project

Because the HOKO SDK is written in `Objective-C`, you'll have to manually add a `Bridging Header file` into your project in order to use it with your Swift code:

1- `File` > `New` > `File...` > `iOS` > `Source` > `Header File`

2- Name that header file `YourAppName-Bridging-Header.h`

3- Inside that header file, import `#import <Hoko/Hoko.h>`

4- Go to your project > `Build Settings` > Search for `Objective-C Bridging Header` > Add the path to your bridging header file, from your root folder (e.g. `MyApp/MyApp-Bridging-Header.h`)

## Add a URL Scheme to your App

Next, we need to define your app’s custom URL type, if you don’t have one already. **Open your Xcode project settings and under the "Info" tab expand the "URL Types" section.** You can skip this step if you already configured a URL type.

If this section is empty, click in the "+" icon to add a new URL type. Let's say that we want to open the app via *"hoko://"*. Hence we need to enter *"hoko"* in *URL Schemes*.

We also should assign a unique *Identifier* to this URL type. Apple recommends that you use reverse DNS notation to ensure that there are no name collisions between types. In this example we are going to use "com.hoko.app".

Take note of your URL Scheme because we will ask you for it, when you are creating an app through the dashboard, e.g. "hoko".


![URL Scheme](/assets/images/ios_url_schemes.png)

### Setup Associated Domains (Universal Links) - **iOS 9.0+**

For your app to fully support the newly introduced `Universal Links` by Apple you'll have to enable and add a new entry in the `Associated Domains` section, inside your application target's `Capabilities` tab. Click on the '+' button and add a new entry with the following value: `applinks:myapp.hoko.link`, being `myapp` the Hoko subdomain you chose for your app's Hoko links. You can also have <u>your own link domain</u> ([learn more about this on the subdomains section](http://support.hokolinks.com/why-do-i-need-a-subdomain/)).

![URL Scheme](/assets/images/associated-domains.png)

## SDK Setup

Add the following line to your `applicationDidFinishLaunching` method in your `AppDelegate` class (don't forget to import the HOKO class by using `#import <Hoko/Hoko.h>` if you're working with `Objective-C`).

{% highlight objective-c %}
#import <Hoko/Hoko.h>

- (BOOL)application:(UIApplication *)application
  didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Hoko setupWithToken:@"YOUR-APP-TOKEN"];
  // The rest of your code goes here...

  return YES;
}
{% endhighlight %}

{% highlight swift %}
func application(application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
  Hoko.setupWithToken("YOUR-APP-TOKEN")
  // The rest of your code goes here...

  return true
}
{% endhighlight %}

If you want to use your own domain on your smart links (check <a href="http://support.hokolinks.com/how-to-setup-a-custom-domain/" target="_blank">how you can setup a custom domain</a>) you must setup the iOS SDK using `setupWithToken:customDomains:` as following:

{% highlight objective-c %}
#import <Hoko/Hoko.h>

- (BOOL)application:(UIApplication *)application
  didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Hoko setupWithToken:@"YOUR-APP-TOKEN"
         customDomains:@[@"your.custom.domain.com"]];
  // The rest of your code goes here...

  return YES;
}
{% endhighlight %}

{% highlight swift %}
func application(application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
  Hoko.setupWithToken("YOUR-APP-TOKEN",
      customDomains: ["your.custom.domain.com"])
  // The rest of your code goes here...

  return true
}
{% endhighlight %}

**NOTE:** make sure to return `YES` in the `application:didFinishLaunchingWithOptions:` delegate method to allow incoming deep links that open your app to be processed. Returning `NO` will block the requests.

[cocoapods]: http://cocoapods.org/ "Cocoapods website"


<a href="http://support.hokolinks.com/ios/ios-deeplinking/" class="btn-next">Setup your mobile deep linking &#8594;</a>
