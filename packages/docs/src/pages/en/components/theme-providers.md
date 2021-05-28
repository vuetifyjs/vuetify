---
meta:
  title: Theme provider component
  description: The theme provider allows you to style a section of your application in a different theme from the default
  keywords: theme provider, vuetify theme provider component, vue theme provider component
related:
  - /features/theme/
---

# Theme providers

The theme provider allows you to style a section of your application in a different theme from the default

## API

- [v-theme-provider](/api/v-theme-provider)

## Examples

### Background

By default `v-theme-provider` will act as a renderless component, and simply provide a new theme context to all of its children. However if you use the **with-background** prop, it will render a `div` and apply the correct background color to it according to the theme used.

<example file="v-theme-provider/prop-with-background">
