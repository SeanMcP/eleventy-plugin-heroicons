# `eleventy-plugin-heroicons`

[![npm](https://img.shields.io/npm/v/eleventy-plugin-heroicons.svg)](https://npmjs.com/package/eleventy-plugin-heroicons) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/eleventy-plugin-heroicons.svg)](https://npmjs.com/package/eleventy-plugin-heroicons) [![npm](https://img.shields.io/npm/dt/eleventy-plugin-heroicons.svg)](https://npmjs.com/package/eleventy-plugin-heroicons)

🛡 Shortcodes to add [Heroicons](https://heroicons.com/) to your [Eleventy](https://11ty.dev) projects

## Get started

Install the package:

```sh
npm i -D eleventy-plugin-heroicons
```

Then add the plugin to your `.eleventy.js` file:

```js
// .eleventy.js
module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(require('eleventy-plugin-heroicons'));
}
```

## Usage

This plugin adds three shortcodes: `heroicon`, `heroicon_outline`, and `heroicon_solid`.

**Note**: These examples use Liquid template syntax, which is the default for Eleventy. If you are using another template engine like Nunjucks, the syntax might be slightly different.

### `heroicon`

Args: `style: ("solid"|"outline"|"mini"|"micro")`, `name: string`, `alt?: string`, `attributes?: object|string`

```md
{% heroicon "outline" "archive" %}
{% heroicon "mini" "x" "Close menu" %}
{% heroicon "micro" "x" "Close menu" "width=25 x-data='{ open: false }'" %}
```

If you are using a templating language that supports object arguments like Nunjucks, then you can replace the attributes string with an object:

```md
<!-- Nunjucks -->
{% heroicon "solid", "x", "Close menu", { width: 25, "x-data": "{ open: false }" } %}
```

### Style-specific shortcodes

Convenience shortcodes for various icon styles

Args: `name: string`, `alt?: string`, `attributes?: object|string`

```md
{% heroicon_solid "star" %}
{% heroicon_outline "star" %}
{% heroicon_mini "star" %}
{% heroicon_micro "star" %}
```

## Configuration

`eleventy-plugin-heroicons` offers a few options on a configuration object passed to Eleventy's `addPlugin()`:

- `className?: string` Adds a class to all heroicons
- `errorOnMissing: boolean` (default: `false`) Throw an error when passed an invalid style/name or invalid attribute

Pass the configuration object when adding the plugin:

```js
// .eleventy.js
module.exports = eleventyConfig => {
    eleventyConfig.addPlugin(require('eleventy-plugin-heroicons'), {
        className: 'icon',
        errorOnMissing: true
    });
}
```

## Styling

The `svg` element receives two data attributes that you can use for styling:

- `data-heroicon-name="string"`
- `data-heroicon-style="(solid|outline|mini|micro)"`

You could add the following to your stylesheets:

```css
/* Solid icons */
[data-heroicon-style="solid"] {
    width: 20px;
}

/* Arrow down icon */
[data-heroicon-name="arrow-down"] {
    color: darkgreen;
}

/* All icons */
[data-heroicon-name] {
    padding: 2ch;
}
```

If you passed a `className` to the configuration object, then you could use that to select all icons.

## License

[MIT](./LICENSE) © [Sean McPherson](https://seanmcp.com)
