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

Define global classes and styles for all [built-in](/components/all/) components; including [virtual](/features/aliasing/#virtual-component-defaults) ones. This provides an immense amount of utility when building your application's design system and it reduces the amount of duplicated code in your templates.

Let's say that you want to set the **text-transform** of all [v-btn](/components/buttons/) components to `none`, but are not interested in using [SASS variables](/features/sass-variables/). By simply adding the **style** property to a component's default values, you are able to apply custom values to all instances of said component.

The following code example modifies the **text-transform** CSS property of all `<v-btn>` components:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  defaults: {
    VBtn: {
      style: 'text-transform: none;',
    },
  },
})
```

As an alternative, apply utility classes instead to achieve the same effect:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  defaults: {
    VBtn: {
      class: 'text-none',
    },
  },
})
```

Additionally, it works with any valid Vue value type such as objects and arrays:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  defaults: {
    VBtn: {
      style: [{ textTransform: 'none' }],
    },
  },
})
```

### Using with virtual components

Whether you are developing a wrapper framework or just a design system for your application, [virtual components](/features/aliasing/#virtual-component-defaults) are a powerful ally. Within the Vuetify defaults system, classes and styles are treated just like regular props but instead of being overwritten at the template level, they are merged.

For example, lets create an alias of the [v-btn](/components/buttons/) component and modify some of its default values:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default createVuetify({
  aliases: {
    VBtnPrimary: VBtn,
  },

  defaults: {
    VBtnPrimary: {
      class: ['v-btn--primary', 'text-none'],
    },
  },
})
```

Now, use `<v-btn-primary>` in a template and apply a custom class:

```html
<template>
  <v-btn-primary class="foobar">Foobar</v-btn-primary>
</template>
```

When compiled, the resulting HTML will contain both the globally defined classes and the custom one:

```html
<!-- Example HTML Output -->
<button class="v-btn v-btn--primary text-none foobar">Fizzbuzz</button>
```

This is particularly useful when you have multiple variants of a component that need individual classes to target:

```html { resource="src/components/HelloWorld.vue" }
<template>
  <v-app>
    <v-main>
      <v-btn-primary>Primary</v-btn-primary>

      <span class="mx-2" />

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
    background: linear-gradient(to right, #da1b60, #ff8a00);
    color: white;
  }
</style>
```

Keep in mind that virtual components do not inherit global class or styles from their extension. For example, the following Vuetify configuration uses a [v-chip](/components/chips/) as the alias for the virtual `<v-chip-primary>` component.

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

<alert type="warning">

There are some cases where a default class or style could be unintentionally passed down to an inner component. This mostly concerns [form inputs and controls](/components/all/#form-inputs-and-controls).

</alert>
