---
meta:
  title: Display Breakpoints
  description: Access display viewport information using the Vuetify Breakpoint service.
  keywords: breakpoints, grid breakpoints
---

# Display Breakpoints

With Vuetify you can control various aspects of your application based upon the `window` size. This service works in conjunction with [grids](/components/grids/) and other responsive helper classes (i.e. [display](/styles/display/)).

<entry-ad />

## Breakpoint service

The **breakpoint service** is a programmatic way of accessing viewport information. It exposes a number of properties on the `$vuetify` object for usage in the **template** and **script** section of Vue components. The following snippet uses the `name` property to modify the **height** property of the [v-card](/components/cards/) component:

```html
<!-- Vue Component -->

<template>
  <v-card :height="height">
    ...
  </v-card>
</template>

<script>
  export default {
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
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

### Breakpoint service object

The following is the public signature for the breakpoint service:

```ts
{
  // Breakpoints
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean

  // Conditionals
  xsOnly: boolean
  smOnly: boolean
  smAndDown: boolean
  smAndUp: boolean
  mdOnly: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgOnly: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xlOnly: boolean

  // true if screen width < mobileBreakpoint
  mobile: boolean
  mobileBreakpoint: number

  // Current breakpoint name (e.g. 'md')
  name: string

  // Dimensions
  height: number
  width: number

  // Thresholds
  // Configurable through options
  {
    xs: number
    sm: number
    md: number
    lg: number
  }

  // Scrollbar
  scrollBarWidth: number
}
```

In the next section we walk through various ways that these properties can be used within your application.

## Usage

Access the breakpoint service within your Vue files by using the `$vuetify` object. The following snippet will log the current viewport **width** to the console once the component fires the mounted lifecycle hook:

```html
<!-- Vue Component -->

<script>
  export default {
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
    }
  }
</script>
```

While the `$vuetify` object supports SSR (Server-Side Rendering) including platforms such as NUXT, the breakpoint service detects the _height and width_ window values as **0**. This sets the initial breakpoint size to **xs** and in some cases can cause the layout to _snap_ in place when the client side is hydrated in NUXT.

<alert type="info">This section assumes that you understand how to configure [SASS variables](/customization/sass-variables/)</alert>

### Breakpoints and Conditionals

These values return a `boolean` value that is based upon the current viewport size. In the following example we change the [v-sheet](/components/sheets/)'s minimum height to **300** when on the _extra small_ breakpoint:

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="$vuetify.breakpoint.xs ? 300 : '20vh'"
    rounded
  >
    ...
  </v-sheet>
</template>
```

These *conditional* booleans enable control over every aspect of your application

In addition, these *conditionals* enable you to add responsive functionality to Vuetify features that don't support responsive by default.

### Thresholds

Define custom breakpoint values by configuring the **thresholds** Vuetify option. This changes the values used to compare when calculating the the viewport:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
})
```

Next, modify the `$grid-breakpoints` variable to match the values used for **thresholds**

1. Override the `$grid-breakpoints` SASS values:
2. To use the same values on the javascript side of things you must pass them during the application bootstrap like so:

Let's try a real world example. You have a `v-dialog` component that you want to convert to a **full-screen** dialog on mobile devices. Normally you would need to bind watchers for the viewport size, and/or check whenever the page loads.

```html
<!-- Vue Component -->

<script>
  export default {
    data: () => ({
      isMobile: false,
    }),

    beforeDestroy () {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize, { passive: true })
      }
    },

    mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 600
      },
    },
  }
</script>
```

That's a lot of boilerplate to write. Even if you opt to use the built in [v-resize](/directives/resizing/) directive, you are still going to have to define a resize method.

We can simplify this process by simply checking the value of the `mobile` property on the `$vuetify.breakpoint` object.

```html
<!-- Vue Component -->

<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile">
    ...
  </v-dialog>
</template>
```

<backmatter />
