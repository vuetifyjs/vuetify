---
nav: Upgrade guide
meta:
  title: Guide to upgrading Vuetify
  description: Detailed instruction on how to upgrade Vuetify to 3.0
  keywords: migration, upgrade, releases, upgrading vuetify, alpha, v3
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

<alert type="warning">

  This page is incomplete. Please check back later for more information, or submit a PR if you notice something missing. If you have additional questions, reach out to us in [Discord](https://community.vuetifyjs.com/)

</alert>

## Introduction

This page contains a detailed list of breaking changes and the steps required to upgrade your application to Vuetify 3.0
Many of these changes can be applied automatically by [eslint-plugin-vuetify](https://www.npmjs.com/package/eslint-plugin-vuetify/v/next)

## Setup

- **Vuetify** class removed, use **createVuetify** function

```js { resource="2.x" }
Vue.use(Vuetify)

const vuetify = new Vuetify({ ... })

const app = new Vue({
  vuetify,
  ...
})
```

```js { resource="3.0" }
const app = createVue()

const vuetify = createVuetify({ ... })

app.use(vuetify)
```

- `import ... from 'vuetify'` is now a-la-carte, import `'vuetify/dist/vuetify.js'` instead to get the complete bundle (not recommended).
- `'vuetify/lib'` should no longer be used, change to `'vuetify'` / `'vuetify/components'` / `'vuetify/directives'` as appropriate.
- Only component styles are included, global styles must be imported separately from `'vuetify/styles'`.
- [vuetify-loader](https://npmjs.com/package/vuetify-loader) has been renamed to [webpack-plugin-vuetify](https://npmjs.com/package/webpack-plugin-vuetify), and we also have a new plugin for vite [vite-plugin-vuetify](https://npmjs.com/package/vite-plugin-vuetify).

## Features

### Layout

### Theme

- Multiple themes are now supported, so `light` / `dark` props have been removed from components. Use `v-theme-provider` to set the theme for a specific component tree.
- Theme colors set their foreground text color automatically, if you were using `light` / `dark` to get a different text color you probably don't need it anymore.
- The variant naming scheme has changed slightly, it is now a single word instead of two. For example, `primary darken-1` is now `primary-darken-1`.
- Color classes have been renamed:
  - Backgrounds have a `bg-` prefix, for example `.primary` is now `.bg-primary`.
  - Text colors have a `text-` prefix, for example `.primary--text` is now `.text-primary`.
  - Variants are no longer a separate class, for example `.primary--text.text--darken-1` is now `.text-primary-darken-1`.
- The theme system now uses CSS variables internally, so `customProperties` is no longer required.
  - If you were using `customProperties` in v2, the naming scheme has changed from `--v-primary-base` to `--v-theme-primary`.
  - Custom properties are now also an rgb list instead of hex so `rgb()` or `rgba()` must be used to access them, for example `color: rgb(var(--v-theme-primary))` instead of `color: var(--v-primary-base)`.

## Components

### General changes

- `value` prop has been replaced by `model-value` on components that support `v-model` usage.
- `@input` event has been replaced by `@update:model-value` on components that support `v-model` usage.
- `left` and `right` have been replaced by `start` and `end` respectively. This applies to utility classes too, for example `.border-r` is now `.border-e`.
- Size props `small` / `medium` / `large` etc. have been combined into a single `size` prop.
- `absolute` and `fixed` props have been combined into a single `position` prop.
- `top` / `bottom` / `left` / `right` props have been combined into a single `location` prop.
- `background-color` prop has been renamed to `bg-color`.

### Input components

- Affix slots are consistent now:
  - `prepend` and `prepend-inner` are the same.
  - `append` has been renamed to `append-inner`.
  - `append-outer` has been renamed to `append`.
- Variant props `filled`/`outlined`/`solo` have been combined into a single `variant` prop.
  - Allowed values are `'underlined'`, `'outlined'`, `'filled'`, `'solo'`, or `'plain'`.
- `success` and `success-messages` props have been removed.
- `validate-on-blur` prop has been renamed to `validate-on="blur"`.

### v-alert

- `border` prop values `left` and `right` have been renamed to `start` and `end`.
- `colored-border` prop has been renamed to `border-color`.
- `dismissable` prop has been renamed to `closable`.
- `outlined` and `text` props have been combined into a single `variant` prop.
  - Allowed values are `'elevated'`, `'flat'`, `'tonal'`, `'outlined'`, `'text'`, or `'plain'`.
- `text` prop has new purpose. It represents the text content of the alert, if default slot is not used.

### v-btn

- `active-class` prop has been renamed to `selected-class`.
- `fab` is no longer supported.
- `flat` / `outlined` / `text` / `plain` props have been combined into a single `variant` prop.
- `depressed` has been renamed to `variant="flat"`.
- `retain-focus-on-click` has been removed, buttons use `:focus-visible` instead.

### v-checkbox/v-radio/v-switch

- `input-value` prop has been renamed to `model-value`.
- `on-icon` and `off-icon` props have been renamed to `true-icon` and `false-icon`.
- `on-value` and `off-value` props have been renamed to `true-value` and `false-value`.

### v-list

- `two-line` and `three-line` props have been combined into a single `lines` prop with allowed values `'two'` or `'three'`.
- `v-list-item-group` has been removed, just add `value` to list items to make them selectable and bind `v-model:selected` on v-list to get the selected value.
- `v-list-item-icon` and `v-list-item-avatar` have been removed, use `v-list-item` with `icon` or `avatar` props, or put an icon or avatar in the append or prepend slot.
- `v-list-item-content` has been removed, lists use CSS grid for layout now instead.
- `v-list-group` can now be nested arbitrarily deep, `sub-group` prop should be removed.
- `v-list-item` `input-value` prop has been replaced with `active`.
- `v-list-item` `inactive` prop has been replaced with `:active="false" :link="false"`.
- `v-subheader`  has been renamed to `v-list-subheader`.

### v-select/v-combobox/v-autocomplete

- v-model values not present in `items` will now be rendered instead of being ignored.
- `cache-items` prop has been removed, caching should be handled externally.
- `item-text` has been renamed to `item-title`, and now looks up the `title` property on item objects by default. `value` is unchanged.
- `item-disabled` has been removed, and `disabled`, `header`, `divider`, and `avatar` properties are ignored on item objects.
  - Additional props to pass to `v-list-item` can be specified with the `item-props` prop. `item-props` can be a function that takes the item object and returns an object of props, or set to boolean `true` to spread item objects directly as props.
- The `item` object in slots is now an `InternalItem` object, the original item object is available as `item.raw`.
- The `item` slot will no longer generate a `v-list-item` component automatically, instead a `props` object is supplied with the required event listeners and props:

```html
  <template #item="{ props }">
    <v-list-item v-bind="props"></v-list-item>
  </template>
```

- The `chip` slot should be used instead of `selection` if the `chips` prop is set, this will provide some default values to the chips automatically.
- Non-`multiple` combobox will now update its model as you type (like a text field) instead of only on blur.

### v-simple-table

- `v-simple-table` has been renamed to `v-table`

### v-slider/v-range-slider

- `ticks` has been renamed to `show-ticks`.
- `tick-labels` has been renamed to `ticks`.
- `vertical` has been renamed to `direction="vertical"`.

### v-tabs

- `v-tab-item` has been removed, use `v-window-item`
