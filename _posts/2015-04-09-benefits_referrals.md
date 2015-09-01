---
title: Referrals
categories: benefits
layout: documentation
permalink: /:categories/ios/referrals
description: Inviting or referring someone to use your app is the best way to increase installs and HOKO can definitely help you with that.
---

<a href="#" class="tab active">iOS</a>
<a href="http://support.hokolinks.com/benefits/android/referrals/" class="tab">Android</a>

Inviting or referring someone to use your app is the best way to **increase installs** and HOKO can definitely help you with that. Using our SDK, you will just need to generate a smart link for your invitations using custom `query parameters` and/or `metadata` and it's fully ready to be shared with the world.

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
  NSString *referrerName = self.currentUser.name;
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
<br>  

### Personalized Landing Page

Now that you know how to create your referral smart links, getting the referrer name out of them, so you can present a better onboarding experience for your users (which can **greatly improve** your user **signup rate**), is dead simple.  
The following code shows how you can decode the newly opened deep link into showing your custom invitation view controller for the onboarding.

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
// AppDelegate.swift

. . .

Hoko.deeplinking().mapRoute("login/:auth_token", toTarget: { deeplink in
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
{% highlight swift %}

{% endhighlight %}

Your users will appreciate the gesture. Trust us.
