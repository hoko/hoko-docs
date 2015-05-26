---
layout: learning_center
title: Smart Links
permalink: /smartlinks/
---

<ul class="index-list">
  {% for page in site.categories.smartlinks reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>
