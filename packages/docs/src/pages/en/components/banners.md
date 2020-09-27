---
meta:
  title: Banner component
  description: The banner component displays an important and succinct message for a user to address. It can also provide actions for user to take.
  keywords: banners, vuetify banner component, vue banner component
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
---

# Banners

The `v-banner` component is used as middle-interruptive message to user with 1-2 actions. It comes in 2 variations **single-line** and **multi-line** (implicit). These can have icons which you can use with your message and actions.

<entry-ad />

## Usage

Banners can have 1-2 lines of text, actions and icon.

<usage name="v-banner" />

## API

- [v-banner](/api/v-banner)

## Examples

### Props

#### Single line

**Single-line** VBanner is used for small amount of information and is recommended for **desktop** only implementations. You can optionally enable the **sticky** prop to ensure the content is pinned to the screen (note: does not work in IE11). You can find more information about [sticky positioning here](https://developer.mozilla.org/en-US/docs/Web/CSS/position).

<example file="v-banner/prop-single-line" />

### Events

#### Icon click

VBanner emits `click:icon` event on icon click, even with custom icon slot.

<example file="v-banner/event-icon-click" />

### Slots

#### Actions

The `actions` slot has `dismiss` function in its scope, you can use it to easily dismiss banner.

<example file="v-banner/slot-actions" />

#### Icon

The icon slot allows you to to explicitly control the content and functionality within it.

<example file="v-banner/slot-icon" />

### Misc

#### Two line

**Two-line** VBanner can store larger amount of data, use it for big messages. This is recommend **mobile** implementations.

<example file="v-banner/misc-two-line" />

<backmatter />
