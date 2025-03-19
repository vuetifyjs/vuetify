---
meta:
  nav: Bottom sheets
  title: Bottom sheet component
  description: The bottom sheet component is used for elevating content above other elements in a dialog style fashion.
  keywords: bottom sheets, vuetify bottom sheet component, vue bottom sheet component
related:
  - /components/dialogs/
  - /components/lists/
  - /components/menus/
features:
  label: 'C: VBottomSheet'
  github: /components/VBottomSheet/
  report: true
  spec: https://m2.material.io/components/sheets-bottom
---

# Bottom sheets

The bottom sheet is a modified `v-dialog` that slides from the bottom of the screen, similar to a `v-bottom-navigation`.

<PageFeatures />

::: success

This feature was introduced in [v3.4.0 (Blackguard)](/getting-started/release-notes/?version=v3.4.0)

:::

## Usage

Whereas a bottom navigation component is for buttons and specific application level actions, a bottom sheet is meant to contain anything.

<ExamplesUsage name="v-bottom-sheet" />

<PromotedEntry />

## API

| Component                                        | Description       |
|--------------------------------------------------|-------------------|
| [v-bottom-sheet](/api/v-bottom-sheet/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The recommended components to use inside of a `v-bottom-sheet` are:

* [v-card](/components/cards/)
* [v-list](/components/lists/)
* [v-sheet](/components/sheets/)

![Bottom Sheet Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-bottom-sheet/v-bottom-sheet-anatomy.png)

| Element / Area | Description                                                              |
|----------------|--------------------------------------------------------------------------|
| 1. Container   | The bottom sheet is a dialog that animates from the bottom of the screen |

## Guide

The `v-bottom-sheet` component is a modified [v-dialog](/components/dialogs/) that slides from the bottom of the screen. It is used for elevating content above other elements in a dialog style fashion. The bottom sheet can be controlled using the `v-model` prop or through the `activator` slot.

The following code snippet is an example of a basic `v-bottom-sheet` component:

```html
<v-bottom-sheet>
  <v-card
    title="Bottom Sheet"
    text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis."
  ></v-card>
</v-bottom-sheet>
```

### Props

The `v-bottom-sheet` component has access to all of the props available in [v-dialog](/api/v-dialog/).

#### Model

The **v-model** (or **model-value**) controls the visibility of the bottom sheet:

<ExamplesExample file="v-bottom-sheet/prop-model" />

This also works in tandem with the [activator](/api/v-bottom-sheet/#slots-activator) slot.

#### Inset

With the **inset** prop, reduce the maximum width of the content area on desktop to 70%. This can be further reduced manually using the **width** prop.

<ExamplesExample file="v-bottom-sheet/prop-inset" />

### Slots

The `v-bottom-sheet` component has access to all of the slots available in [v-dialog](/api/v-dialog#slots).

![Bottom Sheet Slots](https://cdn.vuetifyjs.com/docs/images/components/v-bottom-sheet/v-bottom-sheet-slots.png)

| Slot         | Description                                         |
|--------------|-----------------------------------------------------|
| 1. Default   | The default slot                                    |
| 2. Activator | The activator slot is used to open the bottom sheet |

::: info

The **activator** slot is not required when using the **v-model** prop.

:::

### Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-bottom-sheet` component.

#### Music Player

Using a inset bottom sheet, you can make practical components such as this simple music player.

<ExamplesExample file="v-bottom-sheet/misc-player" />

#### Open In List

By combining a functional list into a bottom sheet, you can create a simple 'open in' component.

<ExamplesExample file="v-bottom-sheet/misc-open-in-list" />
