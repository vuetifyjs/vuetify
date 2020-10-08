---
meta:
  title: Navigation drawer component
  description: The navigation drawer component contains internal navigation links for an application and can be permanently on-screen or controlled programmatically.
  keywords: navigation drawer, vuetify navigation drawer component, vue navigation drawer component
related:
  - /components/lists/
  - /components/icons/
  - /getting-started/wireframes/
---

# Navigation drawers

The `v-navigation-drawer` component is what your users will utilize to navigate through the application. The navigation-drawer is pre-configured to work with or without **vue-router** right out the box. For the purpose of display, some examples are wrapped in a `v-card` element. Within your application you will generally place the `v-navigation-drawer` as a direct child of `v-app`.

<entry-ad />

## Usage

The navigation drawer is primarily used to house links to the pages in your application. Using `null` as the starting value for its **v-model** will initialize the drawer as closed on mobile and as open on desktop. It is common to pair drawers with the [v-list](/components/lists) component using the **nav** property.

<example file="v-navigation-drawer/usage" />

## API

- [v-navigation-drawer](/api/v-navigation-drawer)

## Caveats

<alert type="error">

  If you are using `v-navigation-drawer` with **app** property enabled, you don't need to use **absolute** prop as in examples.

</alert>

<alert type="info">

  The **expand-on-hover** prop does not alter the content area of **v-main**. To have content area respond to **expand-on-hover**, bind **mini-variant.sync** to a data prop.

</alert>

## Examples

### Props

#### Bottom drawer

Using the **bottom** prop, we are able to relocate our drawer on mobile devices to come from the bottom of the screen. This is an alternative style and only activates once the **mobile-breakpoint** is met.

<example file="v-navigation-drawer/prop-bottom-drawer" />

#### Expand on hover

Places the component in **mini-variant** mode and expands once hovered. This **does not** alter the content area of **v-main**. The width can be controlled with the **mini-variant-width** property.

<example file="v-navigation-drawer/prop-expand-on-hover" />

#### Images

Apply a custom background to your drawer via the **src** prop. If you need to customize `v-img`'s properties you can use the `img` slot.

<example file="v-navigation-drawer/prop-images" />

#### Mini variant

When using the **mini-variant** prop, the drawer will shrink (default 56px) and hide everything inside of `v-list` except the first element. In this example we use the **.sync** modifier that allows us to tie the expanding/contracting of the drawer programmatically.

<example file="v-navigation-drawer/prop-mini-variant" />

#### Permanent and floating

By default, a navigation drawer has a 1px right border that separates it from content. In this example we want to detach the drawer from the left side and let it float on its own. The **floating** property removes the right border (or left if using **right**).

<example file="v-navigation-drawer/prop-permanent-and-floating" />

#### Right

Navigation drawers can also be positioned on the right side of your application (or an element). This is also useful for creating a side-sheet with auxillary information that may not have any navigation links. When using **RTL** you must explicitly define **right** for your drawer.

<example file="v-navigation-drawer/prop-right" />

#### Temporary

A temporary drawer sits above its application and uses a scrim (overlay) to darken the background. This drawer behavior is mimicked by default when on mobile. Clicking outside of the drawer will cause it to close.

<example file="v-navigation-drawer/prop-temporary" />

### Misc

#### Colored drawer

Navigation drawers can be customized to fit any application's design. Here we apply a custom background color and an appended content area using the **append** slot.

<example file="v-navigation-drawer/misc-colored" />

#### Combined drawer

In this example we define a custom width to accommodate our nested drawer. Using `v-row` we ensure that the drawer and list stack horizontally next to each other.

<example file="v-navigation-drawer/misc-combined" />

<backmatter />
