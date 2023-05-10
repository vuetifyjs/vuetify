---
meta:
  title: Icon Fonts
  description: Vuetify supports Material Design Icons, Font awesome and other icon sets through prefixes and global options.
  keywords: vue icon component, iconfont, icon libraries, vuetify icons
related:
  - /components/icons
  - /components/buttons
  - /components/avatars
---

# Icon Fonts

Out of the box, Vuetify supports 4 popular icon font libraries—[Material Design Icons](https://materialdesignicons.com/), [Material Icons](https://fonts.google.com/icons), [Font Awesome 4](https://fontawesome.com/v4.7.0/) and [Font Awesome 5](https://fontawesome.com/).

<entry />

## Usage

To change your font library, import one of the pre-defined icon sets or provide your own.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
```

```html

<template>
  <v-icon icon="mdi-home" />
</template>

```

In the above examples we import the default `mdi` icon set and its corresponding aliases. These aliases reference commonly used types of icons that are utilized by Vuetify components.

<alert type="info">

  While it is still possible to supply the icon value through the default slot in Vuetify 3.0 (`<v-icon>mdi-home</v-icon>`), we recommend using the `icon` prop instead.

</alert>

### Multiple icon sets

Out of the box, Vuetify supports the use of multiple *different* icon sets at the same time. The following example demonstrates how to change the default icon font to Font Awesome (`fa`) while still maintaining access to the original Material Design Icons (`mdi`) through the use of a prefix:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
})
```

```html
<template>
  <v-icon icon="fas fa-plus" /> // This renders a FontAwesome icon
  <v-icon icon="mdi:mdi-minus" /> // This renders a MDI icon
</template>
```

<alert type="info">

  It is not necessary to provide a prefix (such as `mdi:`) for icons from the default icon set

</alert>

## Installing icon fonts

You are required to include the specified icon library (even when using the default icons from [Material Design Icons](https://materialdesignicons.com/)). This can be done by including a CDN link or importing the icon library into your application.

<alert type="info">

  In this page "Material Icons" is used to refer to the [official google icons](https://fonts.google.com/icons) and "Material Design Icons" refers to the [extended third-party library](https://materialdesignicons.com/)

</alert>

### Material Design Icons

This is the default icon set used by Vuetify. It supports local installation with a build process or a CDN link. The following shows how to add the CDN link to your `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
```

Or as a local dependency:

```bash
$ yarn add @mdi/font -D
// OR
$ npm install @mdi/font -D
```

```js { resource="src/plugins/vuetify.js" }
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
```

<alert type="error">

  **DO NOT** use a CDN link without specifying a package *version*. Failure to do so can result in unexpected changes to your application with new releases.

</alert>

Use this tool to search for any Material Design Icons and copy them to your clipboard by clicking the item.

<!-- <icon-list /> -->

### Material Design Icons - JS SVG

This is the recommended installation when optimizing your application for production, as only icons used for
Vuetify components internally will be imported into your application bundle. You will need to provide your
own icons for the rest of the app.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
```

`@mdi/js` or [unplugin-icons](https://github.com/antfu/unplugin-icons) are two alternatives to get the
rest of the icons that you will need in your application.

If you want to stick with `@mdi/js`, use the SVG paths as designated in [@mdi/js](https://www.npmjs.com/package/@mdi/js) and
only import the icons that you need.
The following example shows how to use an imported icon within a `.vue` SFC template:

```bash
$ yarn add @mdi/js -D
// OR
$ npm install @mdi/js -D
```

```html
<template>
  <v-icon :icon="mdiAccount" />
</template>

<script setup>
  import { mdiAccount } from '@mdi/js'
</script>
```

Or the icons you want to use can be added as aliases to simplify reuse:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAccount } from '@mdi/js'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
    },
    sets: {
      mdi,
    },
  },
})
```

```html
<template>
  <v-icon icon="$account" />
</template>
```

### Material Icons

For projects without a build process, it is recommended to import the icons from CDN.

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
```

Some Material Icons are missing by default. For example, `person` and `person_outline` are available, but `visibility_outline` isn't, while `visibility` is. To use the missing icons, replace the existing `<link>` with the following:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
/>
```

Alternatively, it is possible to install locally using yarn or npm. Keep in mind that this is not an official google repository and may not contain all icons.

```bash
$ yarn add material-design-icons-iconfont -D
// OR
$ npm install material-design-icons-iconfont -D
```

```js { resource="src/plugins/vuetify.js" }
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

export default createVuetify({
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

### Font Awesome 5 Icons

The easiest way to get started with **FontAwesome** is to use a CDN.

```html
<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
```

To install locally you can pull in the [free](https://fontawesome.com/) version of **FontAwesome** using your preferred package manager:

```bash
$ yarn add @fortawesome/fontawesome-free -D
// OR
$ npm install @fortawesome/fontawesome-free -D
```

```js { resource="src/plugins/vuetify.js" }
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

export default createVuetify({
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

<alert type="error">

  The JavaScript version (`all.js`) of the FontAwesome icons will **NOT** work with Vue

</alert>

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

```js { resource="src/plugins/vuetify.js" }
import 'font-awesome/css/font-awesome.min.css' // Ensure your project is capable of handling css files
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa4'

export default createVuetify({
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

```js { resource="src/main.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa-svg'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const app = createApp()

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons

const vuetify = createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

app.use(vuetify)

app.mount('#app')
```

```html
<template>
  <v-icon icon="fas fa-home" />
</template>
```

## Creating a custom icon set

An icon set consists of an object with one property `component` which should be a functional component that receives props of type `IconsProps`, and renders an icon.

In order to use a custom set as the default icon set, you must also add the necessary *aliases* that correspond to values used by Vuetify components.

```ts { resource="src/iconsets/custom.ts" }
import { h } from 'vue'
import type { IconSet, IconAliases, IconProps } from 'vuetify'

const aliases: IconAliases = {
  collapse: '...',
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

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, custom } from '../iconsets/custom'

export default createVuetify({
  icons: {
    defaultSet: 'custom',
    aliases,
    sets: {
      custom,
    },
  },
})
```

## Extending available aliases

If you are developing custom Vuetify components, you can extend the `aliases` object to utilize the same functionality that internal Vuetify components use. Icon aliases are referenced with an initial `$` followed by the name of the alias, e.g. `$product`.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
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
