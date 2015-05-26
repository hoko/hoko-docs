---
layout: learning_center
title: Templates
permalink: /templates/
---

<ul class="index-list">
  {% for page in site.categories.templates reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>
