---
meta:
  nav: Progress
  title: Progress component
  description: A unified progress indicator component that supports both linear and circular variants with labels and accessible value formatting.
  keywords: progress, progress bar, loading, vuetify progress component
related:
  - /components/progress-linear/
  - /components/progress-circular/
features:
  github: /labs/VProgress/
  label: 'C: VProgress'
  report: true
---

# Progress

The `v-progress` component is a unified wrapper for linear and circular progress indicators with built-in label and accessible value formatting.

<PageFeatures />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VProgress } from 'vuetify/labs/VProgress'

export default createVuetify({
  components: {
    VProgress,
  },
})
```

## Usage

<ExamplesUsage name="v-progress" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-progress](/api/v-progress/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-progress` component combines `v-progress-linear` and `v-progress-circular` into a single component with a `type` prop, while adding label support and accessible value formatting.

### Props

#### Label

The **label** prop displays text alongside the progress indicator. Use the **label-position** prop to control placement.

<ExamplesExample file="v-progress/prop-label" />

#### Value format

The **value-format** prop formats the `aria-valuetext` for screen readers. Use `[value]`, `[max]`, or `[percent]` as placeholders in strings, or pass a function for custom formatting.

<ExamplesExample file="v-progress/prop-value-format" />

### Slots

#### Label and value

Use the **#label** and **#value** slots to fully customize the content displayed alongside the progress indicator. Both slots receive `value`, `max`, `percent`, and `formattedValue` as scoped props.

<ExamplesExample file="v-progress/slot-label-and-value" />

### Misc

#### Card loader

Use the **#default** slot to replace the built-in progress indicator with your own. The slot exposes `percent` and other scoped props for custom rendering.

<ExamplesExample file="v-progress/misc-card-loader" />
