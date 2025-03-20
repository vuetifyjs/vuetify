---
meta:
  nav: Avatars
  title: Avatar component
  description: The avatar component is used to control the size and border radius of an image. It can be used with numerous components to provide better visual context.
  keywords: avatars, vuetify avatar component, vue avatar component
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
features:
  figma: true
  github: /components/VAvatar/
  label: 'C: VAvatar'
  report: true
---

# Avatars

The `v-avatar` component is typically used to display circular user profile pictures. This component will allow you to dynamically size and add a border radius of responsive images, icons, and text.  When **rounded** prop set to `0` will display an avatar without border radius.

<PageFeatures />

## Usage

Avatars in their simplest form display content within a circular container.

<ExamplesUsage name="v-avatar" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-avatar](/api/v-avatar/) | Primary Component |

## Anatomy

The recommended placement of elements inside of `v-avatar` is:

* Place a [v-img](/components/images/) or [v-icon](/components/icons/) component within the default *slot*
* Place textual content within the default *slot*

![Avatar Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-avatar/v-avatar-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The Avatar container that typically holds a [v-icon](/components/icons/) or [v-img](/components/images/) component |

<ApiInline hide-links />

## Examples

### Props

#### Size

The `size` prop allows you to change the height and width of the avatar.

<ExamplesExample file="v-avatar/prop-size" />

#### Tile

The `rounded` prop can be used to remove the border radius from v-avatar leaving you with a simple square avatar.

<ExamplesExample file="v-avatar/prop-tile" />

### Slots

#### Default

The `v-avatar` default slot allows you to render content such as `v-icon` components, images, or text. Mix and match these with other props to create something unique.

<ExamplesExample file="v-avatar/slot-default" />

<PromotedPromoted />

### Misc

#### Advanced usage

Combining an avatar with other components allows you to build beautiful user interfaces right out of the box.

<ExamplesExample file="v-avatar/misc-advanced" />

Another example combining avatar with menu.

<ExamplesExample file="v-avatar/misc-avatar-menu" />

#### Profile Card

Using the **rounded** prop value `0`, we can create a sleek hard-lined profile card.

<ExamplesExample file="v-avatar/misc-profile-card" />
