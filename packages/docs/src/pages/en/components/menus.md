---
meta:
  nav: Menus
  title: Menu component
  description: The menu component exposes a dropdown of potential selections or actions that the user can make.
  keywords: menus, vuetify menu component, vue menu component
related:
  - /components/dialogs/
  - /components/tooltips/
  - /styles/transitions/
features:
  github: /components/VMenu/
  label: 'C: VMenu'
  report: true
  spec: https://m2.material.io/components/menus
---

# Menus

The `v-menu` component shows a menu at the position of the element used to activate it.

<PageFeatures />

## Usage

There are three main ways that menus can be defined in markup.

The first one is by using the **activator** slot. Don't forget to bind the slot **props** to the activating element.

The second one is by using the **activator** prop with value `parent`. This will turn the parent element of the menu into the activator.

The third one is to supply a CSS selector string to **activator** prop. This allows you to place the menu and its activator in separate parts of the markup.

<ExamplesExample file="v-menu/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-menu](/api/v-menu/) | Primary Component |
| [v-btn](/api/v-btn/) | Sub-component often used for the `v-menu` activator |
| [v-list-item](/api/v-list-item/) | Sub-component often used for the `v-menu` content |

<ApiInline hide-links />

## Examples

### Props

<!-- #### Absolute

Menus can also be placed absolutely on top of the activator element using the **absolute** prop. Try clicking anywhere on the image.

<ExamplesExample file="v-menu/prop-absolute" />

#### Absolute without activator

Menus can also be used without an activator by using **absolute** together with the props **position-x** and **position-y**. Try right-clicking anywhere on the image.

<ExamplesExample file="v-menu/prop-absolute-without-activator" /> -->

<!-- #### Close on click

Menu can be closed when lost focus.

<ExamplesExample file="v-menu/prop-close-on-click" />

#### Close on content click

You can configure whether `v-menu` should be closed when its content is clicked.

<ExamplesExample file="v-menu/prop-close-on-content-click" /> -->

<!-- #### Disabled

You can disable the menu. Disabled menus can't be opened.

<ExamplesExample file="v-menu/prop-disabled" /> -->

#### Location

Menu can be offset relative to the activator by using the **location** prop. Read more about **location** [here](/components/overlays/#location).

<ExamplesExample file="v-menu/prop-location" />

#### Open on hover

Menus can be accessed using hover instead of clicking with the **open-on-hover** prop.

<ExamplesExample file="v-menu/prop-open-on-hover" />

#### Nested menus

Menus with other menus inside them will not close until their children are closed. The **submenu** prop changes keyboard behaviour to open and close with left/right arrow keys instead of up/down.

<ExamplesExample file="v-menu/prop-submenu" />

### Slots

#### Activator and tooltip

With the new `v-slot` syntax, nested activators such as those seen with a `v-menu` and `v-tooltip` attached to the same activator button, need a particular setup in order to function correctly.

::: info
  This same syntax is used for other nested activators such as `v-dialog` with `v-tooltip`
:::

<ExamplesExample file="v-menu/slot-activator-and-tooltip" />

### Misc

#### Transitions

Vuetify comes with [several standard transitions](/styles/transitions#api) that you can use. You can also create your own and pass it as the transition argument. For an example of how the stock transitions are constructed, visit [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts).

<ExamplesExample file="v-menu/misc-transition" />

#### Popover menu

A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.

<ExamplesExample file="v-menu/misc-popover" />

#### Use In components

Menus can be placed within almost any component.

<ExamplesExample file="v-menu/misc-use-in-components" />
