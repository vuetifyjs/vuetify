---
meta:
  title: SASS variables
  description: Customize Vuetify's internal styles by modifying SASS variables.
  keywords: sass variables, scss variables, modifying Vuetify styles
related:
  - /styles/colors/
  - /features/theme/
  - /features/presets/
---

# SASS variables

Vuetify uses **SASS/SCSS** to craft the style and appearance of all aspects of the framework.

Utilizing the sass/scss data option of your `vue.config.js` file, you can optionally pass in custom variables to overwrite the global defaults. A list of available variables is located within each component's API section and in the [Variable API](#variable-api) of this page. This functionality is automatically handled by [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify).

<entry />

## Basic usage

Some variables are not used by vuetify components and are safe to modify without any additional configuration.

```diff { resource="main.js" }
- import 'vuetify/styles'
+ import './main.scss'
```

```scss { resource="main.scss" }
@use 'vuetify' with (
  $utilities: false,
  $color-pack: false,
);
```

## Component specific variables

Customising variables used in components is a bit more complex and requires the use of a build plugin.
Follow the plugin setup guide from [treeshaking](/features/treeshaking/) then add `styles: 'expose'` to the plugin options:

```js
// Vite/Nuxt
vuetify({ styles: 'expose' })

// Webpack/Vue CLI
new VuetifyPlugin({ styles: 'expose' })
```

This creates a temporary file in `node_modules/.cache/vuetify` containing style imports for every vuetify component you're using, and replaces `@use 'vuetify'` with that file. You can keep configuring variables as normal, but now you also have access to the component specific variables.

```scss { resource="main.scss" }
@use 'vuetify' with (
  $utilities: false,
  $button-height: 40px,
);
```

Due to SASS compiler limitations this file must be imported directly into a javascript file, and cannot be loaded via another sass file.

<!--
## Variable API

There are many SASS/SCSS variables that can be customized across the entire Vuetify framework. You can browse all the variables using the tool below:

<alert type="info">

  Some color-related variables for components are defined in the global material-theme variables: `$material-light` / `$material-dark`

</alert>

 <sass-api />
-->

## Usage in templates

You can access [global](/api/vuetify/) and per-component variables in Vue templates by importing from the Vuetify package.

<alert type="info">

  Importing variable files works the same in **SASS** and **SCSS** style templates

</alert>

Move the configuration into a separate file:

```scss { resource="_settings.scss" }
@forward 'vuetify/settings' with (
  $utilities: false,
  $button-height: 40px,
);
```

Then import that into your template and main stylesheet:

```scss { resource="main.scss" }
@use './settings';
@use 'vuetify';
```

```html
<style lang="scss">
  @use './settings';

  .my-button {
    height: settings.$button-height;
  }
</style>
```

## Caveats

When using sass variables, there are a few considerations to be aware of.

### Duplicated CSS

Placing actual styles or importing a regular stylesheet into the settings file will cause them to be duplicated everywhere the file is imported. Only put variables, mixins, and functions in the settings file, styles should be placed in the main stylesheet or loaded another way.

### Bundle size

Enabling `styles: 'expose'` moves all vuetify styles into a single file, so you will lose some benefits of code splitting.

<backmatter />
