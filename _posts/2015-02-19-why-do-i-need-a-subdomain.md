---
title: Why do I need a subdomain?
categories: advanced
layout: learning_center
permalink: /:title
description: Subdomains allow us to enclosure your app’s smart links and configuration files in one place.
---

When you are creating an app, you will need to choose a unique subdomain name. This is necessary
because behind the scenes we perform a series of operations that enable us to enclosure smart
links and configuration files that concern each app.

SCREENSHOT OF THE POPUP

This segmentation allows us to individually generate, host and authenticate the necessary
configuration files for each app and enable the
underlying [Apple’s Universal Links](/PATH/APPLE/UNIVERSALLINKS) and
[Google’s App Links](/PATH/GOOGLE APP LINKS) mechanisms.

Furthermore, subdomains provides you with a small branding label on every smart link that
you generate, e.g. `http://black-is-the-new-app.hoko.link/TCw1RoX`. With this branding your
readers will quickly identify your company and thus have a more personalized experience.

You can take this customization further and completely re-brand your smart links with your own
domain name, e.g. `http://blackapp.link/TCw1RoX`. All you need to do is to setup a
[custom domain](/setting-up-a-custom-domain/) and add your domain name in the settings section.

<a href="http://support.hokolinks.com/setting-up-a-custom-domain/" class="btn-next">Re-brand your smart links with a custom domain &#8594;</a>

# Name requirements

For a subdomain name to be valid, it needs to follow a series of rules:

**1.** Must have between 1 and 20 characters

**2.** Can contain letters, numbers, hyphens and underscores, e.g. black_app-01

**3.** Must not begin or end with a hyphen or underscore

**4.** Must not contain consecutive hyphens or underscores, e.g. black___app (it’s ugly)

