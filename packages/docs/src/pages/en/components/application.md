---
emphasized: true
meta:
  title: Application
  description: Vuetify comes equipped with a default markup that makes it easy to create layouts (boilerplate) for any Vue application.
  keywords: default layout, vuetify default markup, vuetify default layout
related:
  - /features/theme/
  - /components/app-bars/
  - /components/navigation-drawers/
features:
  report: true
---

# Application

The `v-app` component is an optional feature that serves as the root layout component as well as providing an easy way to control the theme used at the root level.

<PageFeatures />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-app](/api/v-app/) | Primary Component |
| [v-main](/api/v-main/) | Content area |

<ApiInline hide-links />

## Guide

In Vuetify, the `v-app` component is a convenient way to dynamically modify your application's current theme and provide an entry point for your layouts. When an application is mounted, each layout child registers itself with the closest layout parent and is then automatically placed in your window.

::: info
  More information on how to interact with the root sizing and styling is on the [Application](/features/application-layout/) page.
:::

When placing your application level components, the order matters. Elements are stacked based on when they register and are rendered in the DOM after the first **nextTick** (to account for suspense). Layouts utilize [suspense](https://vuejs.org/guide/built-ins/suspense) to allow all layout components to register before rendering the initial layout.

The following example demonstrates how the `v-app-bar` component takes priority over `v-navigation-drawer` because of its rendering order:

<ExamplesExample file="application/app-bar-drawer" open preview  />

If we swap `v-app-bar` and `v-navigation-drawer`, the registration order changes and the layout system layers the two components differently.

<ExamplesExample file="application/drawer-app-bar" open preview  />

## Theme

The `v-app` component makes it easy to enable one of your application defined themes. By default, Vuetify comes with 2 themes, **light** and **dark**. Each one is a collection of various colors used to style each individual component. Because `v-app` acts as an interface for [theme](/features/theme/) functionality, you have the ability to change it dynamically within your template.

The following example demonstrates how to use the **theme** prop to toggle the theme from dark to light.

<ExamplesExample file="application/theme" open preview />
