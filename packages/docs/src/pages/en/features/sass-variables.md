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

<backmatter />
