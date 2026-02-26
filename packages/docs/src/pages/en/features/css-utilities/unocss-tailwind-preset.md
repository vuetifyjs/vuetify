---
meta:
  nav: UnoCSS + presetWind4
  title: Vuetify + UnoCSS (presetWind4)
  description: Integrate UnoCSS with @unocss/preset-wind4 into an existing Vuetify project using Vite or Nuxt.
  keywords: unocss, preset-wind4, tailwindcss v4, unocss tailwind, on-demand utilities, vite, nuxt
related:
  - /features/css-utilities/
  - /features/css-utilities/unocss-vuetify-preset/
  - /styles/layers/
---

# UnoCSS with presetWind4

Use [`@unocss/preset-wind4`](https://unocss.dev/presets/wind4) for TailwindCSS v4 class names powered by UnoCSS's on-demand engine.

Unlike TailwindCSS v4 directly (which requires pure CSS `@theme` declarations), everything stays in JavaScript/TypeScript — breakpoints, typography, dark mode, all in one shared config file.

<PageFeatures />

<PromotedEntry />

---

:::: tabs

```bash [npx]
# generate working project for reference
npx @vuetify/cli@latest init --css=unocss-wind4
```

```bash [pnpm]
# generate working project for reference
pnpm dlx @vuetify/cli@latest init --css=unocss-wind4
```

```bash [yarn]
# generate working project for reference
yarn dlx @vuetify/cli@latest init --css=unocss-wind4
```

```bash [bun]
# generate working project for reference
bunx @vuetify/cli@latest init --css=unocss-wind4
```

::::

## Establish CSS layer order

Create a `layers.css` file that declares the cascade layers in order. `uno` goes above component styles but below `vuetify-final`, where Vuetify keeps its transitions:

```css
@layer vuetify-core;
@layer vuetify-components;
@layer vuetify-overrides;
@layer vuetify-utilities;
@layer uno;
@layer vuetify-final;
```

This file must be loaded **before** any other styles. In a **Vite** project, save it as `src/styles/layers.css` and import it at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`.

## Setup dependencies

### Vite

Import the layers file at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`:

```ts { resource="src/plugins/vuetify.ts" }
import '../styles/layers.css'
import 'vuetify/styles'
// ...
```

Install UnoCSS and the Wind4 preset:

::: tabs

```bash [pnpm]
pnpm add -D unocss @unocss/preset-wind4
```

```bash [yarn]
yarn add -D unocss @unocss/preset-wind4
```

```bash [npm]
npm i -D unocss @unocss/preset-wind4
```

```bash [bun]
bun add -D unocss @unocss/preset-wind4
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
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: false,
      },
    }),
  ],
  outputToCssLayers: {
    cssLayerName: (layer) => layer === 'properties' ? null : `uno.${layer}`,
  },
})
```

Setting `preflights.reset` to `false` skips UnoCSS's built-in reset so Vuetify's takes over.

Add the UnoCSS virtual import to your entry point:

```ts { resource="src/main.ts" }
import 'virtual:uno.css'
```

### Nuxt

::: tabs

```bash [pnpm]
pnpm add -D unocss @unocss/preset-wind4 @unocss/nuxt
```

```bash [yarn]
yarn add -D unocss @unocss/preset-wind4 @unocss/nuxt
```

```bash [npm]
npm i -D unocss @unocss/preset-wind4 @unocss/nuxt
```

```bash [bun]
bun add -D unocss @unocss/preset-wind4 @unocss/nuxt
```

:::

Register the module in `nuxt.config.ts`. The `css` array controls load order — `layers.css` must come first, followed by `vuetify/styles`. Set `disableVuetifyStyles: true` — otherwise the module injects styles automatically and the order above is ignored:

```ts { resource="nuxt.config.ts" }
import presetWind4 from '@unocss/preset-wind4'

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
  },

  unocss: {
    presets: [
      presetWind4({
        preflights: {
          reset: false,
        },
      }),
    ],
    outputToCssLayers: {
      cssLayerName: (layer) => layer === 'properties' ? null : `uno.${layer}`,
    },
  },
})
```

## Disable Vuetify's built-in utilities

Turn off Vuetify's built-in utility classes so UnoCSS handles them on demand instead. The Material color palette is not needed because `presetWind4` ships its own color palette (TailwindCSS colors).

```scss [Vite]{resource="settings.scss"}
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
);
```

## Light/dark mode compatibility { id="dark-mode" }

By default UnoCSS generates dark-mode utilities scoped to a `.dark` class (e.g. `.dark .dark\:bg-sky-900`). Vuetify uses `.v-theme--dark` and `.v-theme--light` instead, so the `dark:` prefix won't work out of the box.

Add the `dark` option inside `presetWind4()` to align both systems:

```ts { resource="uno.config.ts" }
presetWind4({
  preflights: {
    reset: false,
  },
  dark: {
    dark: '.v-theme--dark',
    light: '.v-theme--light',
  },
}),
```

Classes like `dark:bg-sky-900` and `light:text-gray-700` are now scoped to Vuetify's theme selectors and toggle correctly via `$vuetify.theme.cycle()` or programmatically.

## Align breakpoints { id="breakpoints" }

Default breakpoints from TailwindCSS do not match Vuetify's. This mismatch can lead to confusing layout bugs when mixing responsive utilities (`sm:`, `md:`, …) with Vuetify's grid system (`v-col`, `v-row`) or `useDisplay()`.

Define breakpoints in a shared file and feed them to both Vuetify and UnoCSS:

```ts { resource="src/theme/breakpoints.ts" }
import type { DisplayThresholds } from 'vuetify'

// repeated in settings.scss
const breakpoints: DisplayThresholds = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
  xxl: 2560,
}

export const forVuetify = breakpoints

export const forUnoCSS = Object.entries(breakpoints)
  .reduce(
    (o, [key, value]) => ({ ...o, [key]: `${value}px` }),
    {} as Record<keyof DisplayThresholds, string>,
  )
```

Apply the breakpoints in your UnoCSS configuration:

```ts
// uno.config.ts (Vite) or unocss key (Nuxt)
theme: {
  breakpoint: breakpoints.forUnoCSS,
},
```

And in your Vuetify configuration:

```ts
// vuetify plugin (Vite) or vuetifyOptions (Nuxt)
display: {
  mobileBreakpoint: 'md',
  thresholds: breakpoints.forVuetify,
},
```

Finally, keep the SCSS variables in sync:

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
  $grid-breakpoints: (
    // repeated in breakpoints.ts
    'xs': 0,
    'sm': 600px,
    'md': 960px,
    'lg': 1280px,
    'xl': 1920px,
    'xxl': 2560px,
  ),
);
```

## Typography shortcuts { id="typography" }

`presetWind4` does not include Vuetify's typography classes (`text-h1` through `text-overline`). You can recreate them as UnoCSS **shortcuts** so they compose from native TailwindCSS utilities and gain responsive prefix support (e.g. `md:text-h3`).

First, define custom font families in the UnoCSS theme so the `font-heading` and `font-body` utilities are available:

```ts { resource="uno.config.ts" }
theme: {
  font: {
    heading: "'Your Heading Font', sans-serif",
    body: "'Your Body Font', sans-serif",
  },
},
```

Then point Vuetify's Sass variables at the same CSS custom properties:

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $heading-font-family: var(--font-heading),
  $body-font-family: var(--font-body),
  // ...
);
```

