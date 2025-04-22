---
meta:
  title: Theme
  description: Setup your application's theme and supplemental colors in a flash.
  keywords: theme, themes, theming, color, colors
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
features:
  github: /composables/theme.ts
  label: 'E: theme'
  report: true
---

# Theme configuration

Customize your application's default text colors, surfaces, and more. Easily modify your theme programmatically in real time. Vuetify comes with standard support for light and dark variants.

<PageFeatures />

<PromotedEntry />

## API

| Feature | Description |
| - | - |
| [useTheme](/api/use-theme/) | The theme composable allows you to get information about, and modify the current theme |
| [v-theme-provider](/api/v-theme-provider/) | The theme provider component modifies the theme of all its children |

<ApiInline hide-links />

## Setup

Vuetify includes three built-in themes: **light**, **dark**, and **system**. Use the **defaultTheme** option to specify your application's default theme. The following example sets the default theme to **dark**:

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark', // 'light' | 'dark' | 'system'
  },
})
```

## Changing theme

The theme instance has 3 functions to change the theme:

- **change**: Change to a specific name
- **toggle**: Toggle between two themes / defaults to light and dark
- **cycle**: Cycle between all or a specific subset of themes in any order

```html
<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Toggle between Light / Dark -->
        <v-btn
          @click="theme.toggle()"
          text="Toggle Light / Dark"
        ></v-btn>

        <!-- Change to a specific theme -->
        <v-btn
          @click="theme.change('dark')"
          text="Change to Dark"
        ></v-btn>

        <!-- Cycle between all themes -->
        <v-btn
          @click="theme.cycle()"
          text="Cycle All Themes"
        ></v-btn>

        <!-- Cycle between specific themes -->
        <v-btn
          @click="theme.cycle(['custom', 'light', 'system'])"
          text="Cycle Specific Themes"
        ></v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
</script>
```

<details>
<summary>Usage before v3.9</summary>

In versions before v3.9, you manually change the global name value on the theme instance:

```html { resource="src/App.vue" }
<template>
  <v-app>
    <v-btn @click="toggleTheme">toggle theme</v-btn>
    ...
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
```

</details>

<br>

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

### System theme

<DocIntroduced version="3.9.0" />

The **system** theme uses the user's system preference for 'light' or 'dark' mode, based on the **prefers-color-scheme** media query. It is evaluated at run-time and reacts to changes in the user's system preference.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'system',
  },
})
```

## Custom themes

Adding new themes is as easy as defining a new property in the **theme.themes** object. A theme is a collection of colors and options that change the overall look and feel of your application. One of these options designates the theme as being either a **light** or **dark** variation.

This makes it possible for Vuetify to implement Material Design concepts such as elevated surfaces having a lighter overlay color the higher up they are. Find out more about dark themes on the official [Material Design](https://material.io/design/color/dark-theme.html) page.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-bright': '#FFFFFF',
    'surface-light': '#EEEEEE',
    'surface-variant': '#424242',
    'on-surface-variant': '#EEEEEE',
    primary: '#1867C0',
    'primary-darken-1': '#1F5592',
    secondary: '#48A9A6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
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

Vuetify generates theme styles at runtime according to the given configuration. The generated styles are injected into the `<head>` section of the DOM in a `<style>` tag with a default **id** of `vuetify-theme-stylesheet`.

### Microfrontends

An application using microfrontends with multiple instances of Vuetify may need to define unique **theme.stylesheetId** values for each microfrontend in order to prevent conflicts between their generated stylesheets.
Further, such a scenario might require styles to be scoped to a specific microfrontend, which can be achieved by setting the **theme.scope** property.
For example, a microfrontend mounted in an element `#my-app` can define a **theme.scope** of `#my-app` to scope its styles to that element and its children instead of `:root` and global classes.
