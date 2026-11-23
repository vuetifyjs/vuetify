---
meta:
  nav: Speed Dials
  title: Speed Dial component
  description: The speed dial component is a floating action button that can reveal additional actions when clicked.
  keywords: speed dial, fab, vuetify speed dial component, vue speed dial component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
features:
  report: true
  github: /components/VSpeedDial/
  label: 'C: VSpeedDial'
---

# Speed Dials

The `v-speed-dial` component reveals a set of related actions from a floating action button.

<PageFeatures />

## Usage

Place the speed dial inside a [v-fab](/components/floating-action-buttons/) with `activator="parent"`, or bind the **activator** slot props to your own button.

<ExamplesUsage name="v-speed-dial" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-speed-dial](/api/v-speed-dial/) | Primary Component |

<ApiInline hide-links />

## Guide

`v-speed-dial` is a [v-menu](/components/menus/) and accepts its props, such as **open-on-hover** and **location**. Buttons inside it default to `size="small"`, set **size** on them to change it.
