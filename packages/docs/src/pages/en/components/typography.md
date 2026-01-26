---
emphasized: true
meta:
  title: Typography
  description: The typography component is used to standardize text display across the application.
  keywords: typography, text, font, style
related:
  - /styles/text-and-typography/
features:
  github: /labs/VTypography/
  label: 'C: VTypography'
  report: true
---

# Typography

The `v-typography` component can be used to display text with different styles and sizes following defined typography variants. It is primarly meant to help standardize typography styles across the application.

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VTypography } from 'vuetify/labs/VTypography'

export default createVuetify({
  components: {
    VTypography,
  },
})
```

## Usage

The `v-typography` component provides a way to display text with different styles and sizes. It supports responsive design and custom colors.

<ExamplesUsage name="v-typography" />

Standard [text and typography](/styles/text-and-typography/) utility classes can still be used to override styles when needed, for example `font-weight-bold` or `text-uppercase`.

## API

| Component | Description |
| - | - |
| [v-typography](/api/v-typography/) | Primary component |

<ApiInline hide-links />

## Examples

### Props

#### Variant

The component supports different text variants from Material Design.

<ExamplesExample file="v-typography/prop-variants" />

#### Responsive

You can specify different text styles for different breakpoints using responsive props.

<ExamplesExample file="v-typography/prop-responsive" />

#### Color

Apply different colors to your text.

<ExamplesExample file="v-typography/prop-colors" />
