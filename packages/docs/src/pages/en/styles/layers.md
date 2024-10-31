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

Your own styles will always<sup>*</sup> override vuetify's if you don't use `@layer` yourself, or you can specify an order for custom layers in a stylesheet loaded before vuetify.

```css { resource="src/styles/layers.css" }
@layer base, vuetify, overrides;
```

Vuetify also defines an empty `vuetify.custom` layer that you can put your overrides in, this does not need declaring in advance and can be used immediately.

\* Layers invert `!important`, so anything trying to override an !important vuetify style must also be in a layer. We try to avoid !important for this reason but a few still exist { class="text-caption" }
