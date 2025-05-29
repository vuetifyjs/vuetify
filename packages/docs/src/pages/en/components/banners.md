---
meta:
  nav: Banners
  title: Banner component
  description: The banner component displays an important and concise message for a user to address. It can also indicate actions that the user can take.
  keywords: banners, vuetify banner component, vue banner component
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
features:
  figma: true
  github: /components/VBanner/
  label: 'C: VBanner'
  report: true
  spec: https://m2.material.io/components/banners
---

# Banners

The `v-banner` component is used as a middle-interrupting message to the user with one to two actions.

<PageFeatures />

## Usage

Banners come in two variations **single-line** and **multi-line** (implicit). These can have icons and actions that you can use with your message.

<ExamplesUsage name="v-banner" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-banner](/api/v-banner/) | Primary Component |
| [v-banner-text](/api/v-banner-text/) | Sub-component used to display the `v-banner` subtitle. Wraps the `#text` slot |
| [v-banner-actions](/api/v-banner-actions/) | Sub-component that modifies the default styling of [v-btn](/components/buttons/). Wraps the `#actions` slot |

<ApiInline hide-links />

## Anatomy

The recommended placement of elements inside of `v-banner` is:

* Place a `v-banner-avatar` or `v-banner-icon` on the far left
* Place `v-banner-text` to the right of any visual content
* Place `v-banner-actions` to the far right of textual content, offset bottom

![Banner Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-banner/v-banner-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The Banner container holds all `v-banner` components |
| 2. Avatar / Icon (optional) | Leading media content intended to improve visual context |
| 3. Text | A content area for displaying text and other inline elements |
| 4. Actions (optional) | A content area that typically contains one or more [v-btn](/components/buttons) components |

## Examples

### Props

#### Lines

The prop **lines** can be used to specify how the displayed text should be handled based on its length.

<ExamplesExample file="v-banner/prop-lines" />

#### Sticky

You can optionally turn on the **sticky** prop to ensure that the content is pinned to the top of the screen.

<ExamplesExample file="v-banner/prop-sticky" />

### Slots

#### Actions

Banners may have one or two text buttons that don't stand out that much.

<ExamplesExample file="v-banner/slot-actions" />

#### Icon

The icon slot allows you to explicitly control the content and functionality within it.

<ExamplesExample file="v-banner/slot-icon" />

#### Prepend

The prepend slot allows you to explicitly control the content and functionality within it. Icons also help to emphasize a banner's message.

<ExamplesExample file="v-banner/slot-prepend" />
