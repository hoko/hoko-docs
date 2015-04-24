---
layout: learning_center
title: Basic
permalink: /basic/
---

<ul class="index-list">
  {% for page in site.categories.basic reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>