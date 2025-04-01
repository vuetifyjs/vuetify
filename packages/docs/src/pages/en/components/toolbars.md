---
meta:
  nav: Toolbars
  title: Toolbar component
  description: The toolbar component sits above the content that it affects and provides an area for labeling and additional actions.
  keywords: toolbars, vuetify toolbar component, vue toolbar component
related:
  - /components/navigation-drawers/
  - /components/cards/
  - /components/app-bars/
features:
  github: /components/VToolbar/
  label: 'C: VToolbar'
  report: true
  spec: https://m1.material.io/components/toolbars.html
---

# Toolbars

The `v-toolbar` component is pivotal to any graphical user interface (GUI), as it generally is the primary source of site navigation.

<PageFeatures />

## Usage

<ExamplesUsage name="v-toolbar" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-toolbar](/api/v-toolbar/) | Primary Component |
| [v-toolbar-items](/api/v-toolbar-items/) | Sub-component used to modify the styling of [v-btn](/components/buttons) |
| [v-toolbar-title](/api/v-toolbar-title/) | Sub-component used to display the title of the toolbar |
| [v-btn](/api/v-btn/) | Sub-component commonly used in `v-toolbar` |

<ApiInline hide-links />

## Caveats

::: warning

When `v-btn`s with the **icon** prop are used inside of `v-toolbar` and `v-app-bar` they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification. If you choose to wrap your buttons in any container, such as a `div`, you will need to apply negative margin to that container in order to properly align them.

:::

## Guide

A toolbar is a flexible container that can be used in a number of ways. By default, the toolbar is 64px high on desktop and 56px high on mobile. There are a number of helper components available to use with the toolbar. The `v-toolbar-title` is used for displaying a title and `v-toolbar-items` allow [v-btn](/components/buttons) to extend full height.

### Props

The toolbar has a number of props that can be used to modify its appearance and behavior.

#### Dense toolbars

Dense toolbars reduce their height to _48px_.

<ExamplesExample file="v-toolbar/prop-dense" />

#### Collapse

Toolbars can be collapsed to save screen space.

<ExamplesExample file="v-toolbar/prop-collapse" />

#### Background

Toolbars can display a background as opposed to a solid color using the **src** prop. This can be modified further by using the **img** slot and providing your own [v-img](/components/images) component. Backgrounds can be faded using a [v-app-bar](/components/app-bars#prominent-w-scroll-shrink-and-image)

<ExamplesExample file="v-toolbar/prop-background" />

#### Extended

Toolbars can be extended without using the `extension` slot.

<ExamplesExample file="v-toolbar/prop-extended" />

#### Extension height

The extension's height can be customized.

<ExamplesExample file="v-toolbar/prop-extension-height" />

### Slots

The toolbar has a number of slots that can be used to customize its content.

#### Extension

The `extension` slot can be used to add additional content to the toolbar.

<ExamplesExample file="v-toolbar/slot-extension" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-toolbar` component.

### Contextual action bar

It is possible to update the appearance of a toolbar in response to changes in app state. In this example, the color and content of the toolbar changes in response to user selections in the `v-select`.

<ExamplesExample file="v-toolbar/misc-contextual-action-bar" />

### Flexible and card toolbar

In this example we offset our card onto the extended content area of a toolbar using the **extended** prop.

<ExamplesExample file="v-toolbar/misc-flexible-and-card" />

### Floating with search

A floating toolbar is turned into an inline element that only takes up as much space as needed. This is particularly useful when placing toolbars over content.

<ExamplesExample file="v-toolbar/prop-floating-with-search" />
