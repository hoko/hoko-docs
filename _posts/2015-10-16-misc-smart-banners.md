---
title: Smart Banners
categories: misc
layout: documentation
permalink: /:categories/:title
description: Add a smart banner to your website
---

Introducing the smart banner, a simple javascript snippet that enables you to bridge your users Web
to App, the easy way.

![Smart Banner Demo](/assets/images/smart-banner.jpg)

## Include the banner to your site

To take advantage of the smart banner deep linking capabilities, you just need to login with your
account and navigate to the **Smart banner** menu and follow the instruction given there.

![Smart Banner Snippet](/assets/images/wizard.png)

## Customizing the look and feel

We know that you like to design things too. For that we developed a wizard where you can take control
of pretty much every aspect of the banner design.
Just need to login with your account and navigate to the **Smart banner** menu.

![Smart Banner Snippet](/assets/images/banner-design.png)

#### Default values

| Options                     | Default                                                            |
|:----------------------------|:-------------------------------------------------------------------|
| Text                        | Open this page in the app                                          |
| Button text                 | Open                                                               |
| Position                    | top                                                                |
| Fixed                       | true                                                               |
| Background color            | rgba(255,255,255,0.97)                                             |
| App name color              | #373737                                                            |
| Text color                  | #373737                                                            |
| Button background color     | #ffffff                                                            |
| Button border color         | #0068ff                                                            |
| Button text color           | #0068ff                                                            |
| Show on Android             | true                                                               |
| Show on iOS                 | true                                                               |
| Show on Desktop             | false                                                              |
| Show Automatically          | true                                                               |

#### Available methods

| Method                        | Description                                                        |
|:------------------------------|:-------------------------------------------------------------------|
| ```hoko.show()```             | Show the smart banner                                              |
| ```hoko.show({force:true})``` | Force the smart banner show, even when the cookie is set to hidden |
| ```hoko.hide()```             | Hide the smart banner                                              |


## Preserving Apple smart banner capabilities

If you want to preserve the native Apple smart banner functionality, you also need to include the
snippet below, **before** the HOKO smart banner.

{% highlight html %}
<script type="text/javascript">
  (function(h,l,i,n) {
    i=i+"://__banner?uri="+encodeURIComponent(n);
    h.write("<meta name='apple-itunes-app' content='app-id="+l+", app-argument="+i+"'>");
  })(document,"[STORE_ID]","[URL_SCHEME]",location.pathname);
</script>
{% endhighlight %}

Be careful to replace the **[STORE_ID]** and **[URL_SCHEME]** for your app ones.