<details>
<summary>MD2 typography shortcuts (text-h1 … text-overline)</summary>

Add the `shortcuts` below to your UnoCSS configuration. The values are matched to Vuetify's MD2 typography scale:

```ts { resource="uno.config.ts or nuxt.config.ts » unocss" }
shortcuts: {
  'text-h1': 'font-heading normal-case text-[6rem] font-[300] leading-[1] tracking-[-.015625em]',
  'text-h2': 'font-heading normal-case text-[3.75rem] font-[300] leading-[1] tracking-[-.0083333333em]',
  'text-h3': 'font-heading normal-case text-[3rem] font-[400] leading-[1.05] tracking-[normal]',
  'text-h4': 'font-heading normal-case text-[2.125rem] font-[400] leading-[1.175] tracking-[.0073529412em]',
  'text-h5': 'font-heading normal-case text-[1.5rem] font-[400] leading-[1.333] tracking-[normal]',
  'text-h6': 'font-heading normal-case text-[1.25rem] font-[500] leading-[1.6] tracking-[.0125em]',
  'text-subtitle-1': 'font-body normal-case text-[1rem] font-[400] leading-[1.75] tracking-[.009375em]',
  'text-subtitle-2': 'font-body normal-case text-[.875rem] font-[500] leading-[1.6] tracking-[.0071428571em]',
  'text-body-1': 'font-body normal-case text-[1rem] font-[400] leading-[1.5] tracking-[.03125em]',
  'text-body-2': 'font-body normal-case text-[.875rem] font-[400] leading-[1.425] tracking-[.0178571429em]',
  'text-button': 'font-body uppercase text-[.875rem] font-[500] leading-[2.6] tracking-[.0892857143em]',
  'text-caption': 'font-body normal-case text-[.75rem] font-[400] leading-[1.667] tracking-[.0333333333em]',
  'text-overline': 'font-body uppercase text-[.75rem] font-[500] leading-[2.667] tracking-[.1666666667em]',
},
```

