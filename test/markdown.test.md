---
permalink: markdown.html
---

WORKS

{% heroicon "outline" "archive" %}
{% heroicon "solid" "archive" %}
{% heroicon "solid" "archive" "with an alt tag" %}
{% heroicon "solid" "archive" "with an alt tag" 'width="25" x-data="{ open: false }"' %}
{% heroicon "solid" "archive" undefined 'width="25" x-data="{ open: false }"' %}
{% heroicon_outline "archive" %}
{% heroicon_outline "archive" "with an alt tag" %}
{% heroicon_solid "archive" %}
{% heroicon_solid "archive" "with an alt tag" %}

DOESN'T WORK

{% heroicon "invalid-type" "archive" %}
{% heroicon "outline" "invalid-name" %}
{% heroicon "outline" "archive" undefined 'aria-hidden="true"' %}
{% heroicon "outline" "archive" undefined 'aria-label="true"' %}
{% heroicon_outline "invalid-name" %}
{% heroicon_solid "invalid-name" %}
