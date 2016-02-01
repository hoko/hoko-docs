---
title: Can I skip the preview page?
categories: preview
layout: learning_center
permalink: /:title
description: The preview page it's a fallback mechanism for when Universal Links or App Links don't work.
---

Hiding the preview page would imply disabling the fallback mechanism for when Universal Links or App Links do not work. Disabling this page will leave you with no mechanism to drive users to your app on these occasions:

- Universal Links or App Links are not supported by the app presenting the URL due to an in-app web view, e.g. Twitter, Facebook, Email apps
- The user doesn't have your app installed
- The user manually typed the smart link URL in the browser

However, you can now opt to have a certain template and some of its routes driving users to the app store, skipping the preview page, because you know that these smart links are specific for people without the app.

![Skip preview page](/assets/images/skip-preview.png)

This way when you create a smart link based on the template, e.g. `/invitation/abcdefg123`, the users will be taken to the App Store or the Play Store on iOS 9+ and Android 6+ respectively. Prior versions stay as they were before.

Once the app it's installed, the user will start using Universal Links or App Links, thus not seeing
the preview page when using a smart link.

This will have immediate impact after enabling the option. Both new and old smart links (created manually through the dashboard, API or even lazy smart links) that are based on the template with this option enabled will skip the preview page.
