---
title: Why do I see a preview page?
categories: preview
layout: learning_center
permalink: /:title
description: The preview page it's a fallback mechanism for when Universal Links or App Links don't work.
---

HOKO relies on technology provided by Apple and Google to drive users to your app seamlessly: Universal Links and App links respectively.

The `preview page` it’s a fallback page for when Universal Links or App Links don't work because they are not supported by app that displays the link (e.g. Twitter, Facebook, E-mail apps) or your own app, or simply
because your app is not yet installed.

![Smart Link Preview](/assets/images/smart-link-preview.png)

Another common cause to see the preview page, it's when you manually type the smart link URL in Safari or Chrome. Apple and Google believe that if a user types the URL it's because he wants to go to the website version of the link, which in our case, leads to the preview page.

The third most common cause it's when you, after tapping on a smart link, click on the top right corner shortcut (> hoko.link), displayed on top the battery status of your iOS 9 device.

Apple assumes that if the user clicks in this link, it's because the he prefers the web version, and from this point onwards, Universal Links will suddenly stop working for your app on your device.

Quickly debug this by adding a note in your Notes App with a smart link URL. Then, tap-and-hold on the link until you see a menu with `Open in <YourApp>`. Use this option to re-activate Universal Links for your app and your device.

Unfortunately we cannot override this behavior; hence we display the preview page as a fallback mechanism. If this option is not available, then it's because your app doesn't have Universal Links correctly configured. Use this [troubleshoot guide](http://support.hokolinks.com/ios/universal-links/#troubleshooting) to solve the problem.
