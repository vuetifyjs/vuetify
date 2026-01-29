---
emphasized: true
meta:
  nav: Upgrade guide
  title: Upgrade guide
  description: Detailed instruction on how to upgrade Vuetify to 4.0
  keywords: migration, upgrade, releases, upgrading vuetify, alpha, v4
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

This page contains a detailed list of breaking changes and the steps required to upgrade your application to Vuetify 4

<PageFeatures />

## Styles

### Style entry points

There are now pre-compiled entry points for the most common style changes. If you have a Sass file that only sets `$color-pack: false` or `$utilities: false` you can replace it with `import 'vuetify/styles/core'`. See [Style entry points](/styles/entry-points) for more information.

### CSS reset

The CSS reset has been mostly removed, with style normalisation being moved to individual components instead. You can inspect the exact [changes](https://github.com/vuetifyjs/vuetify/pull/20960/changes#diff-87996fc432835581ad883bedbc1975ad3a3f44b5747b2b831e3fa03dfdabb91f) to learn more. Here is the high level overview:

- global `* { padding: 0; margin: 0; }` is gone - no longer resets all elements
- `<button>`, `<input>`, `<select>` have their browser-native borders and background colors.

If you notice browser styles adding unnecessary spaces and impact text size, it is recommended to assess the scope of visual regression and selectively apply spacing resets:

```css
ul, ol, figure, details, summary {
  padding: 0;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
```

Restoring most of the previous reset styles would be heavy-handed, but will get the job done as well.

```css
* { padding: 0; margin: 0; }
a:active, a:hover { outline-width: 0; }
code, kbd, pre, samp { font-family: monospace; }
pre { font-size: 1em; }
small { font-size: 80%; }
sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub { bottom: -0.25em; }
sup { top: -0.5em; }
textarea { resize: vertical; }
button,
input,
select,
textarea {
  background-color: transparent;
  border-style: none;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
}
legend {
  display: table;
  max-width: 100%;
  white-space: normal;
}
```

### Layers

Cascade layers are now being used everywhere. If you have other styles that are not using `@layer` they will now always take priority over vuetify.

If you were already using `$layers: true` in Vuetify 3, there are now five top-level layers instead of one.

```diff
- @layer base, vuetify, overrides;
+ @layer base, vuetify-core, vuetify-components, vuetify-overrides, vuetify-utilities, vuetify-final, overrides;
```

This can be used to easily interleave your own layers with ours:

```css
@layer vuetify-core, base, vuetify-components, vuetify-overrides, overrides, vuetify-utilities, utilities, vuetify-final;
```

If you had any usages of `@layer vuetify.*` in your styles they should be replaced with your own layer name with an appropriate declaration order.

## Typography

The typography system has been updated from Material Design 2 to Material Design 3. Variant names have changed:

| MD2 (Legacy)           | MD3 (New)                                             |
|------------------------|-------------------------------------------------------|
| `h1` - `h3`            | `display-large`, `display-medium`, `display-small`    |
| `h4` - `h6`            | `headline-large`, `headline-medium`, `headline-small` |
| `subtitle-1`, `body-1` | `body-large`                                          |
| `body-2`               | `body-medium`                                         |
| `caption`              | `body-small`                                          |
| `button`, `subtitle-2` | `label-large`                                         |
| `overline`             | `label-small`                                         |

For detailed mapping and migration instructions, see [Typography Migration](/getting-started/typography-migration/).

### Breakpoints

The default breakpoints have been reduced to better match modern device sizes:

| Breakpoint | Change              |
|------------|---------------------|
| xs         | 0 (unchanged)       |
| sm         | 600px (unchanged)   |
| md         | ~~960px~~  » 840px  |
| lg         | ~~1280px~~ » 1145px |
| xl         | ~~1920px~~ » 1545px |
| xxl        | ~~2560px~~ » 2138px |

One of the components specifically impacted by those changes is VContainer. See the detailed information about those changes [below](#vcontainer).

v3 breakpoints can be restored with the following configuration:

```js { resource="src/plugins/vuetify.ts" }
export default createVuetify({
  display: {
    thresholds: {
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560,
    },
  },
})
```

```scss { resource="src/styles/_settings.scss" }
@use 'vuetify/settings' with (
  $grid-breakpoints: (
    'md': 960px,
    'lg': 1280px,
    'xl': 1920px,
    'xxl': 2560px,
  ),
);
```

### Elevation

Elevation classes (shadows) have been updated to Material Design 3 which uses 6 levels (0-5) instead of 25 (0-24). See [Elevation migration](/getting-started/elevation-migration) for details and tips to restore legacy MD2 levels if needed.

## Themes

The default theme has been changed from **light** to **system**. This means that the default theme will now be the same as the user's system preference. You can change this by setting the **defaultTheme** theme option:

```diff { resource="src/plugins/vuetify.ts" }
export default createVuetify({
+ theme: {
+   defaultTheme: 'light',
+ },
})
```

Theme colors now support transparency. `rgb(var(--v-theme-color))` will continue to work the same as before, but `rgba(var(--v-theme-color), 0.8)` should be changed to either `color-mix(in srgb, rgb(var(--v-theme-color)) 80%, transparent)` or `rgb(from rgb(var(--v-theme-color)) / 0.8)` when used with a transparent theme color.

## Components

### VBtn display

In Vuetify 3, VField's layout was changed from `display: flex` to `display: grid` to better handle its internal elements. However, the grid implementation had limitations with gap control, so in Vuetify 4 we've reverted back to using `display: flex`.

The **$button-stacked-icon-margin** Sass variable has been removed and replaced with **$button-stacked-gap**. This change allows for more consistent and flexible spacing between elements within the field. If you modified this value, update its variable target:

```diff { resource="styles/styles.scss"}
  @use 'vuetify/settings' with (
-   $button-stacked-icon-margin: 8px,
+   $button-stacked-gap,
  );
```

### VBtn text-transform

The default `text-transform` of _uppercase_ has been **removed**. To restore the previous behavior, set the `text-transform` prop to `uppercase`.

- Set it in the Sass variables for buttons:

```scss
@use 'vuetify/settings' with (
  $button-text-transform: 'uppercase',
)
```

- Set it as a global default:

```js
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  defaults: {
    VBtn: {
      class: 'text-uppercase',
      // or if you are using $utilities: false
      style: 'text-transform: uppercase;',
    },
  },
})
```

- Manually type uppercase letters:

```diff
- <v-btn>button</v-btn>
+ <v-btn>BUTTON</v-btn>
```

### VContainer

Container component won't center the content vertically when paired with `fill-height`. If you depend on this behavior, you can supplement the missing styles with utility classes:

```diff
<v-container
-  class="fill-height"
+  class="fill-height d-flex align-center flex-wrap"
/>
```

#### Max widths

The calculation for `$container-max-widths` has changed to round values down to the nearest 100px for more predictable sizing. With the default breakpoints, this results in the following container widths:

| Breakpoint | Change              |
|------------|---------------------|
| md         | ~~900px~~  » 700px  |
| lg         | ~~1200px~~ » 1000px |
| xl         | ~~1800px~~ » 1400px |
| xxl        | ~~2400px~~ » 2000px |

### VCounter (hint under VTextField, VTextarea and VFieldInput)

The **$counter-color** and `color` was replaced in favor of opacity. If you modified this value, move it to target CSS class directly:

```scss { resource="styles/styles.scss"}
.v-counter {
  opacity: 1;
  color: /* your $counter-color */;
}
```

### VFileInput

Removed the **$file-input-details-padding-inline** Sass variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $file-input-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);
```

### VForm

Slot variables are no longer refs, read-only values passed to slots are now unwrapped:

```diff
  <VForm>
    <template #default="{ isValid, validate }">
      <VBtn @click="validate" text="validate" />
-     Form is {{ isValid.value ? 'valid' : 'invalid' }}
+     Form is {{ isValid ? 'valid' : 'invalid' }}
    </template>
  </VForm>
```

The following properties are affected:

- errors
- isDisabled
- isReadonly
- isValidating
- isValid
- items

### VRadioGroup

Removed the **$radio-group-details-padding-inline** Sass variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $radio-group-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);
```

### VSelect/VCombobox/VAutocomplete

#### `item` in slots has been renamed to `internalItem`

For consistency with VList and VDataTable. `item` is still available but is now an alias for `internalItem.raw` which seems like the most common use case.

You can rename:

```diff
  <VSelect item-title="name">
-   <template #item="{ item, props }">
-     <VListItem v-bind="props" :title="item.title" />
+   <template #item="{ internalItem, props }">
+     <VListItem v-bind="props" :title="internalItem.title" />
    </template>
  </VSelect>
```

Or alias:

```diff
  <VSelect>
-   <template #item="{ item, props }">
+   <template #item="{ internalItem: item, props }">
      <VListItem v-bind="props" :title="item.raw.name" />
    </template>
  </VSelect>
```

Or remove `.raw`:

```diff
  <VSelect>
    <template #item="{ item, props }">
-     <VListItem v-bind="props" :title="item.raw.name" />
+     <VListItem v-bind="props" :title="item.name" />
    </template>
  </VSelect>
```

### VSnackbar

Removed the `multi-line` prop and the **$snackbar-multi-line-wrapper-min-height** Sass variable. It can be replaced with `min-height` equivalent.

```diff
  <VSnackbar
    v-model="visible"
-    multi-line
+    min-height="68"
    :text="message"
  />
```

### VTextField

Removed the **$text-field-details-padding-inline** Sass variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $text-field-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);
```

## Defaults

`undefined` values are now skipped when merging prop defaults. This button would have been grey in v3, but is now green:

```jsx
createVuetify({
  defaults: {
    VBtn: { color: 'green' },
  },
})

