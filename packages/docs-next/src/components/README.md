# Components
> Create your regular and base components here

This folder is for organizing your project's components. It is structured to support the official Vue [**style-guide**](https://vuejs.org/v2/style-guide/#Component-files-strongly-recommended).
Below are _examples_ of varoius project structures for **components**.

### Custom
A custom component is one that is used in more than one place but is not generic enough to used as a _app_ component.

```bash
.
└── components
    ├── CustomComponent.vue
    └── CustomComponentTwo.vue
```

### App
[**App components**](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) are global components that should always be in the root of the `/app` folder. These components will be automatically bootstrapped into Vue via the **app.js** plugin.

```bash
.
└── src
    ├── components
    │   ├── CustomComponent.vue
    │   └── app
    │       └── Btn.vue
    └── plugins
        ├── app.js # Bootstraps *.vue in `src/components/app`
        ├── index.js
        └── vuetify.js
```

**Example usage**
This is an example of how to use **app components**; global components that can be used in any other component.

```vue
<!-- In Template -->

<template>
  <div>
    <app-btn>...</app-btn>
  </div>
</template>
```

```vue
<!-- src/components/app/Btn.vue -->

<template>
  <v-btn
    :color="color"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />>
  </v-btn>
</template>

<script>
  export default {
    name: 'Btn',

    props: {
      color: {
        type: String,
        default: 'primary',
      },
    },
  }
</script>
```

> The component's **name** property is automatically prefixed with the word `App`. For example, a name of `Btn` would yield `AppBtn`.
