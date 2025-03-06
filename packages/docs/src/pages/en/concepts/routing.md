---
meta:
  nav: Routing
  title: Routing
  description: Routing
  keywords: routing
related:
  - /components/buttons/
  - /components/lists/
  - /components/overlays/
---

# Routing

Routing is the process of navigating between different views or pages in an application.

<PageFeatures />

<PromotedEntry />

## Guide

[Vue Router](https://router.vuejs.org/) is the official router for Vue. It allows you to define routes and map them to components, enabling navigation between different views in your application.

The following components have built in support for routing:

- [v-breadcrumbs](/components/breadcrumbs/)
- [v-btn](/api/v-btn/)
- [v-card](/api/v-card/)
- [v-chip](/api/v-chip/)
- [v-list](/api/v-list-item/)

These components can act like a [router-link](https://router.vuejs.org/guide/advanced/extending-router-link.html) and have access to props such as **to** and **exact**:

```html
<v-btn to="/home" text="Home"></v-btn>
```

## Router view transitions

Vue Router lets you add transitions between different views. The **router-view** component is used to render the current route's component, and you can use the **transition** component to add transitions between different views.

```html { resource="src/App.vue" }
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>
```

Visit the [Transitions](/styles/transitions) page for more information.

::: tip

Overlay components can be closed with the browser back button, but this also triggers when calling `router.back()`. Use `:close-on-back="false"` to disable this behavior.

:::
