---
title: Embed in Text Messages
categories: benefits
layout: documentation
permalink: /:categories/ios/text
description: Besides sharing content on social networks, your users can also do it through text messages (regular sms or chat messaging).
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/text/" class="tab">Android</a>

SMS, iMessage, Messaging Apps... allow your users to share content through text channels,
always delivering the best possible experience. Our goal is to be able to drive users straight
to the app once they click on a smart link inside a text message.

![Smart links in text messages](/assets/images/hoko-smart-link.png)

Embedding smart links in messages can be a powerful way
of **promoting your app** with deep linked content. With this in mind, our SDK allows
developers to send messages that will target your app using smart links.

## Embedding smart links in text messages

Let's start by creating a mobile deep link for this item using the `deeplinkWithRoute` method.
This is necessary so the app knows what to do when some other user opens the app through the link.
Next, we are going to encapsulate the deeplink inside a smart
link using the `generateSmartlinkForDeeplink` function.

Finally, we are going to send the message using iOS `MFMessageComposeViewController`. Once the
message it's sent we can react to the outcome of this action by delegating
`messageComposeViewController:didFinishWithResult` to our controller. In the
following snippet we will demonstrate how you can do this in-depth:

{% highlight objective-c %}
#import <Hoko/Hoko.h>

// First step: To work with SMS, you will need to import the following
// framework. You can import it right on your .m file
#import <MessageUI/MessageUI.h>

// Next up: make sure your view controller conforms to the
// MFMessageComposeViewControllerDelegate delegate.
@interface YourViewController () <MFMessageComposeViewControllerDelegate>

@end

. . .

- (IBAction)shareSMSButtonTapped:(id)sender {
  // Before actually sending the message, we need to check if the device
  // supports SMS
  if ([MFMessageComposeViewController canSendText]) {
    // Cool, we're good to go!

    // For this example, we will share a smart link for one product inside
    // the app and, therefore, we will use the route "product/:product_id"
    // for the product deep links.
    //
    // NOTE: Make sure you're already mapping that route (in your
    // AppDelegate.m, for instance) before executing the following code,
    // otherwise the smart link generation won't work.
    NSString *productID = [NSString stringWithFormat:@"%li", self.currentProduct.uniqueID];
    HOKDeeplink *productDeeplink = [HOKDeeplink deeplinkWithRoute:@"product/:product_id"
                                                  routeParameters:@{@"product_id": productID}];

    [[Hoko deeplinking] generateSmartlinkForDeeplink:productDeeplink success:^(NSString *smartlink) {
      // The Smart link was generated successfully. Let's send it

      MFMessageComposeViewController *controller = [[MFMessageComposeViewController alloc] init];
      controller.body = [NSString stringWithFormat:@"Hey! You should check out this product. I have a feeling that you'll love it. %@", smartlink];
      controller.messageComposeDelegate = self;
      [self presentViewController:controller animated:YES completion:nil];

    } failure:^(NSError *error) {
      // Oh no! There was an error while trying to generate a
      // new HOKO Smart link.
      NSLog(@"%@", error.description);

      // Notify the user that an error occurred.
      [self displayErrorAlert];
    }];
  } else {
    // Bummer... Looks like the device does not support SMS
  }
}

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

. . .

// Final step: we need to make sure our View Controller conforms to the
// MFMessageComposeViewControllerDelegate delegate
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

## Handle smart links inside your app

When the user opens your app through a smart link, it's up to you to present the appropriate view
within your app. You also have to define what are the deep linking routes that your app is going to support
and we will do the rest. More information about [Route Mapping](http://support.hokolinks.com/ios/ios-deeplinking/#route-mapping) in the documentation.

Further more, we provide utility methods to help you handling smart links, like presenting the correct view
or setting the root view, based on the route parameters, query parameters or metadata.
Check the documentation about [Deeplink Utilities](http://support.hokolinks.com/ios/ios-utilities/) to know more.
