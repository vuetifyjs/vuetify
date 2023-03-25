---
nav: Badges
meta:
  title: Badge component
  description: The badge component is a small status descriptor for elements. This typically contains a small number or short set of characters.
  keywords: badges, vuetify badge component, vue badge component
related:
  - /components/avatars/
  - /components/icons/
  - /components/toolbars/
---

# Badges

The `v-badge` component superscripts or subscripts an avatar-like icon or text onto content to highlight information to a user or to just draw attention to a specific element. Content within the badge usually contains numbers or icons.

<!-- ![Badge Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-badge/v-badge-entry.png) -->

---

## Usage

Badges in their simplest form display to the upper right of the content that it wraps and requires the badge slot.

<usage name="v-badge" />

<entry />

## API

| Component | Description |
| - | - |
| [v-badge](/api/v-badge/) | Primary Component |

<api-inline hide-links />

## Examples

### Props

#### Dot

The **dot** property removes badge's content and reduces its overall size. This is useful when you need to draw a user's attention subtly.

<example file="v-badge/prop-dot" />

#### Inline

Inline badges can be placed anywhere with content and can render without a *default* slot.

<example file="v-badge/prop-inline" />

#### Content

For simple text, use the **content** property to display a *value* on the badge.

<example file="v-badge/prop-content" />
