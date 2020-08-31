---
meta:
  title: Badge component
  description: The badge component is a small status descriptor for elements. This typically contains a small number or short set of characters.
  keywords: badges, vuetify badge component, vue badge component
related:
  - /components/avatars/'
  - /components/icons/'
  - /components/toolbars/'
---

# Badges

The `v-badge` component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a user or to just draw attention to a specific element. Content within the badge usually contains numbers or icons.

<entry-ad />

## Usage

Badges in their simplest form display to the upper right of the content that it wraps and requires the badge slot.

<usage name="v-badge" />

## API

- [v-badge](/api/v-badge)

## Examples

### Misc

#### Customization options

The `v-badge` component is flexible and can be used in a variety of use-cases over numerous elements. Options to tweak the location are also available through the **offset-x** and **offset-y** props."

<example file="v-badge/misc-customization" />

#### Dynamic notifications

You can incorporate badges with dynamic content to make things such as a notification system.

<example file="v-badge/misc-dynamic" />

#### Show on hover

You can do many things with visibility control, for example, show badge on hover.

<example file="v-badge/misc-hover" />

#### Tabs

Badges help convey information to the user in a variety of ways.

<example file="v-badge/misc-tabs" />

<backmatter />
