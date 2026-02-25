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
pnpm dlx @vuetify/cli@latest init --css=unocss-vuetify
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
  preflights: [
    {
      getCSS: () => `
        :root {
          --font-heading: 'Roboto', sans-serif;
          --font-body: 'Roboto', sans-serif;
        }`,
    },
  ],
  layers: {
    theme: 0,
    typography: 1,
    shortcuts: 2,
    utilities: 3,
  },
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
    preflights: [
      {
        getCSS: () => `
          :root {
            --font-heading: 'Roboto', sans-serif;
            --font-body: 'Roboto', sans-serif;
          }`,
      },
    ],
    layers: {
      theme: 0,
      typography: 1,
      shortcuts: 2,
      utilities: 3,
    },
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

## The `border` prop

The `border` prop on many Vuetify components accepts values like `"primary"`, `"opacity-50"`, `"t-sm"`, etc., producing a large matrix of possible class names. Adding all combinations to `safelist` is impractical.

A cleaner alternative is to **migrate `border` usage to explicit classes** and keep teammates from re-introducing the prop. This can be enforced with `eslint-plugin-vuetify`:

```js { resource="eslint.config.js" }
import vuetify from 'eslint-plugin-vuetify'

export default [
  ...vuetify.configs['flat/base'],
  {
    rules: {
      'vuetify/no-deprecated-props': 'warn',
      // add a custom rule or note discouraging `border="..."` prop
    },
  },
]
```

Instead of `<v-card border="primary">`, write `<v-card class="border border-primary">` — the literal class names are scanned by UnoCSS normally and no safelist entry is needed.

## Typography

`unocss-preset-vuetify` does not generate Vuetify's typography classes (`text-h1` through `text-overline`). You can restore them by adding static UnoCSS rules matching Vuetify's defaults.

<details>
<summary>Typography rules (aligned with Vuetify defaults)</summary>

Add the rules below to your UnoCSS configuration. The values are matched to Vuetify's built-in typography scale and reference the `--font-heading` / `--font-body` CSS custom properties defined in the `preflights` block shown in the [Vite](#vite) and [Nuxt](#nuxt) setup sections above.

Customizing those variables in one place automatically applies to both the typography rules and to any Vuetify component that inherits them through Sass variables (`$heading-font-family`, `$body-font-family`).

```ts { resource="app/theme/typography.ts" }
export const typographyRules = Object.entries({
  'text-h1': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '6rem',     'font-weight': '300', 'line-height': '1',     'letter-spacing': '-.015625em' },
  'text-h2': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '3.75rem',  'font-weight': '300', 'line-height': '1',     'letter-spacing': '-.00833333333em' },
  'text-h3': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '3rem',     'font-weight': '400', 'line-height': '1.05',  'letter-spacing': 'normal' },
  'text-h4': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '2.125rem', 'font-weight': '400', 'line-height': '1.175', 'letter-spacing': '.00735294112em' },
  'text-h5': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '1.5rem',   'font-weight': '400', 'line-height': '1.333', 'letter-spacing': 'normal' },
  'text-h6': { 'font-family': 'var(--font-heading)', 'text-transform': 'none', 'font-size': '1.25rem',  'font-weight': '500', 'line-height': '1.6',   'letter-spacing': '.0125em' },

  'text-subtitle-1': { 'font-family': 'var(--font-body)', 'text-transform': 'none',      'font-size': '1rem',    'font-weight': '400', 'line-height': '1.75',  'letter-spacing': '.009375em' },
  'text-subtitle-2': { 'font-family': 'var(--font-body)', 'text-transform': 'none',      'font-size': '.875rem', 'font-weight': '500', 'line-height': '1.6',   'letter-spacing': '.00714285714em' },
  'text-body-1':     { 'font-family': 'var(--font-body)', 'text-transform': 'none',      'font-size': '1rem',    'font-weight': '400', 'line-height': '1.5',   'letter-spacing': '.03125em' },
  'text-body-2':     { 'font-family': 'var(--font-body)', 'text-transform': 'none',      'font-size': '.875rem', 'font-weight': '400', 'line-height': '1.425', 'letter-spacing': '.01785714286em' },
  'text-button':     { 'font-family': 'var(--font-body)', 'text-transform': 'uppercase', 'font-size': '.875rem', 'font-weight': '500', 'line-height': '2.6',   'letter-spacing': '.0892857143em' },
  'text-caption':    { 'font-family': 'var(--font-body)', 'text-transform': 'none',      'font-size': '.75rem',  'font-weight': '400', 'line-height': '1.667', 'letter-spacing': '.0333333333em' },
  'text-overline':   { 'font-family': 'var(--font-body)', 'text-transform': 'uppercase', 'font-size': '.75rem',  'font-weight': '500', 'line-height': '2.667', 'letter-spacing': '.1666666667em' },
})
```

For Vite, reference it in `uno.config.ts`:

```ts { resource="uno.config.ts" }
export default defineConfig({
  presets: [/* ... */],
  rules: typographyRules,
  // ...
})
```

For Nuxt, add it alongside the other UnoCSS options in `nuxt.config.ts`:

```ts { resource="nuxt.config.ts" }
unocss: {
  presets: [/* ... */],
  rules: typographyRules,
  // ...
},
```

</details>
