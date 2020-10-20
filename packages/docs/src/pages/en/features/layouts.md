---
meta:
  title: Creating layouts
  description: Learn how to harness the power of Vuetify's expansive layout system with our step by step guide
  keywords: layouts, pre-made layouts, vuetify layouts, pre-made vuetify layouts, vue layouts, material layouts, material design layouts
related:
  - /getting-started/installation/
  - /getting-started/wireframes/
  - /introduction/support/
---


# Layouts

Build beautiful user experiences with customizable and expansive layout options.

<alert type="warning">

  The following sections assume you have created a new Vuetify application using Vue CLI and have a basic understanding of Vue, HTML, CSS, and JavaScript. Find more information on installing Vuetify with Vue CLI on our [Installation page](/getting-started/installation/#vue-cli-install).

</alert>

## Usage

Vuetify comes with a built-in layout system that just works out of the box. Components such as [v-app-bar](/components/app-bars/) and [v-footer](/components/footer/) support a special property named **app**. This property tells Vuetify that the corresponding component is part of your application's layout. In this section you will learn the basics of how the layout system works, how to combine multiple layout components, and how to change them all dynamically.

There are 2 primary layout components in Vuetify, `v-app` and `v-main`. The `v-app` component is the root of your application and a direct replacement for the default Vue entrypoint, `<div id="app">`. The `v-main` component is a semantic replacement for the `main` HTML element and the root of your application's __content__. When Vue mounts to the DOM, any Vuetify component that is part of the layout registers its current height and/or width with the framework core. The `v-main` component then takes these values and adjusts its container size.

To better illustrate this, let's create a basic Vuetify layout:

```html
<v-app>
  <v-main>
    Hello World
  </v-main>
</v-app>
```

With no layout components in the template, `v-main` doesn't need to adjust its size and instead takes up the entire page. Let's change that by adding a [v-app-bar](/components/app-bars/) above the `v-main` element:

```html
<v-app>
  <!-- Must have the app property -->
  <v-app-bar app></v-app-bar>

  <v-main>
    Hello World
  </v-main>
</v-app>
```

Because we gave `v-app-bar` the **app** prop, Vuetify knows that it is part of the layout. `v-main` then takes the registered height of our bar and removes the same amount from its available content area—in this case **64px** of space is removed from the top of `v-main`'s container.

<alert type="info">

  Vuetify has multiple pre-made layouts called [wireframes](/getting-started/wireframes/) that are used to scaffold an application's UI regions.

</alert>

As a final touch, let's add a gutter by wrapping the content in a `v-container` component:

```html
<v-app>
  <v-app-bar app></v-app-bar>

  <v-main>
    <v-container>
      Hello World
    </v-container>
  </v-main>
</v-app>
```

Up next, we take our newly established baseline and enhance it with new layout components and customization options.

## Combining layout components

More to follow

## Dynamic layouts

More to follow

<backmatter />
