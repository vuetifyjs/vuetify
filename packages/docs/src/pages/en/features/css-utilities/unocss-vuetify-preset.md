---
meta:
  nav: UnoCSS + Vuetify preset
  title: Vuetify + UnoCSS (Vuetify preset)
  description: Integrate UnoCSS with the unocss-preset-vuetify into an existing Vuetify project using Vite or Nuxt.
  keywords: unocss, unocss-preset-vuetify, vuetify preset, on-demand utilities, vite, nuxt
related:
  - /features/css-utilities/
  - /features/css-utilities/unocss-tailwind-preset/
  - /styles/layers/
---

# UnoCSS with Vuetify preset

Generate Vuetify's built-in utility classes on demand with `unocss-preset-vuetify`, maintained by the Vuetify team.

This is the lowest-friction path for adopting on-demand utilities without switching to TailwindCSS class conventions — only the classes actually used in your project end up in the output CSS.

<PromotedEntry />

---

::: tip Scaffold a working project

If you get stuck or need a reference point, scaffold a pre-configured project with all the wiring already in place:

```bash
npx @vuetify/cli@latest init --css=unocss-vuetify
```

:::

## Establish CSS layer order

Create a `layers.css` file that declares the cascade layers in the order they should be applied. Placing `uno` between Vuetify's layers and `vuetify-final` ensures UnoCSS utilities override component styles while Vuetify transitions (which live in `vuetify-final`) always win:

```css
@layer vuetify-core;
@layer vuetify-components;
@layer vuetify-overrides;
@layer vuetify-utilities;
@layer uno;
@layer vuetify-final;
```

This file must be loaded **before** any other styles. In a **Vite** project, save it as `src/styles/layers.css` and import it at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`. You can find the exact configuration snippets in the sections for Vite and Nuxt below.

## Setup dependencies

### Vite

Import the layers file at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`:

```ts { resource="src/plugins/vuetify.ts" }
import '../styles/layers.css'
import 'vuetify/styles'
// ...
```

Install UnoCSS and the Vuetify preset:

::: tabs

```bash [pnpm]
pnpm add -D unocss unocss-preset-vuetify
```

```bash [yarn]
yarn add -D unocss unocss-preset-vuetify
```

```bash [npm]
npm i -D unocss unocss-preset-vuetify
```

```bash [bun]
bun add -D unocss unocss-preset-vuetify
```

:::

Register the UnoCSS Vite plugin in `vite.config.ts` and create `uno.config.ts`:

```ts { resource="vite.config.ts" }
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    // ...
  ],
})
```

```ts { resource="uno.config.ts" }
import { defineConfig } from 'unocss'
import { presetVuetify } from 'unocss-preset-vuetify'

export default defineConfig({
  presets: [
    presetVuetify(),
  ],
  outputToCssLayers: {
    cssLayerName: (layer) => layer === 'properties' ? null : `uno.${layer}`,
  },
})
```

Add the UnoCSS virtual import to your entry point:

```ts { resource="src/main.ts" }
import 'virtual:uno.css'
```

### Nuxt

::: tabs

```bash [pnpm]
pnpm add -D unocss unocss-preset-vuetify @unocss/nuxt
```

```bash [yarn]
yarn add -D unocss unocss-preset-vuetify @unocss/nuxt
```

```bash [npm]
npm i -D unocss unocss-preset-vuetify @unocss/nuxt
```

```bash [bun]
bun add -D unocss unocss-preset-vuetify @unocss/nuxt
```

:::

Register the module and wire up layer ordering in `nuxt.config.ts`. The `css` array controls load order — `layers.css` must come first, followed by `vuetify/styles`. Set `disableVuetifyStyles: true` so the Vuetify module does not inject styles on its own and the explicit order is respected:

```ts { resource="nuxt.config.ts" }
import { presetVuetify } from 'unocss-preset-vuetify'

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    'vuetify-nuxt-module',
    // ...
  ],

  css: [
    'assets/styles/layers.css',
    'vuetify/styles',
  ],

  vuetify: {
    moduleOptions: {
      disableVuetifyStyles: true,
      styles: { configFile: 'assets/styles/settings.scss' },
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'dark', // 'system' requires ssr: false
      },
    },
  },

  unocss: {
    presets: [
      presetVuetify(),
    ],
    outputToCssLayers: {
      cssLayerName: (layer) => layer === 'properties' ? null : `uno.${layer}`,
    },
  },
})
```

## Disable Vuetify's built-in utilities

Turn off Vuetify's built-in utility classes and the Material color palette so UnoCSS handles them on demand instead.

```scss [Vite]{resource="settings.scss"}
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
);
```

## How on-demand generation works

UnoCSS scans your source files statically, looking for class name strings. A class like `elevation-4` in `class="elevation-4"` gets picked up and its CSS is generated. The problem arises with props like **elevation**, **rounded** and **border**: when you write `<v-card elevation="4">`, Vuetify's component logic converts the prop value into the class `elevation-4` internally — the string `elevation-4` never appears literally in your source, so UnoCSS won't generate it.

The `safelist` option solves this: it specifies classes (or patterns) that UnoCSS should always generate regardless of whether they appear in scanned files.

## Safelist prop-driven classes

Add `safelist` entries for convenience props (e.g. `elevation` and `rounded`) that just add CSS classes. Because these class names are generated at runtime by Vuetify components, UnoCSS cannot detect them by scanning source files.

```ts
{
  // presets: ...
  // outputToCssLayers: ...
  safelist: [
    ...Array.from({ length: 6 }, (_, i) => `elevation-${i}`),
    ['', '-0', '-sm', '-lg', '-xl', '-pill', '-circle', '-shaped'].map(suffix => `rounded${suffix}`),
  ],
}
```

<!-- TODO:
  color prop is kinda similar, but it depends on which color you use.
  - theme (semantic) colors are injected into HEAD as part of theme stylesheet.
  - colors from Material color palette provided by the UnoCSS preset require
    full class name to appear in the source code.

  color prop will remove bg-* and text-* prefixes, but it may be a bit confusing

  <v-card color="bg-orange-accent-2" variant="flat" />
  <v-card color="text-lime-darken-3" variant="tonal" />
-->

<!-- TODO: cover approach to border prop after releasing ESLint plugin -->

## Typography

Vuetify preset configuration options give us full control over typography helper classes. There are 2 built-in sets available, but you can also pass custom styles definition.

| Value   | Design system                                            |
|---------|----------------------------------------------------------|
| `'md3'` | Material Design 3 — matches Vuetify v4 defaults          |
| `'md2'` | Material Design 2 — matches the legacy Vuetify v2 and v3 |

The underlying definitions do not depend on `$heading-font-family` and `$body-font-family`, but rely on CSS variables `--v-font-heading` and `--v-font-body` instead. You can see the complete usage example below:

```ts
presetVuetify({
  typography: 'md3',
  font: {
    heading: 'K2D, sans-serif',
    body: '"Work Sans", sans-serif',
  },
})
```

You can easily pass the generated CSS variables to Sass

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $heading-font-family: var(--v-font-heading),
  $body-font-family: var(--v-font-body),
  // ...
);
```

The `typography` field accepts a custom object in case your project uses custom typography scale.

```ts
presetVuetify({
  typography: {
    h1: { 'font-size': '4rem', 'font-weight': '700', 'line-height': '1.2' },
    h2: { 'font-size': '3rem', 'font-weight': '600', 'line-height': '1.25' },
    // generates .text-h1, .text-h2, etc.
  },
})
```
