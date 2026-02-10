---
emphasized: true
meta:
  nav: Snackbars
  title: Snackbar component
  description: The snackbar component informs user of a process that your application has performed is will perform. It can be temporary and often contains actions. Timer will stop when user hovers over the snackbar.
  keywords: snackbars, vuetify snackbar component, vue snackbar component
related:
  - /components/buttons/
  - /styles/colors/
  - /components/forms/
features:
  github: /components/VSnackbar/
  label: 'C: VSnackbar'
  report: true
  spec: https://m3.material.io/components/snackbar
---

# Snackbars

The `v-snackbar` component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.

<PageFeatures />

## Usage

a `v-snackbar` in its simplest form displays a temporary and closable notification to the user.

<ExamplesExample file="v-snackbar/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-snackbar](/api/v-snackbar/) | Primary Component |
| [v-btn](/api/v-btn/) | Sub-component typically used for actions |

<ApiInline hide-links />

## Examples

::: info
Some examples below use the **contained** prop to keep snackbars scoped within the example preview. In a real application you typically don't need it — snackbars render in the application overlay by default.
:::

### Props

#### Timeout

The **timeout** property lets you customize the delay before the `v-snackbar` is hidden.

<ExamplesExample file="v-snackbar/prop-timeout" />

#### Variants

Apply different styles to the snackbar using props such as **text**, **shaped**, **outlined**, and more.

<ExamplesExample file="v-snackbar/prop-variants" />

#### Prepend icon

The **prepend-icon** prop adds an icon to the start of the snackbar.

<ExamplesExample file="v-snackbar/prop-prepend-icon" />

#### Prepend avatar

The **prepend-avatar** prop adds an avatar image to the start of the snackbar.

<ExamplesExample file="v-snackbar/prop-prepend-avatar" />

#### Loading

The **loading** prop displays a circular progress indicator in the prepend area, useful for indicating an ongoing process.

<ExamplesExample file="v-snackbar/prop-loading" />

#### Timer position

The **timer** prop accepts `'top'` or `'bottom'` to control where the progress bar is rendered. Use **timer-color** to change its color and **reverse-timer** to invert the direction.

<ExamplesExample file="v-snackbar/prop-timer-position" />

#### Vertical

The **vertical** property allows you to stack the content of your `v-snackbar`.

<ExamplesExample file="v-snackbar/prop-vertical" />

### Slots

#### Header

The **header** slot renders content above the snackbar wrapper, useful for metadata like a provider name or timestamp.

<ExamplesExample file="v-snackbar/slot-header" />

#### Prepend

The **prepend** slot overrides the default prepend area, allowing you to customize the content beyond what is possible with simple props.

<ExamplesExample file="v-snackbar/slot-prepend" />
