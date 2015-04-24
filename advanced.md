---
layout: learning_center
title: Advanced
permalink: /advanced/
---

<ul class="index-list">
  {% for page in site.categories.advanced reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>