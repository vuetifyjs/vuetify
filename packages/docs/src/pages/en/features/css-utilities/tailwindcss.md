---
meta:
  nav: TailwindCSS
  title: Vuetify + TailwindCSS
  description: Integrate TailwindCSS v4 into an existing Vuetify project using Vite or Nuxt.
  keywords: tailwindcss, tailwindcss v4, vuetify tailwind, css layers, vite, nuxt
related:
  - /features/css-utilities/
  - /styles/layers/
  - /features/sass-variables/
---

# TailwindCSS

Integrate TailwindCSS v4 into an existing Vuetify project. The result is a smaller CSS bundle, on-demand utility generation, and full support for variants like `hover:`, `dark:`, and responsive prefixes.

<PromotedEntry />

---

::: tip Scaffold a working project

If you get stuck or need a reference point, scaffold a pre-configured project with all the wiring already in place:

```bash
pnpm dlx @vuetify/cli@latest init --css=tailwindcss
```

:::

## Establish CSS layer order

Create a `layers.css` file that declares the cascade layers in the order they should be applied. Placing `tailwind` between Vuetify's layers and `vuetify-final` ensures TailwindCSS utilities override component styles while Vuetify transitions (which live in `vuetify-final`) always win:

```css
@layer vuetify-core;
@layer vuetify-components;
@layer vuetify-overrides;
@layer vuetify-utilities;
@layer tailwind;
@layer vuetify-final;
```

This file must be loaded **before** any other styles. In a **Vite** project, save it as `src/styles/layers.css` and import it at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`. You can find the exact configuration snippets in the sections for Vite and Nuxt below.

## Setup dependencies

### Vite

A working reference project is available at [J-Sek/vuetify-vite-and-tailwind](https://github.com/J-Sek/vuetify-vite-and-tailwind).

Import the layers file at the top of `src/plugins/vuetify.ts`, before `vuetify/styles`:

```ts { resource="src/plugins/vuetify.ts" }
import '../styles/layers.css'
import 'vuetify/styles'
// ...
```

Install TailwindCSS and the Vite plugin:

::: tabs

```bash [pnpm]
pnpm add -D tailwindcss @tailwindcss/vite
```

```bash [yarn]
yarn add -D tailwindcss @tailwindcss/vite
```

```bash [npm]
npm i -D tailwindcss @tailwindcss/vite
```

```bash [bun]
bun add -D tailwindcss @tailwindcss/vite
```

:::

Register `tailwindcss()` as the **first** entry in `plugins` inside `vite.config.mts`:

```ts { resource="vite.config.mts" }
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), // must come before Vuetify
    // ...
  ],
})
```

Import the TailwindCSS stylesheet (see [Configure TailwindCSS](#configure-tailwindcss)) in `src/main.ts`:

```ts { resource="src/main.ts" }
import './styles/tailwind.css'
```

### Nuxt

A working reference project is available at [J-Sek/vuetify-preset-nuxt-tailwind](https://github.com/J-Sek/vuetify-preset-nuxt-tailwind).

::: tabs

```bash [pnpm]
pnpm add -D tailwindcss @nuxtjs/tailwindcss
```

```bash [yarn]
yarn add -D tailwindcss @nuxtjs/tailwindcss
```

```bash [npm]
npm i -D tailwindcss @nuxtjs/tailwindcss
```

```bash [bun]
bun add -D tailwindcss @nuxtjs/tailwindcss
```

:::

Register the module and wire up layer ordering in `nuxt.config.ts`. The `css` array controls load order — `layers.css` must come first, followed by `vuetify/styles`, then `tailwind.css`. Set `disableVuetifyStyles: true` so the Vuetify module does not inject styles on its own and the explicit order is respected:

```ts { resource="nuxt.config.ts" }
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module',
    // ...
  ],

  css: [
    'assets/styles/layers.css',
    'vuetify/styles',
    'assets/styles/tailwind.css',
  ],

  vuetify: {
    moduleOptions: {
      disableVuetifyStyles: true,
      styles: { configFile: 'assets/styles/settings.scss' },
    },
  },
})
```

## Configure TailwindCSS

Create `tailwind.css` (in `src/styles/` for Vite or `assets/styles/` for Nuxt). Vuetify already provides its own CSS reset, so Tailwind's preflight is skipped. The `@custom-variant` declarations wire Tailwind's `dark:` and `light:` prefixes to Vuetify's theme classes. Breakpoints are reset and redefined to match Vuetify's defaults:

```css { resource="tailwind.css" }
@import "tailwindcss/theme" layer(tailwind.theme);
/* @import "tailwindcss/preflight" layer(tailwind.reset); — skipped, Vuetify provides its own reset */
@import "tailwindcss/utilities" layer(tailwind.utilities);

