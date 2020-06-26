---
meta:
  title: Bottom navigation component
  description: The bottom navigation component is used for mobile devices and acts as the primary navigation for your application.
  keywords: bottom navigation, vuetify bottom navigation component, vue bottom navigation component
related:
  - /components/buttons/
  - /components/icons/
  - /components/tabs/
---

# Bottom navigation

The `v-bottom-navigation` is an alternative to the sidebar. It is primarily used on mobile and comes in two variants, icons and text, and shift.

<entry-ad />

## Usage

While the bottom nav is meant to be used with the `vue-router`, you can also programmatically control the active state of the buttons by using the `active.sync` prop. You can change a button's value by using its `value` attribute.

<example file="v-bottom-navigation/usage" />

## API

- [v-bottom-navigation](../../api/v-bottom-navigation)

## Examples

Below is a collection of simple to complex examples.

### Props

#### Color

The `color` prop applies a color to the background the bottom navigation. It is recommended to use the `light` and `dark` props to properly contrast text color.

<example file="v-bottom-navigation/prop-color" />

#### Grow

If `v-bottom-navigation` has `grow` property, buttons within it grow to fill available space.

<example file="v-bottom-navigation/prop-grow" />

#### Hide on scroll

Hide-on-scroll hides `v-bottom-navigation` when target element is scrolled.

<example file="v-bottom-navigation/prop-hide-on-scroll" />

#### Horizontal

The `horizontal` prop, places nav text next to the icon as appose to beneath it.

<example file="v-bottom-navigation/prop-horizontal" />

#### Scroll threshold

`scroll-threshold` property allows you to customize the threshold you can scroll before `v-bottom-navigation` disappears.

<example file="v-bottom-navigation/prop-scroll-threshold" />

#### Shift

The `shift` prop will hide the button text until active. For this to work, `v-btn` text is required to be wrapped in a `<span>` tag.

<example file="v-bottom-navigation/prop-shift" />

#### Toggle

The display state of `v-bottom-navigation` can be toggled using the `input-value` prop. You can also control the currently active button using `v-model`.

<example file="v-bottom-navigation/prop-toggle" />

<backmatter />
