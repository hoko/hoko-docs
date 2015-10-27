---
title: Kissmetrics
categories: integrations
layout: documentation
permalink: /:categories/:title
description: Connect HOKO with Kissmetrics.
---

Kissmetrics provides visualization tools on how users interact with their site, web apps, and mobile products. It collects and shows customers acquisition data for each user.

HOKO data are sent to Kissmetrics in real-time (from milliseconds to a couple of seconds) where you
can then use Kissmetrics's Dashboard to perform business analytics operations such as segmentation
and attribution.

## Metrics

Metrics allows you to extrapolate information based on your HOKO data through different dimensions.
An event type and an event property, such as platform, route or country code, define a dimension.

For instance, you can create a metric to tell you the number of clicks. Add a new `Number of Times
Event Happened` metric and choose the event `Click`. You can then segment your data by `platform`
by choosing this property in the `By Property` section.

![Kissmetrics segmentation](/assets/images/kissmetrics_metric.png)

Every time that an event occurs in our system we populate its properties and forward it Kissmetrics.
You can follow the incoming flow of your events in real-time in the `Live` section.

![Kissmetrics live view](/assets/images/kissmetrics_live.png)

## People (Work-In-Progress)

We are currently working on ways to uniquely identify users across events. For the moment, each
event receives a random user identifier. But soon, each event will receive a unique user identifier
that is going to be shared on multiple events. Hence, you will be able to depict the flow of a user
from click to install because both events will have the same user id.