<VDefaultsProvider :defaults="{ VBtn: { color: undefined }}">
  <VBtn />
</VDefaultsProvider>
```

Replace `undefined` with `null` if you do actually want it to override the global default value.

### VRow and VCol (Grid System)

The grid system has been refactored to use CSS `gap` instead of negative margins on rows and padding on columns. This change provides more flexibility and predictable spacing behavior.

#### Layout mechanism changes

| Previous                                                      | New                                    |
|---------------------------------------------------------------|----------------------------------------|
| Negative margins (`margin: -12px`)                            | No margins on VRow                     |
| Gaps from padding                                             | No default padding, utilizes CSS `gap` |
| Widths from hardcoded percentage (e.g., `75%` for `.v-col-9`) | Calculated width accounting for gaps   |

#### Prop changes on VRow

| Previous                          | New                                              |
|-----------------------------------|--------------------------------------------------|
| `dense`                           | `density="comfortable"` or `gap="8"`             |
| `no-gutters`                      | `density="compact"` or `gap="0"`                 |
| `align` prop on VRow              | use utility class (e.g., `align-start`)          |
| `justify` prop on VRow            | use utility class (e.g., `justify-center`)       |
| `align-content` prop on VRow      | use utility class (e.g., `align-content-center`) |
| `align-sm`, `justify-md`, etc.    | use responsive utility classes                   |
| no fine-grainded control over gap | `gap` prop accepts number, string, or `[x, y]`   |

#### Prop changes on VCol

| Previous                                | New                                                 |
|-----------------------------------------|-----------------------------------------------------|
| `order` prop on VCol                    | use utility class (e.g., `order-1`)                 |
| props like `order-sm`, `order-md`, etc. | use responsive utility classes (e.g., `order-sm-1`) |
| `align-self` prop on VCol               | use utility class (e.g., `align-self-center`)       |
| `.offset-{n}` (offset classes)          | `.v-col-offset-{n}`                                 |

#### Migration examples

**Alignment (VRow):**

```diff
- <v-row align="center" justify="space-between">
+ <v-row class="align-center justify-space-between">
```

**Responsive alignment:**

```diff
- <v-row align-sm="start" align-md="center" justify-lg="end">
+ <v-row class="align-sm-start align-md-center justify-lg-end">
```

**Order (VCol):**

```diff
- <v-col order="2" order-md="1">
+ <v-col class="order-2 order-md-1">
```

**Align self (VCol):**

```diff
- <v-col align-self="center">
+ <v-col class="align-self-center">
```

**Dense rows:**

```diff
- <v-row dense>
+ <v-row density="comfortable">
```

**No gutters:**

```diff
- <v-row no-gutters>
+ <v-row density="compact">
```

#### Offset class changes

Offset classes have been renamed from `.offset-*` to `.v-col-offset-*` for namespace consistency:

```diff
- <v-col offset="3" offset-md="2">
+ <v-col offset="3" offset-md="2">  <!-- Props still work the same -->
```

The component props (`offset`, `offset-sm`, etc.) continue to work unchanged, but if you were using the CSS classes directly, update them:

```diff
- <div class="v-col offset-6">
+ <div class="v-col v-col-offset-6">
```

#### Restoring the legacy grid behavior

If you need to maintain the previous grid behavior (negative margins and column padding), see the [Grid Legacy Mode](/getting-started/grid-legacy-mode) guide.
