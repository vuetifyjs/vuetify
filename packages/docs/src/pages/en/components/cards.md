---
meta:
  title: Card component
  description: The v-card component is a versatile component that can be used for anything from a panel to a static image.
  keywords: cards, vuetify card component, vue card component, v-card
related:
  - /components/buttons/
  - /components/images/
  - /styles/text-and-typography/
---

# Cards

The `v-card` component is a versatile component that can be used for anything from a panel to a static image. The **card** component has numerous helper components to make markup as easy as possible. Components that have no listed options use Vue's functional component option for faster rendering and serve as markup sugar to make building easier. <inline-ad slug="scrimba-cards" />

<entry-ad />

## Usage

A card has 4 basic components, `v-card-title`, `v-card-subtitle`, `v-card-text` and `v-card-actions`.

<usage name="v-card" />

## API

- [v-card](/api/v-card)
- [v-card-actions](/api/v-card-actions)
- [v-card-subtitle](/api/v-card-subtitle)
- [v-card-text](/api/v-card-text)
- [v-card-title](/api/v-card-title)

## Functional Components

### v-card-actions

The container used for placing **actions** for a card, such as [v-btn](/components/buttons) or [v-menu](/components/menus). Also applies *special margin* to buttons so that they properly line up with other card content areas.

### v-card-subtitle

Provides a default **font-size** and **padding** for card subtitles. Font-size can be overwritten with [typography classes](/styles/typography).

### v-card-text

Primarily used for **text content** in a card. Applies padding for text, reduces its font-size to .875rem.

### v-card-title

Provides a default **font-size** and **padding** for card titles. Font-size can be overwritten with [typography classes](/styles/typography).

## Examples

### Props

#### Loading

Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate [v-progress-linear](/components/progress-linear).

<example file="v-card/prop-loading" />

#### Outlined

An **outlined** card has 0 elevation and contains a soft border.

<example file="v-card/prop-outlined" />

### Misc

#### Content wrapping

The `v-card` component is useful for wrapping content.

<example file="v-card/misc-content-wrapping" />

#### Custom actions

With a simple conditional, you can easily add supplementary text that is hidden until opened.

<example file="v-card/misc-custom-actions" />

#### Grids

Using grids, you can create beautiful layouts.

<example file="v-card/misc-grids" />

#### Horizontal cards

Using `v-flex`, you can create customized horizontal cards. Use the `contain` property to shrink the `v-img` to fit inside the container, instead of covering.

<example file="v-card/misc-horizontal-cards" />

#### Information card

Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.

<example file="v-card/misc-information-card" />

#### Media with text

Using the layout system, we can add custom text anywhere within the background.

<example file="v-card/misc-media-with-text" />

#### Twitter card

The `v-card` component has multiple children components that help you build complex examples without having to worry about spacing. This example is comprised of the `v-card-title`, `v-card-text` and `v-card-actions` components.

<example file="v-card/misc-twitter-card" />

#### Weather card

Using [v-list-items](/components/lists) and a [v-slider](/components/sliders), we are able to create a unique weather card. The list components ensure that we have consistent spacing and functionality while the slider component allows us to provide a useful interface of selection to the user.

<example file="v-card/misc-weather-card" />

<backmatter />
