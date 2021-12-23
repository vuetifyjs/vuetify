---
nav: Overlays
meta:
  title: Overlay component
  description: The overlay component makes it easy to create a scrim over components or your entire application.
  keywords: overlays, vuetify overlay component, vue overlay component
related:
  - /components/cards/
  - /components/sheets/
  - /components/dialogs/
---

# Overlays

`v-overlay` is the base for components that float over the rest of the page, such as `v-menu` and `v-dialog`. It can also be used on its own and comes with everything you need to create a custom popover component.

<entry-ad />

## Usage

In its simplest form, the `v-overlay` component will add a dimmed layer over your application.

<example file="v-overlay/usage" />

## API

<api-inline />

## Examples

### Props

#### Contained

A **contained** overlay is positioned absolutely and contained inside its parent element.

<example file="v-overlay/prop-contained" />

### Misc

#### Advanced

Using the [v-hover](/components/hover), we are able to add a nice scrim over the information card with additional actions the user can take.

<example file="v-overlay/misc-advanced" />

#### Loader

Using the `v-overlay` as a background, add a progress component to easily create a custom loader.

<example file="v-overlay/misc-loader" />

<backmatter />
