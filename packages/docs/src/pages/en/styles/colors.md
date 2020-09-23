---
meta:
  title: Material color palette
  description: Learn about the colors of Material Design. Consume the javascript color pack directly in your application.
  keywords: colors, material design colors, vuetify color pack, material color classes
related:
  - /features/theme/
  - /resources/themes/
  - /getting-started/wireframes/
---

# Colors

Out of the box you get access to all colors in the [Material Design spec](https://material.io/guidelines/style/color.html) through **sass** and **javascript**. These values can be used within your style sheets, your component files and on actual components via the **color class** system.

<entry-ad />

## Classes

Each color from the spec gets converted to a **background** and **text** variant for styling within your application through a class, e.g. `<div class="red">` or `<span class="red--text">`. These class colors are defined [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/settings/_colors.scss).

<example file="color/classes" />

Text colors also support **darken** and **lighten** variants using `text--{lighten|darken}-{n}`

<example file="color/text-classes" />

## Javascript color pack

Vuetify has an optional javascript color pack that you can import and use within your application. This can also be used to help define your application's theme.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})
```

## Sass color pack

While convenient, the color pack increases the CSS export size by ~30kb. Some projects may only require the default provided classes that are created at run-time from the Vuetify bootstrap. To disable this feature, you will have to _manually_ import and build the main **sass** file. This will require a [Sass loader](https://github.com/webpack-contrib/sass-loader) and a `.sass`/`.scss` file entry.

```sass
// src/sass/main.scss

$color-pack: false;

@import '~vuetify/src/styles/main.sass';
```

Your created `main.sass` file will then need to be included in your project.

```js
// src/index.js

import './src/sass/main.scss'
// OR
require('./src/sass/main.scss')
```

<alert type="error">

  You **must** configure your webpack setup to use `sass`. If you are using a [pre-made template](/getting-started/quick-start#vue-cli-install) this will already be done for you.

</alert>

This can also be done within your main **App.vue** file. Keep in mind, depending on your project setup, this _will_ increase build times as every time your entry file is updated, the Sass files will be re-generated.

```html
<style lang="sass">
  $color-pack: false;

  @import '~vuetify/src/styles/main.sass';
</style>
```

## Material colors

Below is a list of the Material design color palette grouped by primary color

<color-palette />

<backmatter />
