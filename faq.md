---
layout: learning_center
title: FAQ's
permalink: /faq/
---
### What is deep linking?

Mobile deep linking is the ability to bring a user into a specific place or action within a native
app, bypassing the homepage. Actually you are already familiar with traditional web deep linking,
which is at the heart of our everyday web reality.

It consists of using a hyperlink that links anyone to a specific piece of web content on a website,
rather than sending the user to the generic home page of that website. Mobile Deep linking is a new
technology that empower apps to have all the versatility that we learnt in web. Imagine the new
possibilities that will be opened for every app.

#### Example:

> Imagine you receive an email and you open it in your smartphone. This email presents you the new
release of a product that you love. In the situation where the email is embedded with a mobile deep
link, the link would redirect you to the specific product’s profile within an app, such as Amazon’s
app, providing you in one click the possibility to buy that beloved product.

In HOKO we refer to mobile deep linking technology as “the internet of apps.” The same doors internet opened to interconnect networks, is the door we have in front of us for the app world. We are building more and more tools around mobile deep linking that can help you make the most out of this new technology.

### Basic

<ul class="index-list">
  {% for page in site.categories.basic reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>

### Deep linking

<ul class="index-list">
  {% for page in site.categories.deeplinking reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>

### Smart links

<ul class="index-list">
  {% for page in site.categories.smartlinks reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>

### Preview page

<ul class="index-list">
  {% for page in site.categories.preview reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>

### Templates

<ul class="index-list">
  {% for page in site.categories.templates reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>

### Advanced

<ul class="index-list">
  {% for page in site.categories.advanced reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>
