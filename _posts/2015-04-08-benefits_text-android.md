---
title: Embed in Text Messages
categories:
layout: documentation
permalink: /benefits/android/text
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/text/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Besides sharing content on social networks, your users can also do it trough text messages (regular sms or chat messaging). Embedding HOKO's smart links in messages can be a powerful way of **promoting your app**, with deep linked content. With this in mind, our SDK allows the developers to do it quickly. Your smart text messages will be up and running in no time.

In the following code section, we will show you how to do it.

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
