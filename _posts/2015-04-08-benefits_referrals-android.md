---
title: Referrals
categories:
layout: documentation
permalink: /benefits/android/referrals
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/referrals/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

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

## Step 1: Creating and sharing the referring smart link

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

![Sharing](/assets/images/share-android.png)

Then, we are going to share the message using Android `Intent.ACTION_SEND`, so Ricardo can pick
the messaging app that we wants to send the message. Let's have a look at the code
needed to generate and share the smart link:

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

If you prefer metadata
just use the `metadata` attribute instead of `queryParameters`.
Read more information about [metadata](http://support.hokolinks.com/ios/ios-deeplinking/#metadata).

## Step 2: Personalized landing page

Now that we know how to create and share referral smart links, we must handle
these links once the users opens the app. We are going to
make it extra special by displaying which friend invited the user and what is the reward.

![Landing page](/assets/images/landing-page.png)

In this simple example we are going to parse the deeplink generated by the smart link and
present the appropriate view to the user. We are also going to pass the name of the user (in this
case Ricardo) that referred the new user. You can go even further by getting the user
picture and other information from your back end.

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

That's it. You now have a customized referral experience that your users are going to love!
