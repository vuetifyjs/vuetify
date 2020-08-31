---
meta:
  title: System bar component
  description: The system bar component creates an android style status bar that rests on the very top of your application.
  keywords: system bars, vuetify system bar component, vue system bar component, android status bar, status bar
related:
  - /components/buttons/
  - /components/toolbars/
  - /components/tabs/
---

# System bars

The `v-system-bar` component can be used for displaying statuses to the user. It looks like the Android system bar and can contain icons, spacers, and some text.

<entry-ad />

## Usage

`v-system-bar` in its simplest form displays a small container with default theme.

<usage name="v-system-bar" />

## API

- [v-system-bar](/api/v-system-bar)

## Examples

### Props

#### Color

You can optionally change the color of the `v-system-bar` by using the `color` prop.

<example file="v-system-bar/prop-color" />

#### Lights out

You can reduce `v-system-bar`'s opacity using `lights-out` property.

<example file="v-system-bar/prop-lights-out" />

#### Themes

Dark or light theme variants can be applied to `v-system-bar`.

<example file="v-system-bar/prop-themes" />

#### Window

A window bar with window controls and status info.

<example file="v-system-bar/prop-window" />

<backmatter />
