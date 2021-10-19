---
meta:
  title: Application layout
  description: Vuetify provides functionality to create complex layouts using components such as app bars and navigation drawers
  keywords: application, layout, default layout
related:
  - /components/application/
  - /components/app-bars/
  - /components/navigation-drawers/
---

# Application layout

Vuetify features an application layout system that allows you to easily create complex website designs. The system is built around an outside-in principle, where each application layout component reserves space for itself in one of four directions (left, right, up, down), leaving the available free space for any subsequent layout component(s) to occupy.

The following components are compatible with the layout system:

- [v-app-bar](/components/app-bars)
- [v-navigation-drawer](/components/v-navigation-drawer)

The final part of the layout system is the **v-main** component. Inside this is where you place your page content. It will use the remaining free space on the page after all layout components have reserved their space.

## Placing components

By default, the order in which layout components will attempt to reserve space is simply the order that they appear in your markup. To illustrate this concept, see the following two examples where a single **v-app-bar** and **v-navigation-drawer** have changed places.

<example file="application-layout/app-bar-first" />

<example file="application-layout/nav-drawer-first" />

<alert type="info">something something ignore that we are using **absolute** prop in examples</alert>

As you can see, placing the **v-app-bar** before the **v-navigation-drawer** means that it will use the full width of the screen. When it it placed after the **v-navigation-drawer**, it will only use free space left over.

<!-- some more educational examples here -->

## Complex layouts

Let's create a more complex layout to show the flexibility of the system. In the following example we have re-created the general layout of the Discord application.

<example file="application-layout/discord" />

## Dynamic layouts and priority

In most cases, it should be enough to simply place your layout components in the correct order in your markup to achieve the layout you want. There are however a couple of scenarios where this might not be possible. One of those is when your layout is not static, and one or more of your layout components are dynamically rendered.

To solve this you can explicitly set the layout order by using the **priority** prop. Explore the example below to see what happens if you have a dynamic layout without using the **priority** prop. Toggling the drawer off and on once when not using **priority** will lead to the drawer being placed after the app-bar when it is toggled on again. When using **priority** the drawer will always be placed first.

<example file="application-layout/dynamic" />

<!-- explain priority prop and why it is needed in some scenarios such as dynamic layouts -->

## Accessing layout programmatically

<!-- explain name prop and how to access layout data from composable -->
