---
title: How to create a smart link?
categories: smartlinks
layout: learning_center
permalink: /:title
description: Creating a smart link involves setting up a set of rules that define what happens in each environment.
---

Creating a smart link involves setting up a set of rules that define what happens in each
environment. Our intelligent *smart link builder* is here to ease the generation of these rules. Go
to your [dashboard](https://hokolinks.com/applications) and select "Smart links" on the side menu.
Then you'll see the "New smart link button":

![smartlink_button](/assets/images/new_smartlink.png)

By entering a single URL, it is able to understand if you are inserting a relative path to your web
platform, a web URL to an external website, or a mobile deep link to a section within your app. At
the same time, it checks if you have any template that matches the inputted URL and loads its
pre-defined rules automatically.

Let’s imagine that your app has a web platform and it’s available for iPhone and Android devices.
Thus, by entering one of the following URLs in the smart link builder:

* A web URL `http://www.your-website.com/products/5` or
* A relative path `/products/5` or
* A deep-link `com.your-app.com://products/5`

It will generate:

* A desktop rule with `http://www.your-website.com/products/5`
* An iPhone rule with `com.your-app.com//products/5`
* An Android rule with `com.your-app.com//products/5`

The smart link builder generates each rule with the default fallback method, that redirects your
users to the app store if your app is not installed at the moment. You can change the default
fallback behavior by creating a template with a custom fallback method. The smart link builder will
detect if there is a template in place and use its rules automatically.

## How to configure the rules?

A rule is a definition for what happens when your smart link is opened in a certain platform. To
create a desktop rule, the only thing you need to define is which web URL to open. To create a
mobile rule, you have to define a normal and a fallback behavior. These determine what will happen
when your user opens the link in a mobile device while having your app installed or not,
respectively.

Normally, with your app installed, the user will be redirected to your app using a deep link URL
path. If your app is not installed, the fallback method is initiated. Thus, a mobile rule always
has a URL and a fallback method associated.

![how_works](/assets/images/deep_linking_process.png "How smart links work.")

### URL path

Depending on the platform, you will have to define a static URL path. In desktop rules, you have to
define full static web URLs, e.g.:

* `http://www.your-site.com/static/path/5` or
* `http://www.facebook.com/hokolinks`.

If you are using a web platform, i.e. any kind of website that you manage, every time you enter a
relative URL path, e.g.`/products/5` the smart link builder will automatically generate a static
URL using your web platform as a prefix, e.g. `http://www.your-site.com/products/5`.

However, if you enter a full URL, then the generated URL will be exactly the same as the one you
have inserted. Again, this URL could be a link to your web platform or any other website in the web.

In mobile rules, you have to define static deep link URLs that follow the schemes present in each
mobile platform, e.g. `com.your-app://products/5`. You can have different deep link URLs for each
mobile platform.

### Fallback

In mobile rules, you have to define the fallback method. This is where your user is going to be
redirected if your app is not installed. Currently, you have three options:

**1.** Redirect the users to the page of your app in the store so they can install your app - as
soon as the app is installed and opened, the user is redirected to the section within your app
where the smart link was initially pointing to (read more about
[deferred deep links](/basic/what-is-a-deferred-deep-link/)).

**2.** Redirect the users to the web URL defined in the desktop rule.

**3.** Redirect the users to a custom static URL in the web.

## How to customize the smart link?

After setting up all the rules, the smart link builder will generate a unique smart link URL that
identifies the rule setup that you have just created. You can then further customize the URL
generated with some options. After that, the process is complete, and you can use or send the
smart link URL to your users.

### Custom URL

The smart link builder generates a unique URL to identify your rules. This URL is a concatenation
of our web domain - or yours, if are using a premium account with custom short domains activated -
followed by a random combination of characters, e.g `http://myapp.hoko.link/ABCD8eF`.

However, you can personalize it and change it to something else more appropriate, as long as the
chosen URL is not being used already and it’s a valid URL path,
e.g. `http://myapp.hoko.link/xmas-campaign`.

### Tags

As you have more and more smart links, it gets harder to find the one link you are looking for.
With the new tagging function, you are able to group smart links by multiple aspects since you can
add multiple tags to any smart link. For example, use the same tag for a specific marketing
campaign’s smart link (“eastercampaign” or “summersale”) and the links with the same marketing goal
("referral" or "reactivate").

![tags](/assets/images/tags.jpg "Smart links with tags.")
