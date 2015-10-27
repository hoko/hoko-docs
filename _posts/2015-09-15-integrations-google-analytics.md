---
title: Google Analytics
categories: integrations
layout: documentation
permalink: /:categories/:title
description: Connect HOKO with Google Analytics.
---

Google Analytics is a freemium web analytics service offered by Google that tracks and reports
website and mobile apps traffic. You should use a Google Analytics for Mobile Apps account and thei
SDK, available for iOS and Android, to track your app's usage.

HOKO data are sent to Google Analytics in real-time (from milliseconds to a couple of seconds) where
you
can then use Google Analytics's Dashboard to perform business analytics operations such as
segmentation
and attribution. However, Google may take 12 to 24h to process HOKO data.

## Events

If you are including <a href="https://developers.google.com/analytics/devguides/collection/ios/v3/">
Google Analytics for iOS</a> in your App, you are going to see Google Analytics related data, such
as screen sizes, devices, which views were open and other.

However, what you are not going to see is data related with HOKO. After activating this integration,
HOKO data are processed and sent to the `Events` section of your Google Analytics' Dashboard.

Here, you will find the events triggered by your smart links, i.e., which smart links were clicked,
opened or deferred and which ones led to installs. You will also find which mobile deep link routes
were followed by the smart links.

![Kissmetrics segmentation](/assets/images/google_analytics.png)
