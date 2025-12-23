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

Import order of stylesheets becomes much more important with layers, therefore `import 'vuetify/styles'` or a file containing `@use 'vuetify'` **must** be loaded *before* any components or the CSS reset will take precedence over component styles and break everything. If you have separate plugin files make sure to import the vuetify plugin before `App.vue` or any other components.

Vuetify defines five layers containing all the framework styles:

```css
@layer vuetify-core, vuetify-components, vuetify-overrides, vuetify-utilities, vuetify-final;
```

- core: This layer has the CSS reset and a few global styles for fonts.
- components: Does what it says on the tin, the majority of component styles live here.
- overrides: Contextual styles for nested components, for example `.v-dialog > .v-card`. This layer replaces rules that would have used `!important` in Vuetify 3.
- utilities: Theme and helper classes such as `.bg-primary` and `.pa-4`.
- final: Transitions, and rules that must always take priority like `forced-colors`.

Your own styles will always override vuetify's if you don't use `@layer` yourself, or you can specify an order for custom layers in a stylesheet loaded before vuetify. Vuetify's layers must remain in the same order for everything to display correctly, but you can add your own between or around them.

```css { resource="src/styles/layers.css" }
@layer base,
  vuetify-core,
  vuetify-components,
  components,
  vuetify-overrides,
  overrides,
  vuetify-utilities,
  vuetify-final;
```
