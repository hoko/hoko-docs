---
title: Utilities
categories: ios
layout: documentation
permalink: /:categories/:title
---

To help your app on becoming deep linkable we provide a **non-mandatory** utility class to handle navigation on HOKO's deep link `target` block.

### HKNavigation

`HKNavigation` serves the purpose of easing the pushing, presenting and setting of `UIViewControllers` to whatever may be the current state of your application. This class handles all the logic of finding your current view controller and performing the chosen action over that view controller. This should work on most apps that rely only on `UINavigationControllers`, `UITabBarControllers` and modal view controllers to handle navigation.

#### Setting the Root View Controller

To completely replace the current view controller on your application just call the `setRootViewController` method with a given view controller.

{% highlight objective-c %}
[HKNavigation setRootViewController:[BLKLandingViewController new]];
{% endhighlight %}


{% highlight swift %}
HKNavigation.setRootViewController(BLKLandingViewController())
{% endhighlight %}


#### Presenting a View Controller

To present a view controller modally your app can call the `presentViewController` method with a given view controller.

{% highlight objective-c %}
[HKNavigation presentViewController:[BLKLandingViewController new] animated:YES];
{% endhighlight %}

{% highlight swift %}
HKNavigation.presentViewController(BLKLandingViewController(), animated: true)
{% endhighlight %}

#### Pushing a View Controller

If your view controller is a navigation controller it replaces the root view controller, otherwise it tries to push the view controller  if the current view controller is a `UINavigationController`, otherwise it creates it before pushing. The replace parameter locates the current view controller and replaces it if it is of the same class as the view controller parameter being passed, this exists to avoid two of the same view controller in a row.

{% highlight objective-c %}
[HKNavigation pushViewController:[BLKLandingViewController new] animated:YES replace:YES];
{% endhighlight %}

{% highlight swift %}
HKNavigation.pushViewController(BLKLandingViewController(), animated: true, replace: true)
{% endhighlight %}
