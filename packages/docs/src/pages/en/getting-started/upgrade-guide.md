---
meta:
  title: Upgrade Guide
  description: Keep your Vuetify up to date with the latest bug fixes, features, and functionality.
  keywords: migration, upgrade guide, upgrading vuetify
related:
  - /introduction/long-term-support/
  - /getting-started/contributing/
  - /introduction/roadmap/
---

# Upgrade Guide

## Upgrading from v1.5.x to v2.0.x

Version 2 contains non backwards compatible breaking changes. This includes previously deprecated functionality from v1.x.x. These breaking changes are noted in the console for the corresponding components.

The existing grid is still operational and has an [eslint plugin](https://github.com/vuetifyjs/eslint-plugin-vuetify) to help with migration. This plugin can also be used to help upgrade to the [**new grid**](https://vuetifyjs.com/components/grids).

### Bootstrap

Vuetify must now be instantiated and passed to the initial Vue instance. This is similar to how **vue-router** and **vuex** are bootstrapped.

#### Vue-CLI 3 Vuetify plugin install

```js
// v1.5
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
})

// src/main.js
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

```js
// v2.0
// src/plugins/vuetify.js

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});

// src/main.js
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

#### Full Install

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'

const opts = { ... }
Vue.use(Vuetify, opts)

new Vue(...).$mount('#app')
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const opts = { ... }
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(opts)
}).$mount('#app')
```

#### A-La-Carte Install - vuetify-loader

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/main.styl'

const opts = { ... }
Vue.use(Vuetify, opts)

new Vue(...).$mount('#app')
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const opts = { ... }
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(opts)
}).$mount('#app')
```

### Framework

The following components are now **lazy** by default. This means they will not render their content until they are explicitly activated. This drastically improves performance but may not be wanted depending upon your application's needs _(i.e. For SEO purposes)_. To return to the previous behavior, use the **eager** prop.

- `v-badge`
- `v-menu`
- `v-tooltip`
- `v-dialog`
- `v-bottom-sheet`

`vuetify/lib` is now compiled to **es6**. This means supporting IE requires [`transpileDependencies`](https://cli.vuejs.org/config/#transpiledependencies) or similar to be used, along with `@babel/polyfill`. Transpile dependencies are automatically added when using vue-cli-3. If you have an older version, you can simple add 'vuetify' to the list.

### Theme

Now supports dark/light theme variants. The _dark_ property has been moved into the theme property. Will dynamically change when toggling **$vuetify.theme.dark**. If only using one variant, you only need to define its colors.

```js
// v1.5

const opts = {
  dark: true,
  theme: {
    primary: '...',
    ...
  }
}
```

```js
// v2.0

const opts = {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '...',
        ...
      },
      dark: {
        primary: '...',
        ...
      }
    }
  }
}
```

In order to disable the theme style sheet creation, you must use the **disable** property of the theme object.

```js
// v1.5

const opts = {
  theme: false
}
```

```js
// v2.0
const opts = {
  theme: { disable: true }
}
```

### Icons

Icon and iconfont declaration is now scoped under the **icons** property.

```js
// v1.5

const opts = {
  iconfont: 'fa4',
  icons: { ... }
}
```

```js
// v2.0

const opts = {
  icons: {
    iconfont: 'fa4',
    values: { ... }
  }
}
```

- Now defaults to use [mdi](https://materialdesignicons.com/) icons. For information on how to install please navigate [here](https://vuetifyjs.com/features/icons#install-material-design-icons)
- Is now located under the **icons** property of the Vuetify options

If you want to use a custom iconfont, you must set it up in the initial Vuetify options now.

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'fa4'
})
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'fa4'
  }
})
```

### Goto - scrolling helper

Import location has changed. Must be explicitly bootstrapped with the Vuetify instance to use in **vue-router** scroll-behavior. Example of how to do this [here](https://github.com/vuetifyjs/vuetify/blob/next/packages/docs/src/vuetify/index.js#L33). Reference documentation for scroll-behavior usage [here](https://next.vuetifyjs.com/en/framework/scroll#using-with-router).

```js
// v1.5

import goTo from 'vuetify/es5/components/Vuetify/goTo'
```

```js
// v2.0

import goTo from 'vuetify/lib/services/goto'
```

### Lang

The _translator_ function **t** is now nested under the lang property.

```js
// v1.5

this.$vuetify.t(...)
```

```js
// v2.0

