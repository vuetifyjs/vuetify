---
meta:
  title: Presets
  description: Presets are Vue CLI plugins that drastically alter the look and feel of your Vuetify application.
  keywords: vuetify presets, custom material design
related:
  - /features/theme/
  - /features/sass-variables/
  - /styles/colors/
---

# Presets

For version 2 of the Material Design specification, Google created [Material studies](https://material.io/design/material-studies/about-our-material-studies.html) in order to explore real-world design limitations through fictional apps, each with their own unique properties and use cases. Vuetify presets integrate these studies through pre-configured framework options, SASS variables and custom styles that instantly change the look and feel of your application.

## Default preset

The default Vuetify preset provides all framework services with baseline values. Each object key corresponds to a service on the `$vuetify` object and can be overwritten via a **preset** or custom **user options** in the Vuetify constructor.

```js
// Styles
import '../../styles/main.sass'

// Locale
import { en } from '../../locale'

// Types
import { VuetifyPreset } from 'vuetify/types/services/presets'

export const preset: VuetifyPreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {},
  },
  lang: {
    current: 'en',
    locales: { en },
    t: undefined as any,
  },
  rtl: false,
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
}
```

## Material Studies

[Material Design](https://material.io/) is an opinionated visual language that can be overwhelming to work with when implementing highly customized designs. The new studies showcase the _flexibility_ of Material Theming and walk you through just how easy it is to create **unique** applications without the default Material appearance.

<alert type="info">

  Vuetify presets are an in progress feature that will be enhanced over time as Vuetify gains new functionality

</alert>

There are currently a total of **7 Material Studies** to choose from, each that have a corresponding preset plugin:

- [Basil](https://material.io/design/material-studies/basil.html)
- [Crane](https://material.io/design/material-studies/crane.html)
- [Fortnightly](https://material.io/design/material-studies/fortnightly.html)
- [Owl](https://material.io/design/material-studies/owl.html)
- [Rally](https://material.io/design/material-studies/rally.html)
- [Reply](https://material.io/design/material-studies/reply.html)
- [Shrine](https://material.io/design/material-studies/shrine.html)

### Installation

In your console run the following command <kbd>vue add vuetify-preset-{name}</kbd>— where `{name}` corresponds to one of the available [Material Studies](#material-studies). Once the plugin is installed, your **vuetify.js** file will be updated to include the selected preset.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  rtl: true,
  theme: { dark: true },
})
```

To start development, in the command line type <kbd>yarn serve</kbd> or <kbd>npm run serve</kbd>. The Vuetify service plugin will bootstrap into Vue CLI and automatically apply all of the variable and style changes from the preset. For more information on how the generator and service plugins' work, checkout the [Plugin Development Guide](#plugin-development-guide).

### Merging strategy

Vuetify options are merged from the top down—_Defaults, Preset and User_. The [default](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/presets/default/index.ts) preset is first merged with a provided **preset** property in the Vuetify constructor options. If applicable, user supplied options will then be merged with the global defaults and preset.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { preset } from 'vue-cli-plugin-vuetify-preset-shrine/preset'

Vue.use(Vuetify)

const options = {
  breakpoint: { scrollbarWidth: 12 },
  theme: {
    themes: {
      light: { primary: 'blue' },
    },
  },
}

export default new Vuetify({
  // The provided global preset is first merged with defaults
  preset,
  // User options are then merged, overwriting defaults and the global preset
  ...options,
})
```

## Limitations

Due to the [studies](https://material.io/design/material-studies/about-our-material-studies.html) being more visual than technical, presets are our _best-guess_ implementation. In many cases, styles and functionality must be inferred due to lack of information within the study's guidelines. There are also situations in which part of a study _**can not**_ or _**will not**_ be supported:

- It requires changes to the framework
- It's not currently possible with CSS
- We haven't figured out how to support it yet

### Google fonts

When you install a preset, it will update your main **public/index.html** file with only the fonts and weights it needs. For example, a study may only require `400,500,600` font weights. This would cause some helper classes in Vuetify to not work; e.g. `font-weight-thin` requires _300_ font weight. Weights can always be later modified by updating the font link in your `public.html`.

```html
<!-- You can add or remove font weights after the fact; e.g. Rubik:100,300,400,500 -->
<!-- The available weights for each font can be found on https://
fonts.google.com/ -->

<link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap" rel="stylesheet">
```

### Compilation time

In order to update SASS variables in Vuetify, styles are recompiled during development and when your application is built for production. This _will_ increase your initial compilation time and _will_ be triggered any time you edit a **variables** file. If your application isn't affected by any of the [Vuetify loader limitations](/features/treeshaking/#limitations), you can opt to import Vuetify from `vuetify/lib/framework`. This can decrease compilation time by up to _50%_.

```js
// src/plugins/vuetify.js

// CORRECT
import Vuetify from 'vuetify/lib/framework'

// INCORRECT
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

## Plugin development guide

A Vuetify preset is a npm package that provides framework wide options and custom styling using Vue CLI. It consists of a SASS variables file, a CSS overrides file and the Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) and [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html). Some of the features offered by presets are:

- configures framework options with **pre-defined** values — can use any combination of the available [Vuetify options](#default-preset)
- injects **custom SASS variables** for configuring existing Vuetify functionality; e.g. components. Presets use the [Vue CLI Plugin API](https://cli.vuejs.org/dev-guide/plugin-api.html#plugin-api) to hoist SASS variables during compilation
- provides **global overrides** for styling that is not coverable through variables
- a _streamlined approach_ to modifying a Vuetify application's style and options

```bash
# Vuetify preset plugin structure
.
├── generator.js        # generator (optional)
├── index.js            # service plugin
└── preset
    ├── index.js        # preset object
    ├── overrides.sass  # global overrides
    └── variables.scss  # SASS variables
```

<alert type="warning">

  A custom preset **can not** itself contain a _preset_ property.

</alert>

### Features

#### Generator

This file is a Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) that updates the **vuetify.js** file in your application to include the defined preset.

```js
// Imports
const {
  generatePreset,
  injectGoogleFontLink,
} = require('@vuetify/cli-plugin-utils')

// Updates the Vuetify object with provided preset
module.exports = api => generatePreset(api, 'preset-name', () => {
  // Invoked after the generator has completed.
  // A common use-case is adding font links

  // Will automatically apply the default font-weights
  // 100,300,400,500,700,900
  injectGoogleFontLink(api, 'Rubik')

  // Will only use the defined font-weights
  injectGoogleFontLink(api, 'Roboto:100,300,700')

  // Works the same as the above, but accepts multiple values
  injectGoogleFontLink(api, [
    'Rubik',
    'Roboto:100,300,700',
  ])
})
```

#### Entry file

This file is a Vue CLI [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html) that hooks into your application when running `yarn serve` or `npm run serve`. The `injectSassVariables` method injects the target file's variables into all SASS/SCSS files.

```js
// Imports
const { injectSassVariables } = require('@vuetify/cli-plugin-utils')

// Bootstraps Vue CLI with the target SASS variables
module.exports = api => injectSassVariables(
  api,
  // Path to the variables file
  'path/to/preset-plugin-variables.scss',
  // Modules to inject variables
  ['vue-modules', 'vue', 'normal-modules', 'normal'], // default
)
```

#### Vuetify options

This contains the framework configuration options that are passed to the Vuetify constructor. These options combine with any user supplied values and the [framework defaults](#default-preset).

```js
// preset/index.js

require('./overrides.sass')

const preset = {
  theme: {
    themes: {
      light: {
        primary: '#5D1049',
        secondary: '#E30425',
        accent: '#720D5D',
        error: '#F57C00',
      },
    },
  },
}

module.exports = { preset }
```

#### SASS variables

This is a SASS/SCSS variables file which will overwrite existing framework values. You can find more information about available variables on the [Vuetify SASS Variables](/features/sass-variables/#variable-api) documentation page or within the API section of a component.

```scss
// preset/variables.scss

// Shrine specific variables
$shrine-chip-border-radius: 4px;
$shrine-chip-border: thin solid black;
$shrine-chip-font-weight: 900;
$shrine-chip-padding: 0 8px;

// Preset variables
$body-font-family: 'Work Sans', sans-serif;
$border-radius-root: 6px;
$headings: (
  'h1': (
    'font-family': 'Roboto', sans-serif;
    'letter-spacing': 0
  )
);
$material-light: (
  'cards': #E0E0E0,
  'text': (
    'primary': rgba(0, 0, 0, .76),
    'secondary': grey
  )
);
```

#### CSS overrides

This is a catch all for style modifications that do not have corresponding variables to target. This is useful when you need to add new CSS properties to existing components.

```sass
// preset/overrides.sass

@import './variables.scss'

.theme--light
  .v-chip
    border-radius: $shrine-chip-border-radius
    border: $shrine-chip-border
    font-weight: $shrine-chip-font-weight
    padding: $shrine-chip-padding
    +elevation(0)
```

<backmatter />
