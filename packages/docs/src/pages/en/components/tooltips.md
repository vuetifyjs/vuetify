---
meta:
  nav: Tooltips
  title: Tooltip component
  description: The tooltip component displays textual information regarding the element it is attached to.
  keywords: tooltips, vuetify tooltip component, vue tooltip component
related:
  - /components/overlays/
  - /components/icons/
  - /components/menus/
features:
  github: /components/VTooltip/
  label: 'C: VTooltip'
  report: true
  spec: https://m2.material.io/components/tooltips
---

# Tooltips

The `v-tooltip` component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a `v-model`. When activated, tooltips display a text label identifying an element, such as a description of its function.

<PageFeatures />

## Usage

Tooltips can wrap any element.

<ExamplesUsage name="v-tooltip" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-tooltip](/api/v-tooltip/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Interactive

The **interactive** prop prevents the tooltip from closing during mouse interactions. For example, if the tooltip contains text that users might want to click or copy.

<ExamplesExample file="v-tooltip/prop-interactive" />

#### Location

Use the **location** prop to specify on which side of the element the tooltip should show. Read more about **location** [here](/components/overlays/#location).

<ExamplesExample file="v-tooltip/prop-location" />

<!-- TODO: not supported
#### Color

Tooltip color can be set with the `color` prop.

<ExamplesExample file="v-tooltip/prop-color" />
-->

#### Open on Click

The **open-on-click** prop allows tooltip to open when the activator is clicked. Useful for touch devices or when manual triggering is preferred.

<ExamplesExample file="v-tooltip/prop-open-on-click"/>

#### Visibility

Tooltip visibility can be programmatically changed using `v-model`.

<ExamplesExample file="v-tooltip/prop-visibility" />

### Misc

#### Tooltip at cursor

Tooltip can appear where the cursor is by setting the **target** prop to `cursor`. This is currently only available with **open-on-click**.

<ExamplesExample file="v-tooltip/misc-at-cursor" />