/* --- Dark/light mode ---------------------------------------------------- */
/* Vuetify uses .v-theme--dark / .v-theme--light instead of .dark           */

@custom-variant light (&:where(.v-theme--light, .v-theme--light *));
@custom-variant dark  (&:where(.v-theme--dark,  .v-theme--dark  *));

/* --- Theme overrides ---------------------------------------------------- */

@theme {
  --breakpoint-*: initial; /* reset Tailwind defaults */
  /* keep in sync with vuetify plugin/config and settings.scss */
  --breakpoint-xs:  0px;
  --breakpoint-sm:  600px;
  --breakpoint-md:  960px;
  --breakpoint-lg:  1280px;
  --breakpoint-xl:  1920px;
  --breakpoint-xxl: 2560px;
}

/* --- Rounded (for Vuetify's rounded prop) ------------------------------- */
/* The prop generates class names at runtime — force Tailwind to emit them  */

@source inline('rounded-none');
@source inline('rounded-sm');
@source inline('rounded');
@source inline('rounded-lg');
@source inline('rounded-xl');

@utility rounded-pill   { border-radius: 9999px }
@utility rounded-circle { border-radius: 50% }
@utility rounded-shaped { border-radius: 24px 0 }

@source inline('rounded-pill');
@source inline('rounded-circle');
@source inline('rounded-shaped');

/* --- Elevation (for Vuetify's elevation prop) --------------------------- */

@utility elevation-0 { box-shadow: none }
@utility elevation-1 { box-shadow: var(--shadow-xs) }
@utility elevation-2 { box-shadow: var(--shadow-sm) }
@utility elevation-3 { box-shadow: var(--shadow-md) }
@utility elevation-4 { box-shadow: var(--shadow-xl) }
@utility elevation-5 { box-shadow: var(--shadow-2xl) }

@source inline('elevation-{0,1,2,3,4,5}');
```

## Disable Vuetify's built-in utilities

Turn off Vuetify's built-in utility classes and the Material color palette — TailwindCSS will cover both from here on:

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
);
```

After rebuilding you should see the CSS entry file shrink by roughly 150–200 kB (unminified).

## Align breakpoints { id="breakpoints" }

Vuetify and TailwindCSS ship different default breakpoints. Mismatched values cause `sm:` in Tailwind to fire at a different width than `sm` in `VCol` or `useDisplay()`. The `@theme` block in `tailwind.css` above already resets the Tailwind defaults — the same values need to be repeated in two more places.

Vuetify plugin (Vite) or `vuetifyOptions` (Nuxt):

```ts
display: {
  mobileBreakpoint: 'md',
  thresholds: {
    // repeated in tailwind.css and settings.scss
    xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
  },
},
```

Sass variables:

```scss { resource="settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
  $grid-breakpoints: (
    // repeated in tailwind.css and vuetify config
    'xs': 0,
    'sm': 600px,
    'md': 960px,
    'lg': 1280px,
    'xl': 1920px,
    'xxl': 2560px,
  ),
);
```

