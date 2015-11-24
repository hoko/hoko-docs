---
title: Referrals
categories: benefits
layout: documentation
permalink: /:categories/ios/referrals
description: Inviting or referring someone to use your app is the best way to increase installs and HOKO can definitely help you with that.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/referrals/" class="tab">Android</a>

Incentives work! Referrals and Invites help you not only to grow your traffic but also, get
quality clients. Consumers are more willing to try or buy a product if recommended by someone on
their network. Also, you can combine Referrals with Coupons, which will give you an even bigger
boost on your sales.

Inviting or referring someone to use your app is the best way to **increase installs** and HOKO can
definitely help you with that. Here's an example of this use case:

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

## Creating and sharing the referring smart link

Generate referrals with smart links through our SDK using `query parameters` or `metadata`.
It's up to you to decide which method suits you best. Moreover, you can use both if you need to.

With `query parameters` your links will have extra information visible, e.g.
`http://app.hoko.link/invitation?referrer=OfjaiSD8h9238`. These links are easier to create
and to be shared because there is no need for pre-configurations.

That's the case of `metadata`, because it requires you
to assign and load data when creating and parsing the smart link. Although, these links are shorter
and clearer because they don't use HTTP query parameters. e.g. `http://app.hoko.link/invitation`.

Smart links with `metadata` are ideal to hide and control sensitive data. They also have the
advantage of supporting unlimited meta data, unlike query parameters where you are limit by the
length of the URL.

In this example we are going to have a look on how to create a smart link with
parameters as a referral link, using the SDK and its `generateSmartlinkForDeeplink` method.

![Sharing](/assets/images/share-controller.png)

Then, we are going to share the message using iOS `UIActivityViewController`, so Ricardo can pick
the messaging app that we wants to send the message. Let's have a look at the code
needed to generate and share the smart link:

{% highlight objective-c %}
#import <Hoko/Hoko.h>

- (IBAction)inviteButtonTapped:(id)sender {
  // First, we'll create a new deep link with the referrer data so
  // we can generate a smart link from it.
  // For this example, we will use the route "invite" for the deep links.
  //
  // NOTE: Make sure you're already mapping that route (in your AppDelegate.m,
  // for instance) before executing the following code,
  // otherwise the smart link generation won't work.
  NSString *referrerName = self.currentUser.name; // Your user name. In this case, Ricardo
  HOKDeeplink *deeplink = [HOKDeeplink deeplinkWithRoute:@"invite"
                                         routeParameters:nil
                                         queryParameters:@{@"referrer": referrerName}
                                                metadata:nil];

  // After that, just call the generateSmartlinkForDeeplink SDK method
  // and we'll handle all the hard work for you
  [[Hoko deeplinking] generateSmartlinkForDeeplink:deeplink success:^(NSString *smartlink) {
    // A smart link was generated successfully. Let's share it!

    // Start by initializing a new iOS share sheet with your share message
    // and a URL object from the newly generated smart link
    NSString *shareMessage = @"Join me, this app is a-mazing!";
    NSURL *smartURL = [NSURL URLWithString:smartlink];
    UIActivityViewController *shareController = [[UIActivityViewController alloc] initWithActivityItems:@[shareMessage, smartURL]
                                                                                  applicationActivities:nil];

    // And... it's ready! Let's present the share popup to the user
    [self presentViewController:shareController animated:YES completion:nil];

  } failure:^(NSError *error) {
    // Ooops, looks like HOKO couldn't create your awesome Smart link
    // But don't be sad, the error description will clear up on what's wrong
    NSLog(@"%@", error.description);

    // Fail gracefully. Show an error popup, for instance
    [self showErrorPopup];
  }];
}
{% endhighlight %}

{% highlight swift %}
@IBAction func inviteButtonTapped(sender: AnyObject) {
  // First, we'll create a new deep link with the referrer data so
  // we can generate a smart link from it.
  // For this example, we will use the route "invite" for the deep links.
  //
  // NOTE: Make sure you're already mapping that route (in your
  // AppDelegate.swift, for instance) before executing the following code,
  // otherwise the smart link generation won't work.
  let referrerName = currentUser.name;
  let deeplink = HOKDeeplink(route: "invite", routeParameters: nil, queryParameters: ["referrer": referrerName], metadata: nil)

  // After that, just call the generateSmartlinkForDeeplink SDK method
  // and we'll handle all the hard work for you
  Hoko.deeplinking().generateSmartlinkForDeeplink(deeplink, success: { smartlink in
    // A smart link was generated successfully. Let's share it!

    if let smartURL = NSURL(string: smartlink) {
      // Start by initializing a new iOS share sheet with your share message
      // and a URL object from the newly generated smart link
      let shareMessage = "Join me, this app is a-mazing!"
      let shareController = UIActivityViewController(activityItems: [shareMessage, smartURL], applicationActivities: nil)

      // And... it's ready! Let's present the share popup to the user
      self.presentViewController(shareController, animated: true, completion: nil)
    }

  }) { error in
    // Ooops, looks like HOKO couldn't create your awesome Smart link
    // But don't be sad, the error description will clear up on what's wrong
    println(error.description)

    // Fail gracefully. Show an error popup, for instance
    self.showErrorPopup()
  }
}
{% endhighlight %}

If you prefer metadata
just use the `metadata` attribute instead of `queryParameters`.
Read more information about [metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata).

## Personalized Landing Page

Now that we know how to create and share referral smart links, we must handle
these links once the users opens the app. We are going to
make it extra special by displaying which friend invited the user and what is the reward.

![Landing page](/assets/images/landing-page.png)

In this simple example we are going to parse the deeplink generated by the smart link and
present the appropriate view to the user. We are also going to pass the name of the user (in this
case Ricardo) that referred the new user. You can go even further by getting the user
picture and other information from your back end.

{% highlight objective-c %}
// AppDelegate.m
#import <Hoko/Hoko.h>

. . .

// Start by mapping the invite route so your code gets called every time
// a new referral deep link is opened
[[Hoko deeplinking] mapRoute:@"invite" toTarget:^(HOKDeeplink *deeplink) {
  // Verify if the invite link has a referrer in the query parameters
  if (deeplink.queryParameters[@"referrer"]) {
    // If so, present your personalized landing page with the referrer name
    NSString *referrerName = deeplink.queryParameters[@"referrer"];
    [self showInviteSignUpViewControllerWithReferrer:referrerName];

  } else {
    // The deep link does not contain any information about the referrer.
    // Fail gracefully or show the default sign up view
    [self showSignUpViewController];
  }
}];
{% endhighlight %}

{% highlight swift %}
// AppDelegate.swift

. . .

Hoko.deeplinking().mapRoute("invite", toTarget: { deeplink in
  // Verify if the invite link has a referrer in the query parameters
  if let referrerName = deeplink.queryParameters?["referrer"] {
    // If so, present your personalized landing page with the referrer name
    showInviteSignUpViewControllerWithReferrer(referrerName)
  } else {
    // The deep link does not contain any information about the referrer.
    // Fail gracefully or show the default sign up view
    showSignUpViewController()
  }
})
{% endhighlight %}

That's it. You now have a customized referral experience that your users are going to love!
