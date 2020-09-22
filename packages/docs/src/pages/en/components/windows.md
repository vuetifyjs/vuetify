---
meta:
  title: Window component
  description: The window component is a wrapper container that allows transitioning between content. It serves as the baseline for tabs and carousels.
  keywords: windows, vuetify window component, vue window component
  related:
    - /components/carousels
    - /components/steppers
    - /components/tabs

---

# Windows

The `v-window` component provides the baseline functionality for transitioning content from 1 pane to another. Other components such as `v-tabs`, `v-carousel` and `v-stepper` utilize this component at their core.

<entry-ad />

## Usage

Designed to easily cycle through content, `v-window` provides a simple interface to create truly custom implementations.

<example file="v-window/usage" />

## API

- [v-window](/api/v-window)
- [v-window-item](/api/v-window-item)

<!-- ## Sub-components

### v-window-item

v-window-item description -->

## Examples

Designed to easily cycle through content, `v-window` provides a simple interface to create truly custom implementations.

### Props

#### Reverse

Reverse `v-window` always displays reverse transition.

<example file="v-window/prop-reverse" />

#### Vertical

`v-window` can be vertical. Vertical windows have Y axis transition instead of X axis transition.

<example file="v-window/prop-vertical" />

### Misc

#### Account creation

Create rich forms with smooth animations. `v-window` automatically tracks the current selection index to automatically change the transition direction. This can be manually controlled with the **reverse** prop.

<example file="v-window/misc-account-creation" />

#### Onboarding

`v-window` makes it easy to create custom components such as a different styled stepper.

<example file="v-window/misc-onboarding" />

<backmatter />
