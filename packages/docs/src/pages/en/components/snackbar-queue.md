---
emphasized: true
meta:
  nav: Snackbar Queue
  title: Snackbar Queue component
  description: test
  keywords: test
related:
  - /components/buttons/
  - /components/snackbars/
  - /components/defaults-providers/
features:
  github: /labs/VSnackbarQueue/
  label: 'C: VSnackbarQueue'
  report: true
  spec: https://m2.material.io/components/snackbars
---

# Snackbar Queue

The `v-snackbar-queue` component is used to queue up multiple snackbar messages to be displayed to the user. Snackbars support positioning, removal delay, and callbacks.

<PageFeatures />

::: warning

This feature requires [v3.6.0](/getting-started/release-notes/?version=v3.6.0)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VSnackbarQueue } from 'vuetify/labs/VSnackbarQueue'

export default createVuetify({
  components: {
    VSnackbarQueue,
  },
})
```

## Usage

<ExamplesUsage name="v-snackbar-queue" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-snackbar-queue](/api/v-snackbar-queue/) | Primary Component |
| [v-snackbar](/api/v-snackbar/) | The actual Snackbar Component |

<ApiInline hide-links />
