---
layout: documentation
title: Benefits
permalink: /benefits/
---

<ul class="index-list">
  {% for page in site.categories.benefits reversed %}
    <li>
      <a href="{{page.url}}">{{ page.title }}</a>
      <p>{{ page.description }}</p>
    </li>
  {% endfor %}
</ul>
