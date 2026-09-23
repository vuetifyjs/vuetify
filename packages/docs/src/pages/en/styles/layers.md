---
meta:
  title: CSS Layers
  description: Vuetify 4 uses cascade layers to avoid specificity problems
  keywords: cascade layers, vuetify !important
related:
  - /features/sass-variables/
---

::: success
This feature was introduced in [v3.6.0 (Nebula)](/getting-started/release-notes/?version=v3.6.0)
:::

# CSS Layers

[Cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) are a modern CSS feature that makes it easier to write custom styles without having to deal with specificity issues and `!important`.

Vuetify defines five layers containing all the framework styles:

```css
@layer vuetify-core, vuetify-components, vuetify-overrides, vuetify-utilities, vuetify-final;
```

- core: This layer has the CSS reset and a few global styles for fonts.
- components: Does what it says on the tin, the majority of component styles live here.
- overrides: Contextual styles for nested components, for example `.v-dialog > .v-card`. This layer replaces rules that would have used `!important` in Vuetify 3.
- utilities: Theme and helper classes such as `.bg-primary` and `.pa-4`.
- final: Transitions, and rules that must always take priority like `forced-colors`.

Your own styles will always override vuetify's if you don't use `@layer` yourself.

## Custom layer order

Vuetify's layers must remain in the same order for everything to display correctly, but you can add your own layers before, between or at the end:

```css { resource="public/layers.css" }
@layer my-base,
  vuetify-core,
  vuetify-components,
  my-components,
  vuetify-overrides,
  my-overrides,
  vuetify-utilities,
  vuetify-final;
```

Place it in `public/` and link it before any other stylesheet, so the browser reads it before any Vuetify styles:

```html { resource="index.html" }
<head>
  <link rel="stylesheet" href="/layers.css">
  <!-- ... -->
</head>
```

In Nuxt, add the link in `nuxt.config.ts`:

```ts { resource="nuxt.config.ts" }
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/layers.css' },
      ],
    },
  },
})
```

::: warning
Avoid plain import of `layers.css` from JavaScript or `@import` from another stylesheet. Bundling process usually does not guarantee the same order of stylesheets shipped in production.
:::

Vuetify's stylesheets can also load in any order, so declare its nested layers in `layers.css` as well:

```css { resource="public/layers.css" }
@layer vuetify-core {
  @layer reset, base;
}
@layer vuetify-components;
@layer vuetify-overrides;
@layer vuetify-utilities {
  @layer theme-base, typography, helpers, theme-background, theme-foreground;
}
@layer vuetify-final {
  @layer transitions, trumps;
}
```

## Utilities group

The `vuetify-utilities` layer itself contains nested sublayers to control the order of utility styles:

```css
@layer vuetify-utilities {
  @layer theme-base;
  @layer typography;
  @layer helpers;
  @layer theme-background;
  @layer theme-foreground;
}
```

- **theme-base**: CSS custom properties for theme colors and other variables, applied to `:root` or a scoped selector.
- **typography**: Typography classes (`.text-headline-large`, `.text-body-small`, etc.)
- **helpers**: Utility classes like spacing (`.pa-4`, `.ma-2`), display (`.d-flex`), and text alignment (`.text-center`).
- **theme-background**: Background color utilities such as `.bg-primary` and `.bg-surface`.
- **theme-foreground**: Text color utilities such as `.text-primary` and `.text-error`.

This ordering ensures that explicit color utilities (background and foreground) can override helper classes when both are applied to the same element.
