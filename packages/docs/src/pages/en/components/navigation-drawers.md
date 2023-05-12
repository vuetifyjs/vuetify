---
meta:
  title: Navigation drawer component
  description: The navigation drawer component contains internal navigation links for an application and can be permanently on-screen or controlled programmatically.
  keywords: navigation drawer, vuetify navigation drawer component, vue navigation drawer component
nav: Navigation drawers
related:
  - /components/lists/
  - /components/icons/
  - /getting-started/wireframes/
---

# Navigation drawers

The `v-navigation-drawer` component is what your users will utilize to navigate through the application. The navigation-drawer is pre-configured to work with or without **vue-router** right out the box. For the purpose of display, some examples are wrapped in a `v-card` element. Within your application you will generally place the `v-navigation-drawer` as a direct child of `v-app`.

## Usage

The navigation drawer is primarily used to house links to the pages in your application. Using `null` as the starting value for its **v-model** will initialize the drawer as closed on mobile and as open on desktop. It is common to pair drawers with the [v-list](/components/lists) component using the **nav** property.

<!-- <example file="v-navigation-drawer/usage" /> -->

<entry />

## API

| Component | Description |
| - | - |
| [v-navigation-drawer](/api/v-navigation-drawer/) | Primary Component |
| [v-list-item](/api/v-list-item/) | Component used to create navigation links |

<api-inline hide-links />

## Caveats

<alert type="info">

  The **expand-on-hover** prop does not alter the content area of **v-main**. To have content area respond to **expand-on-hover**, bind **v-model:rail** to a data prop.

</alert>

## Examples

### Props

#### Bottom drawer

Using the **bottom** prop, we are able to relocate our drawer on mobile devices to come from the bottom of the screen. This is an alternative style and only activates once the **mobile-breakpoint** is met.

<example file="v-navigation-drawer/prop-bottom-drawer" />

#### Expand on hover

Places the component in **rail** mode and expands once hovered. This **does not** alter the content area of **v-main**. The width can be controlled with the **rail-width** property.

<example file="v-navigation-drawer/prop-expand-on-hover" />

#### Background images

Apply a custom background to your drawer via the **image** prop. If you need to customize it further, you can use the `image` slot and render your own `v-img`.

<example file="v-navigation-drawer/prop-images" />

#### Rail variant

When using the **rail** prop, the drawer will shrink (default 56px) and hide everything inside of `v-list` except the first element.

<example file="v-navigation-drawer/prop-mini-variant" />

#### Floating

By default, a navigation drawer has a 1px right border that separates it from content. In this example we want to detach the drawer from the left side and let it float on its own. The **floating** property removes the right border (or left if using **position** prop).

<example file="v-navigation-drawer/prop-permanent-and-floating" />

#### Location

Navigation drawers can also be positioned on the opposite side of your application (or an element) using the **location** prop. This is useful for creating a side-sheet with auxiliary information that may not have any navigation links.

<example file="v-navigation-drawer/prop-right" />

#### Temporary

A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked by default when on mobile. Clicking outside of the drawer will cause it to close.

<example file="v-navigation-drawer/prop-temporary" />

### Misc

#### Colored drawer

Navigation drawers can be customized to fit any application's design. Here we apply a custom background color and an appended content area using the **append** slot.

<example file="v-navigation-drawer/misc-colored" />

#### Multiple drawers

In this example we define two navigation-drawers, one using **rail** and one without.

<example file="v-navigation-drawer/misc-combined" />
