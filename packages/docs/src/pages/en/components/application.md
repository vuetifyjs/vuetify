---
disabled: true
meta:
  title: Application
  description: Vuetify comes equipped with a default markup that makes it easy to create layouts (boilerplate) for any Vue application.
  keywords: default layout, vuetify default markup, vuetify default layout
related:
  - /features/theme/
  - /components/app-bars/
  - /components/navigation-drawers/
---

# Application

The `v-app` component is an optional feature that serves as the root layout component as well as providing an easy way to control the theme used at the root level.

<entry />

In Vuetify, the `v-app` component is a convenient way to dynamically modify your application's current theme and provide an entry point for your layouts. This allows you to create truly unique interfaces without the hassle of managing your layout sizing. When an application is mounted, each layout child registers itself with the closest layout parent and is then automatically placed in your window.

The order of your layout components will dictate the order in which they are registered, and ultimately placed, within your application. The following example demonstrates how the `v-app-bar` component takes priority over `v-navigation-drawer` because of its rendering order:

``` html
<template>
  <v-app>
    <v-app-bar title="Application"></v-app-bar>

    <v-navigation-drawer>...</v-navigation-drawer>

    <v-main>...</v-main>
  </v-app>
</template>
```

![Pending graphic](https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png "Rendered Application")

If we swap `v-app-bar` and `v-navigation-drawer`, the registration order changes and the layout system layers the two components differently.

``` html
<template>
  <v-app>
    <v-navigation-drawer>...</v-navigation-drawer>

    <v-app-bar title="Application"></v-app-bar>

    <v-main>...</v-main>
  </v-app>
</template>
```

![Pending graphic](https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png "Rendered Application")

## Theme

The `v-app` component makes it easy to enable one of your application defined themes. By default, Vuetify comes with 2 themes, **light** and **dark**. Each one is a collection of various colors used to style each individual component. Because `v-app` acts as an interface for [theme](/features/theme/) functionality, you have the ability to change it dynamically within your template.

The following example demonstrates how to use the **theme** prop to toggle the theme from dark to light.

<example file="application/theme" preview />

```html { resource="src/App.vue" }
<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn
        :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="onClick"
      >Toggle Theme</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>Content area</v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>
```

<alert type="success">

  **TIP**

  All components support to override the currently inherited theme locally using the **theme** prop.

</alert>

## API

| Component | Description |
| - | - |
| [v-app](/api/v-app/) | Primary Component |
| [v-main](/api/v-main/) | Content area |

<api-inline hide-links />

### Layout components

The following components are compatible with the [Application layout](/features/application-layout/) system:

| Component | Default location | Default orientation | Description |
| - | :-: | :-: | - |
| [v-system-bar](/api/v-system-bar/) | top | horizontal | Used to simulate the system bar on phones and desktop applications |{data-toggle=modal}
| [v-app-bar](/api/v-app-bar/) | top | horizontal | Top level application actions and navigation links |
| [v-navigation-drawer](/api/v-navigation-drawer/) | start | vertical | The primary component used for application navigation |
| [v-footer](/api/v-footer/) | bottom | horizontal | The only application component that is not bound to the current layout by default. Must explicitly specify the **app** prop |
| [v-bottom-navigation](/api/v-bottom-navigation/) | bottom | horizontal | This component is often used as a replacement for application actions and navigation links on mobile and tablet devices |

<br>

<app-figure src="https://cdn.vuetifyjs.com/images/layouts/app.png" alt="Vuetify Application" />

<alert type="info">

  More information on how to interact with the root sizing and styling is on the [Application](/features/application-layout/) page.

</alert>
