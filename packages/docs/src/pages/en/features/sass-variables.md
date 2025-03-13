---
meta:
  title: SASS variables
  description: Customize Vuetify's internal styles by modifying SASS variables.
  keywords: sass variables, scss variables, modifying Vuetify styles
related:
  - /styles/colors/
  - /features/theme/
  - /features/treeshaking/
features:
  label: 'sass'
  report: true
---

# SASS variables

Vuetify uses **SASS/SCSS** to craft the style and appearance of all aspects of the framework.

<PageFeatures />

<PromotedEntry />

::: info

It is recommended to familiarize yourself with the [Treeshaking](/features/treeshaking/) guide before continuing.

:::

## Installation

Vuetify works out of the box without any additional compilers needing to be installed but does support advanced use-cases such as modifying the underlying variables of the framework. Vite provides built-in support for sass, less and stylus files without the need to install Vite-specific plugins for them; just the corresponding pre-processor itself.

To begin modifying Vuetify's internal variables, install the [sass](https://sass-lang.com/) pre-processor:

::: tabs

```bash [pnpm]
  pnpm install -D sass-loader sass
```

```bash [yarn]
  yarn add -D sass
```

```bash [npm]
  npm install -D sass-loader sass
```

```bash [bun]
  bun add -D sass-loader sass
```

:::

For additional details about css-pre-processors, please refer to the official vite page at: <https://vitejs.dev/guide/features.html#css-pre-processors> or official vue-cli-page at: <https://cli.vuejs.org/guide/css.html#pre-processors>

## Basic usage

There are many SASS variables such as **font size**, **font family**, and **line height** that can be configured globally. An extensive list of configurable global SASS variables can be found [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/settings/_variables.scss). To start, create a **main.scss** file in your **src/styles** directory and update the style import within your **vuetify.js** file:

```scss { resource="src/styles/main.scss" }
@use 'vuetify' with (
  // variables go here
);
```

```diff { resource="src/plugins/vuetify.js" }
- import 'vuetify/styles'
+ import '@/styles/main.scss'
```

Within your style file, import the Vuetify styles and specify the variables you want to override, that's it.

::: info

`'vuetify'` should be used for [global SASS variable](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/settings/_variables.scss).

:::

::: info

