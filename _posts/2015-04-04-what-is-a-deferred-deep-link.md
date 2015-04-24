---
title: What is a deferred deep link?
categories: basic
layout: learning_center
permalink: /:title
description: HOKO deferred deep linking feature is a proprietary technology that allows apps to send users to a specific section within your app, but with the unique characteristic of working also for users that don't have the app installed yet bypassing ...
---

HOKO deferred deep linking feature is a proprietary technology that allows apps to send users to a specific section within your app, but with the unique characteristic of working also for users that don't have the app installed yet bypassing the app store.

###So how does it work?

![URL Scheme](/assets/images/deferred-deep-linking.png)

For people that do not have your app yet, when clicked, the link will take them directly to the App store to download your app. Then, when the user opens the app for the first time, our SDK will look for a "saved" intended action; meaning that the user will experience the deep link as if he just clicked on it, taking him to anywhere within your app, for example a personalised welcome message. In order for the SDK to “save” the intended action, it collects a fingerprint of the user when he clicks on the link: IP, device type, os version,  size of the screen, timezone and language.
  
In the case of actual users, these smart links will work as a normal smart link, sending users directly to the intended section of your app.



