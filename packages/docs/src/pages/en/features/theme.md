---
meta:
  title: Theme
  description: Setup your application's theme and supplemental colors in a flash.
  keywords: theme, themes, theming, color, colors
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
---

# Theme configuration

Customize your application's default text colors, surfaces, and more. Easily modify your theme programmatically in real time. Vuetify comes with standard support for light and dark variants.

<entry />

<promoted slug="vuemastery-themes" />

## API

| Feature | Description |
| - | - |
| [useTheme](/api/use-theme/) | The theme composable allows you to get information about, and modify the current theme |
| [v-theme-provider](/api/v-theme-provider/) | The theme provider component modifies the theme of all its children |

<api-inline hide-links />

## Setup

Vuetify comes with two themes pre-installed, `light` and `dark`. To set the default theme of your application, use the **defaultTheme** option.

### Javascript

Example with only the **defaultTheme** value

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})
```

Adding new themes is as easy as defining a new property in the **theme.themes** object. A theme is a collection of colors and options that change the overall look and feel of your application. One of these options designates the theme as being either a **light** or **dark** variation.
This makes it possible for Vuetify to implement Material Design concepts such as elevated surfaces having a lighter overlay color the higher up they are. Find out more about dark themes on the official [Material Design](https://material.io/design/color/dark-theme.html) page.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify, ThemeDefinition } from 'vuetify'

const myCustomLightTheme = {
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
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
```

### Typescript

Example with only the **defaultTheme** value

```ts { resource="src/plugins/vuetify.ts" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
```

When using Typescript you may use the `ThemeDefinition` type to get type hints for the structure of the theme object.

```ts { resource="src/plugins/vuetify.ts" }
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
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
```

## Changing theme

This is used when you need to change the theme during runtime

```html
<template>
  <v-app>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    ...
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  },
}
</script>
```

You should keep in mind that most of the Vuetify components support the **theme** prop. When used a new context is created for _that_ specific component and **all** of its children. In the following example, the [v-btn](/components/buttons/) uses the **dark** theme because it is applied to its parent [v-card](/components/cards/).

```html
<template>
  <v-app>
    <v-card theme="dark">
      <!-- button uses dark theme -->
      <v-btn>foo</v-btn>
    </v-card>
  </v-app>
</template>
```

You can use the `<v-theme-provider>` component to dynamically apply different themes to larger sections of your application, without having to set the **theme** prop on each individual component. In the following example, we apply a custom theme named `high-contrast`.

```html
<template>
  <v-app>
    <!-- uses the current default theme -->
    <v-card>...</v-card>

    <v-theme-provider theme="high-contrast">
      <!-- uses the high-contrast theme -->
      <v-card>...</v-card>
      <v-btn>...</v-btn>
    </v-theme-provider>
  </v-app>
</template>
```

## Custom theme colors

The Vuetify theme system supports adding custom colors. When configuring the Vuetify theme settings, add your custom colors to the **colors** object and Vuetify will generate a number of CSS classes and variables for you to use in your application.

```js { resource="src/plugins/vuetify.js" }
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
          something: '#00ff00',
        },
      },
    },
  },
})
```

Custom properties for colors are a list of `red, green, blue`, so the `rgb()` or `rgba()` function has to be used:

```html
<template>
  <div class="bg-something on-something">background color with appropriate text color contrast</div>

  <div class="text-something">text color</div>

  <div class="border-something">border color</div>
</template>

<style>
  .custom-class {
    background: rgb(var(--v-theme-something))
    color: rgba(var(--v-theme-on-something), 0.9)
  }
</style>
```

## Color variations

The Vuetify theme system can help you generate any number of **variations** for the colors in your theme. The following example shows how to generate 1 lighten and 2 darken variants for the `primary` and `secondary` colors.

```js { resource="src/plugins/vuetify.js" }
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
      //
    },
  },
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

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: false,
})
```

## Theme object structure

```ts
interface ThemeInstance {
  /**
   * Raw theme objects
   * Can be mutated to add new themes or update existing colors
   */
  themes: Ref<{ [name: string]: ThemeDefinition }>

  /**
   * Name of the current theme
   * Inherited from parent components
   */
  readonly name: Ref<string>

  /** Processed theme object, includes automatically generated colors */
  readonly current: Ref<ThemeDefinition>
  readonly computedThemes: Ref<{ [name: string]: ThemeDefinition }>

  readonly global: {
    /** Name of the current global theme */
    name: Ref<string>

    /**
     * Processed theme object of the current global theme
     * Equivalent to `theme.computedThemes.value[theme.global.name.value]`
     */
    readonly current: Ref<ThemeDefinition>
  }
}
```

## CSP Nonce

Pages with the `script-src` or `style-src` CSP rules enabled may require a **nonce** to be specified for embedded style tags.

```html
<!-- Use with script-src -->
Content-Security-Policy: script-src 'self' 'nonce-dQw4w9WgXcQ'

<!-- Use with style-src -->
Content-Security-Policy: style-src 'self' 'nonce-dQw4w9WgXcQ'
```

```ts
// src/plugins/vuetify.js

import {createVuetify} from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    cspNonce: 'dQw4w9WgXcQ',
  },
})
```

## Implementation

Vuetify generates theme styles at runtime according to the given configuration. The generated styles are injected into the `<head>` section of the DOM in a `<style>` tag with an **id** of `vuetify-theme-stylesheet`.
