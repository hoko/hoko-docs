---
title: Universal Links
categories: ios
layout: documentation
permalink: /:categories/:title
description: To help your app on becoming deep linkable we provide a non-mandatory utility class to handle navigation on HOKO’s deep link target block.
---

## Universal Links (NSUserActivity)

With iOS 9, Apple introduced Universal Links that allows an app to be opened directly when a link with a specific host (specified in the `Associated Domains`) is tapped on the user's device. With this, Apple generates a `NSUserActivity` object with the property `webpageURL` filled with that URL and passes it to your application's App Delegate by calling the `application:continueUserActivity:restorationHandler:` delegate method. Hoko listens to this call (via swizzling) and automatically does the hard work for you: converts that link into a deeplink and calls your `route handler` that processes it.

Keep in mind that Hoko won't do anything if the `host` of the `NSUserActivity's webpageURL` doesn't contain `"hoko.link"`. If that's the case, `application:continueUserActivity:restorationHandler:` is then passed to your App Delegate, like it normally would.
