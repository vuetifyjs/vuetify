---
meta:
  nav: Chips
  title: Chip component
  description: The chip component allows a user to enter information, make selections, filter content or trigger actions.
  keywords: chips, vuetify chip component, vue chip component
related:
  - /components/avatars
  - /components/icons
  - /components/selects
features:
  figma: true
  github: /components/VBtn/
  label: 'C: VChip'
  report: true
  spec: https://m2.material.io/components/buttons
---

# Chips

The `v-chip` component is used to convey small pieces of information. Using the `close` property, the chip becomes interactive, allowing user interaction. This component is used by the [v-chip-group](/components/chip-groups) for advanced selection options.

![Chips Entry](https://cdn.vuetifyjs.com/docs/images/components/v-chip/v-chip-entry.png)

<PageFeatures />

## Usage

Chips come in the following variations: closeable, filter, outlined, pill. The default slot of `v-chip` will also accept avatars and icons alongside text.

<ExamplesUsage name="v-chip" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-chip](/api/v-chip/) | Primary component |

<ApiInline hide-links />

## Guide

The `v-chip` component is used to convey small pieces of information. Using the `close` property, the chip becomes interactive, allowing user interaction. This component is used by the [v-chip-group](/components/chip-groups) for advanced selection options.

### Props

Similar to other components such as [v-btn](/components/buttons/) and [v-list](/components/lists/), the `v-chip` component has a large selection of props for customizing the appearance.

#### Closable

Closable chips can be controlled with a v-model. You can also listen to the `click:close` event if you want to know when a chip has been closed.

<ExamplesExample file="v-chip/prop-closable" />

#### Color and variants

Any color from the Material Design palette can be used to change a chips color.

<ExamplesExample file="v-chip/prop-colored" />

The **variant** prop gives you easy access to several different button styles. Available variants are: **elevated**, **flat**, **tonal** (default), **outlined**, **text**, and **plain**.

| Value        | Example                                                  | Description                                                     |
|--------------|----------------------------------------------------------|-----------------------------------------------------------------|
| **elevated** | <v-chip color="primary" variant="elevated">Chip</v-chip> | Elevates the chip with a shadow                               |
| **flat**     | <v-chip color="primary" variant="flat">Chip</v-chip>     | Removes chip shadow                                           |
| **tonal**    | <v-chip color="primary" variant="tonal">Chip</v-chip>    | Background color is a lowered opacity of the current text color |
| **outlined** | <v-chip color="primary" variant="outlined">Chip</v-chip> | Applies a thin border with the current text color               |
| **text**     | <v-chip color="primary" variant="text">Chip</v-chip>     | Removes the background and removes shadow                       |
| **plain**    | <v-chip color="primary" variant="plain">Chip</v-chip>    | Removes the background and lowers the opacity until hovered     |

#### Size and density

Chips can have various sizes from `x-small` to `x-large`. `density` is used to adjust the vertical spacing without affecting width or font size.

<ExamplesExample file="v-chip/prop-sizes" />

#### Draggable

`draggable` `v-chip` component can be dragged by mouse.

<ExamplesExample file="v-chip/prop-draggable" />

#### Label

Label chips use the `v-card` border-radius.

<ExamplesExample file="v-chip/prop-label" />

#### No ripple

`v-chip` can be rendered without ripple if `ripple` prop is set to `false`.

<ExamplesExample file="v-chip/prop-no-ripple" />

#### Outlined

Outlined chips inherit their border color from the current text color.

<ExamplesExample file="v-chip/prop-outlined" />

### Slots

#### Icon

Chips can use text or any icon available in the Material Icons font library.

<ExamplesExample file="v-chip/slot-icon" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-chip` component.

### Action chips

Chips can be used as actionable items. Provided with a _click_ event, the chip becomes interactive and can invoke methods.

<ExamplesExample file="v-chip/event-action-chips" />

#### Custom list

In this example we opt to use a customized list instead of [v-autocomplete](/components/autocompletes). This allows us to always display the options available while still providing the same functionality of search and selection.

<ExamplesExample file="v-chip/misc-custom-list" />

#### Expandable

Chips can be combined with `v-menu` to enable a specific set of actions for a chip.

<ExamplesExample file="v-chip/misc-expandable" />

#### Filtering

Chips are great for providing supplementary actions to a particular task. In this instance, we are searching a list of items and collecting a subset of information to display available keywords.

<ExamplesExample file="v-chip/misc-filtering" />

#### In selects

Selects can use chips to display the selected data. Try adding your own tags below.

<ExamplesExample file="v-chip/misc-in-selects" />
