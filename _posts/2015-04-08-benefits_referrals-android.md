---
title: Referrals
categories:
layout: documentation
permalink: /benefits/android/referrals
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/referrals/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Inviting or referring someone to use your app is the best way to **increase installs** and HOKO can definitely help you with that. Using our SDK, you will just need to generate a smart link for your invitations using custom `query parameters` and/or `metadata` and it's fully ready to be shared with the world.

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
<br>  

### Personalized Landing Page

Now that you know how to create your referral smart links, getting the referrer name out of them, so you can present a better onboarding experience for your users (which can **greatly improve** your user **signup rate**), is dead simple.  
The following code shows how you can decode the newly opened deep link into showing your custom invitation view controller for the onboarding.

{% highlight java %}
// Start by mapping the invite route so your Activity gets called every time
// a new referral deep link is opened
@DeeplinkRoute("invite")
public class InviteSignUpActivity extends Activity {
  // This variable will automatically receive the deep link's
  // referrer query parameter when a smart link is opened.
  @DeeplinkQueryParameter("referrer")
  private String mReferrerName;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // We need to check whether this Activity was started via a HOKO smart
    // link or manually. To do that, we call the 'inject()' method.
    // If that returns false, it means that this Activity was
    // not called through a smart link.
    if (!Hoko.deeplinking().inject(this)) {
      // This Activity was not called from a HOKO smart link
      // Your code here to process the Activity ...

    } else {
      // This block of code will _only_ be executed if a smart link
      // was opened.

      // Verify if the invite link has a referrer in the query parameters
      if (mReferrerName != null) {
        // If so, present your personalized landing page with the referrer name
        showInviteSignUpWithReferrer(mReferrerName);
      } else {
        // The deep link does not contain any information about the referrer.
        // Fail gracefully or show the default sign up view
        showRegularSignUp();
      }
    }
  }

  . . .

}
{% endhighlight %}

Your users will appreciate the gesture. Trust us.
