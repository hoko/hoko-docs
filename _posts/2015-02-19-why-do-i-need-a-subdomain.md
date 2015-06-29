---
title: Why do I need a subdomain?
categories: advanced
layout: learning_center
permalink: /:title
description: Subdomains allow us to enclosure your app’s smart links and configuration files in one place.
---

Behind the scenes we perform a series of operations that enable us to enclosure smart links and configuration files that concern each app. For example, for each subdomain we generate, host and authenticate the necessary configuration files to enable the underlying Apple’s Universal Links and Google’s App Links mechanisms. Each app has it own files, thus we need to separate them individually.

<a href="http://support.hokolinks.com/" class="btn-next">Read more about Apple's and Google's mobile deep linking standards &#8594;</a>

# Name requirements

For a subdomain name to be valid, it needs to follow a series of rules:

**1.** Must have between 1 and 20 characters

**2.** Can contain letters, numbers, hyphens and underscores, e.g. black_app-01

**3.** Must not begin or end with a hyphen or underscore

**4.** Must not contain consecutive hyphens or underscores, e.g. black___app (it’s ugly)

