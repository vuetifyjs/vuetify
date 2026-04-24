---
emphasized: true
meta:
  nav: Highlights
  title: Highlight component
  description: The highlight component visually marks matching substrings within a block of text, supporting plain string queries and pre-computed match ranges.
  keywords: vuetify highlight component, vue highlight component, text highlight, search highlight, mark
features:
  github: /labs/VHighlight/
  label: 'C: VHighlight'
  report: true
---

# Highlight

The `v-highlight` component marks matching substrings within a block of text.

<PageFeatures />

::: warning

This feature requires [v4.1.0](/getting-started/release-notes/?version=v4.1.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VHighlight } from 'vuetify/labs/VHighlight'

export default createVuetify({
  components: {
    VHighlight,
  },
})
```

## Usage

<ExamplesUsage name="v-highlight" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-highlight](/api/v-highlight/) | Primary component |

<ApiInline hide-links />

## Guide

### Props

#### Query

Pass a string or array of strings to **query** to be marked within text using case-insensitive matching. Multiple terms are matched independently and overlapping or adjacent ranges are merged.

<ExamplesExample file="v-highlight/prop-query" />

#### Matches

Pass pre-computed `[start, end]` index pairs to **matches** to skip the internal search step entirely. This is useful if you need to bind fuzzy-search algorithm that responds with matching ranges.

<ExamplesExample file="v-highlight/prop-matches" />

#### Mark class

Use **mark-class** to customize the mark styling with CSS classes.

<ExamplesExample file="v-highlight/props-mark-class" />

### Misc

#### Selection match

<ExamplesExample file="v-highlight/misc-selection-match" />
