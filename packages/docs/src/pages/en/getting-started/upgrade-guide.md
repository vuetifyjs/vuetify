---
nav: Upgrade guide
meta:
  title: Upgrade guide
  description: Detailed instruction on how to upgrade Vuetify to 3.0
  keywords: migration, upgrade, releases, upgrading vuetify, alpha, v3
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

## Introduction

This page contains a detailed list of breaking changes and the steps required to upgrade your application to Vuetify 3.0
Many of these changes can be applied automatically by [eslint-plugin-vuetify](https://www.npmjs.com/package/eslint-plugin-vuetify/)

<entry />

<alert type="warning">

  This page is incomplete. Please check back later for more information, or submit a PR if you notice something missing. If you have additional questions, reach out to us in [Discord](https://community.vuetifyjs.com/)

</alert>

<alert type="warning">

  Not all Vuetify 2 components are currently available in Vuetify 3; These components will be released as their development is completed via [Vuetify Labs](https://vuetifyjs.com/en/labs/introduction/).

- v-calendar
- v-date-picker
- [v-data-table](/components/data-tables/basics/)
- [v-skeleton-loader](/components/skeleton-loaders/)
- v-stepper
- v-time-picker
- v-treeview

</alert>

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
const app = createApp()

const vuetify = createVuetify({ ... })

app.use(vuetify)
```

- `import ... from 'vuetify'` is now a-la-carte, import `'vuetify/dist/vuetify.js'` instead to get the complete bundle (not recommended).
- `'vuetify/lib'` should no longer be used, change to `'vuetify'` / `'vuetify/components'` / `'vuetify/directives'` as appropriate.
- Only component styles are included, global styles must be imported separately from `'vuetify/styles'`.
- [vuetify-loader](https://npmjs.com/package/vuetify-loader) has been renamed to [webpack-plugin-vuetify](https://npmjs.com/package/webpack-plugin-vuetify), and we also have a new plugin for vite [vite-plugin-vuetify](https://npmjs.com/package/vite-plugin-vuetify).

## Features

### Layout

- Global styles previously included as `.v-application p` or `.v-application ul` are no longer included. If you need margin for `p`, or padding-left for `ul` and `ol`, set it manually in your root component's `<style>` tag
- `stateless`, `clipped`, `clipped-right` and `app` props have been removed from v-navigation-drawer, v-app-bar and v-system-bar. The position in the markup determines the appearance. Use the `order="number"` prop to influence it manually.
- `$vuetify.breakpoint` has been renamed to `$vuetify.display` and extended with [new properties](/features/display-and-platform/)

### Theme

- Multiple themes are now supported, so `light` / `dark` props have been removed from components. Use `v-theme-provider` to set the theme for a specific component tree.
  - Components that previously had a `dark` prop, such as v-app-bar, now accept `theme="dark"` prop
- Theme colors set their foreground text color automatically, if you were using `light` / `dark` to get a different text color you probably don't need it anymore.
- The variant naming scheme has changed slightly, it is now a single word instead of two. For example, `primary darken-1` is now `primary-darken-1`.
  - To use variant namings as value for `color` props, the variant you intend to use needs to be enabled in the theme under `theme.variations.colors`. e.g: `colors: ['primary']`
- Color classes have been renamed:
  - Backgrounds have a `bg-` prefix, for example `.primary` is now `.bg-primary`.
  - Text colors have a `text-` prefix, for example `.primary--text` is now `.text-primary`.
  - Variants are no longer a separate class, for example `.primary--text.text--darken-1` is now `.text-primary-darken-1`.
- The theme system now uses CSS variables internally, so `customProperties` is no longer required.
  - If you were using `customProperties` in v2, the naming scheme has changed from `--v-primary-base` to `--v-theme-primary`.
  - Custom properties are now also an rgb list instead of hex so `rgb()` or `rgba()` must be used to access them, for example `color: rgb(var(--v-theme-primary))` instead of `color: var(--v-primary-base)`.
- Theme colors in the theme config are now nested inside a `colors` property, e.g. `const myTheme = { theme: { themes: { light: { colors: { primary: '#ccc' } } } } }`

### SCSS

- `$headings` was merged with `$typography`: Access font-size of subtitle-2 with `map-get($typography, 'subtitle-2', 'size')`
- If you imported variables from `~vuetify/src/styles/settings/_variables` in v2, you have to replace it with `vuetify/settings`
- Component variables that previously lived in e.g. `~/vuetify/src/components/VIcon/VIcon.sass` can now be imported from `vuetify/settings` directly too
- `$displayBreakpoints` no longer includes `{breakpoint}-only` variables (e.g. xs-only), use `@media #{map-get(v.$display-breakpoints, 'xs')}` instead
- The `$transition` map has been removed, replaced with individual `$standard-easing`, `$decelerated-easing`, `$accelerated-easing` variables.
- `$container-padding-x` is now 16px instead of 12px as in v2. You can replace it with `$spacer * 3` to get to the previous look

## Components

### General changes

- `value` prop has been replaced by `model-value` on components that support `v-model` usage.
  - Note that this does not apply to `value` used as a *selection value*, for example `v-btn` within `v-btn-toggle`.
- `@input` event has been replaced by `@update:model-value` on components that support `v-model` usage.
- `left` and `right` have been replaced by `start` and `end` respectively. This applies to utility classes too, for example `.border-r` is now `.border-e`.
- Size props `small` / `medium` / `large` etc. have been combined into a single `size` prop.
- `absolute` and `fixed` props have been combined into a single `position` prop.
- `top` / `bottom` / `left` / `right` props have been combined into a single `location` prop.
- `background-color` prop has been renamed to `bg-color`.
- `dense` prop on components such as v-select, v-btn-toggle, v-alert, v-text-field, v-list and v-list-item has been changed to `density` prop with the variants `default`, `comfortable`, `compact`
- Activator slots work slightly different. Replace `#activator={ attrs, on }` with `#activator={ props }`, then remove `v-on="on"` and replace `v-bind="attrs"` with `v-bind="props"`
- Some components have structural changes in their markup. Which means you may have to change how you query and assert them in tests. `v-switch` for example now uses an `<input type="checkbox" />` under the hood, which is why the `aria-checked` and `aria-role="switch"` attributes were removed.

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

### v-btn/v-btn-toggle

- `active-class` prop has been renamed to `selected-class`
- `fab` is no longer supported. If you just need a round button, use `icon` prop or apply a `.rounded-circle` class.
- `flat` / `outlined` / `text` / `plain` props have been combined into a single `variant` prop.
- `depressed` has been renamed to `variant="flat"`
- `retain-focus-on-click` has been removed, buttons use [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) instead.
- `v-btn-toggle` needs `mandatory="force"` prop to achieve the same behaviour as `mandatory` prop in v2.
- Disabled buttons use a faded variant of the specified `color` instead of grey ([#15147](https://github.com/vuetifyjs/vuetify/issues/15147))
  - The `$button-colored-disabled` sass variable can be set to false to use grey instead.

### v-checkbox/v-radio/v-switch

- `input-value` prop has been renamed to `model-value`.
- `on-icon` and `off-icon` props have been renamed to `true-icon` and `false-icon`.
- `on-value` and `off-value` props have been renamed to `true-value` and `false-value`.
- `v-checkbox`'s label slot should no longer contain a `<label>` as it is already wrapped with one

### v-form

- `validate()` now returns a [`Promise<FormValidationResult>`](/api/v-form/#exposed-validate) instead of a boolean. Await the promise then check `result.valid` to determine form state.

### v-list

- `two-line` and `three-line` props have been combined into a single `lines` prop with allowed values `'two'` or `'three'`.
- `v-list-item-group` has been removed, just add `value` to list items to make them selectable and bind `v-model:selected` on v-list to get the selected value.
- `v-list-item-icon` and `v-list-item-avatar` have been removed, use `v-list-item` with `icon` or `avatar` props, or put an icon or avatar in the append or prepend slot.
- `v-list-item-content` has been removed, lists use CSS grid for layout now instead.
- `v-list-group` can now be nested arbitrarily deep, `sub-group` prop should be removed.
- `v-list-item` `input-value` prop has been replaced with `active`.
- `v-list-item` `inactive` prop has been replaced with `:active="false" :link="false"`.
- `v-subheader`  has been renamed to `v-list-subheader`.
- `v-list-item`'s `active` scoped slot prop has been renamed to `isActive`

### v-select/v-combobox/v-autocomplete

- v-model values not present in `items` will now be rendered instead of being ignored.
- `cache-items` prop has been removed, caching should be handled externally.
- `item-text` has been renamed to `item-title`, and now looks up the `title` property on item objects by default. `value` is unchanged.
- `item-disabled` has been removed, and `disabled`, `header`, `divider`, and `avatar` properties are ignored on item objects.
  - Additional props to pass to `v-list-item` can be specified with the `item-props` prop. `item-props` can be a function that takes the item object and returns an object of props, or set to boolean `true` to spread item objects directly as props.
- The `item` object in slots is now an `ListItem` object, the original item object is available as `item.raw`.
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
- `step` default value is now 0 instead of 1.

### v-tabs

- `v-tab-item` has been removed, use `v-window-item`

### v-img

- `contain` has been removed and is now the default behaviour. Use `cover` to fill the entire container.

### v-menu

- `rounded` prop has been removed. Apply a rounded css class to the menu content element instead. e.g. `.rounded-te`
- `internal-activator` prop has been removed without replacement
- `offset-y` and `offset-x` props have been removed. Use `offset` prop instead
- `absolute` variant has been removed. For absolute positioning use css instead

### v-skeleton-loader

- This component hasn't been migrated to vuetify 3

### v-snackbar

- `action` slot was renamed to `actions`

### v-expansion-panel

- `v-expansion-panel-header` has been renamed to `v-expansion-panel-title`.
- `v-expansion-panel-content` has been renamed to `v-expansion-panel-text`.
- `v-expansion-panel` now has `text` and `title` props that can be used instead of subcomponents.
