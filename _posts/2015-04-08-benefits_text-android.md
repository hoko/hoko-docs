---
title: Embed in Text Messages
categories:
layout: documentation
permalink: /benefits/android/text
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/text/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

SMS, iMessage, Messaging Apps... allow your users to share content through text channels,
always delivering the best possible experience. Our goal is to be able to drive users straight
to the app once they click on a smart link inside a text message.

![Smart links in text messages](/assets/images/hoko-smart-link.png)

Embedding smart links in messages can be a powerful way
of **promoting your app** with deep linked content. With this in mind, our SDK allows
developers to send messages that will target your app using smart links.

## 1. Embedding smart links in text messages

Let's start by creating a mobile deep link for this item using the `deeplinkWithRoute` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlinkForDeeplink` function.

Finally, we are going to send the message using Android `Intent.ACTION_VIEW`.
In the following snippet we will demonstrate how you can do this in-depth:

{% highlight java %}
// This private method would be called inside your Activity's onCreate()
// method and it's used to setup the share text button to generate a new
// HOKO Smart link when tapped.
private void setupShareTextButton() {
  // R.id.shareTextButton would be the ID you would give to that button
  mShareTextButton = (Button) findViewById(R.id.shareTextButton);

  // Add a click event listener so you know when to ask HOKO to generate
  // your awesome smart links
  mShareTextButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      // OK, button tapped. Let's do this!

      // For this example, we will share a smart link for one product inside
      // the app and, therefore, we will use the route "product/:product_id"
      // for the product deep links.
      //
      // NOTE: Make sure you're already mapping that route before executing
      // the following code, otherwise the smart link generation won't work.

      // Start by creating an HashMap for your deeplink's route parameters
      // and the Deeplink object itself.
      HashMap routeParameters = new HashMap();
      routeParameters.put("product_id", Integer.toString(mProduct.getId()));

      Deeplink productDeeplink = Deeplink.deeplink("product/:product_id", routeParameters);

      // Time to generate a new smart link
      Hoko.deeplinking().generateSmartlink(productDeeplink, new LinkGenerationListener() {
          @Override
          public void onLinkGenerated(String smartlink) {
            // The Smart link was created successfully. Let's send it

            String textBody = "Hey! You should check out this product. I have a feeling that you'll love it. " + smartlink;
            Intent textMessageIntent = new Intent(Intent.ACTION_VIEW);
            textMessageIntent.setType("vnd.android-dir/mms-sms");
            textMessageIntent.putExtra("sms_body", textBody);
            startActivity(textMessageIntent);
          }

          @Override
          public void onError(Exception e) {
            // Oh no! There was an error while trying to generate a
            // new HOKO Smart link.
            System.out.println(e.getMessage());

            // Notify the user that an error occurred.
            displayErrorAlert();
          }
      });
    }
  });
}
{% endhighlight %}

Once the recipient user taps on the smart link, the smart will drive the user to your app
where it will handle the deep link and show the appropriate view. If it's a new user, the smart link
will take the user through the app store to install your app.

## 2. Handle smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

We will take care of everything else. Be sure to check the documentation about
[Route Mapping](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
to know how to handle smart links inside your app.
