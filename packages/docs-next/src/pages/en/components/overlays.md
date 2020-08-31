---
meta:
  title: Overlay component
  description: The overlay component makes it easy to create a scrim or hovering effect over components or your entire application.
  keywords: overlays, vuetify overlay component, vue overlay component
related:
  - /components/cards/
  - /components/sheets/
  - /components/dialogs/
---

# Overlays

The `v-overlay` component is used to provide emphasis on a particular element or parts of it. It signals to the user of a state change within the application and can be used for creating loaders, dialogs and more.

<entry-ad />

## Usage

In its simplest form, the `v-overlay` component will add a dimmed layer over your application.

<example file="v-overlay/usage" />

## API

- [v-overlay](/api/v-overlay)

## Examples

### Props

#### Absolute

**absolute** overlays are positioned absolutely and contained inside of their parent element.

<example file="v-overlay/prop-absolute" />

#### Opacity

**opacity** allows you to customize the transparency of `v-overlay` components.

<example file="v-overlay/prop-opacity" />

#### Z index

**z-index** gives you the ability to easily change the stack order of the `v-overlay` component.

<example file="v-overlay/prop-z-index" />

### Misc

#### Advanced

Using the [v-hover](/components/hover), we are able to add a nice scrim over the information card with additional actions the user can take.

<example file="v-overlay/misc-advanced" />

#### Loader

Using the `v-overlay` as a background, add a progress component to easily create a custom loader.

<example file="v-overlay/misc-loader" />

<backmatter />
