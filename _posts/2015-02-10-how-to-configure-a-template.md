---
title: How to configure a template?
categories: templates
layout: learning_center
permalink: /:title
description: For each available platform choose the appropriate route URL and its fallback.
---

Templates use a special kind of URLs called *routes*.  Routes are created by the SDK based on the deep links schemas that your app uses. Routes' URLs have variables that define the expressions that vary in each URL. These expressions are defined by a `:` followed by a `keyword`.

When creating a template you will have to configure a route for every available platform. Doing so you will have to set the default URL and fallback.

For example, let's assume that we created a template named *"Product View"* with following routes:

**1.** A desktop route with `http://www.your-website.com/products/:id`.

**2.** A mobile route with `com.your-app://mobile/products/:id` and its fallback method set to *"web URL"*.

Later, you enter a URL in the smart link builder that follows a pattern like this one:

* `http://www.your-website.com/products/5` or
* `/products/5` or
* `com.your-app://mobile/products/5`

The smart link builder will match any of these links with the "Product View" template and generate all the rules as follows:

* A desktop rule with `http://www.your-website.com/products/5`.
* A mobile rule with `com.your-app://mobile/products/5` and its fallback method set to open the URL of the desktop rule.

> Tip: In this case, you would have to code a route in your app using our SDK with the following pattern: `com.your-app://mobile/products/:id`
