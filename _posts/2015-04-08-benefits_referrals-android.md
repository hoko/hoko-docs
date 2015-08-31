---
title: Referrals
categories:
layout: documentation
permalink: /benefits/android/referrals
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/referrals/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Inviting or referring someone to use your app is the best way to increase installs and HOKO can definitely help you with that. Using our SDK, you will just need to generate a smart link for your invitations using custom `query parameters` and/or `metadata` and it's fully ready to be shared with the world.

{% highlight java %}
// This private method would be called inside your Activity's onCreate()
// method and it's used to setup the invite button to generate a new
// HOKO Smart link when tapped.
private void setupInviteButton() {
  // R.id.inviteButton would be the ID you would give to that button
  mInviteButton = (Button) findViewById(R.id.inviteButton);

  // Add a click event listener so you know when to ask HOKO to generate
  // your awesome smart links
  mInviteButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
      // First, we'll create a new deep link with the referrer data so
      // we can generate a smart link from it.
      // For this example, we will use the route "invite" for the deep links.
      //
      // NOTE: Make sure you're already mapping that route before executing the
      // following code, otherwise the smart link generation won't work.

      HashMap queryParameters = new HashMap();
      queryParameters.put("referrer", mCurrentUser.getName());

      Deeplink deeplink = Deeplink.deeplink("invite", null, queryParameters);

      // After that, just call the generateSmartlink SDK method
      // and we'll handle all the hard work for you
      Hoko.deeplinking().generateSmartlink(deeplink, new LinkGenerationListener() {
          @Override
          public void onLinkGenerated(String smartlink) {
            // A smart link was generated successfully. Let's share it!

            String inviteText = "Join me, this app is a-mazing! " + smartlink;
            Intent inviteIntent = new Intent(Intent.ACTION_SEND);
            inviteIntent.setType("text/plain");
            inviteIntent.putExtra(Intent.EXTRA_TEXT, inviteText);
            startActivity(Intent.createChooser(inviteIntent, "Share"));
          }

          @Override
          public void onError(Exception e) {
            // Ooops, looks like HOKO couldn't create your awesome Smart link
            // But don't be sad, the error description will clear up
            // on what's wrong
            System.out.println(e.getMessage());

            // Fail gracefully. Show an error popup, for instance
            showErrorPopup();
          }
      });
    }
  });
}

{% endhighlight %}
