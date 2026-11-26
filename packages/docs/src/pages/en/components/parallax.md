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

`v-parallax` renders a [v-img](/components/images/) and moves it as the page scrolls. **scale** sets how much slower the image moves than the page. The image stays still for users who prefer reduced motion.

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

Content in the default slot scrolls with the page, on top of the image.

<ExamplesExample file="v-parallax/misc-content" />

#### Welcome

You can use it as a welcome section or as a portfolio hero section.

<ExamplesExample file="v-parallax/misc-welcome" />

#### Custom height

**height** works the same as on `v-img`. The image is enlarged to cover the distance it moves, so use one large enough to keep it sharp.

<ExamplesExample file="v-parallax/misc-custom-height" />
