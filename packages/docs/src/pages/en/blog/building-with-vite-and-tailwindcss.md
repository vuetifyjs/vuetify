---
layout: blog
meta:
  title: Build with Vite and TailwindCSS v4
  description: Learn how to integrate Vuetify v4 with TailwindCSS v4 in a Vite project, covering theme colors, dark mode, fonts, breakpoints and CSS layers.
  keywords: TailwindCSS v4, Vuetify v4, Vite, Theme, CSS Layers
---

# Integrating Vuetify v4 with TailwindCSS v4 in a Vite project

In the previous article we explored integrating UnoCSS with Vuetify v3 and Nuxt. This time we take a more direct route: pairing Vuetify v4 with TailwindCSS v4 on a plain Vite setup with both running as Vite plugins. Vuetify v4 ships with CSS layers enabled by default, which makes integrating TailwindCSS significantly smoother than before.

We will go through the following steps:

* Scaffold a starter project and wire up TailwindCSS
* Restore `rounded-*` utilities
* Customize fonts
* Discuss strategy to for theme colors management
* Ensure Vuetify's light/dark themes work with TailwindCSS `light:*` and `dark:*` prefixes
* Align breakpoints configuration

---

## Table of Contents

* [Scaffold and install](#scaffold-and-install)
  * [Create the project](#create-the-project)
  * [Add TailwindCSS v4 via the Vite plugin](#add-tailwindcss-v4-via-the-vite-plugin)
  * [Disable Vuetify utilities](#disable-vuetify-utilities)
  * [Migrate HelloWorld.vue and AppFooter.vue](#migrate-helloworldvue-and-appfootervue)
  * [Restore `rounded-*` classes](#restore-rounded--classes)
* [Custom fonts](#custom-fonts)
* [Avoid conflicting color utilities](#avoid-conflicting-color-utilities)
* [Configure class-based light/dark variants](#configure-class-based-lightdark-variants)
* [Breakpoints](#breakpoints)
* [Summary](#summary)

---

## Scaffold and install

### Create the project

::: tabs

```bash [pnpm]
pnpm create vuetify@latest
```

```bash [yarn]
yarn create vuetify
```

```bash [npm]
npm create vuetify
```

```bash [bun]
bun create vuetify
```

:::

...choose the "Recommended" preset for Vite and select Vuetify 4.

Verify the boilerplate by building it with standard NPM build script (e.g. `pnpm run build`).

Add a few generated files to `.gitignore`, so they won't annoy as when inspecting applied changes.

```sh { resource=".gitignore" }
# Generated files
auto-imports.d.ts
components.d.ts
typed-router.d.ts
.eslintrc-auto-import.json
```

Commit all files as a baseline. This way you can always diff against it and keep track of changes we are about to introduce.

### Add TailwindCSS v4 via the Vite plugin

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

Register `tailwindcss()` in the `plugins` array of `vite.config.ts` and create `src/styles/tailwind.css`. Vuetify v4 already provides its own reset, so we skip Tailwind's preflight to avoid two competing resets:

```css { resource="src/styles/tailwind.css" }
@import "tailwindcss/theme" layer(tailwind.theme);
/* @import "tailwindcss/preflight.css" layer(tailwind.reset); <-- skipped intentionally */
@import "tailwindcss/utilities" layer(tailwind.utilities);
```

In order for Vuetify transitions to work properly, we have to ensure `tailwind.*` layers are placed before `vuetify-final`. Go ahead and add new file called `layers.scss`:

```css { resource="src/styles/layers.scss" }
@layer vuetify-core;
@layer vuetify-components;
@layer vuetify-overrides;
@layer vuetify-utilities;
@layer tailwind;
@layer vuetify-final;
```

Then reference it from `settings.scss`.

```scss { resource="src/styles/settings.scss" }
@use './layers';

/* @use 'vuetify/settings' with (
  ... we will fill it up later ...
) */
```

![CSS Layers preview in browser DevTools](./screenshots/layers-preview.png)


### Disable Vuetify utilities

Let's adjust `src/styles/settings.scss`:

```scss { resource="src/styles/settings.scss" }
@use './layers';
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
);
```

If you run the build again, you should observe that the CSS bundle shrinks noticeably:

```diff
- 659.96 kB │ gzip: 142.26 kB
+ 482.80 kB │ gzip: 116.26 kB
```

The expected difference is substantial, but we still pay the tax of using the full MDI icon font. Switching to SVG icons (`@mdi/js`) is not a big deal, but we will keep this guide focused on integrating TailwindCSS. If you need to optimize the bundle size further, Vuetify documentation already covers [how to switch to SVG icon set](/features/icon-fonts/#mdi-js-svg).

### Migrate HelloWorld.vue and AppFooter.vue

With utilities disabled, some classes used in the scaffolded template will stop working. Here are the replacements:

* replace `fill-height` with `h-full`
* replace `align-center` with `items-center`
* replace `font-weight-*` with `font-*`
* replace `mb-n1` with `-mb-1`
* replace typography `text-*` classes with native TailwindCSS utilities to achieve similar font size and width

VRow/VCol can also be replaced with `grid md:grid-cols-2 gap-3` and `md:col-span-2` for the first VCard. However, you might be surprised to learn that Vuetify grid engine got major overhaul in v4.0.0 and is much leaner and more flexible then ever.

### Restore `rounded-*` classes

Something that is not really noticeable at first glance is the card rounding. Vuetify's `rounded` prop values (`rounded="lg"`, etc.) emit classes like `.rounded-lg` that collide with Tailwind's naming but use different values.

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

In order to resolve this, we need to use `blocklist` and suppress certain utilities from TailwindCSS. Create a config file:

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

The new file has to be linked from `tailwind.css`. We also override the radius variables and register custom utilities for the values that don't exist in Tailwind out-of-the-box:

```css { resource="src/styles/tailwind.css" }
@import "tailwindcss/theme" layer(theme);
/* @import "tailwindcss/preflight.css" layer(reset); */
@import "tailwindcss/utilities" layer(utilities);

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

If you'd rather use the original TailwindCSS `rounded-*` utilities, it is recommended to disallow use of Vuetify's rounded classes, which can be enforced by patching `eslint-plugin-vuetify`. The actual process of patching is specific to the package manager of your choice, so we will skip it for now. If you are stuck, feel free to reach out on [Discord](https://community.vuetifyjs.com).

---

## Custom fonts

The `create-vuetify` utility we used at the beginning to scaffold the project uses `unplugin-fonts` to load Roboto. Let's update the configuration to make sure the target fonts are available.

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

Next step is to add them as dependencies:

::: tabs

```bash [pnpm]
pnpm i @fontsource/bricolage-grotesque @fontsource/sen @fontsource/sometype-mono
```

```bash [yarn]
yarn add @fontsource/bricolage-grotesque @fontsource/sen @fontsource/sometype-mono
```

```bash [npm]
npm i @fontsource/bricolage-grotesque @fontsource/sen @fontsource/sometype-mono
```

```bash [bun]
bun add @fontsource/bricolage-grotesque @fontsource/sen @fontsource/sometype-mono
```

:::

Now we can configure TailwindCSS theme variables. These will generate utility classes like `font-heading`, `font-body` and `font-mono`:

```css { resource="src/styles/tailwind.css" }
@theme {
  --font-heading: "Bricolage Grotesque", sans-serif;
  --font-body: Sen, sans-serif;
  --font-mono: "Sometype Mono", monospace;

  /* ...breakpoints, radius, colors... */
}

/* ensure the variables are not skipped */
@source inline('font-body');
@source inline('font-heading');
@source inline('font-mono');
```

Then we pass them to Vuetify through Sass variables so component typography picks them up too:

```diff { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $color-pack: false,
  $utilities: false,
+  $heading-font-family: var(--font-heading),
+  $body-font-family: var(--font-body),
);
```

At this point, I usually like to cover components that need a monospace font. We can also create `/assets/main.scss` to set it globally. It is not strictly necessary, but apps usually need some custom global styles anyway.

```scss { resource="src/styles/main.scss" }
@layer vuetify-overrides {
  code, pre, .v-code {
    font-family: var(--font-mono);
  }
}
```

New file has to be imported in `main.ts` alongside the Tailwind stylesheet.

---

## Avoid conflicting color utilities

`bg-*` classes generated by Vuetify carry over a foreground color that is calculated to ensure text and icons have a sufficient contrast ratio. This makes them superior to regular TailwindCSS utilities, but also incompatible with variants (`hover:`, `sm:*`, `md:*`, etc).

```css
.bg-primary {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}
```

When working with TailwindCSS, it is normal to split background and text colors into separate classes, and the responsibility of ensuring readability is on the developer writing the code.

In order to avoid the mental overhead of remembering where each `bg-*` is comming from, let's instruct Vuetify theme to generate only CSS variables and skip the classes:

```diff { resource="src/plugins/vuetify.ts" }
export default createVuetify({
  theme: {
    defaultTheme: 'system',
+    utilities: false,
  },
})
```

Next, we can pass those theme colors to TailwindCSS. Since the values are raw comma-separated RGB channels (translated from hex on the fly by Vuetify), we need to wrap them in `rgb()` when registering them in Tailwind's `@theme`:

```css { resource="src/styles/tailwind.css" }
@theme {
  --color-background: rgb(var(--v-theme-background));
  --color-primary: rgb(var(--v-theme-primary));
  --color-surface: rgb(var(--v-theme-surface));
  --color-success: rgb(var(--v-theme-success));
  --color-error: rgb(var(--v-theme-error));
  /* and the rest of colors you intend to use */
}

/* safelist common colors to be used with color="..." attribute */
@source inline('bg-primary');
@source inline('text-primary');
@source inline('bg-success');
@source inline('text-success');
@source inline('bg-error');
@source inline('text-error');
```

Now you can use `bg-primary`, `text-success`, `hover:bg-error` and similar classes, all driven by Vuetify's theme definition.

---

## Configure class-based light/dark variants

Let's add some color-dependent classes and try using the `dark:*` prefix to see what happens. By default, Tailwind's `dark:` variant targets `@media (prefers-color-scheme: dark)` or a `.dark` class. Vuetify uses `.v-theme--dark` instead, so the generated selectors won't match.

To align Tailwind with Vuetify, we need to redeclare theming variants:

```css { resource="src/styles/tailwind.css" }
@custom-variant light (&:where(.v-theme--light, .v-theme--light *));
@custom-variant dark (&:where(.v-theme--dark, .v-theme--dark *));
```

You can verify it by toggling themes. Simply add a quick button somewhere (e.g. in `App.vue`):

```html
<v-btn
  icon="mdi-theme-light-dark"
  position="absolute"
  location="top right"
  class="ma-2"
  @click="$vuetify.theme.cycle()"
/>
```

Now classes like `dark:bg-primary` and `light:text-error` should react correctly to Vuetify's theme toggle.

---

## Breakpoints

Default breakpoints provided by TailwindCSS are not compatible with Vuetify. This mismatch can lead to unexpected layout issues when `sm:` in Tailwind kicks in at a different width than `sm` in VCol. Let's align them.

Unlike the UnoCSS setup from the previous article, where we could define breakpoints in a shared `.ts` file and feed them into both tools, TailwindCSS v4 expects breakpoints as pure CSS variables under `@theme`. This means we inevitably end up with the same values in three places. It's a minor inconvenience, but easy to manage with a comment pointing to the other two.

First, clear out the Tailwind defaults and set our own in `tailwind.css`:

```css { resource="src/styles/tailwind.css" }
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

---

## Summary

Compared to the UnoCSS path, most of the setup lands in `tailwind.css` instead of `nuxt.config.ts`. We used custom directives like `@theme` and `@custom-variant`, but had to drop back to importing JS-based config to blacklist some styles provided by Tailwind. I hope it was an interesting journey and you can feel comfortable building upon this setup. Here are the key takeaways:

* **Utilities**: we disabled Vuetify's built-in utilities to replace them with TailwindCSS utilities while keeping an eye on the correct order of CSS layers
* **Rounded classes**: Vuetify's `rounded` prop and Tailwind's `rounded-*` utilities use the same class names with different values. It was a challenge, but we were able to bridge the gap
* **Theme colors**: Vuetify theme can also be configured to skip utility classes and generate only CSS properties. We have passed them inside `@theme` directive and "safelisted" global colors we intend to use with `color` prop on cards, buttons and icons
* **Dark mode**: Tailwind is flexible enough to accept Vuetify theme classes
* **Typography**: `text-*` classes were skipped for simplicity - you can introduce your own classes with the `@utility` directive if needed
* **Breakpoints**: we aligned configuration across three definitions (SCSS, Vuetify config, Tailwind `@theme`) to prevent layout bugs

Reference repository with final state: [J-Sek/vuetify-vite-and-tailwind](https://github.com/J-Sek/vuetify-vite-and-tailwind). If you find it useful, give it a ⭐.

Cheers!
