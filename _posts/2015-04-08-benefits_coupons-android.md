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
do whatever you think it's best. In this simple example, we are just going to display a
popup with a success message.

{% highlight java %}
@DeeplinkRoute("product/:product_id")
public class MyProductActivity extends Activity {
    // Inject the smart link metadata into this variable
    @DeeplinkMetadata
    public JSONObject metadata;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Was this Activity started manually or through a smart link?
        if (!Hoko.deeplinking().inject(this)) {
            // If it was manually called
        } else {
            // Check if the smart link opened has any medatada
            if (this.metadata != null) {
                // Get the coupon name from the metadata
                String couponName = metadata.optString("coupon");

                // Get coupon discount from the metadata
                double couponDiscount = metadata.optDouble("value");

                if (couponName != null) {
                    System.out.println(
                        "Successfully redeemed the coupon '"
                                  + couponName
                                  + "' and received a discount of $"
                                  + couponDiscount
                    );
                }
            }

            // Do something when there is no metadata
        }
    }
}
{% endhighlight %}

Notice the `@DeeplinkRoute` annotation that will tell our SDK that this Activity
should be started when a deep link that matches the route given is opened, i.e.
`product/:product_id`. Next we use the `@DeeplinkMetadata` to inject any metadata present in
the smart link into the variable.

When the Activity starts we must check if it was started by a smart link or manually. To know this,
we call the `inject()` method that returns `true` if this Activity was called through a
smart link.

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

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
