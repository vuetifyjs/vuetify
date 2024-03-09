---
meta:
  nav: Bottom navigation
  title: Bottom navigation component
  description: The bottom navigation component is used for mobile devices and acts as the primary navigation for your application.
  keywords: bottom navigation, vuetify bottom navigation component, vue bottom navigation component
related:
  - /components/buttons/
  - /components/icons/
  - /components/tabs/
features:
  figma: true
  label: 'C: VBottomNavigation'
  report: true
  github: /components/VBottomNavigation/
  spec: https://m2.material.io/components/bottom-navigation
---

# Bottom navigation

The `v-bottom-navigation` component is an alternative to the sidebar. It is primarily used for mobile applications and comes in three variants, **icons** and **text**, and **shift**.

<PageFeatures />

## Usage

While `v-bottom navigation` is meant to be used with [vue-router](https://router.vuejs.org/), you can also programmatically control the active state of the buttons by using the **value** property. A button is given a default value of its _index_ with `v-bottom-navigation`.

<ExamplesUsage name="v-bottom-navigation" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-bottom-navigation](/api/v-bottom-navigation/) | Primary Component |
| [v-btn](/api/v-btn/) | Sub-component used for modifying the `v-bottom-navigation` state |

<ApiInline hide-links />

::: info

For styles to apply properly when using the **shift** prop, `v-btn` text is **required** to be wrapped in a `span` tag.

:::

## Examples

### Props

#### Color

The **color** prop applies a color to the background of the bottom navigation. We recommend using the **light** and **dark** props to properly contrast text color.

<ExamplesExample file="v-bottom-navigation/prop-color" />

#### Grow

Using the **grow** property forces [v-btn](/components/buttons/) components to _fill_ all available space. Buttons have a maximum width of **168px** per the [Bottom Navigation MD specification](https://material.io/components/bottom-navigation#specs).

<ExamplesExample file="v-bottom-navigation/prop-grow" />

<!-- TODO: Fix this example when scrolling techniques is implemented
#### Hide on scroll

The `v-bottom-navigation` component hides when *scrolling up* when using the **hide-on-scroll** property. This is similar to the [scrolling techniques](https://material.io/archive/guidelines/patterns/scrolling-techniques.html) that are supported in [v-app-bar](/components/app-bars/). In the following example, scroll *up and down* to see this behavior.

<ExamplesExample file="v-bottom-navigation/prop-hide-on-scroll" />
-->

#### Horizontal

Adjust the style of buttons and icons by using the **horizontal** prop. This positions button text *inline* with the provided [v-icon](/components/icons/).

<ExamplesExample file="v-bottom-navigation/prop-horizontal" />

<!-- TODO: Fix this example when scrolling techniques is implemented
#### Scroll threshold

Modify the **scroll-threshold** property to increase the distance a user must scroll before the `v-bottom-navigation` is hidden.

<ExamplesExample file="v-bottom-navigation/prop-scroll-threshold" />
-->

#### Shift

The **shift** prop hides button text when not active. This provides an alternative visual style to the `v-bottom-navigation` component.

::: info
  For this to work, `v-btn` text is **required** to be wrapped in a `span` tag.
:::

<ExamplesExample file="v-bottom-navigation/prop-shift" />

#### Toggle

Since `v-bottom-navigation` supports v-model, use the **active** prop to control the display state.

<ExamplesExample file="v-bottom-navigation/prop-toggle" />