::: tip
In a **Nuxt** project you can define breakpoints in a shared TypeScript file and feed them to both Vuetify and the Sass variables from a single source of truth. See the [UnoCSS presetWind4 guide](/features/css-utilities/unocss-tailwind-preset/#breakpoints) for an example of this pattern.
:::

## Configure dark/light variants { id="dark-mode" }

The `@custom-variant` declarations in `tailwind.css` above rewire Tailwind's `dark:` and `light:` prefixes to Vuetify's theme selectors. After that, classes like `dark:bg-sky-900` and `light:text-gray-700` toggle correctly when switching themes with `$vuetify.theme.cycle()` or programmatically.

No additional configuration is needed beyond what is already in the [Configure TailwindCSS](#configure-tailwindcss) section.

## Typography { id="typography" }

TailwindCSS provides its own type-scale utilities (`text-sm`, `text-base`, `text-2xl`, etc.) that work well with responsive prefixes. When adopting TailwindCSS it is generally best to **migrate to this convention** rather than trying to preserve Vuetify's typography classes (`text-h1` through `text-overline` for MD2, or `text-display-large` through `text-label-small` for MD3).

TailwindCSS utilities give you finer control — `text-2xl font-light tracking-tight` lets you mix and match size, weight, and spacing freely, instead of relying on a predefined bundle. The trade-off is that your team needs to agree on which combinations to use, but that is typically handled through shared components or a design system.

If you are integrating TailwindCSS into an **existing project** that already uses Vuetify's typography classes extensively, you can define `@utility` rules to keep them working during the migration. Below are drop-in snippets for both the MD2 (legacy) and MD3 (default) typography scales.

<details>
<summary>MD2 typography utilities (text-h1 … text-overline)</summary>

These match Vuetify's MD2 defaults and reference `--font-heading` / `--font-body` CSS custom properties. Define them in your global CSS or in a Sass `@use 'vuetify/settings'` block.

```css { resource="tailwind.css" }
@utility text-h1 {
  font-family: var(--font-heading, inherit);
  font-size: 6rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.015625em;
  text-transform: none;
}
@utility text-h2 {
  font-family: var(--font-heading, inherit);
  font-size: 3.75rem;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.0083333333em;
  text-transform: none;
}
@utility text-h3 {
  font-family: var(--font-heading, inherit);
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: normal;
  text-transform: none;
}
@utility text-h4 {
  font-family: var(--font-heading, inherit);
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 1.175;
  letter-spacing: .0073529412em;
  text-transform: none;
}
@utility text-h5 {
  font-family: var(--font-heading, inherit);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.333;
  letter-spacing: normal;
  text-transform: none;
}
@utility text-h6 {
  font-family: var(--font-heading, inherit);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: .0125em;
  text-transform: none;
}
@utility text-subtitle-1 {
  font-family: var(--font-body, inherit);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: .009375em;
  text-transform: none;
}
@utility text-subtitle-2 {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: .0071428571em;
  text-transform: none;
}
@utility text-body-1 {
  font-family: var(--font-body, inherit);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: .03125em;
  text-transform: none;
}
@utility text-body-2 {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.425;
  letter-spacing: .0178571429em;
  text-transform: none;
}
@utility text-button {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 500;
  line-height: 2.6;
  letter-spacing: .0892857143em;
  text-transform: uppercase;
}
@utility text-caption {
  font-family: var(--font-body, inherit);
  font-size: .75rem;
  font-weight: 400;
  line-height: 1.667;
  letter-spacing: .0333333333em;
  text-transform: none;
}
@utility text-overline {
  font-family: var(--font-body, inherit);
  font-size: .75rem;
  font-weight: 500;
  line-height: 2.667;
  letter-spacing: .1666666667em;
  text-transform: uppercase;
}
```

</details>

<details>
<summary>MD3 typography utilities (text-display-large … text-label-small)</summary>

These match Vuetify's MD3 defaults (the current default typography scale). None of the MD3 classes use `text-transform`.

```css { resource="tailwind.css" }
@utility text-display-large {
  font-family: var(--font-heading, inherit);
  font-size: 3.5625rem;
  font-weight: 400;
  line-height: 1.1228070175;
  letter-spacing: -.0043859649em;
}
@utility text-display-medium {
  font-family: var(--font-heading, inherit);
  font-size: 2.8125rem;
  font-weight: 400;
  line-height: 1.1555555556;
  letter-spacing: normal;
}
@utility text-display-small {
  font-family: var(--font-heading, inherit);
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 1.2222222222;
  letter-spacing: normal;
}
@utility text-headline-large {
  font-family: var(--font-heading, inherit);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: normal;
}
@utility text-headline-medium {
  font-family: var(--font-heading, inherit);
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.2857142857;
  letter-spacing: normal;
}
@utility text-headline-small {
  font-family: var(--font-heading, inherit);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.3333333333;
  letter-spacing: normal;
}
@utility text-title-large {
  font-family: var(--font-heading, inherit);
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.2727272727;
  letter-spacing: normal;
}
@utility text-title-medium {
  font-family: var(--font-body, inherit);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: .009375em;
}
@utility text-title-small {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.4285714286;
  letter-spacing: .0071428571em;
}
@utility text-body-large {
  font-family: var(--font-body, inherit);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: .03125em;
}
@utility text-body-medium {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.4285714286;
  letter-spacing: .0178571429em;
}
@utility text-body-small {
  font-family: var(--font-body, inherit);
  font-size: .75rem;
  font-weight: 400;
  line-height: 1.3333333333;
  letter-spacing: .0333333333em;
}
@utility text-label-large {
  font-family: var(--font-body, inherit);
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.4285714286;
  letter-spacing: .0071428571em;
}
@utility text-label-medium {
  font-family: var(--font-body, inherit);
  font-size: .75rem;
  font-weight: 500;
  line-height: 1.3333333333;
  letter-spacing: .0416666667em;
}
@utility text-label-small {
  font-family: var(--font-body, inherit);
  font-size: .6875rem;
  font-weight: 500;
  line-height: 1.4545454545;
  letter-spacing: .0454545455em;
}
```

</details>

## Forward Vuetify theme colors to TailwindCSS { id="theme-colors" }

Vuetify stores theme colors as raw RGB channels in CSS custom properties (e.g. `--v-theme-primary`). Wrapping them in `rgb()` inside a `@theme` block makes them available as standard Tailwind color utilities (`bg-primary`, `text-error`, etc.):

```css { resource="tailwind.css" }
@theme {
  /* ... breakpoints ... */
  --color-background:      rgb(var(--v-theme-background));
  --color-surface:         rgb(var(--v-theme-surface));
  --color-surface-variant: rgb(var(--v-theme-surface-variant));
  --color-primary:         rgb(var(--v-theme-primary));
  --color-success:         rgb(var(--v-theme-success));
  --color-warning:         rgb(var(--v-theme-warning));
  --color-error:           rgb(var(--v-theme-error));
  --color-info:            rgb(var(--v-theme-info));
}

/* safelist classes used dynamically via color="..." prop */
@source inline('bg-primary');
@source inline('text-primary');
@source inline('bg-success');
@source inline('text-success');
@source inline('bg-error');
@source inline('text-error');
```

Disable Vuetify's own theme utility classes to avoid duplicate `bg-*` / `text-*` rules that can't be used with variants:

```ts
// Vuetify plugin (Vite) or vuetifyOptions (Nuxt)
theme: {
  defaultTheme: 'system',
  utilities: false, // skip .bg-primary, .text-error, etc.
},
```

::: warning

Vuetify's original `bg-*` utilities automatically set a contrasting foreground color via `--v-theme-on-*`. Replacing them with TailwindCSS utilities removes this safeguard — you are responsible for choosing legible text colors. See [Limitations](/features/css-utilities/#limitations).

:::