Because these are shortcuts composed from real utilities, responsive prefixes like `sm:text-h3` work automatically.

</details>

<details>
<summary>MD3 typography shortcuts (text-display-large … text-label-small)</summary>

These match Vuetify's MD3 defaults (the current default typography scale). None of the MD3 classes use `text-transform`.

```ts { resource="uno.config.ts or nuxt.config.ts » unocss" }
shortcuts: {
  'text-display-large':   'font-heading normal-case text-[3.5625rem] font-[400] leading-[1.1228] tracking-[-.0044em]',
  'text-display-medium':  'font-heading normal-case text-[2.8125rem] font-[400] leading-[1.1556] tracking-[normal]',
  'text-display-small':   'font-heading normal-case text-[2.25rem]   font-[400] leading-[1.2222] tracking-[normal]',
  'text-headline-large':  'font-heading normal-case text-[2rem]      font-[400] leading-[1.25]   tracking-[normal]',
  'text-headline-medium': 'font-heading normal-case text-[1.75rem]   font-[400] leading-[1.2857] tracking-[normal]',
  'text-headline-small':  'font-heading normal-case text-[1.5rem]    font-[400] leading-[1.3333] tracking-[normal]',
  'text-title-large':     'font-heading normal-case text-[1.375rem]  font-[400] leading-[1.2727] tracking-[normal]',
  'text-title-medium':    'font-body    normal-case text-[1rem]      font-[500] leading-[1.5]    tracking-[.0094em]',
  'text-title-small':     'font-body    normal-case text-[.875rem]   font-[500] leading-[1.4286] tracking-[.0071em]',
  'text-body-large':      'font-body    normal-case text-[1rem]      font-[400] leading-[1.5]    tracking-[.0313em]',
  'text-body-medium':     'font-body    normal-case text-[.875rem]   font-[400] leading-[1.4286] tracking-[.0179em]',
  'text-body-small':      'font-body    normal-case text-[.75rem]    font-[400] leading-[1.3333] tracking-[.0333em]',
  'text-label-large':     'font-body    normal-case text-[.875rem]   font-[500] leading-[1.4286] tracking-[.0071em]',
  'text-label-medium':    'font-body    normal-case text-[.75rem]    font-[500] leading-[1.3333] tracking-[.0417em]',
  'text-label-small':     'font-body    normal-case text-[.6875rem]  font-[500] leading-[1.4545] tracking-[.0455em]',
},
```

</details>

## Rounded shortcuts { id="rounded" }

Vuetify's `rounded` prop generates classes like `rounded-lg` and `rounded-pill` that don't map to TailwindCSS equivalents. Define them as UnoCSS shortcuts so they work with responsive prefixes and don't need safelisting:

<details>
<summary>Rounded shortcuts (aligned with Vuetify defaults)</summary>

```ts { resource="uno.config.ts or nuxt.config.ts » unocss" }
shortcuts: {
  // typography shortcuts ...

  'rounded-0': 'rounded-none',
  'rounded-sm': 'rounded-[2px]',
  'rounded': 'rounded-[4px]',
  'rounded-lg': 'rounded-[8px]',
  'rounded-xl': 'rounded-[24px]',
  'rounded-pill': 'rounded-full',
  'rounded-circle': 'rounded-[50%]',
  'rounded-shaped': 'rounded-[24px_0]',

  // directional variants
  'rounded-t-0': 'rounded-t-none',
  'rounded-t-sm': 'rounded-tl-[2px] rounded-tr-[2px]',
  'rounded-t': 'rounded-tl-[4px] rounded-tr-[4px]',
  'rounded-t-lg': 'rounded-tl-[8px] rounded-tr-[8px]',
  'rounded-t-xl': 'rounded-tl-[24px] rounded-tr-[24px]',
  'rounded-t-pill': 'rounded-tl-full rounded-tr-full',

  'rounded-b-0': 'rounded-b-none',
  'rounded-b-sm': 'rounded-bl-[2px] rounded-br-[2px]',
  'rounded-b': 'rounded-bl-[4px] rounded-br-[4px]',
  'rounded-b-lg': 'rounded-bl-[8px] rounded-br-[8px]',
  'rounded-b-xl': 'rounded-bl-[24px] rounded-br-[24px]',
  'rounded-b-pill': 'rounded-bl-full rounded-br-full',

  'rounded-s-0': 'rounded-ss-none rounded-es-none',
  'rounded-s-sm': 'rounded-ss-[2px] rounded-es-[2px]',
  'rounded-s': 'rounded-ss-[4px] rounded-es-[4px]',
  'rounded-s-lg': 'rounded-ss-[8px] rounded-es-[8px]',
  'rounded-s-xl': 'rounded-ss-[24px] rounded-es-[24px]',
  'rounded-s-pill': 'rounded-ss-full rounded-es-full',

  'rounded-e-0': 'rounded-se-none rounded-ee-none',
  'rounded-e-sm': 'rounded-se-[2px] rounded-ee-[2px]',
  'rounded-e': 'rounded-se-[4px] rounded-ee-[4px]',
  'rounded-e-lg': 'rounded-se-[8px] rounded-ee-[8px]',
  'rounded-e-xl': 'rounded-se-[24px] rounded-ee-[24px]',
  'rounded-e-pill': 'rounded-se-full rounded-ee-full',
},
```

