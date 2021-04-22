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
  // Composables
  import { useDisplay } from 'vuetify/lib/composables/display'

  export default {
    mounted () {
      const display = useDisplay()

      console.log(display.mobile.value) // false
    }
  }
</script>
```

## Options

The **display** composable has a numerous configuration options, such as the ability to define custom values for breakpoints.

For example, the `thresholds` option modifies the values used for viewport calculations. The following snippet overrides *xs* through *lg* values, mobileBreakpoint, and increases `scrollbarWidth`.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollbarWidth: 24,
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
  // Composables
  import { useDisplay } from 'vuetify/lib/composables/display'

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
  smAndDown: boolean
  smAndUp: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgAndDown: boolean
  lgAndUp: boolean

  // true if screen width < mobileBreakpoint
  mobile: boolean
  mobileBreakpoint: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // Current breakpoint name (e.g. 'xs' | 'sm' | 'md' | 'lg' | 'xl')
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
    intersection: boolean
    touch: boolean
    ssr: boolean
  }

  // Browser scrollbar width
  scrollbarWidth: number

  // The values used to make Breakpoint calculations
  thresholds: {
    xs: number
    sm: number
    md: number
    lg: number
  }
}
```

## API

### xs

This value indicates that the device width greater than the **xs** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### sm

This value indicates that the device width is between the **xs** and **sm** threshold values.

* **Type:** `boolean`
* **Default:** `false`

### md

This value indicates that the device width is between the **sm** and **md** threshold values.

* **Type:** `boolean`
* **Default:** `false`

### lg

This value indicates that the device width is between the **md** and **lg** threshold values.

* **Type:** `boolean`
* **Default:** `false`

### xl

This value indicates that the device width greater than the **lg** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### smAndDown

This value indicates that the device width less than the **sm** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### smAndUp

This value indicates that the device width greater than the **sm** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### mdAndDown

This value indicates that the device width less than the **md** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### mdAndUp

This value indicates that the device width greater than the **md** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### lgAndDown

This value indicates that the device width less than the **lg** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### lgAndUp

This value indicates that the device width greater than the **lg** threshold value.

* **Type:** `boolean`
* **Default:** `false`

### name

The name key correlates to the currently active breakpoint; e.g. **xs**, **sm**, **md**, **lg**, **xl**.

* **Type:** `string`
* **Default:** `""`

### height

This value is the current window height.

* **Type:** `number`
* **Default:** `0`

### width

This value is the current window width.

* **Type:** `number`
* **Default:** `0`

### mobile

This value indicates whether the current display width is less than the defined [mobileBreakpoint](#mobile-breakpoint)

* **Type:** `boolean`
* **Default:** `false`

### mobileBreakpoint

This value indicates whether the current display width is less than the defined [mobileBreakpoint](#mobile-breakpoint)

* **Type:** `number | string`
* **Default:** `"md"`

### platform

This object contains information from the detected device's [userAgent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) and whether it supports [touch]() and [intersection]().

* **Type:** `object`
* **Default:**

  ```js
    {
      android: false,
      ios: false,
      cordova: false,
      electron: false,
      edge: false,
      firefox: false,
      opera: false,
      win: false,
      mac: false,
      linux: false,
      intersection: false,
      touch: false,
      ssr: false,
    }
  ```

### scrollbarWidth

This value is the width of the browser scrollbar.

* **Type:** `number`
* **Default:** `16`

### thresholds

This object is used for device viewport calculations.

* **Type:** `object`
* **Default:**

  ```js
    {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
      xl: 3840,
    }
  ```

* **Usage:**

  ```js
    // Composables
    import { useDisplay } from 'vuetify/lib/composables/display'

    export default {
      mounted () {
        const display = useDisplay()

        // display thresholds are not reactive
        // and do not need to use .value
        console.log(display.thresholds.md) // 1280
      }
    }
  ```

## Using Setup

Setup is a new feature of Vue 3 that enables more control over the

```html
<template>
  <v-dialog :fullscreen="display.mobile.value">
    ...
  </v-dialog>
</template>

<script>
  // Composables
  import { useDisplay } from 'vuetify/lib/compsables/display'

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
// Composables
import { useDisplay } from 'vuetify/lib/composables/display'

export default {
  setup () {
    const display = useDisplay()

    return () => {
      return (
        <v-dialog fullscreen={display.mobile.value}>
          ...
        </v-dialog>
      )
    }
  },
}
```

### Breakpoint conditionals

The breakpoint and conditional values return a `boolean` that is derived from the current viewport size. Additionally, the breakpoint composable mimics the [Vuetify Grid](/components/grids) naming conventions and has access to properties such as `xlOnly`, `xsOnly`, `mdAndDown`, and others. In the following example we use the **setup** function to pass the **xs** and **mdAndUp** values to our template:

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="mdAndUp.value ? 300 : '20vh'"
    :rounded="xs.value"
  >
    ...
  </v-sheet>
</template>

<script>
  // Composables
  import { useDisplay } from 'vuetify/lib/composables/display'

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
