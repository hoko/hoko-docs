---
title: Coupons
categories:
layout: documentation
permalink: /benefits/android/coupons
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/coupons/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Create coupons that can be reused throughout the mobile and desktop arena
seamlessly. All you need to do is create a smart link with metadata, prepare you app to handle
coupons and share the link. We will take care of driving both new users and current users directly
to your app, even if they need to go through the app store in between.

![Coupons](/assets/images/use-case-coupon.png)

Inside your app, the SDK will delegate the coupon so you can presented it to the user.
You can view this use case in-depth in a sample app provided here.

<a href="https://github.com/hokolinks/HOKOstore" class="btn-next" target="_blank">Sample app with coupons (Swift) &#8594;</a>

## Step 1: Creating the smart link for the coupon

Let's keep it simple and say that is a seasonally discount, e.g. cyber Monday. Thus, we must create the smart link and add the necessary metadata. You can either create the smart link through the dashboard or through the SDK. For the sake of simplicity, we are creating the link through the dashboard like so:

<iframe width="630" height="450" src="https://www.youtube.com/embed/fpesz5VhrS0" frameborder="0" allowfullscreen></iframe>

## Step 2: Prepare your app to handle the coupon

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

## Step 3: (Optional) Limit the number of redeems

In use cases like coupons, we want to control the access to the metadata. You can define
how many times your users can redeem the metadata through the `Dashboard` under `Redeem limit` when
editing the smart link. Hence, we guarantee that the coupon is only going to be redeemed the right
amount of times.

![Redeem limit](/assets/images/redeem-limit.png)

### More information

Need to know more about these subjects? Check the following pages for more information:

- [Mapping routes with callbacks](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
- [Generating smart links](http://support.hokolinks.com/android/android-deeplinking/#smart-link-generation)
- [Smart links with Metadata](http://support.hokolinks.com/android/android-deeplinking/#metadata)
