---
title: What is a template?
categories: templates
layout: learning_center
permalink: /:title
description: A template is a set of rules that are grouped together because they share a common configuration.
---

The purpose of a template is to ease the creation of smart links by automatically setting up the rules of links that follow a URL pattern.

For example, let’s imagine that your app has a product view section. You will several need deep link URLs such as the following:

`com.app://products/154`

At the same time, you want your web platform, e.g. an e-commerce website, acting as a fallback using this web URL:

`http://www.your-site.com/products/154`

As you can see, there is a pattern in the both of these URLs: `products/` followed by an `id`.

In addition, you want have the same set of rules and fallbacks for URLs that follow this pattern but have a different id.

Templates are here to ease these common situations. A template is nothing else than a set of rules that are grouped together because they share a common configuration. Hence, saving you time when you manually create smart links using the dashboard or through our API.

<a href="http://support.hokolinks.com/how-to-configure-a-template/" class="btn-next">How to configure a template &#8594;</a>
