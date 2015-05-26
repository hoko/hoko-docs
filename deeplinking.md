---
layout: learning_center
title: Deep Linking
permalink: /deeplinking/
---

<ul class="index-list">
  {% for page in site.categories.deeplinking reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>
