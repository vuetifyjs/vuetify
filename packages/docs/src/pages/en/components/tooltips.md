---
nav: Tooltips
meta:
  title: Tooltip component
  description: The tooltip component displays textual information regarding the element it is attached to.
  keywords: tooltips, vuetify tooltip component, vue tooltip component
related:
  - /components/overlays/
  - /components/icons/
  - /components/menus/
---

# Tooltips

The `v-tooltip` component is useful for conveying information when a user hovers over an element. You can also programmatically control the display of tooltips through a `v-model`. When activated, tooltips display a text label identifying an element, such as a description of its function.

<entry />

## Usage

Tooltips can wrap any element.

<usage name="v-tooltip" />

## API

<api-inline />

## Examples

### Props

#### Location

Use the **location** prop to specify on which side of the element the tooltip should show. Read more about **location** [here](/components/overlays/#location).

<example file="v-tooltip/prop-location" />

#### Visibility

Tooltip visibility can be programmatically changed using `v-model`.

<example file="v-tooltip/prop-visibility" />

<backmatter />
