---
title: Integrate iOS SDK
categories: quickstart
layout: documentation
permalink: /:categories/ios
description: To integrate HOKO open source SDK in your app you just have to follow 3 simple steps (either using cocoapods or doing it manually).
---

To integrate HOKO open source SDK in your app you just have to follow 3 simple steps (either using
[cocoapods][cocoapods] or doing it manually).

## Using cocoapods

**1.** Install [CocoaPods][cocoapods] in your system

**2.** Open your Xcode project folder and create a file called `Podfile` with the following content:

{% highlight ruby %}
pod 'Hoko', '~> 2.0.1'
{% endhighlight %}

**3.** Run `pod install` and wait for **CocoaPods** to install **HOKO SDK**. From this moment on, instead of using `.xcodeproj` file, you should start using `.xcworkspace`.

## Manual integration

**1.** Download the [Hoko SDK](https://github.com/hokolinks/hoko-ios/archive/master.zip).

**2.** Drag the `Hoko` folder to your project.

**3.** Be sure to also add `SystemConfiguration.framework` and `zlib.dylib` in case your project does not include it already.

# Add a URL Scheme to your App

Next, we need to define our custom URL type. Remember, we want to open the app via **"hoko://"**, so that will be our URL scheme. We also need to assign an unique identifier to the scheme. Apple recommends that you use reverse DNS notation to ensure that there are no name collisions on the platform, so we’ll use **"com.hoko.app"** for this example.

![URL Scheme](/assets/images/ios_url_schemes.png)

# Setup Associated Domains (Universal Links) - **iOS 9.0+**

For your app to fully support the newly introduced `Universal Links` by Apple you'll have to enable and add a new entry in the `Associated Domains` section, inside your application target's `Capabilities` tab. Click on the '+' button and add a new entry with the following value: `applinks:your-subdomain.hoko.link`, being `your-subdomain` the Hoko subdomain you chose for your Hoko links (view the [Hoko Links Subdomains](google.pt) section).

![URL Scheme](/assets/images/associated-domains.png)

# Integrating the SDK with your Swift project

Because the HOKO SDK is written in `Objective-C`, you'll have to manually add a `Bridging Header file` into your project in order to use it with your Swift code:

* `File` > `New` > `File...` > `iOS` > `Source` > `Header File`

* Name that header file `YourAppName-Bridging-Header.h`

* Inside that header file, import `#import <Hoko/Hoko.h>"`

* Go to your project > `Build Settings` > `Objective-C Bridging Header` > add the path to your bridging header file, from your root folder (e.g. `MyApp/MyApp-Bridging-Header.h`)

* Get Swifty!

# SDK Setup

Add the following line to your `applicationDidFinishLaunching` method in your `AppDelegate` class (don't forget to import the HOKO class by using `#import <Hoko/Hoko.h>` if you're working with `Objective-C`).

{% highlight objective-c %}
#import <Hoko/Hoko.h>

- (BOOL)application:(UIApplication *)application
  didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [Hoko setupWithToken:@"YOUR-APP-TOKEN"];
  // The rest of your code goes here...
}
{% endhighlight %}

{% highlight swift %}
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
  Hoko.setupWithToken("YOUR-APP-TOKEN")
  // The rest of your code goes here...
}
{% endhighlight %}

[cocoapods]: http://cocoapods.org/ "Cocoapods website"


<a href="http://support.hokolinks.com/ios/ios-setup/" class="btn-next">Setup iOS app &#8594;</a>
