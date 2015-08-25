---
title: Coupons
categories:
layout: documentation
permalink: /benefits/android/coupons
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/coupons/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

One way to take advantage of HOKO is by embedding your own **coupons or discounts** on your links. To do this, start by creating a new smart link and adding a new `metadata` entry to it, like the following:

{% highlight json %}
{
  "coupon": "save20",
  "value": "20"
}
{% endhighlight %}


After doing that, your link is fully ready to transmit metadata to your users. The following code shows how you can put this into practice with a very simple and straightforward example that explains how you can decode and access the coupon's data and log a simple message to the console with the information you want:


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
{% endhighlight %}

<a href="https://github.com/hokolinks/HOKOStore-Android" class="btn-next" target="_blank">Demo app using coupons &#8594;</a>
