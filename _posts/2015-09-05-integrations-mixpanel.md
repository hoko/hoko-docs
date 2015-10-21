---
title: Mixpanel
categories: integrations
layout: documentation
permalink: /:categories/:title
description: Connect HOKO with Mixpanel.
---

Mixpanel is a business analytics service and company. It tracks user interactions with web and
mobile applications and offers tools for targeted communication with them. Collected data is used to
build custom reports and measure user engagement and retention.

HOKO data are sent to Mixpanel in real-time (from milliseconds to a couple of seconds) where you can
then use Mixpanel's Dashboard to perform business analytics operations such as segmentation and
attribution.

## Metrics

Segmentation allows you to categorize your HOKO data by different dimensions. An event type and an
event property, such as platform, route or country code, define a dimension.

For instance, in the Segmentation section you can choose the event `Click
and segment by `platform. In the chart type choose `Pie` and you will obtain a pie chart with the
ratio of smart links clicks by platform.

![Mixpanel segmentation](/assets/images/mixpanel_piecharts.png)

Every time that an event occurs in our system we populate its properties and forward it Mixpanel.
You can follow the incoming flow of your events in real-time in the `Live view` section.

![Mixpanel live view](/assets/images/mixpanel_live_view.png)

## People (Work-In-Progress)

We are currently working on ways to uniquely identify users across events. For the moment, each
event receives a random user identifier. But soon, each event will receive a unique user identifier
that is going to be shared on multiple events. Hence, you will be able to depict the flow of a user
from click to install because both events will have the same user id.
