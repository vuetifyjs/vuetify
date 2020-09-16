---
meta:
  title: What is Vuetify?
  description: Learn how to create your Vuetify application from scratch. Browse API references, sample code, tutorials, and more.
  keywords: guide, vuetify beginner, starting vuetify, vuetify guide
related:
  - /getting-started/quick-start/
  - /getting-started/releases-and-migrations/
  - /professional-support/consulting/
nav: What is Vuetify?
---

# Introduction

Learn more about what Vuetify is, how to create an application from scratch, browse API references, sample code, tutorials, and more.

<promoted-ad slug="vuemastery-getting-started" />

## What is Vuetify?

Vuetify is a complete UI framework built on top of Vue.js. The goal of the project is to provide developers with tools to build rich and engaging user experiences. Unlike other frameworks, Vuetify is designed from the ground up to be easy to learn and rewarding to master with hundreds of carefully crafted components from the Material Design specification. Vuetify's mobile first approach means that your application just works out of the box—whether it's a phone, tablet, or desktop computer.

If you are an experienced developer and want to compare Vuetify to other libraries/frameworks, check out our [Why Vuetify](/overview/why-vuetify/) page.

## Getting started

The easiest way to try Vuetify is to use our [Codepen Template](https://template.vuetifyjs.com/). This template is used by all examples within the documentation and is the perfect sandbox to play with the framework. If you prefer to use a local `index.html` file, we have a guide on how to [install via CDN](/getting-started/installation/#cdn-usage).

For additional installation options such as [Nuxt](/getting-started/installation/#nuxt-install) and [Vuepress](/getting-started/installation/#usage-with-vuepress), visit our [Installation](/getting-started/installation/) page.

<alert type="warning">

  The following sections assume you have created a new Vuetify application using Vue CLI and have a basic understanding of Vue, HTML, CSS, and JavaScript. For more information on how to get started with Vue, navigate to the official [Getting Started guide](https://vuejs.org/v2/guide/#Getting-Started).

</alert>

## Layouts

The foundation for any frontend application is its layout. Vuetify comes with a built-in system that allows you to designate certain components as part of your layout using the **app** property. This special property tells the component to send it's current height and/or width to the Vuetify core and is later used to size `v-main`. In this section you will learn the basics of how the layout system works, how to combine multiple layout components, and how to change them all dynamically.

There are 2 primary layout components in Vuetify, `v-app` and `v-main`. The `v-app` component is the root of your application and a direct replacement for the default Vue entrypoint, `<div id="app">`. The `v-main` component is a semantic replacement for the `main` HTML element and the root of your application's __content__.

To illustrate this, let's create a basic Vuetify layout:

```html
<v-app>
  <v-main>
    Hello World
  </v-main>
</v-app>
```

With no layout components defined, `v-main` doesn't need to adjust its size and instead takes up the entire page. Let's change that by adding a [v-app-bar](/components/app-bars/) with the **app** property:

```html
<v-app>
  <v-app-bar app></v-app-bar>

  <v-main>
    Hello World
  </v-main>
</v-app>
```

Because we gave `v-app-bar` the **app** prop, Vuetify knows that it is part of the layout. `v-main` then takes the registered height of our bar and removes the same amount from its available content area—in this case **64px** of space is removed from the top of the container.

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

Up next, we take our newly established baseline and and enhance it with new layout components and customization options.

### Combining layout components

More to follow

### Dynamic layouts

More to follow

<backmatter />
