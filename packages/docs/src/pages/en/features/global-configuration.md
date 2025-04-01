---
meta:
  title: Global configuration
  description: Vuetify.config is an object containing global configuration options that modify the bootstrapping of your project.
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/blueprints/
features:
  github: /composables/defaults.ts
  label: 'E: defaults'
  report: true
---

# Global configuration

Vuetify allows you to set default prop values globally or per component when setting up your application. Using this functionality you can for example disable **ripple** on all components, or set the default **elevation** for all sheets or buttons.

<PageFeatures />

<PromotedEntry />

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
    },
  },
})
```

This is used internally by some components already:

- `<v-btn>` has `variant="text"` when nested within a `<v-card-actions>` or `<v-toolbar>`
- `<v-list>` has `bg-color="transparent"` when nested within a `<v-navigation-drawer>`
- Lists, chip groups, expansion panels, tabs, and forms all use this system to propagate certain props to their children, for example `<v-tabs disabled>` will set the default value of `disabled` to `true` for all `<v-tab>` components inside it.

[v-defaults-provider](/components/defaults-providers/) can be used to set defaults for components within a specific scope.

## Global class and styles

::: success
This feature was introduced in [v3.2.0 (Orion)](/getting-started/release-notes/?version=v3.2.0)
:::

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

::: warning
  `class` and `style` cannot be used in the `global` object, only in specific components.
:::

## Using with virtual components

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

::: warning
There are some cases where a default class or style could be unintentionally passed down to an inner component. This mostly concerns [form inputs and controls](/components/all/#form-inputs-and-controls).
:::

## Using in custom components

::: success
This feature was introduced in [v3.2.0 (Orion)](/getting-started/release-notes/?version=v3.2.0)
:::

Hook into the Vuetify defaults engine and configure your custom components the same way that we do. This feature makes it super easy to homogenize functionality across your application and reduce the amount of duplicated code.

Let's start with an example by creating a basic component that accepts a single prop:

```html { resource="src/components/MyComponent.vue" }
<template>
  <div>I am {{ foo }}</div>
</template>

<script setup>
  defineProps({ foo: String })
</script>
```

Now, let's add our new component to the Vuetify defaults configuration object and assign a default value to its `foo` prop:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    MyComponent1: {
      foo: 'bar',
    },
  },
})
```

Next, import the `useDefaults` composable into `MyComponent1.vue`. This function has two optional arguments:

- `props` - The props object used to generate the component's default values
- `name` - The name of the component. This is used to reference the defaults key defined in your Vuetify configuration

In your template, assign the return value of `defineProps` to a variable and pass it to `useDefaults`:

```html { resource="src/components/MyComponent1.vue" }
<template>
  <div>I am {{ props.foo }}</div>
</template>

<script setup>
  import { useDefaults } from 'vuetify'

  const _props = defineProps({ foo: String })
  const props = useDefaults(_props, 'MyComponent1')
</script>
```

Notice that we have to explicitly use the `props` object in the template. This is because Vue automatically unwraps the values in `defineProps`.

```diff
-<div>I am {{ foo }}</div>
+<div>I am {{ props.foo }}</div>
```

::: info
The **name** argument is optional and is inferred from the component's name if not provided.
:::

When `<MyComponent1>` is used in a template, it uses the default value assigned in the Vuetify config:

```html
<template>
  <MyComponent1 /> <!-- I am bar -->
</template>
```

### Nested defaults

It is possible to assign nested defaults within your component chain. This provides you with countless ways to configure your application and its components.

Let's expand on the previous [example](#using-in-custom-components) by creating a new component, `<MyComponent2>` that uses `<MyComponent1>`:

```html { resource="src/components/MyComponent2.vue" }
<template>
  <MyComponent1 />
</template>

<script setup>
  import MyComponent1 from './MyComponent1.vue'
</script>
```

Now, let's add `<MyComponent2>` to the Vuetify defaults configuration object and assign a default value to `foo` prop of all nested `<MyComponent1>` components:

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    MyComponent: { foo: 'bar' },

    MyComponent2: {
      MyComponent: { foo: 'baz' },
    }
  }
})
```

Head back to the `MyComponent2.vue` file and import & invoke the `useDefaults` composable:

```html { resource="src/components/MyComponent2.vue" }
<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  import MyComponent1 from './MyComponent1.vue'
  import { useDefaults } from 'vuetify'

  useDefaults()
</script>
```

Finally, add both new components to a template and inspect the output:

```html
<template>
  <v-app>
    <v-main>
      <MyComponent1 /> <!-- I am bar -->

      <MyComponent2>
        <MyComponent1 /> <!-- I am baz -->
      </MyComponent2>
    </v-main>
  </v-app>
</template>

<script setup>
  import MyComponent1 from './MyComponent1.vue'
  import MyComponent2 from './MyComponent2.vue'
</script>
```

Now, whenever `<MyComponent1>` is used within the `<MyComponent2>` component, it has a different assigned default value.
