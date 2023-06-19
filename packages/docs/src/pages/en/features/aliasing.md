---
meta:
  title: Aliasing
  description: Description
  keywords: keywords
related:
- /features/blueprints/
- /features/global-configuration/
- /features/treeshaking/
---

# Aliasing & virtual components

Create virtual components that extend built-in Vuetify components using custom aliases.

<entry />

## Usage

Aliasing allows you to use built-in Vuetify components as a baseline for your custom implementations. To get started, import the component that you want to extend. Provide it as the value of a unique key that is used for the virtual component's name:

```js { resource="src/plugins/vuetify.js"}
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    MyButton: VBtn,
    MyButtonAlt: VBtn,
  },
})
```

<alert type="info">

Although treeshaking is automatically applied during production builds, it is advantageous to import components by specifying their full path in development mode. For instance, using `vuetify/components/VBtn` instead of `vuetify/components` ensures that the compiler loads fewer components, thus optimizing performance.

</alert>

## Virtual component defaults

Virtual components have access to the Vuetify [Global configuration](/features/global-configuration/). Default settings for aliases are defined the same as built-in components with no extra steps required by you. In the following example, **MyButton** uses [v-btn props](/api/v-btn/#props) to change it's default **variant**:

```js { resource="src/plugins/vuetify.js"}
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    MyButton: VBtn,
  },
  defaults: {
    VBtn: { variant: 'flat' },
    MyButton: { variant: 'tonal' },
  },
})
```

## Nested defaults

Prop defaults accept component key references to apply style changes based upon component hierarchy. In the following example, [v-btn](/components/buttons/) and **MyButton** swap colors when nested within a [v-card](/components/cards/) component.

```js { resource="src/plugins/vuetify.js"}
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    MyButton: VBtn,
  },
  defaults: {
    MyButton: {
      color: 'primary',
      variant: 'tonal',
    },
    VBtn: {
      color: 'secondary',
      variant: 'flat',
    },
    VCard: {
      MyButton: { color: 'secondary' },
      VBtn: { color: 'primary' },
    },
  },
})
```
