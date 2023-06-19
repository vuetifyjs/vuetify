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

 The `v-card` component is a versatile and enhanced version of [v-sheet](/components/sheets/) that provides a simple interface for headings, text, images, icons, and more <inline slug="scrimba-cards" />

![Card Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-card/v-card-entry.png)

---

## Usage

The `v-card` component is a stylish way to wrap different types of content; such as tables, images, or user actions.

<usage name="v-card" />

<entry />

## API

| Component | Description |
| - | - |
| [v-card](/api/v-card/) | Primary Component |
| [v-card-item](/api/v-card-item/) | Sub-component used to wrap the Card's `v-card-title` and `v-card-subtitle` components. |
| [v-card-title](/api/v-card-title/) | Sub-component used to display the Card's title. Wraps the `#title` slot |
| [v-card-subtitle](/api/v-card-subtitle/) | Sub-component used to display the Card's subtitle. Wraps the `#subtitle` slot. |
| [v-card-text](/api/v-card-text/) | Sub-component used to display the Card's text. Wraps the `#text` slot. |
| [v-card-actions](/api/v-card-actions/) | Sub-component that modifies the default styling of [v-btn](/components/buttons/). Wraps the `#actions` slot |

## Anatomy

The recommended placement of elements inside of `v-card` is:

* Place `v-card-title`, `v-card-subtitle` or other title text on top
* Place `v-card-text` and other forms of media below the card header
* Place `v-card-actions` after card content

![Card Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-card/v-card-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The Card container holds all `v-card` components. Composed of 3 major parts: `v-card-item`, `v-card-text`, and `v-card-actions` |
| 2. Title (optional) | A heading with increased **font-size** |
| 3. Subtitle (optional) | A subheading with a lower emphasis text color |
| 4. Text (optional) | A content area with a lower emphasis text color |
| 5. Actions (optional) | A content area that typically contains one or more [v-btn](/components/buttons) components |

<api-inline hide-links />

## Basics

There are three ways you can populate a `v-card` with content. The first one is by using props, the second one is by slots, and the third one is by manually using the `v-card-*` components.

<example file="v-card/basics-content" />

Props give you an easy interface to display text-only content. They can also be used to easily render images and icons.

Use slots if you need to render more complex content. If you need full control over the content, use markup.

In some cases it is possible to combine the different options, like the example below where props, slots and markup have all been used.

<alert type="info">

  In general slots take precedence over props. So if you provide both **text** prop and use **text** slot, then only the slot content will be rendered.

</alert>

<example file="v-card/basics-combine" />

## Examples

### Props

#### Outlined

A card with the **variant** prop set to `outlined` has zero elevation.

<example file="v-card/prop-outlined" />

### Misc

#### Card Reveal

Using [v-expand-transition](/api/v-expand-transition/) and a `@click` event you can have a card that reveals more information once the button is clicked, activating the hidden card to be revealed.

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

TODO: better description

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

#### Loading

Use an indeterminate [v-progress-linear](/components/progress-linear) to indicate a loading state.

<example file="v-card/prop-loading" />
