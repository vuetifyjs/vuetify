---
meta:
  nav: Floating Action Buttons
  title: FAB component
  description: The floating action button (or FAB) component is a promoted action that is elevated above the UI or attached to an element such as a card.
  keywords: floating action button, fab, vuetify fab component, vue fab component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
features:
  report: true
  label: 'C: VFab'
  github: /components/VFab/
  spec: https://m2.material.io/components/buttons-floating-action-button
---

# Floating Action Buttons

The `v-fab` component can be used as a floating action button. This provides an application with a main point of action.

<PageFeatures />

::: success

This feature was introduced in [v3.6.0](/getting-started/release-notes/?version=v3.6.0)

:::

## Usage

Floating action buttons can be attached to material to signify a promoted action in your application. The default size will be used in most cases, whereas the `small` variant can be used to maintain continuity with similar sized elements.

<ExamplesUsage name="v-fab" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-fab](/api/v-fab/) | Primary Component |

<ApiInline hide-links />

<!-- ## Guide

The `v-fab` component is used to indicate a promoted action in your application. It can be used in a variety of contexts, such as a page with no content, a list of items, or a search results page.

### Props

The `v-fab` component has a multitude of props that allow you to customize its appearance and behavior. -->

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-fab` component.

### Display animation

When displaying for the first time, a floating action button should animate onto the screen. Here we use the `v-fab-transition` with v-show. You can also use any custom transition provided by Vuetify or your own.

<ExamplesExample file="v-fab/misc-display-animation" />

### Lateral screens

When changing the default action of your button, it is recommended that you display a transition to signify a change. We do this by binding the `key` prop to a piece of data that can properly signal a change in action to the Vue transition system.

<ExamplesExample file="v-fab/misc-lateral-screens" />

### Small variant

For better visual appeal, we use a small button to match our list avatars.

<ExamplesExample file="v-fab/misc-small" />

### Speed dial

The speed-dial component has a very robust api for customizing your FAB experience exactly how you want.

<ExamplesExample file="v-fab/misc-speed-dial" />
