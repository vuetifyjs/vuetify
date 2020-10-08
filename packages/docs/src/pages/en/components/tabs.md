---
meta:
  title: Tabs component
  description: The tabs component provides a way to organize and navigate between groups of content that are related at the same level of hierarchy.
  keywords: tabs, vuetify tabs component, vue tabs component
related:
  - /components/icons/
  - /components/toolbars/
  - /components/windows/
---

# Tabs

The `v-tabs` component is used for hiding content behind a selectable item. This can also be used as a pseudo-navigation for a page, where the tabs are links and the tab-items are the content.

<entry-ad />

## Usage

The `v-tabs` component is a styled extension of [v-item-group](/components/item-groups). It provides an easy to use interface for organizing groups of content.

<example file="v-tabs/usage" />

## API

- [v-tabs](/api/v-tabs)
- [v-tab](/api/v-tab)
- [v-tab-item](/api/v-tab-item)
- [v-tabs-items](/api/v-tabs-items)
- [v-tabs-slider](/api/v-tabs-slider)

<!-- ## Sub-components

### v-tab

v-tab description

### v-tab-item

v-tab-item description

### v-tabs-items

v-tabs-items description

### v-tabs-slider

v-tabs-slider description -->

## Caveats

<alert type="warning">

  When using the **dark** prop and **NOT** providing a custom **color**, the `v-tabs` component will default its color to _white_.

</alert>

<alert type="warning">

  When using `v-tab-item`'s that contain required input fields you must use the **eager** prop in order to validate the required fields that are not yet visible.

</alert>

## Examples

### Props

#### Align with title

Make `v-tabs` lined up with the `v-toolbar-title` component using the **align-with-title** prop (`v-app-bar-nav-icon` or `v-btn` must be used in `v-toolbar`).

<example file="v-tabs/prop-align-with-title" />

#### Center active

The **center-active** prop will make the active tab always centered

<example file="v-tabs/prop-center-active" />

#### Custom icons

**prev-icon** and **next-icon** can be used for applying custom pagination icons.

<example file="v-tabs/prop-icons" />

#### Fixed tabs

The **fixed-tabs** prop forces `v-tab` to take up all available space up to the maximum width (300px).

<example file="v-tabs/prop-fixed-tabs" />

#### Grow

The **grow** prop will make the tab items take up all available space up to a maximum width of 300px.

<example file="v-tabs/prop-grow" />

#### Icons and text

Using **icons-with-text** prop increases the `v-tabs` height to 72px to allow for both icons as well as text to be used.

<example file="v-tabs/prop-icons-and-text" />

#### Pagination

If the tab items overflow their container, pagination controls will appear on desktop. For mobile devices, arrows will only display with the **show-arrows** prop.

<example file="v-tabs/misc-pagination" />

#### Right

The **right** prop aligns the tabs to the right.

<example file="v-tabs/prop-right" />

#### Vertical Tabs

The **vertical** prop allows for `v-tab` components to stack vertically.

<example file="v-tabs/prop-vertical" />

### Misc

#### Content

It is common to put `v-tabs` inside the **extension** slot of `v-toolbar`. Using `v-toolbar`'s **tabs** prop auto adjusts its height to 48px to match `v-tabs`.

<example file="v-tabs/misc-content" />

#### Desktop tabs

You can represent `v-tab` actions by using single icons. This is useful when it is easy to correlate content to each tab.

<example file="v-tabs/misc-desktop" />

#### Dynamic height

When changing your `v-tab-item`, the content area will smoothly scale to the new size.

<example file="v-tabs/misc-dynamic-height" />

#### Dynamic Tabs

Tabs can be dynamically added and removed. This allows you to update to any number and the `v-tabs` component will react. In this example when we add a new tab, we automatically change our model to match. As we add more tabs and overflow the container, the selected item will be automatically scrolled into view. Remove all `v-tab`s and the slider will disappear.

<example file="v-tabs/misc-dynamic" />

#### Overflow to menu

You can use a menu to hold additional tabs, swapping them out on the fly.

<example file="v-tabs/misc-overflow-to-menu" />

#### Tab Items

The `v-tabs-items` component allows for you to customize the content per tab. Using a shared `v-model`, the `v-tabs-items` will sync with the currently selected `v-tab`.

<example file="v-tabs/misc-tab-items" />

<backmatter />
