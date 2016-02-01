---
title: Why do I see the "Cannot open page" popup?
categories: preview
layout: learning_center
permalink: /:title
description: The preview page it's a fallback mechanism for when Universal Links or App Links don't work.
---

Since iOS 9.0 we cannot know if the device has your app installed, so our preview page has to be ready for when the user has your app and when he doesn't.

#### Avoid this popup with smart links that are specific for intalls (e.g. invitation links) and drive users straight to the app store by skipping the preview page. Check our documentation on [how to skip the preview page](http://support.hokolinks.com/can-I-skip-the-preview-page/).

If the user doesn't have your app installed, he taps on `Open App` and because the app it's not installed, he will see popup saying `Cannot Open Page`. This is a very annoying popup from Apple, but at least the user understands that the reason for it, is because he tried to open something that he doesn't have.

![Cannot open page popup](https://s3-eu-west-1.amazonaws.com/hoko-blog/cannot-open-app.jpeg)

At the same time in the background we replace this button with a new one saying, `Install app`. This will take the user to the App Store to install your app. Once the app is installed and open, we will drive the user straight to the deferred content.

One could argue that we could have two buttons in this page, one for each occasion, but the reality is that this only going to happen one time, the first time installing the app. The rest of the times, the user only going to need one button: `Open`. This trick also removes confusion and hesitation because the user may not know if he has the app installed. Which could drive him to the app store by mistake.
