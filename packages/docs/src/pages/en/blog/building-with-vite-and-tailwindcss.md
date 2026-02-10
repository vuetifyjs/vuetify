---
layout: blog
meta:
  title: Build with Vite and TailwindCSS v4
  description: Learn how to integrate Vuetify v4 with TailwindCSS v4 in a Vite project, covering theme colors, dark mode, fonts, breakpoints and CSS layers.
  keywords: TailwindCSS v4, Vuetify v4, Vite, Theme, CSS Layers
---

# Integrating Vuetify v4 with TailwindCSS v4 in a Vite project

In the previous article we explored integrating UnoCSS with Vuetify v3 and Nuxt. This time we take a more direct route: pairing Vuetify v4 with TailwindCSS v4 on a plain Vite setup — no intermediary engine, no meta-framework, just two Vite plugins side by side. Vuetify v4 ships with CSS layers enabled by default, which makes coexistence with Tailwind significantly smoother than before.

---

## Table of Contents

* [Scaffold and install](#scaffold-and-install)
  * [Create the project](#create-the-project)
  * [Add TailwindCSS v4 via the Vite plugin](#add-tailwindcss-v4-via-the-vite-plugin)
* [Disable Vuetify utilities](#disable-vuetify-utilities)
  * [Set `$utilities: false`](#set-utilities-false)
  * [Migrate HelloWorld.vue and AppFooter.vue](#migrate-helloworldvue-and-appfootervue)
  * [Restore `rounded-*` classes](#restore-rounded--classes)
* [Custom fonts](#custom-fonts)
* [Avoid conflicting color utilities](#avoid-conflicting-color-utilities)
* [Configure class-based light/dark variants](#configure-class-based-lightdark-variants)
* [Breakpoints](#breakpoints)
* [Highlights](#highlights)

---

## Scaffold and install

### Create the project

* `pnpm create vuetify@latest`
  — choose the "Recommended" preset for Vite
  * select Vuetify 4
  * choose "No" for question about installing the dependencies
* open the project folder and run `pnpm install`
* Verify with `pnpm dev` and `pnpm build`, note the initial CSS bundle size
* add few files to `.gitignore`

```sh { resource=".gitignore" }
# Generated files
auto-imports.d.ts
components.d.ts
typed-router.d.ts
.eslintrc-auto-import.json
```

* commit all files as a baseline (for reference)

### Add TailwindCSS v4 via the Vite plugin

* Install `tailwindcss` and `@tailwindcss/vite`
* Register `tailwindcss()` in the `plugins` array of `vite.config.ts`
* Create `src/assets/tailwind.css` with `@import "tailwindcss"`
* Vuetify v4 already provides its own reset — we don't want two competing resets

```css { resource="src/assets/tailwind.css" }
@import "tailwindcss/theme" layer(tailwind.base);
/* @import "tailwindcss/preflight.css" layer(tailwind.reset); <-- skipped intentionally */
@import "tailwindcss/utilities" layer(tailwind.utilities);
```

* Import the stylesheet in `main.ts`
* Verify by adding `uppercase` class to the title and opening the project on localhost
* Preview effective CSS layers tree in browser DevTools

![CSS Layers preview in browser DevTools](./screenshots/layers-preview.png)

---

## Disable Vuetify utilities

### Set `$utilities: false`

* In `src/styles/settings.scss` set `$utilities: false`
* Optionally set `$color-pack: false` if relying on Tailwind's palette
* Build and confirm the CSS bundle shrinks

The expected difference is substantial, but we still pay the tax of using full MDI icon set. Switching to SVG icons (`@mdi/js`) is not not a big deal, but we will keep this guide focused on integrating Tailwind. If you need to optimize the bundle size, Vuetify documentation already covers how to switch to SVG icon set.

```diff
- 659.96 kB │ gzip: 142.26 kB
+ 482.80 kB │ gzip: 116.26 kB
```

### Migrate HelloWorld.vue and AppFooter.vue

* Replace `fill-height` → `h-full`
* Replace `font-weight-*` → `font-*`
* Replace `mb-n1` → `-mb-1`
* Add `flex items-center` to the container where `fill-height` + `v-row` interaction is lost
* Note: VRow/VCol `justify` and `align` props still need Vuetify's own utility classes — either keep a selective `$utilities` map or add small manual CSS

### Restore `rounded-*` classes

* Vuetify's `rounded` prop values (`rounded="lg"`, etc.) emit classes like `.rounded-lg` that don't match Tailwind's naming
* Options: add manual CSS for the handful of Vuetify rounding classes, or selectively keep them in the `$utilities` map
* Provide the small CSS snippet to paste into a global stylesheet

TailwindCSS lets us define rounding using CSS variables that are later applied by the specific CSS classes.

```css
.rounded-lg {
  border-radius: var(--radius-lg);
}
```

Looking at the default TailwindCSS configuration side-by-side with default Vuetify classes generated from Sass, it is clear that those are not compatible and we will need some stitching.

```css
@theme {
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-4xl: 2rem;
}

/* default output from Vuetify, we disabled those with $utilities: false */
.rounded-0 { border-radius: 0 }
.rounded-sm { border-radius: 2px }
.rounded { border-radius: 4px }
.rounded-lg { border-radius: 8px }
.rounded-xl { border-radius: 24px }
.rounded-pill { border-radius: 9999px }
.rounded-circle { border-radius: 50% }
.rounded-shaped { border-radius: 24px 0 }
```

In order to resolve this we need to use `blocklist` and suppress certain utilities from TailwindCSS

```ts { resource="tailwind.config.ts" }
import type { Config } from 'tailwindcss'

module.exports = {
  blocklist: [
    'rounded-xs',
    'rounded-md',
    'rounded-2xl',
    'rounded-3xl',
    'rounded-4xl',
    'rounded-full',
  ],
} satisfies Config
```

The new file has to be linked from `tailwind.css`

```css { resource="src/assets/tailwind.css" }
@import "tailwindcss/theme" layer(tailwind.base);
/* @import "tailwindcss/preflight.css" layer(tailwind.reset); */
@import "tailwindcss/utilities" layer(tailwind.utilities);

@config "../../tailwind.config.ts";

@theme {
  --radius-sm: 2px;
  --radius-lg: 8px;
  --radius-xl: 24px;
}

@utility rounded-0 { border-radius: 0 }
@utility rounded-pill { border-radius: 9999px }
@utility rounded-shaped { border-radius: 24px 0 }

@source inline('rounded-0');
@source inline('rounded-sm');
@source inline('rounded'); /* leaving .25rem */
@source inline('rounded-lg');
@source inline('rounded-xl');
@source inline('rounded-pill');
@source inline('rounded-circle');
@source inline('rounded-shaped');
```

If you'd rather use original TailwindCSS `rounded-*` utilities, it is recommended to disallow use of rounded classes which can be enforced by patching `eslint-plugin-vuetify`. The actuall process of patching is specific to the package manager of your choice, so we will skip it for now. If you are stuck, feel free to reach out on Discord.

---

## Custom fonts

The `create-vuetify` utility we used at the beginning to scaffold the project use `unplugin-fonts` to load Roboto. Let's update the configuration to make sure the target fonts are available

```diff { resource="vite.config.mts" }
    Fonts({
      fontsource: {
        families: [
-          {
-            name: 'Roboto',
-            weights: [100, 300, 400, 500, 700, 900],
-            styles: ['normal', 'italic'],
+          {
+            name: 'Bricolage Grotesque',
+            weights: [300, 400, 500, 700],
+          },
+          {
+            name: 'Sen',
+            weights: [400, 500, 700],
+          },
+          {
+            name: 'Sometype Mono',
+            weights: [400, 700],
+          },
        ],
      },
    }),
  ],
```

Next step is to add them as depenencies.

```sh
pnpm i @fontsource/bricolage-grotesque @fontsource/sen @fontsource/sometype-mono
```

Now we can configure TailwindCSS theme variables

```css { resource="src/assets/tailwind.css" }
@theme {
  --font-heading: "Bricolage Grotesque", sans-serif;
  --font-body: Sen, sans-serif;
  --font-mono: "Sometype Mono", monospace;

  //...
}
```

Lastly, we pass them to Vuetify.

```diff { resource="src/assets/settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
+  $heading-font-family: var(--font-heading),
+  $body-font-family: var(--font-body),
);
```

At this point, I usually like to cover components that need monospace font.

```diff { resource="src/assets/main.scss" }
@layer vuetify.base {
  code, pre, .v-code {
    font-family: var(--font-mono);
  }
}
```

## Avoid conflicting color utilities

`bg-*` classes generated by Vuetify carry over foreground color that is calculated to ensure text and icons have sufficient contrast ratio. This makes them superior to regular TailwindCSS utilities, but also incompatible with variants (`hover:`, `sm:*`, `md:*`, etc).

```css
.bg-primary {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}
```

When working with TailwindCSS it is normal to include text colors and the responsibility of ensuring readability is on developer writing the code.

In order to avoid mental overhead, let's instruct Vuetify theme to generate only CSS variables and skip the classes.

```diff { resource="src/plugins/vuetify.ts" }
export default createVuetify({
  theme: {
    defaultTheme: 'system',
+    utilities: false,
  },
})
```

Next we can pass those to TailwindCSS. Since the values are raw comma-separated RGB channels (translated from original format on the fly), we need to wrap them in `rgb()` when passing them into Tailwind's `@theme`.

```css { resource="src/assets/tailwind.css" }
@theme {
  --color-background: rgb(var(--v-theme-background));
  --color-primary: rgb(var(--v-theme-primary));
  --color-surface: rgb(var(--v-theme-surface));
  --color-error: rgb(var(--v-theme-error));
  /* and the rest of colors you intend to use */
}

/* safelist common colors to be used with color="..." attribute */
@source inline('bg-primary');
@source inline('text-primary');
@source inline('bg-error');
@source inline('text-error');
```

## Configure class-based light/dark variants

* By default Tailwind's `dark:` variant targets `@media (prefers-color-scheme: dark)` or a `.dark` class
* Vuetify uses `.v-theme--dark`

```css { resource="src/assets/tailwind.css" }
@custom-variant light (&:where(.v-theme--light, .v-theme--light *));
@custom-variant dark (&:where(.v-theme--dark, .v-theme--dark *));
```

## Breakpoints

Default breakpoints provided by TailwindCSS are not compatible with Vuetify. This mismatch can lead to confusing layout bugs where `sm:` in Tailwind kicks in at a different width than `sm` in VCol. Let's align them.

Unlike the UnoCSS setup from the previous article, where we could define breakpoints in a shared `.ts` file and feed them into both tools, TailwindCSS v4 expects breakpoints as pure CSS variables under `@theme`. This means we inevitably end up with the same values in three places. It's a minor inconvenience, but easy to manage with a comment pointing to the other two.

First, clear out the Tailwind defaults and set our own in `tailwind.css`:

```css { resource="src/assets/tailwind.css" }
@theme {
  --breakpoint-*: initial;
  /* repeated in vuetify.ts and settings.scss */
  --breakpoint-xs: 0px;
  --breakpoint-sm: 400px;
  --breakpoint-md: 840px;
  --breakpoint-lg: 1145px;
  --breakpoint-xl: 1545px;
  --breakpoint-xxl: 2138px;

  /* ... fonts, radius, colors ... */
}
```

`--breakpoint-*: initial` resets all built-in Tailwind breakpoints (`2xl`, `3xl`, etc.) so they don't interfere or confuse your teammates.

Next, set Vuetify's `display.thresholds` in the plugin setup. This controls `useDisplay()` and `$vuetify.display.*`.

```ts { resource="src/plugins/vuetify.ts" }
export default createVuetify({
  theme: { ... },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      // repeated in tailwind.css and settings.scss
      xs: 0,
      sm: 400,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
```

Finally, update the SCSS variables. `$grid-breakpoints` drives VCol's responsive columns, and `$container-max-widths` sets the maximum width of VContainer at each breakpoint.

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
  $heading-font-family: var(--font-heading),
  $body-font-family: var(--font-body),
  $grid-breakpoints: (
    // repeated in tailwind.css and vuetify.ts
    'xs': 0,
    'sm': 400px,
    'md': 840px,
    'lg': 1145px,
    'xl': 1545px,
    'xxl': 2138px,
  ),
  $container-max-widths: (
    // optional, computed from breakpoints
    'md': 700px,
    'lg': 1000px,
    'xl': 1400px,
    'xxl': 2000px,
  ),
);
```

The `$container-max-widths` values are manually rounded to keep VContainer sizing clean and predictable.

At this point, a class like `sm:text-lg` in Tailwind and `sm="6"` on VCol will both trigger at exactly `400px`.

## Highlights

* Key differences from the UnoCSS path: no intermediary engine, CSS-first configuration via `@theme` and `@variant`, layers work out-of-the-box with Vuetify v4
* Typography shortcuts are skipped for simplicity — you might want to intoduce your own classes it is still possible with `@utility` directive
* Theme was configured to generate only CSS variables to avoid conflicting utility classes
* Breakpoints are aligned across three definitions (SCSS, Vuetify config, Tailwind `@theme`)
* CSS layers ensure utility classes win over component styles without `!important`

---

Reference repository with final state: [J-Sek/vuetify-vite-and-tailwind](https://github.com/J-Sek/vuetify-vite-and-tailwind)
