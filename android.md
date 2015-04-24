---
layout: documentation
title: Android
permalink: /android/
---

<ul class="index-list">
  {% for page in site.categories.android reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>