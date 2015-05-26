---
title: How to create a smart link?
categories: advanced
layout: learning_center
permalink: /:categories/:title
description: Creating a smart link involves setting up a set of rules that define what happens in each environment.
---

> Smart links are links that contain certain form of intelligence that allows the link to take the user into different paths depending on the environment where the link is opened, thus making the user move forward without breaking its experience.

> [What is a smart link?](/basic/what-is-a-smart-link)

Creating a smart link involves setting up a set of rules that define what happens in each environment. Our intelligent *smart link builder* is here to ease the generation of these rules.

By entering a URL, it is able to understand if you are inserting a relative path to your web platform, a hyperlink to an external website, or a mobile deep link to a section within your app. At the same time, it checks to see if you have any template that matches the inputted URL and loads its pre-defined rules automatically.

Thus, by entering:

* `http://www.your-website.com/products/5`
* or `/products/5`
* or `com.your-app.com:/products/5`

It will generate:

* `http://www.your-website.com/products/5`
* `com.your-app.com/products/5`
* `com.your-app.com/products/5

> Tip: You can use a URL to your web platform or to an external domain, e.g., http://www.facebook.com/
