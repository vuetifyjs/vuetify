---
meta:
  title: Display Breakpoints
  description: Access display viewport information using the Vuetify Breakpoint service.
  keywords: breakpoints, grid breakpoints
related:
  - /directives/resize/
  - /styles/display/
  - /styles/text-and-typography/
---

# Display Breakpoints

With Vuetify you can control various aspects of your application based upon the window size. This service works in conjunction with [grids](/components/grids/) and other responsive helper classes (e.g. [display](/styles/display/)).

<entry-ad />

<breakpoints-table />

## Breakpoint service

The **breakpoint service** is a programmatic way of accessing viewport information within components. It exposes a number of properties on the `$vuetify` object that can be used to control aspects of your application based upon the viewport size. The `name` property correlates to the currently active breakpoint; e.g. *xs, sm, md, lg, xl*.

In the following snippet, we use a switch statement and the current breakpoint name to modify the **height** property of the [v-card](/components/cards/) component:

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

## Usage

Let's try a real world example with a `v-dialog` component that you want to convert to a fullscreen dialog on mobile devices. To track this we would need to determine the size of the screen relative to the value we are comparing to. In the following snippet we use the `mounted` and `beforeDestroy` lifecycle hooks to bind a `resize` listener to the window.

```html
<!-- Vue Component -->

<script>
  export default {
    data: () => ({ isMobile: false }),

    beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
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

Even opting to use the [v-resize](/directives/resize/) directive would require unnecessary boilerplate. Instead, let's access the **mobile** property of the `$vuetify.breakpoint` object. This will return boolean value of `true` or `false` depending upon if the current viewport is larger or smaller than the **mobile-breakpoint** option.

```html
<!-- Vue Component -->

<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile">
    ...
  </v-dialog>
</template>
```

The breakpoint service is _dynamic_ and updates when Vuetify **initially** boots and when the viewport is resized.

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

Access these properties within Vue files by referencing `$vuetify.breakpoint.<property>`; where `<property>` corresponds to a value listed in the  [Breakpoint service](#breakpoint-service-object) object. In the following snippet we log the current viewport width to the console once the component fires the mounted lifecycle hook:

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

While the `$vuetify` object supports SSR (Server-Side Rendering) including platforms such as NUXT, the breakpoint service detects the height and width values as **0**. This sets the initial breakpoint size to **xs** and in some cases can cause the layout to _snap_ in place when the client side is hydrated in NUXT. In the upcoming section we demonstrate how to use `boolean` breakpoint values in the template and script tags of Vue components.

### Breakpoint conditionals

The breakpoint and conditional values return a `boolean` that is derived from the current viewport size. Additionally, the breakpoint service mimics the [Vuetify Grid](/components/grids) naming conventions and has access to properties such as `xlOnly`, `xsOnly`, `mdAndDown`, and others. In the following example we change the minimum height of `v-sheet` to **300** when on the _extra small_ breakpoint and only show rounded corners on extra small screens:

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="$vuetify.breakpoint.xs ? 300 : '20vh'"
    :rounded="$vuetify.breakpoint.xsOnly"
  >
    ...
  </v-sheet>
</template>
```

These *conditional values* enable responsive functionality to Vuetify features that don't support responsive by default or at all. In the next section we customize the **default** breakpoint values used in both _JavaScript and CSS_.

### Mobile breakpoints

<alert type="info">

  **New in v2.3.0+**

</alert>

The `mobileBreakpoint` option accepts breakpoint names (*xs, sm, md, lg, xl*) as a valid configuration option. Once set, the provided value is propagated to supporting components such as [v-navigation-drawer](/components/navigation-drawers/).

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm' // This is equivalent to a value of 960
  },
})
```

Individual components can override their inherited **default** values by using the `mobile-breakpoint` property. In the following example we force `v-banner` into a *mobile state* when the viewport size is less than _1024px_:

```html
<template>
  <v-banner mobile-breakpoint="1024">
    ...
  </v-banner>
</template>
```

In the next section we explore how to customize the thresholds that determine size breaks.

### Thresholds

<alert type="warning">

  This section modifies the `$grid-breakpoints` SASS variable. More information on setup is available on the [SASS variables](/features/sass-variables/) page.

</alert>

The `thresholds` option modifies the values used for viewport calculations. The following snippet overrides *xs* through *lg* breakpoints and increases `scrollBarWidth` to _24_.

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

You may notice that there is no `xl` property on the breakpoint service, this is intentional. Viewport calculations always start at _0_ and work their way up. A value of _340_ for the `xs` threshold means that a window size of _0 to 340_ is considered to be an *extra small* screen.

To propagate these changes to *css helper classes* we need to update the `$grid-breakpoints` SASS variable with our new values. On **large and extra-large** screens we *subtract* width of the browser's scrollbar from the defined breakpoints.

```scss
// styles/variables.scss

$grid-breakpoints: (
  'xs': 0,
  'sm': 340px,
  'md': 540px,
  'lg': 800px - 24px,
  'xl': 1280px - 24px
);
```

<backmatter />
