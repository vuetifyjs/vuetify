---
meta:
  title: Typography
  description: The typography component is used to display text with different styles and sizes.
  keywords: typography, text, font, style
---

# Typography

The `v-typography` component is used to display text with different styles and sizes following Material Design guidelines.

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

<Example file="typography/usage" />

## API

<ApiSection name="VTypography" />

## Examples

### Props

#### Text variants

The component supports different text variants from Material Design.

<Example file="typography/prop-variants" />

#### Responsive

You can specify different text styles for different breakpoints using responsive props.

<Example file="typography/prop-responsive" />

#### Colors

Apply different colors to your text.

<Example file="typography/prop-colors" />
