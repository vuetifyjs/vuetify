---
meta:
  nav: Avatar groups
  title: Avatar group component
  description: The avatar group component combines multiple avatars into a stacked or inline group display.
  keywords: avatar groups, vuetify avatar group component, vue avatar group component
related:
  - /components/avatars/
  - /components/chip-groups/
  - /components/lists/
features:
  github: /labs/VAvatarGroup/
  label: 'C: VAvatarGroup'
  report: true
---

# Avatar groups

The `v-avatar-group` component is used to display a collection of avatars in a stacked or grouped layout, commonly used for showing collaborators, team members, or user lists.

<PageFeatures />

::: warning

This feature requires [v3.12.0](/getting-started/release-notes/?version=v3.12.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VAvatarGroup } from 'vuetify/labs/VAvatarGroup'

export default createVuetify({
  components: {
    VAvatarGroup,
  },
})
```

## Usage

Avatar groups stack avatars together with overlapping edges. Use the **items** prop to render avatars from an array, or nest `v-avatar` components directly.

<ExamplesUsage name="v-avatar-group" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-avatar-group](/api/v-avatar-group/) | Primary component |
| [v-avatar](/api/v-avatar/) | Sub-component used to display individual avatars |

<ApiInline hide-links />

## Examples

### Props

#### Items

Use the **items** prop to render avatars from an array. Strings are treated as image URLs, objects are passed as props to `v-avatar`.

<ExamplesExample file="v-avatar-group/prop-items" />

#### Size and Gap

Use the **size** prop to control avatar dimensions and the **gap** prop to adjust the overlap between avatars.

<ExamplesExample file="v-avatar-group/prop-size" />

#### Limit

Use the **limit** prop to restrict the number of visible avatars. Overflow is indicated with a "+N" avatar.

<ExamplesExample file="v-avatar-group/prop-limit" />

#### Reverse

The **reverse** prop displays avatars in reverse stacking order. When rendering individual avatars (instead of passing `items`), use `toReversed` to counter flexbox visual order.

<ExamplesExample file="v-avatar-group/prop-reverse" />

#### Vertical

Use the **vertical** prop to stack avatars vertically instead of horizontally.

<ExamplesExample file="v-avatar-group/prop-vertical" />

### Slots

#### Overflow

Use the **overflow** slot to customize or replace the last item when using the **limit** prop.

<ExamplesExample file="v-avatar-group/slot-overflow" />

### Misc

#### Hoverable

Groups of avatars can be customized further with slots and **hoverable** prop for subtle interactions.

<ExamplesExample file="v-avatar-group/misc-hoverable" />
