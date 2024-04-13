---
meta:
  nav: Windows
  title: Window component
  description: The window component is a wrapper container that allows transitioning between content. It serves as the baseline for tabs and carousels.
  keywords: windows, vuetify window component, vue window component
related:
    - /components/carousels/
    - /components/sheets/
    - /components/tabs/
features:
  github: /components/VWindow/
  label: 'C: VWindow'
  report: true
---

# Windows

The `v-window` component provides the baseline functionality for transitioning content from one pane to another. Other components such as `v-tabs`, `v-carousel` and `v-stepper` utilize this component at their core.

<PageFeatures />

## Usage

Designed to easily cycle through content, `v-window` provides a simple interface to create custom implementations.

<ExamplesExample file="v-window/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-window](/api/v-window/) | Primary Component |
| [v-window-item](/api/v-window-item/) | Sub-component used to display a single window item |

<ApiInline hide-links />

## Examples

### Props

#### Show arrows

By default no arrows are displayed. You can change this by adding the **show-arrows** prop. If you set the prop value to `"hover"`, they will only show when you mouse over the window.

<ExamplesExample file="v-window/prop-show-arrows" />

#### Reverse

The **reverse** prop will reverse the transitions

<ExamplesExample file="v-window/prop-reverse" />

#### Direction

You can change the transition to vertical using the **direction** prop

<ExamplesExample file="v-window/prop-direction" />

#### Customized arrows

Arrows can be customized by using **prev** and **next** slots.

<ExamplesExample file="v-window/slots-next-prev" />

### Misc

#### Account creation

Create rich forms with smooth animations. `v-window` automatically tracks the current selection index to change the transition direction.

<ExamplesExample file="v-window/misc-account-creation" />

#### Onboarding

`v-window` makes it easy to create custom components such as a differently styled stepper.

<ExamplesExample file="v-window/misc-onboarding" />
