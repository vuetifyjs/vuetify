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

Define global classes and styles that are applied to an individual component or globally. This makes it extremely easy to customize the look and feel of your application using [virtual](/features/aliasing/#virtual-component-defaults) or [built-in](/components/all/) components.

The following example creates an alias of the [v-btn](/components/buttons/) component and modifies some of its defaults:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    VBtnPrimary: VBtn,
  },

  defaults: {
    global: {
      class: 'v-global-class',
    },
    VBtnPrimary: {
      class: 'v-btn--primary',
      style: 'text-transform: none;',
    },
  },
})
```

Now when `<v-btn-primary>` is used in a Vue template, it will have both the `v-global-class` and `v-btn--primary` classes:

```html
<!-- Example HTML Output -->
<button class="v-global-class v-btn v-btn--primary">Foobar</button>
```

This is also useful when you have multiple variants of a component that need individual classes to target:

```html { resource="src/components/HelloWorld.vue" }
<template>
  <v-app>
    <v-main>
      <v-btn-primary>Primary</v-btn-primary>

      <v-btn-secondary>Secondary</v-btn-secondary>
    </v-main>
  </v-app>
</template>

<style>
  .v-btn.v-btn--primary {
    background: linear-gradient(to right, #ff8a00, #da1b60);
    color: white;
  }
  .v-btn.v-btn--secondary {
    z-index: 999;
  }
</style>
```

Keep in mind, aliased components do not inherit global class or styles from their extension. For example, the following Vuetify configuration uses a [v-chip](/components/chips/) as the alias for the virtual `<v-chip-primary>` component.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VChip } from 'vuetify/components/VChip'

export default createVuetify({
  aliases: {
    VChipPrimary: VChip,
  },

  defaults: {
    VChipPrimary: {
      class: 'v-chip--primary',
    },
    VChip: {
      class: 'v-chip--custom',
    },
  },
})
```

When `<v-chip-primary>` is used in a template, it will **not** have the `v-chip--custom` class.
