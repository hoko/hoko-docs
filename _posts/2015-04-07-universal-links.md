---
title: Universal Links
categories: ios
layout: documentation
permalink: /:categories/:title
description: To help your app on becoming deep linkable we provide a non-mandatory utility class to handle navigation on HOKO's deep link target block.
---

Apple is introducing Universal Links in iOS 9 to support native mobile deep linking using regular web links. It's one of the main mechanisms that act under the hood of every iOS 9 Search development.

Universal Links will permit users to tap on a normal web link and to open the respective app in a specific section or to gracefully open the web page if the app is not installed. iOS 9 takes this further by quickly animating the process just like a normal page flip inside an app and by adding a back button in the top of the screen to enable the user to easily switch back and forth.

![Universal Link's back button](/assets/images/universal-links-back-button.png)

Because these are normal URLs they can be send, published and opened everywhere and if something goes wrong the browser opens the web page as usual. For example, tapping on a search for a recipe with Spotlight or Safari Search, or on a link to a recipe sent by someone else, will take the user straight to the recipe screen within the app associated with the link's domain.

## Universal Links vs custom URL Schemes

For users, Universal Links brings a better experience and the only change they will notice is that regular links will simply start redirecting them to their apps. This brings some implications for developers though: they will need to adapt their apps and websites to cope with Universal Links.

Developers might be septic to change because they might actually be using the old way to achieve mobile deep linking through custom URL Schemes. However, Apple highly recommends the adoption of Universal Links due to the following benefits:

**-** Universal Links will always the one and only app that claims a web domain, unlike custom URL schemes where different developers could claim the same URL scheme.

**-** With URL schemes, if the app was not previously installed, tapping a URL would result in a broken experience and nothing would happen. Using Universal Links, the experience falls gracefully by redirecting the user to the web page through Safari.

**-** A single link works for all users of your content, regardless of whether they view it in your app or on your website. Universal Links are also platform agnostic because they are based on a common platform: the web.

## App and web site association

> A trust relationship between the app and the website is established by adding a `com.apple.developer.associated-domains` entitlement to your app and an `apple-app-site-association` file to your website.

HOKO generates and hosts the necessary configuration files automatically so you don't have to concern about them. Each subdomain holds the necessary files to enable mobile deep linking between your smart links and your app.

<a href="http://support.hokolinks.com/why-do-i-need-a-subdomain/" class="btn-next">Read more about subdomains &#8594;</a>

> In your com.apple.developer.associated-domains entitlement, include a list of all the domains your app wants to handle as universal links, e.g. applinks:myapp.hoko.link.

If you are only using HOKO for your mobile deep links, the only domain that you must add to your app's entitlement is your HOKO subdomain.

<a href="http://support.hokolinks.com/quickstart/ios/#add-a-url-scheme-to-your-app" class="btn-next">Read more how to integrate our iOS SDK &#8594;</a>

## Drawbacks of Universal Links

Universal Links are a great deal for developers but there are a few drawbacks that might lead to an adoption resistance:

> Universal Links only work on Apple's iOS 9.

Configuration an app to support Universal Links means that only the users running iOS 9 will take advantage of this technology. Users with prior iOS versions will not be able to open the apps just from tapping on the web links. Instead, they will all fall back to the browser and web page just like before with normal web links.

However, HOKO proprietary technology provides mobile deep linking for devices with iOS5 or higher. Hence your mobile deep links will work on almost every iOS device worldwide, even if they have iOS 9 or not.

> Universal Links will always fall back to the web page that you must create first. What if the developer wants to fall back to the homepage or to a complete different website that is not associated with the app?

With Universal Links the web link must target a web page that actually exists so that the iOS can gracefully fall back if the user doesn't have the app installed. At the same time, the developer might want its mobile deep links to fall back to the web site homepage every time. Using Universal Links, that would imply that every link would look the same, e.g. `http://www.app-web.com` just in case some user that doesn't has the app installed could still open your website. The problem it's that this web link has no information related with the specific content. Therefore, the app will not know what to do with the link.

The second scenario takes in consideration the mobile deep links that you want to catch with your app if it is installed or to fall back to a website that isn't associated with the app if it isn't installed, e.g. `http://www.facebook.com/your-profile`. Achieving this would require some work by the developer, to configure a web page that could redirect its users to the destination page. Furthermore, the developer might not have a web site at all, turning this into a impossible solution.

The developer can easily solve both use cases using HOKO smart links and their adaptive fall back. For each smart link created, you can choose on each platform 'what' will happen if the app is not installed. Independently you can set the fall back to your web site, iTunes store page or any other external web site.

> With Universal Links the developer must host a website that will be associated with an app. This could be bad news for small developers that can't claim, afford or maintain a website for their apps, but still want incoming traffic to their apps through web links.

HOKO is the solution for this problem because it acts as the developer website, with each app being hosted in different subdomains. Thus the developer just needs create the smart links and publish its URLs and each will open the appropriate app seamlessly.

> The association between your app and your website is powered by a configuration file that needs to be created and hosted in the developer's website.

With HOKO you can skip this tedious configuration because we provided it out-of-the-box. Furthermore our servers run using the industry top standards for security and performance, providing this configuration to each device in a secure and fast manner.

<a href="http://support.hokolinks.com/advantages-of-using-smart-links/" class="btn-next">Read more about the advantages of using HOKO's smart links &#8594;</a>

## Troubleshooting

If you are having some problems opening your app using Universal Links, check the following list of
common mistakes:

**-** Be aware that if you type a smart link in Safari it will not open your app through Universal Links
because this mechanism only works when you tap on link that is visible on the screen, e.g. tapping
on a smart link inside a SMS, Web Page, Note or other

**-** If you are using a custom domain, make sure you can access the configuration file for
Universal Links through HTTPS, i.e. open `https://yourdomain.com/apple-app-site-association` with your
desktop browser and check for any security errors

**-** Check if your app's Bundle and Team Id is correct here
`https://yourapp.hoko.link/apple-app-site-association`

**-** Check your URL Scheme in XCode > Project Properties > Info > URL Types > URL Schemes

**-** Check if the Associated Domain in XCode > Capabilities > Associated Domains > Domains > has the following format: `applinks:yourapp.hoko.link` or `applinks:yourdomain.com`

**-** Delete the app from your device after configuring HOKO to request the configuration file
regarding universal links from our servers

**-** Make sure you don’t have this error in the console when you are compiling:
"We have detected that you have 2 classes that implement the UIApplicationDelegate protocol"

**-** Check the console of XCode for errors