this.$vuetify.lang.t(...)
```

### Grid

The grid has been rebuilt modeled after bootstrap. The existing grid still works and needs some slight modifications. [Kael](https://github.com/KaelWD) has created an eslint plugin to help with this process.

- [eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) **to fix most of these for you**
- Spacing helpers have changed to represent the number of 4px intervals from 0-12 (0-48px)
- eg. px-7 is 7 * 4 = 28px
- 3 → 4
- 4 → 6
- 5 → 12
- Most "breakpointed" and "non-breakpointed" helpers have been normalized, eg. `.text-xs-center` is now `text-center` as it applies to all screen widths unless overridden
- Children of `.d-flex` no longer have extra flex rules applied. This can be done manually with `.flex-grow-1`
- Helper classes changed:
- `.fluid` → `.container--fluid`
- `.scroll-y` → `.overflow-y-auto`
- `.hide-overflow` → `.overflow-hidden`
- `.show-overflow` → `.overflow-visible`
- `.no-wrap` → `.text-no-wrap`
- `.ellipsis` → `.text-truncate`
- `.left` → `.float-left`
- `.right` → `.float-right`
- `<v-layout row>` should not be used as `.row` is now part of the new grid instead (#7956)

Use the following regex to update spacing classes:

```html
find: ([\s"][mp][axytblr])-5
replace: $1-12

find: ([\s"][mp][axytblr])-4
replace: $1-6

find: ([\s"][mp][axytblr])-3
replace: $1-4
```

For examples on how the v2 grid compares to v1.5, check out this [github gist](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32).

### Styles

The main framework styles are now imported automatically.

```js
// v1.5
// src/plugins/vuetify.js

import 'vuetify/src/styles/main.sass' // can be removed
```

Must install the **sass** package

```bash
yarn add sass -D
// OR
npm install sass -D
```

**Do not install _node-sass_**, it is not the correct library.

### Typography

The root font-size (per MD2 specification) is now _16px_.

- The following typography classes have been replaced:
- subheading → subtitle-1

### Event names

All event names has been changed from camelCase to kebab-case:

- `update:searchInput` → `update:search-input`
- `update:inputValue` → `update:input-value`
- `update:miniVariant` → `update:mini-variant`
- `update:pickerDate` → `update:picker-date`
- `update:selectingYear` → `update:selecting-year`
- `tableDate` → `update:table-date`
- `update:returnValue` → `update:return-value`

### Activators

- Components with activators, `v-tooltip`, `v-menu`, `v-dialog`, `v-list-group` and `v-bottom-sheet` must now be bound using the new [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) syntax
- Requires Vue@2.6
- We understand this is considerably more verbose than the v1.5 counterpart. We are still exploring ways to support the new **v-slot** in a more concise manner
- You can find more information on the official Vue documentation for [Destructuring Slot Props](https://vuejs.org/v2/guide/components-slots.html#Destructuring-Slot-Props)
- You can find more information on the official Vue documentation for [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots)
- The upside to this change is it is easier to support nested activators and provide proper a11y support

#### Regular activator

```html
<!-- v1.5 -->

<v-dialog>
  <v-btn slot="activator">...</v-btn>
</v-dialog>
```

```html
<!-- v2.0 -->

<v-dialog>
  <template v-slot:activator="{ on }">
    <v-btn v-on="on">...</v-btn>
  </template>
</v-dialog>
```

#### Nested activator

```html
<!-- v2.0 -->

<v-menu>
  <template v-slot:activator="{ on: menu }">
    <v-tooltip bottom>
      <template v-slot:activator="{ on: tooltip }">
        <v-btn
          color="primary"
          dark
          v-on="{ ...tooltip, ...menu }"
        >
          Dropdown w/ Tooltip
        </v-btn>
      </template>
      <span>Im A ToolTip</span>
    </v-tooltip>
  </template>
</v-menu>
```

### Unit tests

Testing with Vuetify is now similar to that of **vue-router** and **vuex**.

```js
// setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

```js
// Component.spec.js

import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from 'path/to/my/component'

const localVue = createLocalVue()

describe('Component.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify(...)
  })

  it('should...', () => {
    const wrapper = mount(Component, {
      localVue,
      vuetify
    })
  })
})
```

### Form Input Validation

All form inputs default to white when using the **dark** prop unless the application is _explicitly_ set to **dark** mode.

### Removed Component Properties

These are previous deprecations from earlier versions that have now been removed:

- `<v-text-field textarea>` will no longer render `<v-textarea>`
- `<v-select autocomplete>` will no longer render `<v-autocomplete>`
- `<v-select combobox>` will no longer render `<v-combobox>`
- `<v-select overflow>` will no longer render `<v-overflow-btn>`
- `<v-select segmented>` will no longer render `<v-overflow-btn segmented>`
- `<v-select editable>` will no longer render `<v-overflow-btn editable>`

### Individual Components

These are the changes required for existing components.

#### v-app

- Component classes have been prepended with **v-**. eg `.application` → `.v-application`
- The dark and light prop no longer have an effect on application theme variants

```html
<!-- v1.5 src/App.vue -->

<template>
  <v-app dark>
    ...
  </v-app>
</template>
```

```js
// v2.0 src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true }
})
```

#### v-alert

- Alerts are visible by default

```html
<!-- v1.5 -->

<template>
  <v-alert :value="true">
    ...
  </v-alert>
</template>
```

```html
<!-- v2.0 -->

<template>
  <v-alert>
    ...
  </v-alert>
</template>
```

#### v-bottom-nav

- Renamed from `v-bottom-nav` to `v-bottom-navigation`

#### v-bottom-navigation

- The **color** prop is now **background-color**
- The **color** prop now affects the active `<v-btn>` color

#### v-bottom-sheet-transition

- Component has been removed
**Developer notes:** _Was never explicitly listed in API_

#### v-btn

- The **flat** prop is now **text**
- The **round** prop is now **rounded**
- No longer has explicit margin

#### v-card-media

- Component has been removed

#### v-carousel

- The **cycle** prop is no longer implicit, must be defined in order to have screens switch

#### v-chip

- The **value** prop is now **active**
- **value** no longer controls visibility. **input** event emitted when clicking
- The **selected** prop is now **input-value** or **v-model**
- The **close** event is now **click:close**

#### v-data-iterator and v-data-table

Data table (and iterator) have been rewritten from the ground up to be both easier to use and to allow for more flexibility in more advanced use cases. This has resulted in a number of breaking changes. Some of these are shared between both components while some are unique to each.

#### Shared

- **disable-initial-sort** has been removed. Neither component initially sorts data anymore. Use **sort-by** (or **options**) prop to sort
- **filter** prop has been removed. Instead use **custom-filter**. This was done in an effort to make custom filtering less confusing
- The signature for **custom-filter** has changed from `(items: object[], search: string, filter: Filter): object[]` to `(value: any, search: string, item: any) => boolean`
- **pagination** prop has been removed. Instead use the separate props such as **page**, **sort-by**, etc. If you want to provide a single object you can use the new **options** prop instead. **NOTE**: The **options** prop has a different object structure than **pagination**. Check API docs for details
- **total-items** prop has been renamed to **server-items-length**
- **hide-actions** prop has been renamed to **hide-default-footer**. Also it no longer changes the visible items per page
- Props related to the default footer have been move to the **footer-props** prop. These are:
- **prev-icon**
- **next-icon**
- **rows-per-page-items** → **items-per-page-options**
- **rows-per-page-text** → **items-per-page-text**
- The **expand** prop has been removed

#### v-data-iterator

- The **content-tag**, **content-props**, **content-class** props have been removed. Instead simply use the default scoped slot to implement your intended markup.

#### v-data-table

- **items** slot has been renamed to **item**
- **headers** slot renamed to **header**
- **item** slot (and **header**) now require you to define a `<tr>` element. Previously this was optional
- **expand** slot renamed to **expanded-item**. It no longer includes an expansion transition, and the slot is inside the `<tr>` element so that you can define your own `<td>` columns. To get back to a similar look as in 1.5, you will need a `<td>` with *colspan* equal to the number of columns in your header
- **hide-header** has been renamed to **hide-default-header**
- **select-all** has been renamed to **show-select**. This will also render a checkbox on each item row as long as you are not defining a slot that overrides the internal row rendering (such as **item** or **body**)
- Props related to the default header have been moved to the **header-props** prop. These are:
- **sort-icon**

#### v-expansion-panel et a

- Many components have been renamed and props moved
- `v-expansion-panel` → `v-expansion-panels`
- `v-expansion-panel-content` → `v-expansion-panel`
- New components
- `v-expansion-panel-header`
- `v-expansion-panel-content`

```html
<!-- v1.5 -->

<v-expansion-panel>
  <v-expansion-panel-content
    v-for="(item,i) in 5"
    :key="i"
  >
    <template v-slot:header>Item</template>
    <v-card>
      ...
    </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>
```

```html
<!-- v2.0 -->

<v-expansion-panels>
  <v-expansion-panel
    v-for="(item,i) in 5"
    :key="i"
  >
    <v-expansion-panel-header>
      Item
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card>
        ...
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
```

#### v-footer

- Now has explicit padding to match other similar MD components. Can be removed with the **padless** prop or a helper class, `class="pa-0"`

#### v-jumbotron

- Component has been removed

#### v-list et a

- Many components have been renamed
- `v-list-tile` → `v-list-item`
- `v-list-tile-action` → `v-list-item-action`
- `v-list-tile-avatar` → `v-list-item-avatar`
- `v-list-tile-content` → `v-list-item-content`
- `v-list-tile-title` → `v-list-item-title`
- `v-list-tile-sub-title` → `v-list-item-subtitle`
- The **avatar** prop has been removed

#### v-list-group

- Can no longer use `v-list-item`s in the activator slot
- listeners are passed through to the internal `v-list-item` for activators
- use `v-list-item-content`/`v-list-item-title` etc instead

#### v-navigation-drawer

- Default width has been changed from 300px to 256px. You can adjust it using **width** prop.

#### v-select - v-autocomplete - v-combobox - v-overflow-btn

- Now passes **attributes** and **listeners** to **item** slot for proper a11y support (split from tile to match other implementations).

```html
<!-- v1.5 -->

<v-select>
  <template v-slot:item="{ item, tile }">
    <v-list-tile v-bind="tile">
       ...
    </v-list-tile>
  </template>
</v-select>
```

```html
<!-- v2.0 -->

<v-select>
  <template v-slot:item="{ item, attrs, on }">
    <v-list-item v-bind="attrs" v-on="on">
       ...
    </v-list-item>
  </template>
</v-select>
```

The item scoped slot value of `{ tile }` is now `{ attrs, on }`. is now bound similar to the `v-menu` activator slot.

#### v-select

- No longer has a default **autocomplete** of on

#### v-speed-dial

- Icons no longer have inferred swapping for activator through css
- The activator slot will provide a model in the future

```html
<!-- v1.5 -->

<v-speed-dial>
  <template v-slot:activator>
    <v-btn
      dark
      fab
    >
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
   </v-btn>
  </template>
</v-speed-dial>
```

```html
<!-- v2.0 -->

<v-speed-dial v-model="fab">
  <template v-slot:activator>
    <v-btn
      dark
      fab
    >
      <v-icon v-if="fab">account_circle</v-icon>
      <v-icon v-else>close</v-icon>
    </v-btn>
  </template>
</v-speed-dial>
```

#### v-tabs

- The **color** prop is now **background-color**. Color now affects the default text and slider color
- Various class names have been changed throughout
- **v-tab__div** removed, use **v-tab**
- **v-tab__item** → **v-tab**
- **v-tabs__slider** → **v-tabs-slider**
- **v-tabs__bar** → **v-tabs-bar**

#### v-tabs-items

- No longer implicitly inherits the `v-tabs` model when nested. Must have **:value** or **v-model** explicitly bound.

```html
<!-- v1.5 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items>
    ...
  </v-tabs-items>
</v-tabs>
```

```html
<!-- v2.0 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items v-model="tabs">
    ...
  </v-tabs-items>
</v-tabs>
```

_Developer notes: The tabs-items component does not have to be provided and is only necessary for custom implementations._

#### v-text-field

- The **mask** prop and functionality has been removed. Instead you can use 3rd party libraries such as `vue-the-mask`.

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox

- The **box** prop is now **filled**

```html
<!-- v1.5 -->

<v-text-field box></v-text-field>
```

```html
<!-- v2.0 -->

<v-text-field filled></v-text-field>
```

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox - v-btn - v-alert

- The **outline** prop is now **outlined**

```html
<!-- v1.5 -->

<v-btn outline></v-text-field>
<v-autocomplete outline></v-autocomplete>
<v-alert outline></v-alert>
```

```html
<!-- v2.0 -->

<v-btn outlined></v-text-field>
<v-autocomplete outlined></v-autocomplete>
<v-alert outlined></v-alert>
```

#### v-toolbar

- All existing scrolling techniques and `app` functionality has been deprecated and moved to `v-app-bar`

## I need help

If you are stuck and need help, don't fret! We have a very large and dedicated community that is able to provide help 24/7. Come to the [#release-migration](https://discord.gg/QHWSAbA) channel.

<backmatter />
