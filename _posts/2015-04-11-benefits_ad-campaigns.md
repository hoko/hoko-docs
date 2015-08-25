---
title: Ad Campaigns
categories: benefits
layout: documentation
permalink: /:categories/ad-campaigns
description: HOKO works perfectly as both reengagement and acquisition campaigns due to the nature of how smart links work (with and without the app installed).
---

## Using AdMob Campaigns

HOKO works perfectly as both reengagement and acquisition campaigns due to the nature of how smart links work (with and without the app installed).

In order to fulfill an ad network campaign all that is required is for the campaign link to be a HOKO smart link (e.g. http://app.hoko.link/adcampaign) instead of the link to the AppStore. To do this go to your **Admob Dashboard** (https://apps.admob.com), go to **Promote**, click on **Create New Campaign** and follow the steps below.

![](/assets/images/ios-admob-step-1.png)

After selecting the app of which you want to create a new campaign, select either a text or an image ad, we'll select the text option for demonstration purposes.

![](/assets/images/ios-admob-step-2.png)

When clicking either of them, a special input box referring the **Destination URL** will be among them and instead of setting it to the default (the application's AppStore URL) you can set it to a HOKO smart link which will lead your users not only to download your app but also to a specific content inside of it, regardless if they need to install it and open it, or just opening the content directly if they have the app already.

## Using Facebook Ad Campaigns

Aside from AdMob, HOKO also works with Facebook Ad campaigns, both reengagement and acquisition. This is due to the fact that smart links can be opened regardless of the app being already installed or not.

Since HOKO's smart links implement the **AppLinks** standard from Facebook your users will always get to content of the ad campaign without any issues.

To setup a new campaign you can go to Facebook's Ads Manager (https://www.facebook.com/ads/manager/) and click **Create Advert** to create a new advertising campaign.

![](/assets/images/ios-facebook-step-1.png)

After clicking, you will be presented with a choice of a template for your campaign, in which, for an app, you either click **Get installs of your app** (for user acquisition) or **Increase engagement in your app** (for reengagement), and then you can select your app. For demonstration purposes we'll go with the latter but the following steps work on both templates.

![](/assets/images/ios-facebook-step-2.png)

You will now be presented a web page in which you can do a few things, define your ad campaign's audience, set how much you want to spend on the campaign (per day, or lifetime) and finally create the ad itself. In here, aside from defining how it looks like visually, you can also set a **Deep Link**. This text field is where the HOKO smart link comes in, you can set it to something like http://app.hoko.link/adcampaign and it will take your users to the app content if they have it or to the AppStore to install the app (which in turn will trigger a deferred deep link so they can still go to the content they clicked on the Facebook Ad).
