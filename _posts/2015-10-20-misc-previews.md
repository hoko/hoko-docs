---
title: Smart Links Preview
categories: misc
layout: documentation
permalink: /:categories/:title
description: Configure the preview page of your smart links
---

Preview pages are shown whenever a Universal or App Link doesn’t work, i.e. on apps that use in-app web views, manually entering the smart link URL or when your app is not installed on the user's device. These pages provide a preview of what the link points to and
from there you can open the content in the app or see it online.

![Smart Link Preview](/assets/images/smart-link-preview.png)

## Preview content based on your web site

For each smart link, the standard preview template displays content scraped from the link's
desktop web page. HOKO crawler looks for the following meta-tags:

| Meta-tag                                                  | Label            |
|:----------------------------------------------------------|:-----------------|
| `title` or `og:title` or `twitter:title`                  | Page title       |
| `description` or `og:description` or `twitter:description`| Page description |
| `image` or `og:image` or `twitter:image`                  | Cover image      |

If the deskop web page has these meta-tags, the preview page will display its content. If you don’t
have a web platform configured or if your web site doesn’t have the necessary meta
tags we will display a simple redirecting page, only with the action buttons.

![Simple preview page when meta-tags are not available](/assets/images/smart-link-preview-light.png)

## Change the preview page template or content

We currently have two templates: standard (with image, description, and title) and light (only with
the action buttons). By default, our platform automatically chooses the standard template if your
web site has the mandatory meta-tags.

Nevertheless, you can override this mechanism and force a specific template or content.
That is, you can
choose to always display the light template over the standard one, or vice-versa. You can even,
choose the standard template and override some of the fields.

For example, if you don't have a web platform but still want to display the standard template,
just choose this template and define each property manually.

![Preview editor](/assets/images/preview-editor.png)

You can change your template back to auto selection at any time. You can set of all of
these options, under `Preview` within the dashboard.
