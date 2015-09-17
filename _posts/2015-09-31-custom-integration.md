---
title: Custom integration
categories: integrations
layout: documentation
permalink: /:categories/:title
description: Connect HOKO with your custom back-end.
---

This is a special kind of integration that connects HOKO with your personal back-end. This can be very useful if you rather want to use your own system to track and explore your data than a third-party service.

Connecting HOKO with your system is very easy. All you need to provide us is the URL endpoints, also known as *webhooks*, for each type of event that we currently generate. Each URL will receive by POST the corresponding events in JSON messages.

An event message is composed by different attributes such as the corresponding smart link, the device that clicked the smart link, the date when the event occurred and so on.

![Event metadata](/assets/images/event_message.png)

You can then use these events and metadata to create the custom analytics in your back-end.

