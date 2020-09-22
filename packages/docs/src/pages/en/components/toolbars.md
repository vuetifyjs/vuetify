---
meta:
  title: Toolbar component
  description: The toolbar component sits above the content that it affects and provides an area for labeling and additional actions.
  keywords: toolbars, vuetify toolbar component, vue toolbar component
  related:
  - /components/buttons/
  - /components/footer/
  - /components/tabs/

---

# Toolbars

The `v-toolbar` component is pivotal to any gui, as it generally is the primary source of site navigation. The toolbar component works great in conjunction with [v-navigation-drawer](/components/navigation-drawers) and [v-card](/components/cards).

<entry-ad />

## Usage

A toolbar is a flexible container that can be used in a number of ways. By default, the toolbar is 64px high on desktop and 56px high on mobile. There are a number of helper components available to use with the toolbar. The `v-toolbar-title` is used for displaying a title and `v-toolbar-items` allow [v-btn](/components/buttons) to extend full height.

<usage name="v-toolbar" />

## API

- [v-toolbar](/api/v-toolbar)
- [v-toolbar-items](/api/v-toolbar-items)
- [v-toolbar-title](/api/v-toolbar-title)

<!-- ## Sub-components

### v-toolbar-items

v-toolbar-items description

### v-toolbar-title

v-toolbar-title description -->

## Caveats

<alert type="warning">

  When `v-btn`s with the **icon** prop are used inside of `v-toolbar` and `v-app-bar` they will automatically have their size increased and negative margin applied to ensure proper spacing according to the Material Design Specification. If you choose to wrap your buttons in any container, such as a `div`, you will need to apply negative margin to that container in order to properly align them.

</alert>

## Examples

### Props

#### Background

Toolbars can display a background as opposed to a solid color using the **src** prop. This can be modified further by using the **img** slot and providing your own [v-img](/components/images) component. Backgrounds can be faded using a [v-app-bar](/components/app-bars#prominent-w-scroll-shrink-and-image)

<example file="v-toolbar/prop-background" />

#### Collapse

Toolbars can be collapsed to save screen space.

<example file="v-toolbar/prop-collapse" />

#### Dense toolbars

Dense toolbars reduce their height to _48px_. When using in conjunction with the **prominent** prop, will reduce height to _96px_.

<example file="v-toolbar/prop-dense" />

#### Extended

Toolbars can be extended without using the `extension` slot.

<example file="v-toolbar/prop-extended" />

### Extension height

The extension's height can be customized.

<example file="v-toolbar/prop-extension-height" />

#### Floating with search

A floating toolbar is turned into an inline element that only takes up as much space as needed. This is particularly useful when placing toolbars over content.

<example file="v-toolbar/prop-floating-with-search" />

#### Light and Dark

Toolbars come in **2** variants, light and dark. Light toolbars have dark tinted buttons and dark text whereas dark toolbars have white tinted buttons and white text.

<example file="v-toolbar/prop-light-and-dark" />

#### Prominent toolbars

Prominent toolbars increase the `v-toolbar`'s height to _128px_ and positions the `v-toolbar-title` towards the bottom of the container. This is expanded upon in [v-app](/components/app-bars#prominent-w-scroll-shrink) with the ability to shrink a **prominent** toolbar to a **dense** or **short** one.

<example file="v-toolbar/prop-prominent" />

### Misc

#### Contextual action bar

It is possible to update the appearance of a toolbar in response to changes in app state. In this example, the color and content of the toolbar changes in response to user selections in the `v-select`.

<example file="v-toolbar/misc-contextual-action-bar" />

#### Flexible and card toolbar

In this example we offset our card onto the extended content area of a toolbar using the **extended** prop.

<example file="v-toolbar/misc-flexible-and-card" />

#### Variations

A `v-toolbar` has multiple variations that can be applied with themes and helper classes. These range from light and dark themes, colored and transparent.

<example file="v-toolbar/misc-variations" />

<backmatter />
