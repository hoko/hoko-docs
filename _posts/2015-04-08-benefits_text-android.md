---
title: Embed in Text Messages
categories:
layout: documentation
permalink: /benefits/android/text
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/text/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Our goal is to be able to drive users straight
to the app once they tap on a smart link inside a text message. Keep in mind that it's up to the
OS to render the message with a clickable hyperlink. Some messaging apps on Android don't render
hyperlinks. In those cases you should consider sending e-mails instead.

![Smart links in text messages](/assets/images/hoko-smart-link.png)

We are going to achieve this by building the message with an embedded smart link. Your app is going
to facilitate this using our SDK and react when the message is sent.

## Step 1: Embedding smart links in text messages

Let's start by creating a mobile deep link for this item using the `deeplinkWithRoute` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlinkForDeeplink` function.

Finally, we are going to send the message using Android `Intent.ACTION_VIEW`.

{% highlight java %}
private void setupShareTextButton() {
  // R.id.shareTextButton would be the ID you would give to that button
  mShareTextButton = (Button) findViewById(R.id.shareTextButton);

  // Add a click event listener to send the message
  mShareTextButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      HashMap routeParameters = new HashMap();
      routeParameters.put("product_id", Integer.toString(mProduct.getId()));

      Deeplink productDeeplink = Deeplink.deeplink("product/:product_id", routeParameters);

      // Time to generate a new smart link
      Hoko.deeplinking().generateSmartlink(productDeeplink, new LinkGenerationListener() {
          @Override
          public void onLinkGenerated(String smartlink) {
            // Build the SMS
            String textBody = "Hey! You should check out this product. I have a feeling that you'll love it. " + smartlink;
            Intent textMessageIntent = new Intent(Intent.ACTION_VIEW);
            textMessageIntent.setType("vnd.android-dir/mms-sms");
            textMessageIntent.putExtra("sms_body", textBody);

            // Present the messaging controller
            startActivity(textMessageIntent);
          }

          @Override
          public void onError(Exception e) {
            System.out.println(e.getMessage());
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

## Step 2: Handling smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

#### Route mapping with annotations

One way to start mapping your routes with HOKO is to use our simple and straightforward
annotations at the beginning of your `Activities` and `Fragments`.

{% highlight java %}
@DeeplinkRoute("products/:product_id")
public class ProductActivity extends Activity {

  @DeeplinkRouteParameter("product_id")
  private int mProductId;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    mProductId = getIntent().getIntExtra("product_id", 0);

    // Do something when deeplink is opened
  }
}
{% endhighlight %}

#### Route mapping without annotations

If you wish to manage the deep linking mapping logic manually, all you have to do is to map each
route with `Hoko.deeplinking().mapRoute()` and a `DeeplinkCallback` callback object.

{% highlight java %}
Hoko.deeplinking().mapRoute("products/:product_id", new DeeplinkCallback() {
  @Override
  public void deeplinkOpened(Deeplink deeplink) {
    String productId = deeplink.getRouteParameters().get("product_id");

    // Start the activity to show the item
  }
})
{% endhighlight %}

You can find more information about
[Route Mapping](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
in the documentation.

### More information

Need to know more about this? You can find more information in the following pages:

- [Mapping routes with callbacks](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
- [Generating smart links](http://support.hokolinks.com/android/android-deeplinking/#smart-link-generation)
- [Utilities](http://support.hokolinks.com/android/android-utilities/)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
