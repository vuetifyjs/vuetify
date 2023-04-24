---
emphasized: true
meta:
  title: Global configuration
  description: Vuetify.config is an object containing global configuration options that modify the bootstrapping of your project.
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/blueprints/
---

# Global configuration

Vuetify allows you to set default prop values globally or per component when setting up your application. Using this functionality you can for example disable **ripple** on all components, or set the default **elevation** for all sheets or buttons.

<entry />

## Setup

Use the **defaults** property of the Vuetify configuration object to set default prop values. Here we have disabled **ripple** for all components that support it, and set the default **elevation** to `4` for all `<v-sheet>` components.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
})
```

## Contextual defaults

Defaults can also be configured for components nested within other components, for example if you want to set the default **variant** for all `<v-btn>` components nested within a `<v-card>` component:

```js { resource="src/plugins/vuetify.js" }
createVuetify({
  defaults: {
    VCard: {
      VBtn: { variant: 'outlined' },
    }
  },
})
```

This is used internally by some components already:

- `<v-btn>` has `variant="text"` when nested within a `<v-card-actions>` or `<v-toolbar>`
- `<v-list>` has `bg-color="transparent"` when nested within a `<v-navigation-drawer>`
- Lists, chip groups, expansion panels, tabs, and forms all use this system to propagate certain props to their children, for example `<v-tabs disabled>` will set the default value of `disabled` to `true` for all `<v-tab>` components inside it.

[v-defaults-provider](/components/defaults-providers/) can be used to set defaults for components within a specific scope.

## Global class and styles

<alert type="success">

This feature was introduced in [v3.2.0 (Orion)](https://github.com/vuetifyjs/vuetify/releases/tag/v3.2.0)

</alert>

In addition properties, Vuetify allows you to set global classes and styles that are applied to all components; included nested default configurations. While this feature works for defaults of regular Vuetify components, it is especially useful when creating [virtual components](/features/aliasing/#virtual-component-defaults).

The following example demonstrates how to set a global class and style for a core Vuetify component and an aliased one:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    GBtnPrimary: VBtn,
    GBtnSecondary: VBtn,
  },
  defaults: {
    GBtnPrimary: {
      class: 'g-btn-primary',
      style: 'text-transform: none;',
    },
    GBtnSecondary: {
      class: 'g-btn-secondary',
      style: 'letter-spacing: 2px;',
    },
    VBtn: {
      color: 'success',
    },
  },
})
```

### Limitations and caveats

Class and style defaults are not merged with with template defined classes and styles. This means if you use a custom class in a template it **will** override the global default value. In the following example we create a virtual component named **GSheetPrimary** and set the default class to `g-sheet-primary`:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VSheet } from 'vuetify/components/VSheet'

export default createVuetify({
  aliases: {
    GSheetPrimary: VSheet,
  },
  defaults: {
    GSheetPrimary: {
      class: 'border',
    },
  },
})
```

```html
<template>
  <GSheetPrimary />
  <!-- <v-sheet class="v-sheet g-sheet-primary ..."> -->

  <GSheetPrimary class="custom-class" />
  <!-- <v-sheet class="v-sheet custom-class ..."> -->
</template>
```

## Priority

When creating and mounting a component, Vuetify uses the following priority in determining which prop value to use:

1. Value set as prop value to the component itself
2. Value defined in component specific section of defaults configuration object
3. Value defined in global section of defaults configuration object
4. Value defined in the prop definition of the Vuetify component itself.
