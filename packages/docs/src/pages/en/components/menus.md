---
meta:
  title: Menu component
  description: The menu component exposes a drop down of potential selections or actions that the user can make.
  keywords: menus, vuetify menu component, vue menu component
related:
  - /components/dialogs/
  - /components/tooltips/
  - /styles/transitions/
---

# Menus

The `v-menu` component shows a menu at the position of the element used to activate it.

<entry-ad />

## Usage

Remember to put the element that activates the menu in the `activator` slot.

<example file="v-menu/usage" />

## API

- [v-menu](/api/v-menu)

## Examples

### Props

#### Absolute

Menus can also be placed absolutely on top of the activator element using the **absolute** prop. Try clicking anywhere on the image.

<example file="v-menu/prop-absolute" />

#### Absolute without activator

Menus can also be used without an activator by using **absolute** together with the props **position-x** and **position-y**. Try right-clicking anywhere on the image.

<example file="v-menu/prop-absolute-without-activator" />

#### Close on click

Menu can be closed when lost focus.

<example file="v-menu/prop-close-on-click" />

#### Close on content click

You can configure whether `v-menu` should be closed when its content is clicked.

<example file="v-menu/prop-close-on-content-click" />

#### Disabled

You can disable the menu. Disabled menus can't be opened.

<example file="v-menu/prop-disabled" />

#### Offset x

Menu can be offset by the X axis to make the activator visible.

<example file="v-menu/prop-offset-x" />

#### Offset y

Menu can be offset by the Y axis to make the activator visible.

<example file="v-menu/prop-offset-y" />

#### Open on hover

Menus can be accessed using hover instead of clicking with the **open-on-hover** prop.

<example file="v-menu/prop-open-on-hover" />

#### Rounded

Menus can have their border-radius set by the **rounded** prop. Additional information about rounded classes is on the [Border Radius page](/styles/border-radius).

<example file="v-menu/prop-rounded" />

### Slots

#### Activator and tooltip

With the new `v-slot` syntax, nested activators such as those seen with a `v-menu` and `v-tooltip` attached to the same activator button, need a particular setup in order to function correctly. **Note: this same syntax is used for other nested activators such as `v-dialog` w/ `v-tooltip`.**

<example file="v-menu/slot-activator-and-tooltip" />

### Misc

#### Custom transitions

Vuetify comes with 3 standard transitions, **scale**, **slide-x** and **slide-y**. You can also create your own and pass it as the transition argument. For an example of how the stock transitions are constructed, visit [here](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/util/helpers.ts).

<example file="v-menu/misc-custom-transition" />

#### Popover menu

A menu can be configured to be static when opened, allowing it to function as a popover. This can be useful when there are multiple interactive items within the menu contents.

<example file="v-menu/misc-popover" />

#### Use In components

Menus can be placed within almost any component.

<example file="v-menu/misc-use-in-components" />

## Accessibility

By default, `v-menu` components are _detached_ and moved to the root of your application. In order to properly support [inserting dynamic content into the DOM](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR26), you _must_ use the **attach** prop. This will ensure that focus transfers from the activator to the content when pressing the <kbd>tab</kbd> key.

<backmatter />
