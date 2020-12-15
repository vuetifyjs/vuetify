---
meta:
  title: Bottom sheet component
  description: The bottom sheet component is used for elevating content above other elements in a dialog style fashion.
  keywords: bottom sheets, vuetify bottom sheet component, vue bottom sheet component
related:
  - /components/dialogs/
  - /components/lists/
  - /components/menus/
---

# Bottom sheets

The bottom sheet is a modified `v-dialog` that slides from the bottom of the screen, similar to a `v-bottom-navigation`. Whereas a bottom navigation component is for buttons and specific application level actions, a bottom sheet can contain anything.

<entry-ad />

## Usage

Here we display an example list of actions that could be present in an application.

<usage name="v-bottom-sheet" />

## API

- [v-bottom-sheet](/api/v-bottom-sheet)

## Examples

### Props

#### Inset

Bottom sheets can be inset, reducing their maximum width on desktop to 70%. This can be further reduced manually using the **width** prop.

<example file="v-bottom-sheet/prop-inset" />

#### Model

Bottom sheets can be controlled using **v-model**. You can use it to close them or if you can't use `activator` slot.

<example file="v-bottom-sheet/prop-model" />

#### Persistent

Persistent bottom sheets can't be closed by clicking outside them.

<example file="v-bottom-sheet/prop-persistent" />

### Misc

#### Music Player

Using a inset bottom sheet, you can make practical components such as this simple music player.

<example file="v-bottom-sheet/misc-player" />

#### Open In List

By combining a functional list into a bottom sheet, you can create a simple 'open in' component.

<example file="v-bottom-sheet/misc-open-in-list" />

<backmatter />
