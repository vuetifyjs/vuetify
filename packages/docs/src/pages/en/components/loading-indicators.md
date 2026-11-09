---
emphasized: true
meta:
  nav: Loading indicators
  title: Loading indicator component
  description: The loading indicator component shows an indeterminate wait with a shape that morphs and rotates.
  keywords: vuetify loading indicator component, vue loading indicator component, loader, spinner, morphing shapes
related:
  - /components/progress/
  - /components/progress-circular/
features:
  github: /labs/VLoadingIndicator/
  label: 'C: VLoadingIndicator'
  report: true
---

# Loading indicator

The `v-loading-indicator` component shows an indeterminate wait with a shape that morphs and rotates. Use it for short waits, where a progress bar would not carry useful information.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VLoadingIndicator } from 'vuetify/labs/VLoadingIndicator'

export default createVuetify({
  components: {
    VLoadingIndicator,
  },
})
```

## Usage

<ExamplesUsage name="v-loading-indicator" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-loading-indicator](/api/v-loading-indicator/) | Primary Component |

<ApiInline hide-links />

## Guide

The component renders with `role="progressbar"` and no value. Give it an `aria-label`, or place it in the default slot of [v-progress](/components/progress/) and mark it `aria-hidden="true"`, so the label and value formatting come from `v-progress`.

Notable behaviors:

- the animation pauses while the indicator is out of view
- with `prefers-reduced-motion`, a single static shape is shown

### Props

#### Shape size

The shape size follows **size**: 38px at the default 48px, and 62.5% of the indicator for custom sizes. Use **shape-size** to change the space around it, with pixels or a percentage of the indicator.

<ExamplesExample file="v-loading-indicator/prop-shape-size" />
