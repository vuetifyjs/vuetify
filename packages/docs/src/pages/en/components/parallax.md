---
meta:
  nav: Parallax
  title: Parallax component
  description: The parallax component creates a 3d effect that makes an image appear to scroll slower than the window.
  keywords: parallax, vuetify parallax component, vue parallax component
related:
  - /components/aspect-ratios/
  - /components/cards/
  - /components/images/
features:
  github: /components/VParallax/
  label: 'C: VParallax'
  report: true
---

# Parallax

The `v-parallax` component creates a 3d effect that makes an image appear to scroll slower than the window.

<PageFeatures />

## Usage

A parallax causes a shift in a background image when the user scrolls the page.

<ExamplesExample file="v-parallax/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-parallax](/api/v-parallax/) | Primary Component |

<ApiInline hide-links />

## Examples

### Misc

#### Content

You can also place any content inside of the parallax. This allows you to use the parallax as a hero image.

<ExamplesExample file="v-parallax/misc-content" />

#### Custom height

You can specify a custom height on a parallax. Keep in mind this can break the parallax if your image is not sized properly

<ExamplesExample file="v-parallax/misc-custom-height" />
