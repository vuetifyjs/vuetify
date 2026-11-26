---
meta:
  title: Display & Platform
  description: Access display viewport information using the Vuetify Breakpoint composable.
  keywords: breakpoints, grid breakpoints, platform details, screen size, display size
related:
  - /directives/resize/
  - /styles/display/
  - /styles/text-and-typography/
features:
  github: /composables/display.ts
  label: 'E: display'
  report: true
---

# Display & Platform

The `useDisplay` composable reports the viewport size, the active breakpoint and the user's platform.

<PageFeatures />

<PromotedEntry />

## Usage

Use it when a breakpoint must change a prop or script logic. For layout alone, the [grid](/components/grids/) and [display classes](/styles/display/) use the same breakpoints without any script.

```html { resource="Composition.vue" }
<script setup>
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()

  onMounted(() => {
    console.log(mobile.value) // false
  })
</script>
```

With the Options API, the same values are on `this.$vuetify.display`, without `.value`.

```html { resource="Options.vue" }
<script>
  export default {
    mounted () {
      console.log(this.$vuetify.display.mobile)
    },
  }
</script>
```

## API

| Component | Description |
| - | - |
| [useDisplay](/api/use-display/) | Composable |

## Breakpoints and Thresholds

Each threshold is the width where its breakpoint starts. The defaults are:

<FeaturesBreakpointsTable />

`AndUp` and `AndDown` properties, such as **mdAndUp**, combine neighbouring breakpoints. See the [interface](#interface) for their ranges.

## Options

Change the breakpoints with the **display** option of `createVuetify`. **mobileBreakpoint** takes a breakpoint name or a width in pixels.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify} from 'vuetify'

export default createVuetify({
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

## Examples

**name** holds the current breakpoint, which helps when every breakpoint needs its own value:

```html { resource="Component.vue" }
<template>
  <v-card :height="height">
    ...
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  const { name } = useDisplay()

  const height = computed(() => {
    switch (name.value) {
      case 'xs': return 220
      case 'sm': return 400
      case 'md': return 500
      case 'lg': return 600
      case 'xl': return 800
      case 'xxl': return 1200
    }

    return undefined
  })
</script>
```

### Interface

```ts
{
  // Breakpoints
  xs: boolean // 0 - 599
  sm: boolean // 600 - 839
  md: boolean // 840 - 1144
  lg: boolean // 1145 - 1544
  xl: boolean // 1545 - 2137
  xxl: boolean // >= 2138
  smAndDown: boolean // < 840
  smAndUp: boolean // > 599
  mdAndDown: boolean // < 1145
  mdAndUp: boolean // > 839
  lgAndDown: boolean // < 1545
  lgAndUp: boolean // > 1144
  xlAndDown: boolean // < 2138
  xlAndUp: boolean // > 1544

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

**mobile** is `true` below the mobile breakpoint, which is `lg` (1145px) by default. Here it makes a dialog fullscreen on small screens:

```html { resource="Component.vue" }
<template>
  <v-dialog :fullscreen="mobile">
    ...
  </v-dialog>
</template>

<script setup>
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay()
</script>
```

### Breakpoint conditionals

The breakpoint properties are booleans named after the [grid](/components/grids/) breakpoints. This sheet is taller from **md** up and rounded only on **xs**:

```html { resource="Component.vue" }
<template>
  <v-sheet
    :min-height="mdAndUp ? 300 : '20vh'"
    :rounded="xs"
  >
    ...
  </v-sheet>
</template>

<script setup>
  import { useDisplay } from 'vuetify'

  const { xs, mdAndUp } = useDisplay()
</script>
```

## Component Mobile Breakpoints

Components with a mobile layout follow the global **mobile** value. Set **mobile-breakpoint** on one of them to switch it at a different width, or **mobile** to force the layout. These components support it:

- [v-banner](/components/banners/)
- [v-data-table](/components/data-tables/basics/)
- [v-date-input](/components/date-inputs/)
- [v-navigation-drawer](/components/navigation-drawers/)
- [v-slide-group](/components/slide-groups/) and [v-tabs](/components/tabs/)
- [v-stepper](/components/steppers/)
- [v-time-input](/components/time-inputs/)

```html { resource="Component.vue" }
<template>
  <v-banner mobile-breakpoint="580">
    ...
  </v-banner>
</template>
```

### useDisplay overrides

Pass **mobileBreakpoint** to `useDisplay` to compute **mobile** against a different width:

```html { resource="Component.vue" }
<script setup>
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify'

  const { mobile } = useDisplay({ mobileBreakpoint: 580 })

  // Given a viewport width of 960px
  onMounted(() => {
    console.log(mobile.value) // false
  })
</script>
```

`displayClasses` holds a `<name>--mobile` class while **mobile** is `true`. The name is the second argument, and defaults to the component's name:

```html { resource="AppDrawer.vue" }
<template>
  <v-navigation-drawer :class="displayClasses">
    <!-- app-drawer--mobile -->
  </v-navigation-drawer>
</template>

<script setup>
  import { useDisplay } from 'vuetify'

  const { displayClasses } = useDisplay({ mobileBreakpoint: 'md' })
  // const { displayClasses } = useDisplay({ }, 'app-drawer') // optional explicit name
</script>
```
