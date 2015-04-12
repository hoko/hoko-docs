---
title: Integrate iOS SDK
categories: quickstart
layout: documentation
permalink: /:categories/ios
---

To integrate HOKO open source SDK in your app, simply follow the 3 simple steps below.

# Install HOKO in your project

## Cocoapods

1. Install [CocoaPods](http://cocoapods.org/) in your system
2. Open your Xcode project folder and create a file called `Podfile` with the following content:

  {% highlight ruby %}
  pod 'Hoko', '~> 1.2'
  {% endhighlight %}

3. Run `pod install` and wait for **CocoaPods** to install **HOKO SDK**. From this moment on, instead of using `.xcodeproj` file, you should start using `.xcworkspace`.

## Framework

1. Download the [Hoko SDK](https://github.com/hokolinks/hoko-ios/archive/master.zip).
2. Drag the `Hoko` folder to your project.
3. Be sure to also add `SystemConfiguration.framework` and `zlib.dylib` in case your project does not include it already.

# Add a URL Scheme to your App

Next, we need to define our custom URL type. Remember, we want to open the app via **"hoko://"**, so that will be our URL scheme. We also need to assign an unique identifier to the scheme. Apple recommends that you use reverse DNS notation to ensure that there are no name collisions on the platform, so we’ll use **"com.hoko.app"** for this example.

![URL Scheme](/assets/images/ios_url_schemes.png)

# SDK Setup

Add the following line to your `applicationDidFinishLaunching` method in your `AppDelegate` class.

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
