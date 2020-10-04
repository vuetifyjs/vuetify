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

Vuetify uses **SASS/SCSS** to craft the style and appearance of all aspects of the framework. Utilizing the _sass/scss data option_ of your `vue.config.js` file, you can optionally pass in custom variables to overwrite the global defaults. A list of available variables is located within each component's API section and in the [Variable API](#variable-api) of this page. This functionality is automatically handled by [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify).

<entry-ad />

<alert type="warning">

  Note: SASS/SCSS variables are only supported using when using the [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader). This is done automatically when using the [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) plugin.

</alert>

## Vue CLI install

If you have not installed Vuetify, check out the [quick-start guide](/getting-started/quick-start#vue-cli-3-install). Once installed, create a folder called `sass`, `scss` or `styles` in your src directory with a file named `variables.scss` or `variables.sass`. The **vuetify-loader** will automatically bootstrap your variables into Vue CLI's compilation process, overwriting the framework defaults.

When you run yarn serve, the vuetify-cli-plugin will automatically hoist the global Vuetify variables to all of your sass/scss files. When making changes to individual component variables, you will still need to manually include its variables file. You can find an example of a [custom variables](#example-variable-file) file below.

## Nuxt install

This section assumes that you have already followed our Nuxt guide on the [Quick start](/getting-started/installation/#nuxt-install) page. The Nuxt Vuetify module exposes a `vuetify` property where you can configure the module. Ensure that you enable the `treeShake` option first. This option will use [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) to enable automatic [treeshaking](/features/treeshaking). This is required for custom SASS variables to work. Then provide the `customVariables` file path option to customize SASS variables.

```js
// nuxt.config.js

export default {
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },
}
```

```scss
// assets/variables.scss

// Variables you want to modify
$btn-border-radius: 0px;

// Modifying a SASS map variable
$material-light: ( cards: blue );
```

## Webpack install

This section assumes you have already followed our Webpack guide on the [Quick start](/getting-started/quick-start#webpack-install) page. The option can vary depending upon the version of [sass-loader](https://github.com/webpack-contrib/sass-loader) you are use using. Ensure that you use the proper syntax when setting up the SASS/SCSS data options as they have different line endings. You can find more information about [additionalData](https://github.com/webpack-contrib/sass-loader#additionaldata) or [prependData](https://github.com/webpack-contrib/sass-loader/tree/v8.0.0#prependdata) on sass-loader's Github page.

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      // SASS has different line endings than SCSS
      // and cannot use semicolons in the markup
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss'"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss'"
            },
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
  },
}
```

## Variable API

There are many SASS/SCSS variables that can be customized across the entire Vuetify framework. You can browse all the variables using the tool below:

<sass-api />

## Example variable file

Below is an example of what a custom variable file could look like:

```scss
// src/sass/variables.scss

// Globals
$body-font-family: 'Work Sans', serif;
$border-radius-root: 6px;
$font-size-root: 14px;

// Variables must come before the import
$btn-letter-spacing: 0;
$btn-font-weight: 400;
$list-item-title-font-size: 0.929rem;
$list-item-dense-title-font-size: 0.929rem;
$list-item-dense-title-font-weight: initial;
$fab-icon-sizes: (
  'small': 20
);
$btn-sizes: (
  'default': 41,
  'large': 54
);

$headings: (
  'h1': (
    'size': 3.3125rem,
    'line-height': 1.15em
  ),
  'h2': (
    'size': 2.25rem,
    'line-height': 1.5em
  )
);
```

## Usage in templates

You can access [global](/api/$vuetify/) and **per** component variables in Vue templates by importing from the Vuetify package.

<alert type="info">

  Importing variable files works the same in **SASS** and **SCSS** style templates

</alert>

### Global variables

To access global SASS variables, import the main `styles.sass` file.

```html
<style lang="sass">
  @import '~vuetify/src/styles/styles.sass'

  @media #{map-get($display-breakpoints, 'md-and-down')}
    .custom-class
      display: none
</style>
```

A complete list of global variables is located on the [$vuetify](/api/vuetify/) API page.

### Component variables

To access per component SASS variables you must import its style file from the Vuetify package.

```html
<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';

  .custom-class {
    padding: $stepper-step-padding;
  }
</style>
```

Detailed variable information is located on each component's API page; e.g. [v-alert](/api/v-alert/#sass-variables).

<alert type="warning">

  When importing Vuetify styles, ensure that your import is prefixed with a tilde **~**; e.g. `~vuetify/src/.../_variables.scss`

</alert>

## Caveats

When using sass variables, there are a few considerations to be aware of.

### Duplicated CSS

Importing a regular stylesheet into a `variables` file will cause massive style duplication. In the following snippet, we have an `overrides.sass` file to modify the **text-transform** CSS property of [v-btn](/components/buttons/).

```sass
// src/styles/overrides.sass

.v-btn
  text-transform: capitalize
```

The following snippet is an example of what **NOT** to do.

```scss
// src/styles/variables.scss

// The following import will cause style duplication
@import './overrides.sass';

$card-border-radius: 6px;
$headings: (
  'h1': (
    'font-size': 2rem
  )
);
```

### Compilation time

When using variables, the initial compilation of your application will increase. This is due to the fact that styles are updated in real time whenever you make a modification to a hoisted variable file. This is only experienced with the initial compilation step and can be improved by changing where you import Vuetify from. Keep in mind this _will not_ work if your application is affected by any of the [Vuetify loader limitations](/features/treeshaking/#limitations); your application will still work, but not receive the performance increase.

```js
// src/plugins/vuetify.js

// CORRECT
import Vuetify from 'vuetify/lib/framework'

// INCORRECT
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

<backmatter />
