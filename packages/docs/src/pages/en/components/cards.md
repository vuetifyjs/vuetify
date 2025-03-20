---
meta:
  nav: Cards
  title: Card component
  description: The v-card component is a versatile and enhanced sheet of paper that provides a simple interface for headings, text, images, and actions.
  keywords: cards, vuetify card component, vue card component, v-card
related:
  - /components/buttons
  - /components/images
  - /styles/text-and-typography
features:
  figma: true
  label: 'C: VCard'
  github: /components/VCard/
  report: true
  spec: https://m2.material.io/components/cards
---

# Cards

 The `v-card` component is a versatile and enhanced version of [v-sheet](/components/sheets/) that provides a simple interface for headings, text, images, icons, and more.

<PageFeatures />

## Usage

The `v-card` component is a stylish way to wrap different types of content; such as tables, images, or user actions.

<ExamplesUsage name="v-card" />

<VoPromotionsCardVuetify slug="vuetify-snips" class="mb-4" />

## API

| Component | Description |
| - | - |
| [v-card](/api/v-card/) | Primary Component |
| [v-card-item](/api/v-card-item/) | Sub-component used to wrap the Card's `v-card-title` and `v-card-subtitle` components. |
| [v-card-title](/api/v-card-title/) | Sub-component used to display the Card's title. Wraps the `#title` slot |
| [v-card-subtitle](/api/v-card-subtitle/) | Sub-component used to display the Card's subtitle. Wraps the `#subtitle` slot. |
| [v-card-text](/api/v-card-text/) | Sub-component used to display the Card's text. Wraps the `#text` slot. |
| [v-card-actions](/api/v-card-actions/) | Sub-component that modifies the default styling of [v-btn](/components/buttons/). Wraps the `#actions` slot |

<ApiInline hide-links />

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

## Guide

The `v-card` component is a versatile and enhanced sheet of paper that provides a simple interface for headings, text, images, and actions. It is a content container that is the most common way to present information.

### Basics

There are three ways you can populate a `v-card` with content. The first one is by using props, the second one is by slots, and the third one is by manually using the `v-card-*` components.

<ExamplesExample file="v-card/basics-content" />

Props give you an easy interface to display text-only content. They can also be used to easily render images and icons. Use slots if you need to render more complex content. If you need full control over the content, use markup.

### Combined

In some cases it is possible to combine the different options, like the example below where props, slots and markup have all been used.

<ExamplesExample file="v-card/basics-combine" />

::: info

In general slots take precedence over props. So if you provide both **text** prop and use **text** slot, then only the slot content will be rendered.

:::

### Props

The `v-card` component has a variety of props that allow you to customize its appearance and behavior.

#### Variants

The **variant** prop gives you easy access to several different card styles. Available variants are: **elevated**(default), **flat**, **tonal**, **outlined**, **text**, and **plain**.

| Value        | Description                                                 |
|--------------|-------------------------------------------------------------|
| **elevated** | Elevates the card with a shadow                             |
| **flat**     | Removes card shadow and border                              |
| **tonal**    | Background color is a lowered opacity of the color          |
| **outlined** | Applies a thin border and card has zero elevation           |
| **text**     | Removes the background and removes shadow                   |
| **plain**    | Removes the background and lowers the opacity until hovered |

<ExamplesExample file="v-card/prop-variant" />

<VoPromotionsCardVuetify class="mb-4" />

#### Color

Cards can be colored by using any of the builtin colors and contextual names using the **color** prop.

<ExamplesExample file="v-card/prop-color" />

#### Elevation

The **elevation** property provides up to 24 levels of shadow depth. By default, cards rest at 2dp.

<ExamplesExample file="v-card/prop-elevation" />

#### Hover

When using the **hover** prop, the cards will increase its elevation when the mouse is hovered over them.

<ExamplesExample file="v-card/prop-hover" />

#### Href

The card becomes an anchor with the **href** prop.

<ExamplesExample file="v-card/prop-href" />

#### Link

Add the **link** prop for the same style without adding an anchor.

<ExamplesExample file="v-card/prop-link" />

#### Disabled

The **disabled** prop can be added in order to prevent a user from interacting with the card.

<ExamplesExample file="v-card/prop-disabled" />

#### Image

Apply a specific background image to the Card.

<ExamplesExample file="v-card/prop-image" />

::: tip

`v-card` does not allow its content to overflow outside the card by default. It also establishes a z-index stacking context, which prevents its content from displaying on top of elements outside the `v-card`, even when it sets a higher z-index value. To override this default behavior, apply the following usage: `<v-card style="overflow: initial; z-index: initial">`.

:::

### Slots

The `v-card` component provides slots that enable you to customize content created by its props or to add additional content.

Slots give you greater control to customize the content of the `v-card` component while still taking advantage of the easy-to-use props.

#### Avatar and icon

You can use the **prepend-avatar**, **append-avatar**, **prepend-icon** and **append-icon** props or the **prepend** and **append** slots to place a [v-icon](/components/icons/) that automatically injects the designated icon.

<ExamplesExample file="v-card/slot-prepend-append" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-card` component.

### Card Reveal

Using [v-expand-transition](/api/v-expand-transition/) and a `@click` event you can have a card that reveals more information once the button is clicked, activating the hidden card to be revealed.

<ExamplesExample file="v-card/misc-card-reveal" />

### Content wrapping

The `v-card` component is useful for wrapping content.

<ExamplesExample file="v-card/misc-content-wrapping" />

### Custom actions

With a simple conditional, you can easily add supplementary text that is hidden until opened.

<ExamplesExample file="v-card/misc-custom-actions" />

<VoPromotionsCardVuetify class="mb-4" />

### Grids

Using [grids](/components/grids/), you can create beautiful layouts.

<ExamplesExample file="v-card/misc-grids" />

### Horizontal cards

You can also play with the card layout using [layout flex](/styles/flex/).

<ExamplesExample file="v-card/misc-horizontal-cards" />

### Information card

Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.

<ExamplesExample file="v-card/misc-information-card" />

### Media with text

Using the layout system, we can add custom text anywhere within the background.

<ExamplesExample file="v-card/misc-media-with-text" />

### Twitter card

The `v-card` component has multiple children components that help you build complex examples without having to worry about spacing. This example is comprised of the `v-card-title`, `v-card-text` and `v-card-actions` components.

<ExamplesExample file="v-card/misc-twitter-card" />

### Weather card

Using [v-list-items](/components/lists) and a [v-slider](/components/sliders), we are able to create a unique weather card. The list components ensure that we have consistent spacing and functionality while the slider component allows us to provide a useful interface of selection to the user.

<ExamplesExample file="v-card/misc-weather-card" />

### Loading

Use an indeterminate [v-progress-linear](/components/progress-linear) to indicate a loading state.

<ExamplesExample file="v-card/prop-loading" />

### Earnings goal

This example utilizes slots to customize the appearance of the different content areas.

<ExamplesExample file="v-card/misc-earnings-goal" />

### Funding card

Utilize a combination of Card properties and utility classes to create a unique funding card.

<ExamplesExample file="v-card/misc-shopify-funding" />
