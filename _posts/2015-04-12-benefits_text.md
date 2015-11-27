---
title: Embed in Text Messages
categories: benefits
layout: documentation
permalink: /:categories/ios/text
description: Besides sharing content on social networks, your users can also do it through text messages (regular sms or chat messaging).
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/text/" class="tab">Android</a>

Our goal is to be able to drive users straight
to the app once they tap on a smart link inside a text message. Keep in mind that it's up to the
OS to render the message with a clickable hyperlink.

![Smart links in text messages](/assets/images/hoko-smart-link.png)

We are going to achieve this by building the message with an embedded smart link. Your app is going
to facilitate this using our SDK and react when the message is sent.

## Step 1: Embedding smart links in text messages

Let's start by creating a mobile deep link for this item using the `deeplinkWithRoute` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlinkForDeeplink` function.

Finally, we are going to send the message using iOS `MFMessageComposeViewController`. Once the
message it's sent we can react to the outcome of this action by delegating
`messageComposeViewController:didFinishWithResult` to our controller.

{% highlight objective-c %}
#import <Hoko/Hoko.h>

// Import iOS messaging library
#import <MessageUI/MessageUI.h>

// Delegate MFMessageComposeViewControllerDelegate
@interface YourViewController () <MFMessageComposeViewControllerDelegate>
@end

...

- (IBAction)shareSMSButtonTapped:(id)sender {
  // Check if the device supports SMS
  if ([MFMessageComposeViewController canSendText]) {
    NSString *productID = [NSString stringWithFormat:@"%li", self.currentProduct.uniqueID];
    HOKDeeplink *productDeeplink = [HOKDeeplink deeplinkWithRoute:@"product/:product_id"
                                                  routeParameters:@{@"product_id": productID}];

     // Create the smart link based on the deep link
    [[Hoko deeplinking] generateSmartlinkForDeeplink:productDeeplink success:^(NSString *smartlink) {

      // Build the SMS
      MFMessageComposeViewController *controller = [[MFMessageComposeViewController alloc] init];
      controller.body = [NSString stringWithFormat:@"Hey! You should check out this product. I have a feeling that you'll love it. %@", smartlink];
      controller.messageComposeDelegate = self;

      // Present the messaging controller
      [self presentViewController:controller animated:YES completion:nil];

    } failure:^(NSError *error) {
      NSLog(@"%@", error.description);
      [self displayErrorAlert];
    }];
  } else {
    // Bummer... Looks like the device does not support SMS
  }
}
{% endhighlight %}

{% highlight swift %}
// First step: To work with SMS, you will need to import the MessageUI framework
import MessageUI

. . .

@IBAction func shareSMSButtonTapped(sender: AnyObject) {
  // Before actually sending the message, we need to check if the device
  // supports SMS
  if MFMessageComposeViewController.canSendText() {
    // Cool, we're good to go!

    // For this example, we will share a smart link for one product inside
    // the app and, therefore, we will use the route "product/:product_id"
    // for the product deep links.
    //
    // NOTE: Make sure you're already mapping that route (in your
    // AppDelegate.swift, for instance) before executing the following code,
    // otherwise the smart link generation won't work.
    let productID = String(currentProduct.uniqueID)
    let productDeeplink = HOKDeeplink(route: "product/:product_id", routeParameters: ["product_id": productID])

    Hoko.deeplinking().generateSmartlinkForDeeplink(productDeeplink, success: { smartlink in
      // The Smart link was generated successfully. Let's send it

      let controller = MFMessageComposeViewController()
      controller.body = "Hey! You should check out this product. I have a feeling that you'll love it. \(smartlink)"
      controller.messageComposeDelegate = self
      self.presentViewController(controller, animated: true, completion: nil)

    }) { error in
      // Oh no! There was an error while trying to generate a
      // new HOKO Smart link.
      println(error.description)

      // Notify the user that an error occurred.
      self.displayErrorAlert()
    }
  } else {
    // Bummer... Looks like the device does not support SMS
  }
}
{% endhighlight %}

Sending a message is delegated to the OS, but your app must implement the
`MFMessageComposeViewController`
to support the different outcomes.

{% highlight objective-c %}
// Final step: implement the MFMessageComposeViewController delegate method
- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result {
  switch (result) {
    case MessageComposeResultSent:
      // The SMS was successfully sent
      break;

    case MessageComposeResultCancelled:
      // Looks like the user cancelled the SMS
      break;

    default:
      // Failed sending a message
      break;
  }

  // Dismiss the SMS view controller so the user gets back to your app
  [controller dismissViewControllerAnimated:YES completion:nil];
}
{% endhighlight %}

{% highlight swift %}
// Final step: implement the MFMessageComposeViewController delegate method
extension YourViewController: MFMessageComposeViewControllerDelegate {
  func messageComposeViewController(controller: MFMessageComposeViewController, didFinishWithResult result: MessageComposeResult) {
    switch (result.rawValue) {
    case MessageComposeResultSent.rawValue:
      // The SMS was successfully sent
      break

    case MessageComposeResultCancelled.rawValue:
      // Looks like the user cancelled the SMS
      break

    default:
      // Failed sending a message
      break
    }

    // Dismiss the SMS view controller so the user gets back to your app
    controller.dismissViewControllerAnimated(true, completion: nil)
  }
}
{% endhighlight %}

Once the recipient user taps on the smart link, the smart will drive the user to your app
where it will handle the deep link and show the appropriate view. If it's a new user, the smart link
will take the user through the app store to install your app.

## Step 2: Handling smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to
support.

Map routes using the deep linking module's `mapRoute:toTarget` method
inside the `application:didFinishLaunchingWithOptions:` of your application `AppDelegate` subclass.

{% highlight objective-c %}
[[Hoko deeplinking] mapRoute:@"products/:product_id"
                    toTarget:^(HOKDeeplink *deeplink) {
  NSString* productId = deeplink.routeParameters[@"product_id"];

  // Do something when deeplink is opened
}];
{% endhighlight %}

{% highlight swift %}
Hoko.deeplinking().mapRoute("products/:product_id", toTarget: {
  (deeplink: HOKDeeplink) -> Void in
    if let productId = deeplink.routeParameters?["product_id"] {
      // Do something when deep link is opened
    }
})
{% endhighlight %}

This will map a `products/:product_id` route to an executable `target` block that
will always be executed when a deep link matching the route is opened in the user's device,
e.g. opening `hoko://products/amazing-case`. You can find more information about
[Route Mapping](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping) in the
documentation.

Further more, we provide utility methods to help you handling smart links, like presenting the
correct view or setting the root view, based on the route parameters, query parameters or metadata.
Check the documentation about [Deeplink Utilities](http://support.hokolinks.com/ios/ios-utilities/)
to know more.

### More information

Need to know more about this? You can find more information in the following pages:

- [Mapping routes with callbacks](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping)
- [Generating smart links](http://support.hokolinks.com/ios/ios-deeplinking/#smart-link-generation)
- [Utilities](http://support.hokolinks.com/ios/ios-utilities/)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
