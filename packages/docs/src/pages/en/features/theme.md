---
meta:
  title: Theme configuration
  description: Setup your application's theme and supplemental colors in a flash.
  keywords: themes
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
nav: Theme
---

# Theme configuration

Easily change the colors of your application programmatically. Vuetify supports multiple themes with light and dark variants.

<promoted-ad slug="vuemastery-themes" />

## Setup

Vuetify comes with two themes pre-installed, `light` and `dark`. To set the default theme of your application, use the **defaultTheme** option.

```js
// src/plugins/vuetify.js
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})
```

Adding new themes is as easy as defining a new property in the **theme** object. A theme is a collection of colors and options that change the overall look and feel of your application. One of these options designates the theme as being either a **light** or **dark** variation. This makes it possible for Vuetify to implement Material Design concepts such as elevated surfaces having a lighter overlay color the higher up they are. Find out more about dark themes on the official [Material Design](https://material.io/design/color/dark-theme.html) page.

Use the `ThemeDefinition` type to get type hints for the structure of the theme object.

```ts
// src/plugins/vuetify.ts
import { createApp } from 'vue'
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})
```

## Changing theme

To dynamically change theme during runtime, add the **theme** prop to the `<v-app>` component.

```html
<template>
  <v-app :theme="theme">
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    ...
  </v-app>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const theme = ref('light')

    return {
      theme,
      toggleTheme: () => theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
  }
}
</script>
```

Use the `<v-theme-provider>` component to apply different themes to different sections of your application. In the following example, we apply a custom theme named `high-contrast`:

```html
<template>
  <v-app>
    <!-- uses the current default theme -->
    <v-card>...</v-card>

    <v-theme-provider theme="high-contrast">
      <!-- uses the high-contrast theme -->
      <v-card>
         ...
      </v-card>
    </v-theme-provider>
  </v-app>
</template>
```

## Custom theme colors

The Vuetify theme system supports adding custom colors. For any property added to the **colors** object, Vuetify will generate a number of css classes and variables for you to use in your application.

```js
// src/plugins/vuetify.js
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          ..., // We have omitted the standard color properties here to emphasize the custom one that we've added
          green: '#00ff00'
        }
      }
    }
  }
})
```

```html
<template>
  <div class="bg-green on-green">background color with appropriate text color contrast</div>

  <div class="text-green">text color</div>

  <div class="border-green">border color</div>
</template>

<style>
  .custom-class {
    background: var(--v-theme-green)
    color: var(--v-theme-on-green)
  }
</style>
```

## Color variations

If you don't want to be bothered with coming up with lighten/darken variations of your colors, you can let Vuetify generate them for you using the **variations** property. The following configuration will generate 1 lighten variant and 2 darken variants for the `primary` and `secondary` colors.

```js
// src/plugins/vuetify.js
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes: {
      ...
    }
  }
})
```

```html
<template>
  <div class="text-primary-lighten-1">text color</div>

  <div class="text-primary-darken-1">text color</div>

  <div class="text-primary-darken-2">text color</div>
</template>
```

## Disable theme

The theme functionality can be disabled by setting the **theme** configuration property to `false`. This prevents the creation of the Vuetify stylesheet, and theme classes will not be applied to components.

```js
// src/plugins/vuetify.js
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: false,
})
```

## Implementation

Vuetify generates theme styles at run-time according to the given configuration. The generated styles will be placed in the `<head>` section of you markup in a `<style>` tag with an **id** of `vuetify-theme-stylesheet`.

<backmatter />
