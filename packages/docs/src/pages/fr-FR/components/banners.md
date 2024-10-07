---
meta:
  title: Composant Bannière
  description: The banner component displays an important and succinct message for a user to address. It can also provide actions for user to take.
  keywords: banners, vuetify banner component, vue banner component
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
---

# Bannières

The `v-banner` component is used as middle-interruptive message to user with 1-2 actions. It comes in 2 variations **single-line** and **multi-line** (implicit). These can have icons which you can use with your message and actions.

<entry-ad />

## Utilisation

Les bannières peuvent avoir 1-2 lignes de texte, d'actions et d'icône.

<usage name="v-banner" />

## API

- [v-banner](/api/v-banner)

<inline-api page="components/banners" />

## Exemples

### Propriétés

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

#### Icônes

Le champ d'icône vous permet de contrôler explicitement le contenu et les fonctionnalités qui y sont contenues.

<example file="v-banner/slot-icon" />

### Divers

#### Two line

**Two-line** VBanner can store larger amount of data, use it for big messages. This is recommend **mobile** implementations.

<example file="v-banner/misc-two-line" />

<backmatter />