</details>

## Safelist prop-driven classes

Some Vuetify convenience props (`elevation`, `rounded`) add CSS classes at runtime. Because these class names never appear literally in your source files, UnoCSS cannot detect them by scanning. Add `safelist` entries for the ones you use:

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

::: info
`presetWind4` does not generate Vuetify-specific classes like `elevation-*` or `rounded-shaped` by default. If you need these, consider adding them as static [UnoCSS rules](https://unocss.dev/config/rules) or keeping a minimal set of Vuetify utilities enabled in your Sass configuration.
:::

<!-- TODO: cover approach to border prop after releasing ESLint plugin -->

## VRow and VCol utility classes

This section is only relevant if your project uses the `justify`, `align`, or `order` props on `v-row` / `v-col` — these props were deprecated in Vuetify v4.0.0 — and migrating them to their TailwindCSS equivalents (which sometimes use different class names) is not practical for your project.

`v-row` and `v-col` rely on Vuetify-specific utility classes for their `justify`, `align`, and `order` props (e.g. `justify-space-between`, `align-center`). These class names don't exist in TailwindCSS conventions and won't be generated by `presetWind4`.

You have two options:

**Option A — static global styles.** Paste the required classes in a global CSS/SCSS file:

```scss { resource="src/styles/vuetify-compat.scss" }
.justify-start { justify-content: flex-start }
.justify-end { justify-content: flex-end }
.justify-center { justify-content: center }
.justify-space-between { justify-content: space-between }
.justify-space-around { justify-content: space-around }
.justify-space-evenly { justify-content: space-evenly }

.align-start { align-items: flex-start }
.align-end { align-items: flex-end }
.align-center { align-items: center }
.align-baseline { align-items: baseline }
.align-stretch { align-items: stretch }
```

**Option B — keep selected Vuetify utilities.** Instead of `$utilities: false`, selectively enable only the classes `v-row` / `v-col` need:

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: (
    "align-items": (responsive: false, unimportant: (align-items)),
    "justify-content": (responsive: false, unimportant: (justify-content)),
    "order": (responsive: false, unimportant: (order)),
    // all other utilities set to `false`
  ),
);
```

## Forward Vuetify theme colors to UnoCSS { id="theme-colors" }

Vuetify stores theme colors as raw RGB channels in CSS custom properties (e.g. `--v-theme-primary`). Wrapping them in `rgb()` inside the UnoCSS `theme.colors` block makes them available as standard TailwindCSS-style color utilities (`bg-primary`, `text-error`, etc.):

```ts { resource="uno.config.ts" }
theme: {
  colors: {
    background:        'rgb(var(--v-theme-background))',
    surface:           'rgb(var(--v-theme-surface))',
    'surface-variant': 'rgb(var(--v-theme-surface-variant))',
    primary:           'rgb(var(--v-theme-primary))',
    success:           'rgb(var(--v-theme-success))',
    warning:           'rgb(var(--v-theme-warning))',
    error:             'rgb(var(--v-theme-error))',
    info:              'rgb(var(--v-theme-info))',
  },
},
```

Because `presetWind4` generates utilities on demand, also add `safelist` entries for any color classes that are bound dynamically via `color="..."` prop:

```ts
safelist: [
  'bg-primary', 'text-primary',
  'bg-success', 'text-success',
  'bg-error',   'text-error',
],
```

::: warning

Vuetify's original `bg-*` utilities automatically set a contrasting foreground color via `--v-theme-on-*`. Replacing them with UnoCSS utilities removes this safeguard — you are responsible for choosing legible text colors. See [Limitations](/features/css-utilities/#limitations).

:::
