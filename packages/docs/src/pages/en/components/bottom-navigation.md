---
nav: Bottom navigation
meta:
  title: Bottom navigation component
  description: The bottom navigation component is used for mobile devices and acts as the primary navigation for your application.
  keywords: bottom navigation, vuetify bottom navigation component, vue bottom navigation component
related:
  - /components/buttons/
  - /components/icons/
  - /components/tabs/
---

# Bottom navigation

The `v-bottom-navigation` component is an alternative to the sidebar. It is primarily used for mobile applications and comes in three variants, **icons** and **text**, and **shift**.

----

## Usage

While `v-bottom navigation` is meant to be used with [vue-router](https://router.vuejs.org/), you can also programmatically control the active state of the buttons by using the **value** property. A button is given a default value of its _index_ with `v-bottom-navigation`.

<usage name="v-bottom-navigation" />

<entry />

## API

| Component | Description |
| - | - |
| [v-bottom-navigation](/api/v-bottom-navigation/) | Primary Component |
| [v-btn](/api/v-btn/) | Sub-component used for modifying the `v-bottom-navigation` state |

<api-inline hide-links />

## Examples

### Props

#### Color

The **color** prop applies a color to the background of the bottom navigation. We recommend using the **light** and **dark** props to properly contrast text color.

<example file="v-bottom-navigation/prop-color" />

#### Grow

Using the **grow** property forces [v-btn](/components/buttons/) components to _fill_ all available space. Buttons have a maximum width of **168px** per the [Bottom Navigation MD specification](https://material.io/components/bottom-navigation#specs).

<example file="v-bottom-navigation/prop-grow" />

<!-- TODO: Fix this example when scrolling techniques is implemented
#### Hide on scroll

The `v-bottom-navigation` component hides when *scrolling up* when using the **hide-on-scroll** property. This is similar to the [scrolling techniques](https://material.io/archive/guidelines/patterns/scrolling-techniques.html) that are supported in [v-app-bar](/components/app-bars/). In the following example, scroll *up and down* to see this behavior.

<example file="v-bottom-navigation/prop-hide-on-scroll" />
-->

#### Horizontal

Adjust the style of buttons and icons by using the **horizontal** prop. This positions button text *inline* with the provided [v-icon](/components/icons/).

<example file="v-bottom-navigation/prop-horizontal" />

<!-- TODO: Fix this example when scrolling techniques is implemented
#### Scroll threshold

Modify the **scroll-threshold** property to increase the distance a user must scroll before the `v-bottom-navigation` is hidden.

<example file="v-bottom-navigation/prop-scroll-threshold" />
-->

#### Shift

The **shift** prop hides button text when not active. This provides an alternative visual style to the `v-bottom-navigation` component.

<alert type="info">

  For this to work, `v-btn` text is **required** to be wrapped in a `span` tag.

</alert>

<example file="v-bottom-navigation/prop-shift" />

#### Toggle

The display state of `v-bottom-navigation` can be toggled using the **input-value** prop. You can also control the currently active button using **v-model**.

<example file="v-bottom-navigation/prop-toggle" />
