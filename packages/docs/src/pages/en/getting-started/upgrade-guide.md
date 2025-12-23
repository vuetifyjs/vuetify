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

- Cascade layers are now being used everywhere. If you have other styles that are not using `@layer` they will now always take priority over vuetify.
- The CSS reset has been mostly removed, with style normalisation being moved to individual components instead.
  - `<button>`, `<input>`, `<select>` have their browser native borders and background colors.
  - `<ul>`, `<ol>` and headings have padding and margins.
- There are now pre-compiled entry points for the most common style changes. If you have a sass file that only sets `$color-pack: false` or `$utilities: false` you can replace it with `import 'vuetify/styles/core'`. See [Style entry points](/styles/entry-points) for more information.
- Elevation shadows have been updated to Material Design 3 which uses 6 levels (0-5) instead of 25 (0-24). See [Elevation migration](/getting-started/elevation-migration) for details and tips to restore legacy MD2 levels if needed.

## Themes

The default theme has been changed from **light** to **system**. This means that the default theme will now be the same as the user's system preference. You can change this by setting the **defaultTheme** theme option:

```diff { resource="src/plugins/vuetify.ts" }
export default createVuetify({
+ theme: {
+   defaultTheme: 'light',
+ },
})
```

## Components

### VSnackbar

Removed the `multi-line` prop and the **$snackbar-multi-line-wrapper-min-height** SASS variable. It can be replaced with `min-height` equivalent.

```diff
  <VSnackbar
    v-model="visible"
-    multi-line
+    min-height="68"
    :text="message"
  />
```

### VTextField

Removed the **$text-field-details-padding-inline** SASS variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $text-field-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);
```

### VRadioGroup

Removed the **$radio-group-details-padding-inline** SASS variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $radio-group-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);
```

### VFileInput

Removed the **$file-input-details-padding-inline** SASS variable.

```diff { resource="src/styles/settings/_variables.scss" }
@use 'vuetify/settings' with (
-  $file-input-details-padding-inline: <value>
+  $input-details-padding-inline: <value>
);

### VBtn display

In Vuetify 3, VField's layout was changed from `display: flex` to `display: grid` to better handle its internal elements. However, the grid implementation had limitations with gap control, so in Vuetify 4 we've reverted back to using `display: flex`.

The **$button-stacked-icon-margin** SASS variable has been removed and replaced with **$button-stacked-gap**. This change allows for more consistent and flexible spacing between elements within the field. If you modified this value, update its variable target:

```diff { resource="styles/styles.scss"}
  @use 'vuetify/settings' with (
-   $button-stacked-icon-margin: 8px,
+   $button-stacked-gap,
  );
```

### VBtn text-transform

The default text transform of _uppercase_ has been **removed**. To restore the previous behavior, set the `text-transform` prop to `uppercase`.

- Set it in the SASS variables for typography:

```scss
@use 'vuetify/settings' with (
  $typography: (
    'button': (
      'text-transform': 'uppercase',
    ),
  ),
)
```

- Or set it in the SASS variables for buttons:

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

### VField

In Vuetify 3, VField's layout was changed from `display: flex` to `display: grid` to better handle its internal elements. However, the grid implementation had limitations with gap control, so in Vuetify 4 we've reverted back to using `display: flex`.

The **$field-clearable-margin** SASS variable has been removed and replaced with **$field-gap**. This change allows for more consistent and flexible spacing between elements within the field. If you modified this value, update its variable target:

```diff { resource="styles/styles.scss"}
  @use 'vuetify/settings' with (
-   $field-clearable-margin: 8px,
+   $field-gap: 8px,
```

### VCounter (hint under VTextField, VTextarea and VFieldInput)

The **$counter-color** and `color` was replaced in favor of opacity. If you modified this value, move it to target CSS class directly:

```diff { resource="styles/styles.scss"}
.v-counter {
  opacity: 1;
  color: /* your $counter-color */;
}
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

### General changes

#### Slot variables are (mostly) no longer refs

Read-only values passed to slots are now unwrapped:

```diff
  <VForm>
    <template #default="{ isValid, validate }">
      <VBtn @click="validate" text="validate" />
-     Form is {{ isValid.value ? 'valid' : 'invalid' }}
+     Form is {{ isValid ? 'valid' : 'invalid' }}
    </template>
  </VForm>
```

There are still some writable refs though, for example in VDialog:

```html
<VDialog>
  <template #default="{ isActive }">
    <VBtn @click="isActive.value = false">Close</VBtn>
  </template>
</VDialog>
```

Affected components:

- VForm
  - errors
  - isDisabled
  - isReadonly
  - isValidating
  - isValid
  - items
