---
emphasized: true
meta:
  nav: Split buttons
  title: Split button component
  description: The split button component pairs a primary action with a menu of related actions.
  keywords: vuetify split button component, vue split button component, dropdown button, menu button
related:
  - /components/buttons/
  - /components/button-groups/
  - /components/menus/
features:
  github: /labs/VSplitBtn/
  label: 'C: VSplitBtn'
  report: true
---

# Split button

The `v-split-btn` component pairs a primary action with a trailing button that opens a menu of related actions.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VSplitBtn } from 'vuetify/labs/VSplitBtn'

export default createVuetify({
  components: {
    VSplitBtn,
  },
})
```

## Usage

<ExamplesUsage name="v-split-btn" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-split-btn](/api/v-split-btn/) | Primary Component |
| [v-btn-group](/api/v-btn-group/) | Wrapper of both buttons |
| [v-menu](/api/v-menu/) | Menu opened by the trailing button |

<ApiInline hide-links />

## Guide

The component renders a connected [v-btn-group](/components/button-groups/) with two buttons. **color**, **variant**, **size**, **density** and **rounded** apply to both. The **click** event comes from the primary action only, the menu button opens the menu. Use **icon** for an icon-only action.

The menu button has an `aria-label` from the `$vuetify.splitBtn.menu` locale key, change it with **menu-label**. It is marked as active while the menu is open.

### Material Design 3

Paddings, inner corners and the menu icon offset from the Material Design 3 Expressive spec are set with `$split-btn-named-sizes`, see [Material 3 button sizes](/features/md3-button-sizes/#split-buttons).
