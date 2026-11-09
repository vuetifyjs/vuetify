---
emphasized: true
meta:
  nav: Navigation buttons
  title: Navigation button component
  description: The navigation button component is a destination in a navigation rail, drawer or bar, with an icon, a label and an active indicator.
  keywords: vuetify navigation button, navigation rail, navigation bar, vue navigation button component
related:
  - /components/navigation-drawers/
  - /components/bottom-navigation/
  - /components/buttons/
features:
  github: /labs/VNavigationBtn/
  label: 'C: VNavigationBtn'
  report: true
  spec: https://m3.material.io/components/navigation-rail
---

# Navigation buttons

The `v-navigation-btn` component is a single destination with an icon, a label and an active indicator. It adapts to the [v-navigation-drawer](/components/navigation-drawers/) rail and to [v-bottom-navigation](/components/bottom-navigation/).

<PageFeatures />

::: warning

This feature requires [v4.3.3](/getting-started/release-notes/?version=v4.3.3)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VNavigationBtn } from 'vuetify/labs/VNavigationBtn'

export default createVuetify({
  components: {
    VNavigationBtn,
  },
})
```

## Usage

<ExamplesUsage name="v-navigation-btn" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-navigation-btn](/api/v-navigation-btn/) | Primary Component |
| [v-navigation-drawer](/api/v-navigation-drawer/) | Container that switches the buttons between stacked and horizontal layout |
| [v-bottom-navigation](/api/v-bottom-navigation/) | Container that selects buttons with **v-model** |

<ApiInline hide-links />

## Guide

By default, the container sets the button layout. Use the **stacked** prop to override it.

| Container | Layout |
| - | - |
| v-navigation-drawer with **rail**, collapsed | stacked |
| v-navigation-drawer with **rail**, expanded | horizontal |
| v-navigation-drawer without **rail** | horizontal |
| v-bottom-navigation | stacked |
| v-bottom-navigation with `mode="horizontal"` | horizontal |
| v-bottom-navigation with `mode="shift"` | stacked, `labels="selected"` |

### Accessibility

Always set **text**, even with `labels="selected"` or `labels="none"`. A hidden label still names the button for screen readers.

## Examples

### Props

#### Badge

To mark individual items that require user attention, you can use a dedicated `badge` prop.

<ExamplesExample file="v-navigation-btn/prop-badge" />
