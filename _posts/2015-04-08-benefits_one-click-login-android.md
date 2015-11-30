---
title: One Click Login
categories:
layout: documentation
permalink: /benefits/android/one-click-login
description: Learn more about using HOKO smart links to enhance your user experience.
---

<a href="http://support.hokolinks.com/benefits/ios/one-click-login/" class="tab">iOS</a>
<a href="#" class="tab active">Android</a>

Take your app's log-in form to the next level by letting your users sign in with a single tap of a
button, avoiding complex passwords typing or password resets requests.

<iframe width="630" height="450" src="https://www.youtube.com/embed/pr4SSCID0uM" frameborder="0" allowfullscreen></iframe>

After tapping on the button the user will receive an email with an embedded smart link. Tapping on
the email's link, will take the user back to the app and loggin him in.
For this to work, your app and your backend must integrate HOKO. Let's start with your app.

## Generating the lazy smart link for authentication

The user will enter his email and will tap on the **Send Magic Link** button.
This will request your server to send an email to the user's account containing a lazy smart link
with the user's authentication token, e.g. `http://app.hoko.link/lazy?uri=%2Flogin%2Fq5w2e3r5t8y`.

![How One Click Login UX works](https://s3-eu-west-1.amazonaws.com/hoko-blog/one_click_login_diagram.png)

Once the user opens the email and taps on the lazy smart link, it is going to request the generation
of a smart link that will in fact redirect the user to your app.

## Authenticating the token

For the application itself, all we need to do is map a `login/:auth_token` route that calls a method
that is going to forward the authorization token to the backend to be validated.

{% highlight java %}
@DeeplinkRoute("login/:auth_token")
public class AuthTokenLoginActivity extends Activity {

  // Inject the auth. token in the deep link into this variable
  @DeeplinkRouteParameter("auth_token")
  private String mAuthToken;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.auth_token_login_view); // your view ID here

    if (!Hoko.deeplinking().inject(this)) {
      // If you manually launched this activity
    } else {
      // Validates the authentication token in the backend
      LoginHelper.validateWithToken(mAuthToken, onSuccess);
    }
  }

  protected void onSuccess() {
    // Set's the user access token
    _GLOBAL_AUTH_TOKEN = mAuthToken

    // Display the right activity
    startActivity(MyActivity)
  }
}
{% endhighlight %}

If the response is positive, we can login the user and present the appropriate view. We are also
going to save the current authorization token to be used on future requests.

### More information

Need to know more about these subjects? Check the following pages for more information:

- [Mapping routes with callbacks](http://support.hokolinks.com/android/android-deeplinking/#route-mapping-using-annotations)
- [Generating smart links](http://support.hokolinks.com/android/android-deeplinking/#smart-link-generation)
- [Lazy smart links](http://support.hokolinks.com/api/rest-creating-lazy-smartlinks)
- [Smart links with Metadata](http://support.hokolinks.com/android/android-deeplinking/#metadata)

Check our [frequently asked questions](http://support.hokolinks.com/faq/) or [send us a message](mailto:support@hokolinks.com) if you can't find what you are looking for. We're always glad
to hear from you and answer all your questions.
