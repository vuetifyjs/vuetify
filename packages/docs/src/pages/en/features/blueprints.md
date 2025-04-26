---
meta:
  title: Blueprints
  description: Setup your entire application with pre-made or custom styling and designs
  keywords: vuetify blueprints, vuetify presets, vuetify schemas
related:
  - /features/global-configuration/
  - /features/theme/
  - /features/display-and-platform/
features:
  github: /blueprints/
  report: true
---

# Blueprints

Vuetify blueprints are a new way to pre-configure your entire application with a completely unique design system.

<PageFeatures />

<PromotedEntry />

## Usage

Blueprints are a collection of Vuetify configuration options that assign default values for components, colors, language, and more. Open your project's `vuetify.js` file and import the desired blueprint. The follow example demonstrates how to apply the [Material Design 1](#material-design-1) preset:

```js { resource=plugins/vuetify.js }
import { createVuetify } from 'vuetify'
import { md1 } from 'vuetify/blueprints'

export default createVuetify({
  blueprint: md1,
})
```

### White-label concept

While Vuetify is built under the guise of Google's [Material Design](https://material.io) specification, it is still flexible enough to be used as the foundation for any design system. By default, Vuetify components have no color and are **white-label** in nature. A white-label product is a product or service produced by one company that other companies rebrand to make it appear as if they had made it.

## Available blueprints

| Name | Release date | Status | Resource |
| - | - | - | - |
| [Material Design 1](#material-design-1) | 2014 | ✅ Available | [Specification](https://m1.material.io) |
| [Material Design 2](#material-design-2) | 2017 | ✅ Available | [Specification](https://m2.material.io) |
| [Material Design 3](#material-design-3) | 2022 | ✅ Available | [Specification](https://m3.material.io) |

::: error

Blueprints require the use of utility classes to properly function.

:::

### Material Design 1

Released in 2014, the original Material Design specification aimed to create a visual language that combined principles and good design with technical and scientific innovation.

```javascript { resource=plugins/vuetify.js }
import { md1 } from 'vuetify/blueprints'
```

**Preview:**

<ExamplesExample preview file="blueprints/md1" />

### Material Design 2

Released in 2017, version 2 of Google's design specification received a massive upgrade with new components, guidelines, and improved on the principles that made the first system so successful.

```javascript { resource=plugins/vuetify.js }
import { md2 } from 'vuetify/blueprints'
```

**Preview:**

<ExamplesExample preview file="blueprints/md2" />

### Material Design 3

Material Design 3 is currently in active development and represents the next chapter of Google's design system.

```javascript { resource=plugins/vuetify.js }
import { md3 } from 'vuetify/blueprints'
```

**Preview:**

<ExamplesExample preview file="blueprints/md3" />
