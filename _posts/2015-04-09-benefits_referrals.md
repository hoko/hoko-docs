---
title: Referrals
categories: benefits
layout: documentation
permalink: /:categories/ios/referrals
description: Inviting or referring someone to use your app is the best way to increase installs and HOKO can definitely help you with that.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/referrals/" class="tab">Android</a>

Consumers are more willing to try or buy a product if recommended by someone on
their network. Moreover, you can combine Referrals with Coupons to achieve a bigger
boost on sales and installs. Before diving into the code, let's consider the following example.

![Referrals](/assets/images/referrals.jpg)

Ricardo is looking for a nice restaurant in the Yood! app. After choosing the restaurant he invites
a friend through the app. The app is going to create and send a message to his friend that contains
a smart link generated through the SDK.

When the link is created, the app adds some metadata to the smart link to associate it with
Ricardo’s friend invitation.

Later, Ricardo’s friend is going to tap on the smart link on his device. Since the app it’s not
installed on the device, the smart link will take Ricardo’s friend through the app store.

After installing and opening the app, our SDK will figure it out that the user comes from an
invitation and it will download the pre-assigned metadata. The Yood! app will present these data by
saluting the friend with a special discount and displaying Ricardo profile picture, just to make the
experience extra special and welcome!

## Step 1: Sharing the smart link

Generate referrals with smart links through our SDK using `query parameters` or `metadata`.
It's up to you to decide which method suits you. Moreover, you can use and combine both
if you need to.

#### Option 1: Smart links with query parameters

With `query parameters` your links will have extra information visible, e.g.
`http://app.hoko.link/invitation?referrer=OfjaiSD8h9238`. These links are easier to create
and to be shared because there is no need for pre-configurations.

In this example we are going to have a look on how to create a smart link with
parameters as a referral link, using the SDK and its `generateSmartlinkForDeeplink` method.

![Sharing](/assets/images/share-ios.png)

Then, we are going to share the message using iOS `UIActivityViewController`, so Ricardo can pick
the messaging app that we wants to send the message. Let's have a look at the code
needed to generate and share the smart link:

{% highlight objective-c %}
#import <Hoko/Hoko.h>

- (IBAction)inviteButtonTapped:(id)sender {
  NSString *referrerName = self.currentUser.name;

  // Create the smart link based on queryParameters
  HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"invite"
                                         routeParameters:nil
                                         queryParameters:@{@"referrer": referrerName}
                                                metadata:nil];

  // Generate the smart link based on a deep link
  [[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {

    // Initialize a new iOS share sheet with your share message
    NSString *shareMessage = @"Join me, this app is a-mazing!";
    // Assign the URL of the smart link
    NSURL *smartURL = [NSURL URLWithString:smartlink];
    UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:@[shareMessage, smartURL]
                                                                                  applicationActivities:nil];

    // And... it's ready! Let's present the share popup to the user
    [self presentViewController:shareController animated:YES completion:nil];

  } failure:^(NSError *error) {
    NSLog(@"%@", error.description);
    [self showErrorPopup];
  }];
}
{% endhighlight %}

{% highlight swift %}
@IBAction func inviteButtonTapped(sender: AnyObject) {
  let referrerName = currentUser.name;
  let deeplink = HOKDeeplink(route: "invite", routeParameters: nil, queryParameters: ["referrer": referrerName], metadata: nil)

  // Generate the smart link based on a deep link
  Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { smartlink in

    if let smartURL = NSURL(string: smartlink) {
      // Initialize a new iOS share sheet with your share message
      let shareMessage = "Join me, this app is a-mazing!"
      // Assign the URL of the smart link
      let shareController = UIActivityViewController(activityItems: [shareMessage, smartURL], applicationActivities: nil)

      // And... it's ready! Let's present the share popup to the user
      self.presentViewController(shareController, animated: true, completion: nil)
    }

  }) { error in
    println(error.description)
    self.showErrorPopup()
  }
}
{% endhighlight %}

Thanks to `HOKDeeplink:queryParameters` this will generate a smart link like
`http://app.hoko.link/invitation?referrer=OfjaiSD8h9238`. Alternatively, you could create the same
smart link using `metadata`.

#### Option 2: Smart links with metadata

Smart links with `metadata` requires you
to assign and load data when creating and parsing the smart link. Nevertheless, these links are
shorter and clearer because they don't use HTTP query parameters,
e.g. `http://app.hoko.link/invitation`.

Metadata are ideal to hide and control sensitive data. They also have the
advantage of supporting unlimited meta data, unlike query parameters where you are limit by the
length of the URL.

Use the `HOKDeeplink:metadata` attribute to pass a dictionary with the respecting metadata
to be saved with the smart link. Read more information about
[metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata).

## Step 2: Personalized landing page

Now that we know how to create and share referral smart links, we must handle
these links once the users opens the app. We are going to
make it extra special by displaying which friend invited the user and what is the reward.

![Landing page](/assets/images/landing-page.png)

In this simple example we are going to parse the deep link generated by the smart link and
present the appropriate view to the user. We are also going to pass the name of the user (in this
case Ricardo) that referred the new user. You can go even further by getting the user
picture and other information from your back end.

{% highlight objective-c %}
// Add this to your application:didFinishLaunchingWithOptions delegated method
[[Hoko deeplinking] mapRoute:@"invite" toTarget:^(HOKDeeplink *deeplink) {
  if (deeplink.queryParameters[@"referrer"]) {
    // Present your personalized landing page with the referrer name
    NSString *referrerName = deeplink.queryParameters[@"referrer"];
    [self showInviteSignUpViewControllerWithReferrer:referrerName];

  } else {
    // The deep link does not contain any information about the referrer
    [self showSignUpViewController];
  }
}];
{% endhighlight %}

{% highlight swift %}
// Add this to your application:didFinishLaunchingWithOptions delegated method
Hoko.deeplinking().mapRoute("invite", toTarget: { deeplink in
  if let referrerName = deeplink.queryParameters?["referrer"] {
    // Present your personalized landing page with the referrer name
    showInviteSignUpViewControllerWithReferrer(referrerName)
  } else {
    // The deep link does not contain any information about the referrer
    showSignUpViewController()
  }
})
{% endhighlight %}

That's it. You now have a customized referral experience that your users are going to love!
