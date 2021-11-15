---
meta:
  title: Banner component
  description: The banner component displays an important and concise message for a user to address. It can also indicate actions that the user can take.
  keywords: banners, vuetify banner component, vue banner component
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
---

# Banners

The `v-banner` component is used as a middle-interrupting message to the user with one to two actions. It comes in two variations **single-line** and **multi-line** (implicit). These can have icons and actions that you can use with your message. Note that only one banner should be shown at a time.

<entry-ad />

## Usage

Banners can contain one to two lines of text, to which actions and icons can be added.

<usage name="v-banner" />

## API

- [v-banner](/api/v-banner)

<inline-api page="components/banners" />

## Examples

### Props

#### Single-line

**Single-line** is used for small amounts of information and is recommended for desktop-only implementations. You can optionally turn on the sticky prop to ensure that the content is pinned to the screen (note: does not work in IE11). More information on [sticky positioning here](https://developer.mozilla.org/en-US/docs/Web/CSS/position).

<example file="v-banner/prop-single-line" />

#### Mobile

Use the **mobile** prop to adapt the VBanner to a mobile version. With this prop, the VBanner will be halved in size.

### Events

#### Icon click

VBanner emits `click:icon` event on icon click, even with custom icon slot.

<example file="v-banner/event-icon-click" />

### Slots

#### Actions

The `actions` slot has `dismiss` function in its scope, you can use it to easily dismiss banner. Banners may have one or two text buttons that don't stand out that much.

<example file="v-banner/slot-actions" />

#### Icon

The icon slot allows you to to explicitly control the content and functionality within it. Icons also help to emphasize a banner's message.

<example file="v-banner/slot-icon" />

### Misc

#### Two line

One to two lines of text is preferable. The use of two lines is recommended for mobile screens. On desktop however, three lines of text should be considered the maximum length in order to keep the message short and concise.

<example file="v-banner/misc-two-line" />

<backmatter />
