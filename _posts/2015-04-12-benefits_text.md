---
title: Embed in Text Messages
categories: benefits
layout: documentation
permalink: /:categories/ios/text
description: Besides sharing content on social networks, your users can also do it through text messages (regular sms or chat messaging).
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/text/" class="tab">Android</a>

Besides sharing content on social networks, your users can also do it through text messages (regular sms or chat messaging). Embedding HOKO's smart links in messages can be a powerful way of **promoting your app**, with deep linked content. With this in mind, our SDK allows the developers to do it quickly. Your smart text messages will be up and running in no time.

In the following code section, we will show you how to do it.

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

And... That's it! So simple, right?
