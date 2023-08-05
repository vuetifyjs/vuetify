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

::: info

It is recommended to familiarize yourself with the [Treeshaking](/features/treeshaking/) guide before continuing.

:::

## Installation

Vuetify works out of the box without any additional compilers needing to be installed but does support advanced use-cases such as modifying the underlying variables of the framework. Vite provides built-in support for sass, less and stylus files without the need to install Vite-specific plugins for them; just the corresponding pre-processor itself.

To begin modifying Vuetify's internal variables, install the [sass](https://sass-lang.com/) pre-processor:

<DocTabs>
  <template #tabs>
    <v-tab value="vite" variant="plain">Vite</v-tab>
    <v-tab value="vue-cli" variant="plain">Vue CLI</v-tab>
  </template>
  <template #content>
  <v-window-item value="vite">

```bash
  # yarn
  yarn install -D sass

  #npm
  npm install -D sass

  #pnpm
  pnpm install -D sass
```

  </v-window-item>
  <v-window-item value="vue-cli">

```bash
  # yarn
  yarn install -D sass-loader sass

  # npm
  npm install -D sass-loader sass

  #pnpm
  pnpm install -D sass-loader sass
```

  </v-window-item>
  </template>
</DocTabs>

For additional details about css-pre-processors, please refer to the official vite page at: https://vitejs.dev/guide/features.html#css-pre-processors or official vue-cli-page at: https://cli.vuejs.org/guide/css.html#pre-processors

## Basic usage

Create a **main.scss** file in your **src/styles** directory and update the style import within your **vuetify.js** file:

```scss { resource="src/styles/main.scss" }
@use 'vuetify' with (
  $variable: false,
);
```

```diff { resource="src/plugins/vuetify.js" }
- import 'vuetify/styles'
+ import '@/styles/main.scss'
```

Within your style file, import the Vuetify styles and specify the variables you want to override, that's it. This is useful when you want to make changes to the global theme or utility classes.

The following example turns off all utility classes and color packs:

```scss { resource="src/styles/main.scss" }
@use 'vuetify' with (
  $utilities: false,
  $color-pack: false,
);
```

::: warning

`'vuetify/styles'` should not be used in sass files as it resolves to precompiled css ([vitejs/vite#7809](https://github.com/vitejs/vite/issues/7809)). `'vuetify'` and `'vuetify/settings'` are valid and safe to use

:::

## Component specific variables

Customising variables used in components is a bit more complex and requires the use of a special build plugin.

Follow the plugin setup guide from [treeshaking](/features/treeshaking/) then add `styles.configFile` to the plugin options:

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $utilities: false,
  $button-height: 40px,
);
```

`configFile` will be resolved relative to the project root, and loaded before each of vuetify's stylesheets.
If you were using the basic technique from above, make sure to remove it and switch back to `import 'vuetify/styles'`.
You can keep `main.scss` for other style overrides but don't do both or you'll end up with duplicated styles.

Available SASS variables are located on each component's API page.

![image](https://github.com/vuetifyjs/vuetify/assets/9064066/967da002-5a9e-4bce-8285-1fa9b849e36d "VBtn SASS Variables")

<!--
## Variable API

There are many SASS/SCSS variables that can be customized across the entire Vuetify framework. You can browse all the variables using the tool below:

::: info
  Some color-related variables for components are defined in the global material-theme variables: `$material-light` / `$material-dark`
:::

 <sass-api />
-->

## Usage in templates

You can access [global](/api/vuetify/) and per-component variables in Vue templates simply by importing the settings file:

```html { resource="Comp1.vue" }
<style lang="scss">
  @use './settings';

  .my-button {
    height: settings.$button-height;
  }
</style>
```

Keep in mind that to obtain settings from Vuetify, you must forward its variables from within your local stylesheet. In the following example we modify `settings.scss` to **forward** instead of **use**:

```diff { resource="src/styles/settings.scss" }
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
