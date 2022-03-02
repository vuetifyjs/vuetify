---
meta:
  title: Avatar component
  description: The avatar component is used to control the size and border radius of an image. It can be used with numerous components to provide better visual context.
  keywords: avatars, vuetify avatar component, vue avatar component
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# Avatars

The `v-avatar` component is typically used to display circular user profile pictures. This component will allow you to dynamically size and add a border radius of responsive images, icons, and text. A **tile** variation is available for displaying an avatar without border radius.

<entry />

## Usage

Avatars in their simplest form display content within a circular container.

<!-- <usage name="v-avatar" /> -->

## API

<api-inline />

### Props

#### Size

The `size` prop allows you to change the height and width of `v-avatar`.

<example file="v-avatar/prop-size" />

#### Tile

The `rounded` prop can be used to remove the border radius from v-avatar leaving you with a simple square avatar.

<example file="v-avatar/prop-tile" />

### Slots

#### Default

The `v-avatar` default slot allows you to render content such as `v-icon` components, images, or text. Mix and match these with other props to create something unique.

<example file="v-avatar/slot-default" />

<discovery />

### Misc

#### Advanced usage

Combining an avatar with other components allows you to build beautiful user interfaces right out of the box.

<example file="v-avatar/misc-advanced" />

Another example combining avatar with menu.

<example file="v-avatar/misc-avatar-menu" />

#### Profile Card

Using the **tile** prop, we can create a sleek hard-lined profile card.

<example file="v-avatar/misc-profile-card" />

<backmatter />
