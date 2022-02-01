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
- [v-navigation-drawer](/components/navigation-drawers)

The final part of the layout system is the **v-main** component. Inside this is where you place your page content. It will use the remaining free space on the page after all layout components have reserved their space.

## Placing components

By default, the order in which layout components will attempt to reserve space is simply the order that they appear in your markup. To illustrate this concept, see the following two examples where a single **v-app-bar** and **v-navigation-drawer** have changed places in the markup.

<example file="application-layout/app-bar-first" />

<example file="application-layout/nav-drawer-first" />

<alert type="info">

  Please note that we are using the **absolute** prop in these examples only because we are nesting a layout (the example) inside another (the documentation itself). For most use-cases this is not necessary.

</alert>

As you can see, placing the **v-app-bar** before the **v-navigation-drawer** means that it will use the full width of the screen. When it it placed after the **v-navigation-drawer**, it will only use the free space left over.

Some layout components accept a **position** prop with which you can place the component in the layout. In the example below, we use two **v-navigation-drawer** components, one on each side of the application.

<example file="application-layout/position" />

## Complex layouts

Let's create a more complex layout to show the flexibility of the system. In the following example we have re-created the general layout of the Discord application. This example also demonstrates that layout components accept either a **width** or **height** prop, and that multiple components of the same type can be stacked in the same position.

<example file="application-layout/discord" />

## Dynamic layouts and priority

In most cases, it should be enough to simply place your layout components in the correct order in your markup to achieve the layout you want. There are however a couple of scenarios where this might not be possible. One of those is when your layout is not static, and some of your layout components are dynamically rendered.

To solve this you can explicitly set the layout order by using the **priority** prop. Explore the example below to see what happens if you have a dynamic layout without using the **priority** prop. Toggling the drawer off and on once when not using **priority** will lead to the drawer being placed after the app-bar when it is toggled on again. When using **priority** the drawer will always be placed first.

<example file="application-layout/dynamic" />

## Accessing layout information

The layout system exposes a function `getLayoutItem` that allows you to get size and position information about a specific layout component in your markup. To use it, you will need to add a **name** prop to the layout component, and give it a unique value. You can either access the method by using a ref on **v-app**, or by using the **useLayout** composable.

<example file="application-layout/layout-information-ref" />

<alert type="warning">

  You will not be able to directly use the composable in the same component where you are rendering the **v-app** component. The call to **useLayout** must happen in a child component, so that the layout can be properly injected.

</alert>

<example file="application-layout/layout-information-composable" />
