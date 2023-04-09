---
meta:
  title: SASS variables
  description: Customize Vuetify's internal styles by modifying SASS variables.
  keywords: sass variables, scss variables, modifying Vuetify styles
related:
  - /styles/colors/
  - /features/theme/
  - /features/treeshaking/
---

# SASS variables

Vuetify uses **SASS/SCSS** to craft the style and appearance of all aspects of the framework.

<entry />

## Installation

Vuetify works out of the box without any additional compilers needing to be installed. Changing or using SASS variables though obviously requires the SASS compiler.

### vite

Vite provides built-in support for sass, less and stylus files. There is no need to install Vite-specific plugins for them, but the corresponding pre-processor itself must be installed. Vuetify needs sass as a preprocessor so install it:

```bash
npm install -D sass
```

for more information: https://vitejs.dev/guide/features.html#css-pre-processors

### vue-cli

You can select pre-processors (Sass/Less/Stylus) when creating the project. If you did not do so, the internal webpack config is still pre-configured to handle all of them. You just need to manually install the corresponding webpack loaders:

```bash
npm install -D sass-loader sass
```

for more information: https://cli.vuejs.org/guide/css.html#pre-processors

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

<alert type="warning">

`'vuetify/styles'` should not be used in sass files as it resolves to precompiled css ([vitejs/vite#7809](https://github.com/vitejs/vite/issues/7809))

`'vuetify'` and `'vuetify/settings'` are valid and safe to use

</alert>

## Component specific variables

Customising variables used in components is a bit more complex and requires the use of a build plugin.
Follow the plugin setup guide from [treeshaking](/features/treeshaking/) then add `styles.configFile` to the plugin options:

```js
// Vite/Nuxt
vuetify({
  styles: { configFile: 'src/settings.scss' }
})

// Webpack/Vue CLI
new VuetifyPlugin({
  styles: { configFile: 'src/settings.scss' }
})
```

And create a settings file. This can be named anything you like, just make sure to reference it in the plugin options.

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $utilities: false,
  $button-height: 40px,
);
```

`configFile` will be resolved relative to the project root, and loaded before each of vuetify's stylesheets.
If you were using the basic technique from above, make sure to remove it and switch back to `import 'vuetify/styles'`.
You can keep `main.scss` for other style overrides but don't do both or you'll end up with duplicated styles.

<!--
## Variable API

There are many SASS/SCSS variables that can be customized across the entire Vuetify framework. You can browse all the variables using the tool below:

<alert type="info">

  Some color-related variables for components are defined in the global material-theme variables: `$material-light` / `$material-dark`

</alert>

 <sass-api />
-->

## Usage in templates

You can access [global](/api/vuetify/) and per-component variables in Vue templates simply by importing the settings file:

```html { resource="component.vue" }
<style lang="scss">
  @use './settings';

  .my-button {
    height: settings.$button-height;
  }
</style>
```

Keep in mind that to obtain settings from Vuetify, you must forward its variables from within your local stylesheet. In the following example we modify `settings.scss` to **forward** instead of **use**:

```diff { resource="settings.scss" }
- @use 'vuetify/settings' with (
+ @forward 'vuetify/settings' with (
```

## Caveats

When using sass variables, there are a few considerations to be aware of.

### Duplicated CSS

Placing actual styles or importing a regular stylesheet into the settings file will cause them to be duplicated everywhere the file is imported.
Only put variables, mixins, and functions in the settings file, styles should be placed in the main stylesheet or loaded another way.

### Build performance

Vuetify loads precompiled CSS by default, enabling variable customisation will switch to the base SASS files instead which must be recompiled with your project.
This can be a performance hit if you're using more than a few vuetify components, and also forces you to use the same SASS compiler version as us.

### Symlinks

PNPM and Yarn 2+ create symlinks to library files instead of copying them to node_modules, sass doesn't seem to like this and sometimes doesn't apply the configuration.

### sass-loader with `api: 'modern'`

You might have to write a custom importer plugin to load the settings file.
