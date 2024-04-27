---
emphasized: true
meta:
  title: Pull To Refresh
  description: The PullToRefresh allows users to update content with a simple downward swipe on their screen.
  keywords: Pull to refresh, vuetify Pull to refresh component, vue pull to refresh component
features:
  label: 'C: VPullToRefresh'
  github: /components/VPullToRefresh/
  report: true
---

# Pull To Refresh

The PullToRefresh allows users to update content with a simple downward swipe on their screen. Works for Mobile and Desktop. **It allows pulling down as soon as its immediate scrollable parent has scrolled to the top**.

<page-features />

::: warning

This feature requires [v3.6.0](/getting-started/release-notes/?version=v3.6.0)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VPullToRefresh } from 'vuetify/labs/VPullToRefresh'

export default createVuetify({
  components: {
    VPullToRefresh,
  },
})
```

## Usage

Drag the list downward to activate the pull-to-refresh feature.


<ExamplesExample file="v-pull-to-refresh/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-pull-to-refresh](/api/v-pull-to-refresh/) | Primary Component |

<ApiInline hide-links />
