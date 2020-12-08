---
meta:
  title: FAB component
  description: The floating action button (or FAB) component is a promoted action that is elevated above the UI or attached to an element such as a card.
  keywords: floating action button, fab, vuetify fab component, vue fab component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
---

# Buttons: Floating Action Button

The `v-btn` component can be used as a floating action button. This provides an application with a main point of action. Combined with the `v-speed-dial` component, you can create a diverse set of functions available for your users.

<entry-ad />

## Usage

Floating action buttons can be attached to material to signify a promoted action in your application. The default size will be used in most cases, whereas the `small` variant can be used to maintain continuity with similar sized elements.

<usage name="v-btn-fab" />

## API

- [v-btn](/api/v-btn)
- [v-speed-dial](/api/v-speed-dial)

<!-- ## Sub-components

### v-speed-dial

v-speed-dial description -->

## Examples

### Misc

#### Display animation

When displaying for the first time, a floating action button should animate onto the screen. Here we use the `v-fab-transition` with v-show. You can also use any custom transition provided by Vuetify or your own.

<example file="v-btn-fab/misc-display-animation" />

#### Lateral screens

When changing the default action of your button, it is recommended that you display a transition to signify a change. We do this by binding the `key` prop to a piece of data that can properly signal a change in action to the Vue transition system. While you can use a custom transition for this, ensure that you set the `mode` prop to **out-in**.

<example file="v-btn-fab/misc-lateral-screens" />

#### Small variant

For better visual appeal, we use a small button to match our list avatars.

<example file="v-btn-fab/misc-small" />

#### Speed dial

The speed-dial component has an very robust api for customizing your FAB experience exactly how you want.

<example file="v-btn-fab/misc-speed-dial" />

<backmatter />
