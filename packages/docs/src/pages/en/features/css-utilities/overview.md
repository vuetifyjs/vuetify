---
emphasized: true
meta:
  nav: Overview
  title: CSS Utilities - Overview
  description: Reduce your CSS bundle size and unlock modern utility-first styling by integrating TailwindCSS or UnoCSS alongside Vuetify.
  keywords: tailwindcss, unocss, css utilities, atomic css, css layers, vuetify css, bundle optimization
related:
  - /features/css-utilities/unocss-vuetify-preset/
  - /features/css-utilities/tailwindcss/
  - /styles/layers/
features:
  report: true
---

# CSS Utilities - Overview

Integrate TailwindCSS or UnoCSS with Vuetify to reduce bundle size and unlock modern utility-first styling.

<PageFeatures />

<PromotedEntry />

## Introduction

While integrating third-party CSS utility libraries was technically possible with Vuetify v3, it required fighting specificity battles between Vuetify's own utility classes (generated with `!important`) and the incoming utilities. CSS layers — enabled by default in Vuetify v4 — fundamentally change this dynamic. Layers establish an explicit cascade order between groups of styles, making it straightforward to place utility-first CSS on top of component styles without any hacks or `!important` overrides.

### Why integrate a CSS utility library?

Vuetify ships a large set of built-in utility classes (spacing, flex, display, text, etc.) that are included in every project by default. Integrating TailwindCSS or UnoCSS lets you:

- **Reduce your main CSS bundle** — disable Vuetify's built-in utilities (`$utilities: false`) and let the external library generate only the classes actually used in your templates. In practice this typically shaves 150–200 kB (unminified) off the CSS entry file.
- **Use dynamic and responsive variants** — utilities like `hover:bg-primary`, `sm:flex`, `dark:text-white`, and container queries are not available in Vuetify's built-in utilities but come for free with TailwindCSS or UnoCSS.
- **Adopt a widely supported convention** — the TailwindCSS class naming convention is backed by excellent IDE tooling (Tailwind IntelliSense), standardized documentation, and a large ecosystem.

### Limitations

Vuetify's built-in color utilities (`bg-primary`, `text-error`, etc.) automatically calculate a foreground color that ensures sufficient contrast. This works because Vuetify reads theme colors at runtime and applies a contrast multiplier based on the CSS custom property `--v-theme-on-*`. The CSS function `contrast-color()` that would enable the same automatic contrast adjustment in plain CSS is not yet supported in major browsers.

When replacing Vuetify's color utilities with TailwindCSS or UnoCSS equivalents, this automatic contrast calculation is no longer available. **You are responsible for choosing foreground colors that remain legible against the chosen background.** Use Vuetify's `--v-theme-on-*` CSS variables as your text color wherever possible, or validate contrast ratios manually.

---

## Creating a new project

The quickest way to start a new Vuetify project — including optional TailwindCSS or UnoCSS integration — is through the official Vuetify CLI. Install the latest version globally and run the wizard:

::: tabs

```bash [pnpm]
pnpm add -g @vuetify/cli
vuetify init
```

```bash [yarn]
yarn global add @vuetify/cli
vuetify init
```

```bash [npm]
npm i -g @vuetify/cli@latest
vuetify init
```

```bash [bun]
bun add -g @vuetify/cli
vuetify init
```

:::

The wizard will walk you through selecting a project name, base framework (Vite or Nuxt), desired Vuetify version, and optional integrations including TailwindCSS or UnoCSS. Once complete, you will have a fully working project with all wiring already in place.

<!-- TODO: screenshot or terminal snippet -->

## Integration with existing projects

| Guide                                                                     | Description                                                           |
|---------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [UnoCSS — Vuetify preset](/features/css-utilities/unocss-vuetify-preset/) | Use `unocss-preset-vuetify` for on-demand Vuetify-style utilities.    |
| [UnoCSS — presetWind4](/features/css-utilities/unocss-tailwind-preset/)   | Use `@unocss/preset-wind4` for TailwindCSS v4 conventions via UnoCSS. |
| [TailwindCSS](/features/css-utilities/tailwindcss/)                       | Integrate TailwindCSS v4 into an existing Vite or Nuxt project.       |