`'vuetify/settings'` should be used for vuetify [component SASS Variables](features/sass-variables/#variable-api).

:::

::: warning

`'vuetify/styles'` should not be used in sass files as it resolves to precompiled css ([vitejs/vite#7809](https://github.com/vitejs/vite/issues/7809)). `'vuetify'` and `'vuetify/settings'` are valid and safe to use

:::

## Component specific variables

Customizing variables used in components is a bit more complex and requires the use of a special build plugin.

Follow the plugin setup guide from [treeshaking](/features/treeshaking/) then add `styles.configFile` to the plugin options:

```js { resource="vite.config.js" }
vuetify({
  styles: {
    configFile: 'src/styles/settings.scss',
  },
})
```

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $button-height: 40px,
);
```

`configFile` will be resolved relative to the project root, and loaded before each of vuetify's stylesheets.
If you were using the basic technique from above, make sure to either:

- Remove it and switch back to `import 'vuetify/styles'`, or
- Add `@use './settings'` before `@use 'vuetify'` in `main.scss` and remove the `with` block from `@use 'vuetify'`.

You can keep `main.scss` for other style overrides but don't do both `@use 'vuetify'` and `import 'vuetify/styles'` or you'll end up with duplicated styles.

## Variable API

There are many SASS/SCSS variables that can be customized across the entire Vuetify framework. You can browse all the variables using the tool below:

<FeaturesSassApi />

Available SASS variables are located on each component's API page.

![image](https://github.com/vuetifyjs/vuetify/assets/9064066/967da002-5a9e-4bce-8285-1fa9b849e36d "VBtn SASS Variables")

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

## Disabling utility classes

Utility classes are a powerful feature of Vuetify, but they can also be unnecessary for some projects. Each utility class is generated with a set of options that are defined [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/settings/_utilities.scss). Disable individual classes by setting their corresponding variable to `false`:

```scss { resource="src/styles/settings.scss" }
@forward 'vuetify/settings' with (
  $utilities: (
    "align-content": false,
    "align-items": false,
    "align-self": false,
    "border-bottom": false,
    "border-end": false,
    "border-opacity": false,
    "border-start": false,
    "border-style": false,
    "border-top": false,
    "border": false,
    "display": false,
    "flex-direction": false,
    "flex-grow": false,
    "flex-shrink": false,
    "flex-wrap": false,
    "flex": false,
    "float-ltr": false,
    "float-rtl": false,
    "float": false,
    "font-italic": false,
    "font-weight": false,
    "justify-content": false,
    "margin-bottom": false,
    "margin-end": false,
    "margin-left": false,
    "margin-right": false,
    "margin-start": false,
    "margin-top": false,
    "margin-x": false,
    "margin-y": false,
    "margin": false,
    "negative-margin-bottom": false,
    "negative-margin-end": false,
    "negative-margin-left": false,
    "negative-margin-right": false,
    "negative-margin-start": false,
    "negative-margin-top": false,
    "negative-margin-x": false,
    "negative-margin-y": false,
    "negative-margin": false,
    "order": false,
    "overflow-wrap": false,
    "overflow-x": false,
    "overflow-y": false,
    "overflow": false,
    "padding-bottom": false,
    "padding-end": false,
    "padding-left": false,
    "padding-right": false,
    "padding-start": false,
    "padding-top": false,
    "padding-x": false,
    "padding-y": false,
    "padding": false,
    "rounded-bottom-end": false,
    "rounded-bottom-start": false,
    "rounded-bottom": false,
    "rounded-end": false,
    "rounded-start": false,
    "rounded-top-end": false,
    "rounded-top-start": false,
    "rounded-top": false,
    "rounded": false,
    "text-align": false,
    "text-decoration": false,
    "text-mono": false,
    "text-opacity": false,
    "text-overflow": false,
    "text-transform": false,
    "typography": false,
    "white-space": false,
  ),
);
```

To disable all utility classes, set the entire `$utilities` variable to `false`:

```scss { resource="src/styles/settings.scss" }
@forward 'vuetify/settings' with (
  $utilities: false,
);
```

## Disabling color packs

Color packs are handy for quickly applying a color to a component but mostly unused in production. To disable them, set the `$color-pack` variable to `false`:

```scss { resource="src/styles/settings.scss" }
@forward 'vuetify/settings' with (
  $color-pack: false,
);
```

## Enabling CSS cascade layers

::: success
This feature was introduced in [v3.6.0 (Nebula)](/getting-started/release-notes/?version=v3.6.0)
:::

[Cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) are a modern CSS feature that makes it easier to write custom styles without having to deal with specificity issues and `!important`. This will be included by default in Vuetify 4 but can optionally be used now:

```scss { resource="src/styles/settings.scss" }
@forward 'vuetify/settings' with (
  $layers: true,
);
```

Import order of stylesheets becomes much more important with layers enabled, `import 'vuetify/styles'` or a file containing `@use 'vuetify'` **must** be loaded *before* any components or the CSS reset will take precedence over component styles and break everything. If you have separate plugin files make sure to import vuetify's before `App.vue`.

Your own styles will always<sup>*</sup> override vuetify's if you don't use `@layer` yourself, or you can specify an order for custom layers in a stylesheet loaded before vuetify.

```css { resource="src/styles/layers.css" }
@layer base, vuetify, overrides;
```

\* Layers invert `!important`, so anything trying to override an important vuetify style must also be in a layer. { class="text-caption" }

## Caveats

When using sass variables, there are a few considerations to be aware of.

### Duplicated CSS

Placing actual styles or importing a regular stylesheet into the settings file will cause them to be duplicated everywhere the file is imported.
Only put variables, mixins, and functions in the settings file, styles should be placed in the main stylesheet or loaded another way.

### Build performance

Vuetify loads precompiled CSS by default, enabling variable customization will switch to the base SASS files instead which must be recompiled with your project.
This can be a performance hit if you're using more than a few vuetify components, and also forces you to use the same SASS compiler version as us.

Performance can be improved with Vite by using the modern sass compiler. Replace your `sass` dependency with `sass-embedded`, update vite to 5.4 or later, and set [`css.preprocessorOptions.sass.api`](https://vitejs.dev/config/shared-options#css-preprocessoroptions) to `'modern-compiler'` in the vite config.

### Symlinks

PNPM and Yarn 2+ create symlinks to library files instead of copying them to node_modules, sass doesn't seem to like this and sometimes doesn't apply the configuration.

### sass-loader with `api: 'modern'`

You might have to write a custom importer plugin to load the settings file.
