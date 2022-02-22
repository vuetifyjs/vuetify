---
nav: Cards
meta:
  title: Card component
  description: The v-card component is a versatile and enhanced sheet of paper that provides a simple interface for headings, text, images, and actions.
  keywords: cards, vuetify card component, vue card component, v-card
related:
  - /components/buttons
  - /components/images
  - /styles/text-and-typography
---

# Cards

 The `v-card` component is a versatile and enhanced sheet of paper that provides a simple interface for headings, text, images, icons, and more. Card components that have no listed options, such as `v-card-header`, are functional components that serve as _markup sugar_ that help make your code more readable. <inline slug="scrimba-cards" />

<entry />

## Usage

<usage name="v-card" />

## API

<api-inline />

## Structure

The following snippet shows the general structure of a card:

```html
<v-card>
  <v-card-img>
    <v-img src="..." />
  </v-card-img>

  <v-card-media>
    <v-img src="..." />
  </v-card-media>

  <v-card-header>
    <v-card-avatar>
      <v-avatar image="...">
    </v-card-avatar>

    <v-card-header-text>
      <v-card-title>...</v-card-title>

      <v-card-subtitle>...</v-card-subtitle>
    </v-card-header-text>

    <v-card-avatar>
      <v-avatar icon="...">
    </v-card-avatar>
  </v-card-header>

  <v-card-text>...</v-card-text>

  <v-card-actions>
    <v-btn>Action 1</v-btn>

    <v-btn>Action 2</v-btn>
  </v-card-actions>
</v-card>
```

### v-card-actions

The container used for placing **actions** for a card, such as [v-btn](/components/buttons) or [v-menu](/components/menus). Also applies *special margin* to buttons so that they properly line up with other card content areas.

### v-card-avatar

TODO

### v-card-header

TODO

### v-card-header-text

TODO

### v-card-img

TODO

### v-card-subtitle

Provides a default **font-size** and **padding** for card subtitles. Font-size can be overwritten with [typography classes](/styles/text-and-typography).

### v-card-text

Primarily used for **text content** in a card. Applies padding for text, reduces its font-size to .875rem.

### v-card-title

Provides a default **font-size** and **padding** for card titles. Font-size can be overwritten with [typography classes](/styles/text-and-typography).

<promoted slug="vuetify-zero-theme-pro" />

## Examples

### Props

<!-- #### Loading

Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate [v-progress-linear](/components/progress-linear).

<example file="v-card/prop-loading" /> -->

#### Outlined

A card with the **variant** prop set to `outlined` has zero elevation.

<example file="v-card/prop-outlined" />

### Misc

#### Card Reveal

Using [v-expand-transition](https://vuetifyjs.com/en/api/v-expand-transition/) and a `@click` event you can have a card that reveals more information once the button is clicked, activating the hidden card to be revealed.

<example file="v-card/misc-card-reveal" />

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

<!-- TODO: better description -->

<example file="v-card/misc-horizontal-cards" />

<!-- #### Information card

Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.

<example file="v-card/misc-information-card" /> -->

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
