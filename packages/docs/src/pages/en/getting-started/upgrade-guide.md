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
