---
meta:
  title: Skeleton loader component
  description: The v-skeleton-loader component is a versatile tool that can fill many roles within a project. At its heart, the component provides an indication to the user that something is coming but not yet available.
  keywords: skeleton-loader, material loader, bar loader
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/buttons/
---

# Skeleton loaders

The `v-skeleton-loader` component is a versatile tool that can fill many roles within a project.  At its heart, the component provides an indication to the user that something is coming but not yet available. There are over 30 pre-defined options available that can be combined to make custom examples.

<entry-ad />

## Usage

The `v-skeleton-loader` component provides a user with a visual indicator that content is coming / loading. This is better received than traditional full-screen loaders.

<example file="v-skeleton-loader/usage" />

## API

- [v-skeleton-loader](/api/v-skeleton-loader)

## Examples

### Misc

#### Boilerplate component

The `v-skeleton-loader` can be used as boilerplate designs when creating mockups. Mix and match various pre-defined options or create your own unique implementations. In this example, we use a custom **data** property to apply the same props to multiple `v-skeleton-loader`'s at once.

<example file="v-skeleton-loader/misc-boilerplate" />

<!-- #### Implementation methods

There are 2 ways that you can utilize the `v-skeleton-component`. The **default slot** or a **v-if** conditional. The built in slot is the most convenient and easiest to use, but generates an extra div once rendered. If the extra div is an issue in your setup, you can utilize a **v-if** conditional with a Vuetify [transition component](/styles/transitions) or a custom one.

<example file="v-skeleton-loader/misc-implementation" /> -->

## Accessibility

By default, the `v-skeleton-loader` component is assigned a [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert). We augment this role with two aria properties. An [**aria-busy**](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy) value of **true** denotes that a widget is missing required owned elements. An [**aria-live**](https://www.w3.org/TR/wai-aria-1.1/#aria-live) value of **polite** sets the screen reader's priority of live regions.

<backmatter />
