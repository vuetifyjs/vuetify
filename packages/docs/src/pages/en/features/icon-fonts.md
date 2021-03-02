---
meta:
  title: Icon Fonts
  description: Vuetify supports Material Design Icons, Font awesome and other icon sets through prefixes and global options.
  keywords: vue icon component, iconfont, icon libraries, vuetify icons
related:
  - /components/icons/
  - /components/buttons/
  - /components/avatars/
---

# Icon Fonts

Vuetify comes with support for Material Design Icons, Material Icons, Font Awesome 4 and Font Awesome 5. By default, applications will use [Material Design Icons](https://materialdesignicons.com/).

<entry-ad />

## Usage

In order to change your font library, you will need to either import one of our pre-defined icon sets, or provide your own.

```js
// src/plugins/vuetify.js

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'

export default new createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})
```

```html
<template>
  <v-icon icon="mdi-home" />
</template>
```

In the above example we are importing the provided `mdi` icon set and its aliases. The aliases are utilized to know which icon in a set is to be used when representing common actions such as close or expand in our internal components.

<alert type="info">

  While it is still possible to supply the icon value throught the default slot in Vuetify 3.0 (`<v-icon>mdi-home</v-icon>`), we recommend that you use the `icon` prop instead.

</alert>

## Multiple icon sets

You can of course use multiple icon sets at the same time. In the example below, the `fa` set is used as the default set, with `mdi` available as an extra set.

```js
// src/plugins/vuetify.js

import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/src/iconsets/fa'
import { mdi } from 'vuetify/src/iconsets/mdi'

export default new createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    }
  },
})
```

```html
<template>
  <v-icon icon="fas fa-plus" /> // This will render a FontAwesome icon
  <v-icon icon="mdi:mdi-minus" /> // This will render an MDI icon
</template>
```

Note the `mdi:` prefix used for the second icon. It is necessary to provide the correct prefix when you want to render icons not from the default icon set.

## Installing icon fonts

You are required to include the specified icon library (even when using the default icons from [Material Design Icons](https://materialdesignicons.com/)). This can be done by including a CDN link or importing the icon library into your application.

<alert type="info">

  In this page "Material Icons" is used to refer to the [official google icons](https://material.io/resources/icons/) and "Material Design Icons" refers to the [extended third-party library](https://materialdesignicons.com/)

</alert>

### Material Design Icons

This is the default icon set for Vuetify. You can include it through a CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
```

Or as a local dependency:

```bash
$ yarn add @mdi/font -D
// OR
$ npm install @mdi/font -D
```

```js
// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify/lib'

export default new createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
```

Use this tool to search for any Material Design Icons and copy them to your clipboard by clicking the item.

<icon-list />

### Material Design Icons - JS SVG

Use the SVG paths as designated in [@mdi/js](https://www.npmjs.com/package/@mdi/js). This is the recommended installation when optimizing your application for production.

```bash
$ yarn add @mdi/js -D
// OR
$ npm install @mdi/js -D
```

```js
// src/plugins/vuetify.js

import { createVuetify } from 'vuetify/lib'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi-svg'

export default new createVuetify({
  icons: {
    iconfont: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
```

You can choose to import only the icons that you need, giving you a much smaller bundle size.

```html
<template>
  <v-icon :icon="mdiAccount" />
</template>

<script>
  import { mdiAccount } from '@mdi/js'

  export default {
    data: () => ({
      mdiAccount
    }),
  }
</script>
```

### Material Icons

For projects without a build process, it is recommended to import the icons from CDN

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
```

Alternatively, it is possible to install locally using yarn or npm. Keep in mind that this is not an official google repository and may not receive updates

```bash
$ yarn add material-design-icons-iconfont -D
// OR
$ npm install material-design-icons-iconfont -D
```

```js
// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify/lib'
import { aliases, md } from 'vuetify/src/iconsets/md'

export default new createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})
```

```html
<template>
  <v-icon icon="home" />
</template>
```

Some Material Icons are missing by default. For example, `person` and `person_outline` are available, but `visibility_outline` isn't, while `visibility` is. To use the missing icons, replace the existing `<link>` with the following one.

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
/>
```

### Font Awesome 5 Icons

The easiest way to get started with **FontAwesome** is to use a CDN.

```html
<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
```

To install locally you can pull in the [Free](https://fontawesome.com/) version of **FontAwesome** using your preferred package manager:

```bash
$ yarn add @fortawesome/fontawesome-free -D
// OR
$ npm install @fortawesome/fontawesome-free -D
```

```js
// src/plugins/vuetify.js

import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/src/iconsets/fa'

Vue.use(Vuetify)

export default new createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
```

```html
<template>
  <v-icon icon="fas fa-home" />
</template>
```

### Font Awesome 4 Icons

The easiest way to get started with **FontAwesome** is to use a CDN.

```html
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">
```

To install FontAwesome **4** locally is the same as its newer version, just from a different package. You will be using the `font-awesome` package as opposed to `@fortawesome`.

```bash
$ yarn add font-awesome@4.7.0 -D
// OR
$ npm install font-awesome@4.7.0 -D
```

```js
// src/plugins/vuetify.js

import 'font-awesome/css/font-awesome.min.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/src/iconsets/fa4'

export default new createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    }
  },
})
```

```html
<template>
  <v-icon icon="fa-check" />
</template>
```

### Font Awesome SVG Icons

Install the following packages.

```bash
$ yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
// or
$ npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
```

Then register the global `font-awesome-icon` component and use the pre-defined `fa-svg` icon set. If you have access to Font Awesome Pro icons they can be added to the library in the same way.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/src/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons

export default new createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
```

```html
<template>
  <v-icon icon="fas fa-home" />
</template>
```

## Creating a custom icon set

As previously mentioned you can easily create your own icon set, as shown below. An icon set consists of an object with one property `component` which should be a functional component that receives props of type `IconsProps`.

If this new custom icon set is supposed to be your default set, then you should also supply the necessary `aliases` so that Vuetify components know what icons to render.

```ts
// src/iconsets/custom.ts
import { h } from 'vue'
import type { IconSet, IconAliases, IconProps } from 'vuetify'

const aliases: IconAliases = {
  complete: '...',
  cancel: '...',
  close: '...',
  delete: '...',
  clear: '...',
  success: '...',
  info: '...',
  warning: '...',
  error: '...',
  prev: '...',
  next: '...',
  checkboxOn: '...',
  checkboxOff: '...',
  checkboxIndeterminate: '...',
  delimiter: '...',
  sort: '...',
  expand: '...',
  menu: '...',
  subgroup: '...',
  dropdown: '...',
  radioOn: '...',
  radioOff: '...',
  edit: '...',
  ratingEmpty: '...',
  ratingFull: '...',
  ratingHalf: '...',
  loading: '...',
  first: '...',
  last: '...',
  unfold: '...',
  file: '...',
  plus: '...',
  minus: '...',
}

const custom: IconSet = {
  component: (props: IconProps) => h(...),
}

export { aliases, custom }
```

```js
// src/plugins/vuetify.js
import { createVuetify } from 'vuetify'
import { aliases, custom } from '../iconsets/custom'

export default createVuetify({
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  }
})
```

## Extending available aliases

If you are developing custom Vuetify components, you can extend the `aliases` object to utilize the same functionality that internal Vuetify components use. Icon aliases are referenced with an initial `$` followed by the name of the alias, e.g. `$product`.

```js
// src/plugins/vuetify.js

import { createVuetify } from 'vuetify/lib'
import { aliases, mdi } from 'vuetify/src/iconsets/mdi'

export default new createVuetify({
  icons: {
    aliases: {
      ...aliases,
      product: 'mdi-dropbox',
      support: 'mdi-lifebuoy',
    },
  },
})
```

```html
<template>
  <v-icon icon="$product" />
  <v-icon icon="$support" />
</template>
```

<backmatter />
