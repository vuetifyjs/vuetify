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

Out of the box you get access to all colors in the [Material Design specification](https://material.io/design/color/the-color-system.html) through **sass** and **javascript**. These values can be used within your style sheets, your component files and on actual components via the **color** prop.

<entry />

## Classes

Each color from the specification gets converted to a **background** and **text** variant for styling within your application through a class, e.g. `<div class="bg-red">` or `<span class="text-red">`. These class colors are defined [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/styles/settings/_colors.scss).

<example file="color/classes" />

Text colors also support **darken** and **lighten** variants using `text-{color}-{lighten|darken}-{n}`

<example file="color/text-classes" />

## Javascript color pack

Vuetify has an optional javascript color pack that you can import and use within your application. This can also be used to help define your application's theme.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'

import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.red.darken1, // #E53935
          secondary: colors.red.lighten4, // #FFCDD2
          ...
        }
      },
    },
  },
})
```

## Sass color pack

While convenient, the color pack increases the CSS export size by ~30kb. Some projects may only require the classes that are created at runtime from the Vuetify **theme** system. To disable the color pack feature, follow [sass variables](/styles/sass-variables) and set `$color-pack: false`{.text-no-wrap}.

```scss { resource="main.scss" }
@use 'vuetify' with (
  $color-pack: false,
);
```

## Material colors

Below is a list of the Material design color palette grouped by primary color

<color-palette />
