---
emphasized: true
meta:
  title: Empty states
  description: The empty state component is used to indicate that a list is empty or that no search results were found.
  keywords: empty state, no results, no data, no items, no content, no records, no information, no search results
related:
  - /components/buttons/
  - /components/icons/
  - /components/avatars/
features:
  report: true
  spec: https://m2.material.io/design/communication/empty-states.html
---

# Empty states

The `v-empty-state` component is used to indicate that a list is empty or that no search results were found.

<PageFeatures />

::: warning

This feature requires [v3.5.7](/getting-started/release-notes/?version=v3.5.7)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VEmptyState } from 'vuetify/labs/VEmptyState'

export default createVuetify({
  components: {
    VEmptyState,
  },
})
```

## Usage

A basic empty state is composed of a title and a description. It can also include an icon and a button.

<ExamplesUsage name="v-empty-state" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-empty-state](/api/v-empty-state/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-empty-state` component is used to indicate that a page or list is empty or that no search results were found. It can be used in a variety of contexts, such as a list of items, a search results page, or a page with no content.

### Props

The `v-empty-state` component has a multitude of props that allow you to customize its appearance and behavior.

#### Content

There are three main properties for configuring text content, **title**, **subtitle**, and **text**.

<ExamplesExample file="v-empty-state/prop-content" />

#### Media

Add an icon or image to the empty state to help convey its purpose.

<ExamplesExample file="v-empty-state/prop-media" />

#### Actions

Add a button to the empty state to help users take action.

<ExamplesExample file="v-empty-state/prop-actions" />

### Slots

The `v-empty-state` component has numerous slots that make it easy to customize the default behavior.

| Slot | Description |
| - | - |
| 1. Default | The default slot |
| 2. Media | The media slot is for images or icons |
| 3. Title | The main title slot |
| 4. Subtitle | The subtitle slot |
| 5. Text | The text slot |
| 6. Actions | The actions slot |

#### Default

The default slot is positioned between **text** and **actions**.

<ExamplesExample file="v-empty-state/slot-default" />

#### Title

It's simple to customize the font-sizing of the title using utility classes.

<ExamplesExample file="v-empty-state/slot-title" />

#### Custom Actions

By default, only 1 action is displayed through configuration. To add more options, utilize the **actions** slot.

<ExamplesExample file="v-empty-state/slot-actions" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-empty-state` component.

### Astro dog

This example demonstrates how to use the `v-empty-state` component to create a fun and engaging empty state.

<ExamplesExample file="v-empty-state/misc-astro-dog" />

### Astro cat

This example utilizes components such as [v-tabs](/components/tabs/) and [v-window](/components/windows/) to create a more complex empty state.

<ExamplesExample file="v-empty-state/misc-astro-cat" />
