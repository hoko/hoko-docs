---
title: Coupons
categories:
layout: documentation
permalink: /benefits/android/coupons
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/coupons/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Digital Coupons & Discounts are an excellent way of advertising on a low marketing budget.
This marketing and sales hook, will enable you to sell more products and faster, besides
promoting customer loyalty. On the other hand, it's also a great tool to increase brand
awareness and drive traffic to your app.

HOKO allows you create coupons links that can be reused throughout the mobile and desktop arena
seamlessly. All you need to do is create a smart link with metadata,
prepare you app to handle coupons and share the link.

We will take care of driving both new users and current users directly to your app, even if they
need to go through the app store in between. Inside the app we will delegate the coupon so you can
presented it to the user.

![Coupons](/assets/images/use-case-coupon.png)

As soon as your app is ready to handle any kind of coupons, you can focus only on creating and
sharing their links. We provide you with a sample app that demonstrates what we are going to discuss
here in-depth.

<a href="https://github.com/hokolinks/HOKOStore-Android" class="btn-next" target="_blank">Demo app using coupons (Android) &#8594;</a>

## 1. Creating the smart link for the coupon

Let's keep it simple and say that is a seasonally discount, e.g. cyber Monday. Thus, we must create the smart link and add the necessary metadata. You can either create the smart link through the dashboard or through the SDK. For the sake of simplicity, we are creating the link through the dashboard like so:

<iframe width="630" height="450" src="https://www.youtube.com/embed/fpesz5VhrS0" frameborder="0" allowfullscreen></iframe>

## 2. Prepare your app to handle the coupon

The following snippet depicts how our SDK delegates the coupon to your app, so you can then
do whatever you think it's best. In this simple example, we are just going to display a success
popup.

{% highlight java %}
// First you need to use the @DeeplinkRoute annotation in your Activities that
// will tell the SDK which Activity should be started when a deep link,
// that matches the route given in the parameters, is opened.
// In this case, we will use "product/:product_id".
@DeeplinkRoute("product/:product_id")
public class MyProductActivity extends Activity {
    // This variable will automatically receive the deep link's
    // metadata when a smart link is opened.
    @DeeplinkMetadata
    public JSONObject metadata;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // We need to check whether this Activity was started via a HOKO smart
        // link or manually. To do that, we call the 'inject()' method.
        // If that returns false, it means that this Activity was
        // not called through a smart link.
        if (!Hoko.deeplinking().inject(this)) {
            // Your code here to process the Activity

        } else {
            // This block of code will _only_ be executed if a smart link
            // was opened.
            //
            // We will check if the deep link contains any metadata
            if (this.metadata != null) {
                // Get the coupon name from the metadata
                String couponName = metadata.optString("coupon");

                // Get coupon discount from the metadata
                double couponDiscount = metadata.optDouble("value");

                // We assume that if we can retrieve the coupon name
                // from the deep link's metadata, there's a real
                // coupon available
                if (couponName != null) {
                    System.out.println(
                        "Successfully redeemed the coupon '"
                                  + couponName
                                  + "' and received a discount of $"
                                  + couponDiscount
                    );
                }

              // Your code here to process the Activity, whether there
              // was a coupon in the deep link's metadata or not
            }
        }
    }
}
{% endhighlight %}

If everything goes well, you should see the message `Successfully redeemed the coupon` when your
app is launched.

<a href="http://support.hokolinks.com/android/android-deeplinking/#metadata" class="btn-next">Metadata documentation &#8594;</a>

## 3. (Optional) Limit the number of redeems

As an added bonus, HOKO allows you to set a limit on how many times your users can access or redeem
the coupon. Please check our
[metadata](http://support.hokolinks.com/android/android-deeplinking/#metadata) documentation to learn more.
