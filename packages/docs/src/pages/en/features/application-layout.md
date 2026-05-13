---
meta:
  title: Application layout
  description: Vuetify provides functionality to create complex layouts using components such as app bars and navigation drawers
  keywords: application, layout, default layout
related:
  - /components/app-bars/
  - /components/navigation-drawers/
  - /components/footers/
features:
  github: /composables/layout.ts
  label: 'E: layout'
  report: true
---

# Application layout

Vuetify features an application layout system that allows you to easily create complex website designs.

<PageFeatures />

<PromotedEntry />

The system is built around an outside-in principle, where each application layout component reserves space for itself in one of four directions (left, right, up, down), leaving the available free space for any subsequent layout component(s) to occupy.

The following components are compatible with the layout system:

| Component | Description |
| - | - |
| [v-app-bar](/components/app-bars/) | A container that is used navigation, branding, search, and actions |
| [v-system-bar](/components/system-bars/) | A system bar replaces the native phone system bar |
| [v-navigation-drawer](/components/navigation-drawers/) | A persistent or temporary container that holds site navigation links |
| [v-footer](/components/footers/) | A generic component used to replace the default html footer |
| [v-bottom-navigation](/components/bottom-navigation/) | A persistent or temporary container that holds navigation links and is typically used for smaller devices |

The final part of the layout system is the **v-main** component. Inside this is where you place your page content. It will use the remaining free space on the page after all layout components have reserved their space.

::: info

In the following examples, **v-app** has been replaced by **v-layout**. This is because **v-app** defaults to a minimum height of `100dvh`. In your own application you would always use **v-app** for the root layout.

:::

## Usage

By default, the order in which layout components will attempt to reserve space is simply the order that they appear in your markup. To illustrate this concept, see the following two examples where a single **v-app-bar** and **v-navigation-drawer** have changed places in the markup.

<ExamplesExample file="application-layout/app-bar-first" />

<ExamplesExample file="application-layout/nav-drawer-first" />

As you can see, placing the **v-app-bar** before the **v-navigation-drawer** means that it will use the full width of the screen. When it it placed after the **v-navigation-drawer**, it will only use the free space left over.

Some layout components accept a **location** prop with which you can place the component in the layout. In the example below, we use two **v-navigation-drawer** components, one on each side of the application.

<ExamplesExample file="application-layout/location" />

## Complex layouts

Let's create a more complex layout to show the flexibility of the system. In the following example we have re-created the general layout of the Discord application. This example also demonstrates that layout components accept either a **width** or **height** prop, and that multiple components of the same type can be stacked in the same position.

<ExamplesExample file="application-layout/discord" />

## Dynamic layouts and order

In most cases, it should be enough to simply place your layout components in the correct order in your markup to achieve the layout you want. There are however a couple of scenarios where this might not be possible. One of these is if you want to change the order of your layout components dynamically.

To solve this you can explicitly set the layout order by using the **order** prop. Explore the example below to see what happens when using the prop. By toggling the switch, you change the order of the app-bar to `-1`, thus putting it above the navigation-drawer in the layout ordering.

All layout components have a default order of `0`. Layout components with the same order will be ordered as they appear in the markup.

<ExamplesExample file="application-layout/dynamic" />

## Accessing layout information

The layout system exposes a function `getLayoutItem` that allows you to get size and position information about a specific layout component in your markup. To use it, you will need to add a **name** prop to the layout component, and give it a unique value. You can either access the method by using a ref on **v-app**, or by using the **useLayout** composable.

<ExamplesExample file="application-layout/layout-information-ref" />

::: warning

You will not be able to directly use the composable in the same component where you are rendering the **v-app** component. The call to **useLayout** must happen in a child component, so that the layout can be properly injected.

:::

<ExamplesExample file="application-layout/layout-information-composable" />

The combined size of all layout components is also available under `layout.mainRect`. This is used internally by the **v-main** component to determine the size of the main content area.
