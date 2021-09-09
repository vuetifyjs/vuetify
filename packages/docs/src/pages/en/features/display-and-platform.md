---
meta:
  title: Display & Platform
  description: Access display viewport information using the Vuetify Breakpoint composable.
  keywords: breakpoints, grid breakpoints, platform details, screen size, display size
related:
  - /directives/resize/
  - /styles/display/
  - /styles/text-and-typography/
---

# Display & Platform

The **display** composable provides information on multiple aspects of the current device. This enables you to control various aspects of your application based upon the window size, device type, and SSR state. This composable works in conjunction with [grids](/components/grids/) and other responsive utility classes (e.g. [display](/styles/display/)).

<entry-ad />

<breakpoints-table />

## Usage

The following shows how to access the application's display information:

```html
<script>
  import { useDisplay } from 'vuetify'

  export default {
    mounted () {
      const display = useDisplay()

      console.log(display.mobile.value) // false
    }
  }
</script>
```

## API

- [display](/api/display)

## Options

The **display** composable has a numerous configuration options, such as the ability to define custom values for breakpoints.

For example, the **thresholds** option modifies the values used for viewport calculations. The following snippet overrides **thresholds** values *xs* through *lg* and sets **mobileBreakpoint** to `sm`.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
})
```

<alert type="info">

  The **mobileBreakpoint** option accepts numbers and breakpoint keys.

</alert>

## Examples

In the following example, we use a switch statement and the current breakpoint name to modify the **height** property of the [v-card](/components/cards/) component:

```html
<!-- Vue Component -->

<template>
  <v-card :height="height">
    ...
  </v-card>
</template>

<script>
  import { useDisplay } from 'vuetify'

  export default {
    computed: {
      height () {
        const { name } = useDisplay()

        // name is reactive and
        // must use .value
        switch (name.value) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
          case 'xxl': return 1200
        }
      },
    },
  }
</script>
```

### Interface

```ts
{
  // Breakpoints
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
  xxl: boolean
  smAndDown: boolean
  smAndUp: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xlAndDown: boolean
  xlAndUp: boolean

  // true if screen width < mobileBreakpoint
  mobile: boolean
  mobileBreakpoint: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

  // Current breakpoint name (e.g. 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl')
  name: string

  // The current value of window.innerHeight and window.innerWidth
  height: number
  width: number

  // Device userAgent information
  platform: {
    android: boolean
    ios: boolean
    cordova: boolean
    electron: boolean
    chrome: boolean
    edge: boolean
    firefox: boolean
    opera: boolean
    win: boolean
    mac: boolean
    linux: boolean
    touch: boolean
    ssr: boolean
  }

  // The values used to make Breakpoint calculations
  thresholds: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
}
```

## Using Setup

Use the **display** composable alongside Vue 3's `setup` function to harness the power of the [Composition API](https://v3.vuejs.org/guide/composition-api-setup.html). In this example we show how to bind the **display** composable to the **fullscreen** property of `v-dialog`.

```html
<template>
  <v-dialog :fullscreen="display.mobile.value">
    ...
  </v-dialog>
</template>

<script>
  import { useDisplay } from 'vuetify'

  export default {
    setup () {
      const display = useDisplay()

      return { display }
    },
  }
</script>
```

### JSX

Using JSX with setup can accomplish the same thing as a template. The following example shows how to bind the same **fullscreen** property, but using JSX:

```tsx
import { useDisplay } from 'vuetify'

export default {
  setup () {
    const display = useDisplay()

    return () => {
      return (
        <v-dialog fullscreen={ display.mobile.value }>
          ...
        </v-dialog>
      )
    }
  },
}
```

### Breakpoint conditionals

Breakpoint and conditional values return a `boolean` that is derived from the current viewport size. Additionally, the **breakpoint** composable mimics the [Vuetify Grid](/components/grids) naming conventions and has access to properties such as **xlOnly**, **xsOnly**, **mdAndDown**, and many others. In the following example we use the `setup` function to pass the _xs_ and _mdAndUp_ values to our template:

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="mdAndUp ? 300 : '20vh'"
    :rounded="xs"
  >
    ...
  </v-sheet>
</template>

<script>
  import { useDisplay } from 'vuetify'

  setup () {
    // Destructure only the keys we want to use
    const { xs, mdAndUp } = useDisplay()

    return { xs, mdAndUp }
  }
</script>
```

Using the _dynamic_ display values, we are able to adjust the minimum height of [v-sheet](/components/sheets/) to `300` when on the _medium_ breakpoint or greater and only show rounded corners on _extra small_ screens:

## Component Mobile Breakpoints

Some components within Vuetify have a **mobile-breakpoint** property which allows you to override the default value. These components reference the global [mobileBreakpoint](#mobile-breakpoint) value that is generated at runtime using the provided options in the `vuetify.js` file. By default, **mobileBreakpoint** is set to `md`, which means that if the window is less than _1280_ pixels in width (which is the default value for the **md** [threshold](#thresholds)), then the **display** composable will update its **mobile** value to `true`.

For example, the [v-banner](/components/banners/) component implements different styling based upon the value of **mobile** on the **display** composable. In the following example, The first banner uses the global **mobile-breakpoint** value of `md` while the second overrides this default with `580`. If the screen width is 1024 pixels, the second banner would not convert into its mobile state:

```html
<template>
  <div>
    <v-banner>
      ...
    </v-banner>

    <v-banner mobile-breakpoint="580">
      ...
    </v-banner>
  </div>
</template>

<script>
  export default {
    mounted () {
      const display = useDisplay()

      console.log(display.width.value) // 960
      console.log(display.mobile.value) // true
    }
  }
</script>
```

<backmatter />
