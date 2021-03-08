# `eleventy-plugin-heroicons`

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

This plugin adds three shortcodes: `heroicon`, `heroicon-outline`, and `heroicon-solid`.

### `heroicon`

Args: `style: ("outline"|"solid")`, `name: string`, `alt?: string`

```md
{% heroicon "outline" "archive" %}
{% heroicon "solid" "x" "Close menu" %}
```

### `heroicon-outline`/`heroicon-solid`

These wrap the `heroicon` shortcode and pass a style.

Args: `name: string`, `alt?: string`

```md
{% heroicon-outline "x" "Close menu" %}
{% heroicon-solid "archive" %}
```

## Configuration

`eleventy-plugin-heroicons` offers a few options on a configuration object passed to Eleventy's `addPlugin()`:

- `className?: string` Adds a class to all heroicons
- `errorOnMissing: boolean` (default: `false`) Throw an error when passed an invalid style/name
