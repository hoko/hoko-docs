---
title: Smart Banners
categories: misc
layout: documentation
permalink: /:categories/:title
description: Add a smart banner to your website
---

Introducing the smart banner, a simple javascript snippet that enables you to bridge your users Web
to App the easy way.

![Smart Banner Demo](/assets/images/smart-banner.jpg)

## Include the banner on your site

To take advantage of the smart banner deep linking capabilities, you just need to login with your
account and navigate to the **Smart banner** menu and follow the instruction given there.

![Smart Banner Snippet](/assets/images/wizard.png)

The given snippet must be included in your `<head>` tag.


We know that you like to design things too. For that we developed a wizard where you can take control
of pretty much every aspect of the banner design.
Just need to login with your account and navigate to the **Smart banner** menu.

One thing to keep in mind is that the banner will stay closed for a period of time if the user clicks in the "close" button.

![Smart Banner Snippet](/assets/images/banner-design.png)

## Manually controll the banner

If you want to take full controll of your banner you can manually show and hide as well as customize it in runtime.

After initializing the script (make sure you have set "Show automatically" to false if you don't want the banner to automatically pop) you can show the banner and hide it when you want.

#### Available methods

| Method                  | Description           |
|:------------------------|:----------------------|
| `hoko.show(options)`    | Show the smart banner |
| `hoko.hide()`           | Hide the smart banner |

#### Available options

| Parameter 				  | Default                       | Description
|:--------------------|:------------------------------|:------------------------------------------------------------------------|
| `auto`              | `true`                        | Automatically show the banner                                           |
| `bgColor`           | `"rgba(255,255,255,0.97)"`    | Banner background color                                                 |
| `buttonBgColor`     | `"#ffffff"`                   | Button background color                                                 |
| `buttonBorderColor`	| `"#0068ff"`                   | Button border color                                                     |
| `buttonText`        | `"Open"`                      | Button text                                                             |
| `buttonTextColor`   | `"#0068ff"`                   | Button text color                                                       |
| `fixedTop`          | `true`                        | Fix banner to the top of the page                                       |
| `nameColor`         | `"#373737"`                   | Application name color                                                  |
| `position`          | `"top"`                       | Position (can be "top" or "bottom")                                     |
| `showAndroid`       | `true`                        | Show banner on an Android browser                                       |
| `showDesktop`       | `false`                       | Show banner on a desktop browser                                        |
| `showiOS`           | `true`                        | Show banner on an iOS browser                                           |
| `text`              | `"Open this page in the app"` | Additional text that appears below the application name                 |
| `textColor`         | `"#373737"`                   | Additional text color                                                   |
| `force`             | `false`                       | Force the banner to show even after the user clicked the "close" button |

#### Example

{% highlight javascript %}
hoko.show({ force: true, buttonText: "View", showAndroid: false })
{% endhighlight %}


## Preserving iOS Safari smart banner capabilities

If you want to preserve the native Apple smart banner functionality, you also need to include the
snippet below, **before** the HOKO smart banner. It will insert the needed meta tag for you and will
generate the correct link for each page visited.

{% highlight html %}
<script type="text/javascript">
  (function(h,l,i,n) {
    i=i+"://__banner?uri="+encodeURIComponent(n);
    h.write("<meta name='apple-itunes-app' content='app-id="+l+", app-argument="+i+"'>");
  })(document,"[STORE_ID]","[URL_SCHEME]",location.pathname);
</script>
{% endhighlight %}

Be careful to replace the **[STORE_ID]** and **[URL_SCHEME]** for your app ones.
