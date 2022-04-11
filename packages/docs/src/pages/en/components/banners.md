---
nav: Banners
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

<entry />

## Usage

Banners can contain one to two lines of text, to which actions and icons can be added.

<!-- <usage name="v-banner" /> -->

## API

<api-inline />

## Examples

### Props

#### Lines

The prop **lines** can be used to specify how the displayed text should be handled based on its length.

<example file="v-banner/prop-lines" />

#### Sticky

You can optionally turn on the **sticky** prop to ensure that the content is pinned to the top of the screen.

<example file="v-banner/prop-sticky" />

### Slots

#### Actions

Banners may have one or two text buttons that don't stand out that much.

<example file="v-banner/slot-actions" />

#### Icon

The icon slot allows you to to explicitly control the content and functionality within it. Icons also help to emphasize a banner's message.

<example file="v-banner/slot-icon" />

<backmatter />
