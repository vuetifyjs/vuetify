<h2 id="upgrade-guide">🛠 Upgrade Guide</h2>

Version 2 contains non backwards compatible breaking changes. This includes previously deprecated functionality from v1.x.x. These breaking changes are noted in the console for the corresponding components.

The existing grid is still operational and has an [eslint plugin](https://github.com/vuetifyjs/eslint-plugin-vuetify) to help with migration. This plugin can also be used to help upgrade to the **new grid**.

<details open>
<summary>Upgrade now!</summary>

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

#### A-La-Carte Install (vuetify-loader)
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
  * `v-badge`
  * `v-menu`
  * `v-tooltip`
  * `v-dialog`
  * `v-bottom-sheet`

`vuetify/lib` is now compiled to **es6**. This means supporting IE requires [`transpileDependencies`](https://cli.vuejs.org/config/#transpiledependencies) or similar to be used, along with `@babel/polyfill`

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

* Now defaults to use [mdi](https://materialdesignicons.com/) icons. For information on how to install please navigate [here](https://vuetifyjs.com/customization/icons#install-material-design-icons).
* Is now located under the **icons** property of the Vuetify options

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

### Goto (scrolling helper)
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
The grid has been rebuilt modeled after bootstrap. The existing grid still works and needs some slight modifications. [Kael](https://github.com/orgs/vuetifyjs/people/KaelWD) has created an eslint plugin to help with this process.
* [eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) **to fix most of these for you**
* Spacing helpers have changed to represent the number of 4px intervals from 0-12 (0-48px)
    * eg. px-7 is 7 * 4 = 28px
    * 3 → 4
    * 4 → 6
    * 5 → 12
* Most "breakpointed" and "non-breakpointed" helpers have been normalised, eg. `.text-xs-center` is now `text-center` as it applies to all screen widths unless overridden
* Children of `.d-flex` no longer have extra flex rules applied. This can be done manually with `.flex-grow-1`
* Helper classes changed:
  * `.fluid` → `.container--fluid`
  * `.scroll-y` → `.overflow-y-auto`
  * `.hide-overflow` → `.overflow-hidden`
  * `.show-overflow` → `.overflow-visible`
  * `.no-wrap` → `.text-no-wrap`
  * `.ellipsis` → `.text-truncate`
  * `.left` → `.float-left`
  * `.right` → `.float-right`
* `<v-layout row>` should not be used as `.row` is now part of the new grid instead (#7956)

Use the following regex to update spacing classes:
```
find: ([\s"][mp][axytblr])-5
replace: $1-12

find: ([\s"][mp][axytblr])-4
replace: $1-6

find: ([\s"][mp][axytblr])-3
replace: $1-4
```

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
* The following typography classes have been replaced:
  * subheading → subtitle-1

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
* Components with activators, `v-tooltip`, `v-menu`, `v-dialog`, `v-list-group` and `v-bottom-sheet` must now be bound using the new [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) syntax.
  * Requires Vue@2.6
* We understand this is considerably more verbose than the v1.5 counterpart. We are still exploring ways to support the new **v-slot** in a more concise manner.
  * You can find more information on the official Vue documentation for [Destructuring Slot Props](https://vuejs.org/v2/guide/components-slots.html#Destructuring-Slot-Props).
  * You can find more information on the official Vue documentation for [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots).
* The upside to this change is it is easier to support nested activators and provide proper a11y support

#### Regular activator
```vue
<!-- v1.5 -->

<v-dialog>
  <v-btn slot="activator">...</v-btn>
</v-dialog>
```

```vue
<!-- v2.0 -->

<v-dialog>
  <template v-slot:activator="{ on }"
    <v-btn v-on="on">...</v-btn>
  </template>
</v-dialog>
```

#### Nested activator
```vue
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

* `<v-text-field textarea>` will no longer render `<v-textarea>`
* `<v-select autocomplete>` will no longer render `<v-autocomplete>`
* `<v-select combobox>` will no longer render `<v-combobox>`
* `<v-select overflow>` will no longer render `<v-overflow-btn>`
* `<v-select segmented>` will no longer render `<v-overflow-btn segmented>`
* `<v-select editable>` will no longer render `<v-overflow-btn editable>`

### Individual Components
These are the changes required for existing components.

#### `v-app`
* Component classes have been prepended with **v-**. eg `.application` → `.v-application`
* The dark and light prop no longer have an effect on application theme variants

```vue
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

#### `v-alert`
* Alerts are visible by default

```vue
<!-- v1.5 -->

<template>
  <v-alert :value="true">
    ...
  </v-alert>
</template>
```

```vue
<!-- v2.0 -->

<template>
  <v-alert>
    ...
  </v-alert>
</template>
```

#### `v-carousel`
* The **cycle** prop is no longer implicit, must be defined in order to have screens switch

#### `v-btn`
* The **flat** prop is now **text**
* The **round** prop is now **rounded**
* No longer has explicit margin

#### `v-chip`
* **value** no longer controls visibility, use **active**
* **input** event emitted when clicking
* The **close** event is now **click:close**
* **@input** listener is now **@active.sync**

```vue
<!-- v1.5 -->

<v-chip :value="chip" @input="chip = $event">...</v-chip>
<v-chip v-model="chip">...</v-chip>
```

```vue
<!-- v2.0 -->

<v-chip :active="chip" @update:active="chip = $event">...</v-chip>
<v-chip :active.sync="active">...</v-chip>
```

#### `v-bottom-nav`
* Renamed from `v-bottom-nav` to `v-bottom-navigation`

#### `v-bottom-navigation`
* The **color** prop is now **background-color**
* The **color** prop now affects the active `<v-btn>` color

#### `v-bottom-sheet-transition`
* Component has been removed

_Developer notes: Was never explicitly listed in API_

#### `v-btn`
* The **flat** prop is now **text**
* The **round** prop is now **rounded**
* No longer has explicit margin

#### `v-card-media`
* Component has been removed

#### `v-carousel`
* The **cycle** prop is no longer implicit, must be defined in order to have screens switch

#### `v-chip`
* The **value** prop is now **active**
* **value** no longer controls visibility. **input** event emitted when clicking
* The **selected** prop is now **input-value** or **v-model**
* The **close** event is now **click:close**

#### `v-data-iterator` & `v-data-table`
Data table (and iterator) have been rewritten from the ground up to be both easier to use and to allow for more flexibilty in more advanced use cases. This has resulted in a number of breaking changes. Some of these are shared between both components while some are unique to each.

#### Shared
* **disable-initial-sort** has been removed. Neither component initially sorts data anymore. Use **sort-by** (or **options**) prop to sort.
* **filter** prop has been removed. Instead use **custom-filter**. This was done in an effort to make custom filtering less confusing.
* **pagination** prop has been removed. Instead use the separate props such as **page**, **sort-by**, etc. If you want to provide a single object you can use the new **options** prop instead. **NOTE**: The **options** prop has a different object structure than **pagination**. Check API docs for details.
* **total-items** prop has been renamed to **server-items-length**
* **hide-actions** prop has been renamed to **hide-default-footer**. Also it no longer changes the visible items per page
* Props related to the default footer have been move to the **footer-props** prop. These are:
  * **prev-icon**
  * **next-icon**
  * **rows-per-page-items** → **items-per-page-options**
  * **rows-per-page-text** → **items-per-page-text**
* The **expand** prop has been removed.

#### `v-data-iterator`
* The **content-tag**, **content-props**, **content-class** props have been removed. Instead simply use the default scoped slot to implement your intended markup.

#### `v-data-table`
* **items** slot has been renamed to **item**
* **headers** slot renamed to **header**
* **item** slot (and **header**) now require you to define a `<tr>` element. Previously this was optional.
* **expand** slot renamed to **expanded-item**. It no longer includes an expansion transition, and the slot is inside the `<tr>` element so that you can define your own `<td>` columns. To get back to a similar look as in 1.5, you will need a `<td>` with *colspan* equal to the number of columns in your header.
* **hide-header** has been renamed to **hide-default-header**
* **select-all** has been renamed to **show-select**. This will also render a checkbox on each item row as long as you are not defining a slot that overrides the internal row rendering (such as **item** or **body**).
* Props related to the default header have been moved to the **header-props** prop. These are:
  * **sort-icon**

#### `v-expansion-panel` et al
* Many components have been renamed and props moved
  * `v-expansion-panel` → `v-expansion-panels`
  * `v-expansion-panel-content` → `v-expansion-panel`
* New components
  * `v-expansion-panel-header`
  * `v-expansion-panel-content`

```vue
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

```vue
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

#### `v-footer`
* Now has explicit padding to match other similar MD components. Can be removed with the **padless** prop or a helper class, `class="pa-0"`

#### `v-jumbotron`
* Component has been removed

#### `v-list` et al
* Many components have been renamed
  * `v-list-tile` → `v-list-item`
  * `v-list-tile-action` → `v-list-item-action`
  * `v-list-tile-avatar` → `v-list-item-avatar`
  * `v-list-tile-content` → `v-list-item-content`
  * `v-list-tile-title` → `v-list-item-title`
  * `v-list-tile-sub-title` → `v-list-item-subtitle`
  * The **avatar** prop has been removed

#### `v-list-group`
* Can no longer use `v-list-item`s in the activator slot
  * listeners are passed through to the internal `v-list-item` for activators
  * use `v-list-item-content`/`v-list-item-title` etc instead

#### `v-navigation-drawer`
* Default width has been changed from 300px to 256px. You can adjust it using **width** prop.

#### `v-select`, `v-autocomplete`, `v-combobox`, `v-overflow-btn`
* Now passes **attributes** and **listeners** to **item** slot for proper a11y support (split from tile to match other implementations).

```vue
<!-- v1.5 -->

<v-select>
  <template v-slot:item="{ item, tile }">
    <v-list-tile v-bind="tile">
       ...
    </v-list-tile>
  </template>
</v-select>
```

```vue
<!-- v2.0 -->

<v-select>
  <template v-slot:item="{ item, attrs, on }">
    <v-list-item v-bind="attrs" v-on="on">
       ...
    </v-list-item>
  </template>
</v-select>
```

The item scoped slot value of `{ tile }` is now` { attrs, on }`. is now bound similar to the `v-menu` activator slot.

#### `v-select`
* No longer has a default **autocomplete** of on

#### `v-speed-dial`
* Icons no longer have inferred swapping for activator through css
* The activator slot will provide a model in the future

```vue
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

```vue
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

#### `v-tabs`
* The **color** prop is now **background-color**. Color now affects the default text and slider color
* Various class names have been changed throughout
  * **v-tab__div** removed, use **v-tab**
  * **v-tab__item** → **v-tab**
  * **v-tabs__slider** → **v-tabs-slider**
  * **v-tabs__bar** → **v-tabs-bar**

#### `v-tabs-items`
* No longer implicitly inherits the `v-tabs` model when nested. Must have **:value** or **v-model** explicitly bound.

```vue
<!-- v1.5 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items>
    ...
  </v-tabs-items>
</vtabs>
```

```vue
<!-- v2.0 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items v-model="tabs">
    ...
  </v-tabs-items>
</vtabs>
```

_Developer notes: The tabs-items component does not have to be provided and is only necessary for custom implementations._

#### `v-text-field`
* The **mask** prop and functionality has been removed. Instead you can use 3rd party libraries such as `vue-the-mask`.

#### `v-text-field`, `v-select`, `v-textarea`, `v-autocomplete`, `v-combobox`
* The **box** prop is now **filled**

```vue
<!-- v1.5 -->

<v-text-field box></v-text-field>
```

```vue
<!-- v2.0 -->

<v-text-field filled></v-text-field>
```
</details>

#### `v-text-field`, `v-select`, `v-textarea`, `v-autocomplete`, `v-combobox`, `v-btn`, `v-alert`
* The **outline** prop is now **outlined**

```vue
<!-- v1.5 -->

<v-btn outline></v-text-field>
<v-autocomplete outline></v-autocomplete>
<v-alert outline></v-alert>
```

```vue
<!-- v2.0 -->

<v-btn outlined></v-text-field>
<v-autocomplete outlined></v-autocomplete>
<v-alert outlined></v-alert>
```
</details>

<h2 id="release-notes">💯 Release notes</h2>

Below is a consolidated list of changes made in v2. Every component that has a MD2 specification has been updated to match (with the exception of the [known issues](#user-content-known-issues) below). Every component that has a MD1 specification (and not 2) has been re-verified and updated to ensure that it matches the previous spec.

<details open>

### New Components
New components are listed under the [**New Components & Features**](#user-content-new-components-and-features) section.

### Framework
* Rebuilt the entire core for better usability and maintainability
* Scoped all Vuetify global styles to `.v-application`
* Added theme support for default anchor colors
* All components are now lazy by default meaning they will not render their content unless activated. This can be overriden with the **eager** prop
* Converted all components and functionality from javascript to typescript
* Converted all components and functionality from stylus to sass
* Converted all unit tests from avoriaz to vue-test-utils
* Added support for **dark** and **light** theme color palettes
* **Issues closed:**
  * [#6020](https://github.com/vuetifyjs/vuetify/issues/6020)

### Grid & Helper classes
* Rebuilt using the bootstrap-style grid system
* Added negative margin helper classes: `.pr-n4` applies `margin-right: -16px`
* Added more responsive helper classes: `.pa-md-6`, `.justify-lg-center`, `.order-sm-first`, `.float-lg-right` etc
* Made using flex helper classes easier: `.flex-grow-1` and `.flex-shrink-0` instead of `.grow`/`.shrink`
* Added new rtl/ltr start/end spacing and alignment helper classes: `.ps-md-6`, '.me-1' (`s` stands for `start`, `e` stands for `end`), `.text-start` etc
* Helper classes are now scoped with `.v-application` - it means that they won't interfere with similarly named classes from other frameworks if they are used outside of the Vuetify application
* **Issues closed:**
  * [#1434](https://github.com/vuetifyjs/vuetify/issues/1434)
  * [#4660](https://github.com/vuetifyjs/vuetify/issues/4660)
  * [#5168](https://github.com/vuetifyjs/vuetify/issues/5168)
  * [#5272](https://github.com/vuetifyjs/vuetify/issues/5272)
  * [#6020](https://github.com/vuetifyjs/vuetify/issues/6020)
  * [#7733](https://github.com/vuetifyjs/vuetify/issues/7733)

### Typography
* Added new helper classes
  * `.subtitle-1`
  * `.subtitle-2`
  * `.overline`

### Vetur Support
* Releases of Vuetify now include auto-generated files for tags and attributes to allow for accurate Vetur auto-completion.

### Alerts
* Added a11y support
* Added new properties
  * **border** - Apples a border to the designated direction, **top**, **right**, **bottom** and **left**
  * **colored-border** - Applies the current **color** to the alert's border
  * **prominent** - Increases the height and icon size
  * **text** - Applies the defined color to text and a low opacity background of the same

### Badges
* Added support for having more than 1 character
* **Issues closed:**
  * [#4934](https://github.com/vuetifyjs/vuetify/issues/4934)

### BottomNavigation
  * Added new properties
    * **horizontal** - Positions icons to the right of text as opposed to stacked vertically

### BottomNavigation
  * Added new properties
    * **tile** - Removes the border radius

### Breadcrumbs
* Added a11y support

### Calendars
* Improved event interaction
* Fixed next/prev with irregular weekdays
* Will now throw an error when no days are available
* Renamed all scoped slots to use kebab-case
* **Issues closed:**
  * [#6264](https://github.com/vuetifyjs/vuetify/issues/6264)
  * [#6307](https://github.com/vuetifyjs/vuetify/issues/6307)
  * [#6704](https://github.com/vuetifyjs/vuetify/issues/6704)
  * [#7155](https://github.com/vuetifyjs/vuetify/issues/7155)

### Cards
  * Added new properties
    * **link** - Explicitly applies link styling (href/to), can now be focused
    * **loading** - Can now be put into a loading state (similar to buttons)
    * **outlined** - Removes elevation and adds a thin border around the card
    * **tile** - Removes the border radius

### Carousels
* Added new properties
  * **vertical-delimiters** - Changes delimiters from horizontal to vertical
  * **progress** - Displays current slide progress compared to total

### Checkboxes
* Normalized indeterminate behavior with native checkbox input

### Chips
* Can now be used as a `router-link`
* Added new properties
  * **filter** - Displays a selection icon when selected
  * **filter-icon** - Changes default icon used with the **filter** property
  * **link** - Explicitly applies link styling (href/to)
  * **pill** - Fits `v-avatar` flush along edges
  * **tag** - Can now define a custom html tag

### Comboboxes
* Resovled an issue where **auto-select-first** was not working properly
* **Issues closed:**
  * [#6607](https://github.com/vuetifyjs/vuetify/issues/6607)

### Data Tables
* Will now properly apply a background-color on Safari
* Removed opacity on sort arrows for better contrast ratio
* Made custom filter function more user friendly
* **Issues closed:**
  * [#6766](https://github.com/vuetifyjs/vuetify/issues/6766)

### Date Pickers
* Added language support for selected items translation
* **Issues closed:**
  * [#7070](https://github.com/vuetifyjs/vuetify/issues/7070)

### Dividers
* Added a11y support

### Dialogs
* Added a11y support
* Will now emit an event when the user clicks outside of the dialog, _click:outside_
* Will now properly size card title, text and actions when using the **scrollable** property
* **Issues closed:**
  * [#6754](https://github.com/vuetifyjs/vuetify/issues/6754)

### Expansion Panels
* Refactored to properly match MD1 specification
* **Issues closed:**
  * [#6290](https://github.com/vuetifyjs/vuetify/issues/6290)
  * [#6663](https://github.com/vuetifyjs/vuetify/issues/6663)

### Form Inputs
* Improved a11y
* Fixed validation state colors for all inputs
* **Issues closed:**
  * [#6178](https://github.com/vuetifyjs/vuetify/issues/6178)

### Icons
* Changed the default iconfont from Google Material Icons to [Material Design Icons](https://materialdesignicons.com/)
* Added svg path support
* Turned off browser translation
* Added new properties
  * **tag** - Can now define a custom html tag
* **Issues closed:**
  * [#6899](https://github.com/vuetifyjs/vuetify/issues/6899)
  * [#7689](https://github.com/vuetifyjs/vuetify/issues/7689)

### Images
* Now uses inherited width from provided image
* **Issues closed:**
  * [#5757](https://github.com/vuetifyjs/vuetify/issues/5757)

### Inputs
* Will now properly apply provided attributes to the input element
* **VInput:** attrs should be applied on input not root element ([#7579](https://github.com/vuetifyjs/vuetify/issues/7579)) ([318553a](https://github.com/vuetifyjs/vuetify/commit/318553a)), closes
* **Issues closed:**
  * [#5412](https://github.com/vuetifyjs/vuetify/issues/5412)

### Lists
* Added a11y support to all list based components
* `v-list`
  * Added new properties
    * **flat** - Removes elevation
    * **nav** - An alternative styling that reduces `v-list-item` width and rounds the corners
    * **rounded** - Adds a large border radius
    * **shaped** - Adds a large border radius on the top left/right of the item
* `v-list-group`
* Will now propagate a click event when the activator is clicked
* `v-list-item-title`
  * Will no longer cut off badges
* **Closed issues:**
  * [#7117](https://github.com/vuetifyjs/vuetify/issues/7117)

### Menus
* Added a11y support

### Navigation Drawers
* Improved a11y support
* Added new properties
  * **expand-on-hover** - Applies the **mini** state that expands on hover
  * **src** - Can now apply a background

### Parallaxes
* Will now show the image provided image cannot translate (not big enough)
* **Issues closed:**
  * [#7010](https://github.com/vuetifyjs/vuetify/issues/7010)

### Progress Linear
  * Added new properties
    * **rounded** - Adds a large border radius
    * **stream** - Adds a new style to indicate loading
    * **striped** - Adds a striped style

### Ratings
* Icons will no longer wrap
* **Issues closed:**
  * [#6481](https://github.com/vuetifyjs/vuetify/issues/6481)

### Selects
* Added a11y support
* **VSelect:** resolve bug in safari/ie11 with event order disparity ([5fa6a68](https://github.com/vuetifyjs/vuetify/commit/5fa6a68)), closes
* **VSelect:** tab selection ([4963f72](https://github.com/vuetifyjs/vuetify/commit/4963f72)), closes [#5614](https://github.com/vuetifyjs/vuetify/issues/5614) [#7544](https://github.com/vuetifyjs/vuetify/issues/7544)
* **VSelect:** set input type to hidden to fix potential layout issues ([#7544](https://github.com/vuetifyjs/vuetify/issues/7544)) ([bd35bee](https://github.com/vuetifyjs/vuetify/commit/bd35bee)), closes
* **Issues closed:**
  * [#5614](https://github.com/vuetifyjs/vuetify/issues/5614)
  * [#5913](https://github.com/vuetifyjs/vuetify/issues/5913)
  * [#6608](https://github.com/vuetifyjs/vuetify/issues/6608)

_Developer notes: `v-autocomplete`, `v-combobox` and `v-overflow-btn` all benefit from a11y updates_

### Sheets
* Added new properties
  * **tile** - Removes the border radius

### Sliders
* Added new properties
  * **vertical** - Positions the slider vertically

### Sparklines
* Will now properly show custom labels when using the **bars** property
* **Issues closed:**
  * [#7584](https://github.com/vuetifyjs/vuetify/issues/7584)

### Tabs
* Improved a11y
* Improved touch support, allowing other touch based components that require swiping to properly work inside tabs items now
* **Issues closed:**
  * [#3617](https://github.com/vuetifyjs/vuetify/issues/3617)
  * [#3631](https://github.com/vuetifyjs/vuetify/issues/3631)
  * [#3633](https://github.com/vuetifyjs/vuetify/issues/3633)
  * [#3971](https://github.com/vuetifyjs/vuetify/issues/3971)
  * [#4204](https://github.com/vuetifyjs/vuetify/issues/4204)
  * [#4420](https://github.com/vuetifyjs/vuetify/issues/4420)
  * [#4735](https://github.com/vuetifyjs/vuetify/issues/4735)
  * [#5398](https://github.com/vuetifyjs/vuetify/issues/5398)
  * [#5515](https://github.com/vuetifyjs/vuetify/issues/5515)
  * [#5762](https://github.com/vuetifyjs/vuetify/issues/5762)
  * [#6014](https://github.com/vuetifyjs/vuetify/issues/6014)
  * [#6278](https://github.com/vuetifyjs/vuetify/issues/6278)
  * [#6462](https://github.com/vuetifyjs/vuetify/issues/6462)
  * [#6505](https://github.com/vuetifyjs/vuetify/issues/6505)
  * [#6527](https://github.com/vuetifyjs/vuetify/issues/6527)
  * [#6575](https://github.com/vuetifyjs/vuetify/issues/6575)
  * [#6801](https://github.com/vuetifyjs/vuetify/issues/6801)

### Text Fields
* Improve multiple style prop combination styles
* Added new properties
  * **filled** - Replaces old **box** property
  * **rounded** - Adds a large border radius
  * **shaped** - Adds a large border radius on the top left/right of the item
* Removed the autocomplete prop, will now propagate to the inner input
* Prefix and suffix will no longer wrap under certain circumstances
* Will now check the existance of the input when refocusing after clearing
* Updated  **outlined** style to match MD2 spec
* **Issues closed:**
  * [#6922](https://github.com/vuetifyjs/vuetify/issues/6922)
  * [#7059](https://github.com/vuetifyjs/vuetify/issues/7059)
  * [#7711](https://github.com/vuetifyjs/vuetify/issues/7711)

_Developer notes: `v-select`, `v-textarea`, `v-file-input`, `v-autocomplete` and `v-combobox` all benefit from the updated style properties_

### Textareas
* Will now properly recalculate component height when model is updated
* **Issues closed:**
  * [#4683](https://github.com/vuetifyjs/vuetify/issues/4683)
  * [#6978](https://github.com/vuetifyjs/vuetify/issues/6978)

### Timelines
* Will no longer add carets to children cards
* Added new properties
  * **reverse** - Reverses left/right positioning
* **Issues closed:**
  * [#5437](https://github.com/vuetifyjs/vuetify/issues/5437)

### TimePickers
* 0 hour/minute will now properly not work when disabled

### Toolbars
* Improved a11y

### Treeviews
* Will no longer emit model events on mounted
* Added new properties
  * **color** - Designate a custom color for active nodes
  * **dense** - Reduces the height of nodes
  * **item-disabled** - Specifies a unique key for a disabled item
  * **rounded** - Adds a large border radius
  * **selection-type** - Controls how the `v-treeview` selects nodes. There are two modes available: **leaf** and **independent**
  * **shaped** - Adds a large border radius on the top left/right of the item
* **Issues closed:**
  * [#6903](https://github.com/vuetifyjs/vuetify/issues/6903)
  * [#7296](https://github.com/vuetifyjs/vuetify/issues/7296)
  * [#7475](https://github.com/vuetifyjs/vuetify/issues/7475)
  * [#7613](https://github.com/vuetifyjs/vuetify/issues/7613)
  * [#7614](https://github.com/vuetifyjs/vuetify/issues/7614)

### Windows
* Will now select the first non-disabled `v-window-item` when using touch swipe
* Removed transition jumping when resolving content (not scroll related)
* **Issues closed:**
  * [#5000](https://github.com/vuetifyjs/vuetify/issues/5000)
  * [#6206](https://github.com/vuetifyjs/vuetify/issues/6206)
</details>

### Individual Releases
Below are the changes from **beta.9** to release:

<details open>

### 🔧 Bug Fixes

* **style:** bring back .v-application scope to utility classes ([#7921](https://github.com/vuetifyjs/vuetify/issues/7921)) ([bf15ab7](https://github.com/vuetifyjs/vuetify/commit/bf15ab7))
* **utilities:** allow multi-dimensional values ([9ac0d11](https://github.com/vuetifyjs/vuetify/commit/9ac0d11))
* **VContainer:** propagate id ([4d575f8](https://github.com/vuetifyjs/vuetify/commit/4d575f8)), closes [#7919](https://github.com/vuetifyjs/vuetify/issues/7919)
* **VData:** typo in ts interface name ([e4e01e9](https://github.com/vuetifyjs/vuetify/commit/e4e01e9))
* **VDataTable:** make custom filter function more user friendly ([#7885](https://github.com/vuetifyjs/vuetify/issues/7885)) ([132ac8e](https://github.com/vuetifyjs/vuetify/commit/132ac8e))
* **VIcon:** add missing x-small prop functionality ([9b77c73](https://github.com/vuetifyjs/vuetify/commit/9b77c73)), closes [#7873](https://github.com/vuetifyjs/vuetify/issues/7873)
* **VList:** disabled pointer events for disabled item ([71771da](https://github.com/vuetifyjs/vuetify/commit/71771da))
* **VSelect:** add selection padding for outlined style ([9566d4d](https://github.com/vuetifyjs/vuetify/commit/9566d4d))
* **VSnackbar:** update to better match md2 spec ([9f12df7](https://github.com/vuetifyjs/vuetify/commit/9f12df7)), closes [#7772](https://github.com/vuetifyjs/vuetify/issues/7772)
* **VTextField:** properly align suffix in filled variant ([126f891](https://github.com/vuetifyjs/vuetify/commit/126f891)), closes [#7871](https://github.com/vuetifyjs/vuetify/issues/7871)
* hyphenate remaining event names ([#7917](https://github.com/vuetifyjs/vuetify/issues/7917)) ([6fac25d](https://github.com/vuetifyjs/vuetify/commit/6fac25d))

### 🔁 Code Refactoring

* **VDataTable:** disable virtual-rows ([8284ef5](https://github.com/vuetifyjs/vuetify/commit/8284ef5))

### 🚀 Features

* **styles:** float classes breakpointed ([#7922](https://github.com/vuetifyjs/vuetify/issues/7922)) ([26ad2e5](https://github.com/vuetifyjs/vuetify/commit/26ad2e5)), closes [#7921](https://github.com/vuetifyjs/vuetify/issues/7921)
* **VBtn:** inherit justify-items from root ([c028904](https://github.com/vuetifyjs/vuetify/commit/c028904)), closes [#7896](https://github.com/vuetifyjs/vuetify/issues/7896)
* **VDataTable:** change data-table scoped slot props structure ([#7585](https://github.com/vuetifyjs/vuetify/issues/7585)) ([878be3e](https://github.com/vuetifyjs/vuetify/commit/878be3e))
* **VDialog:** add retainFocus prop ([3681cd5](https://github.com/vuetifyjs/vuetify/commit/3681cd5)), closes [#6892](https://github.com/vuetifyjs/vuetify/issues/6892)

### ◀ Reverts

* docs(Validatable): fix a typo ([#7851](https://github.com/vuetifyjs/vuetify/issues/7851)) ([c70c078](https://github.com/vuetifyjs/vuetify/commit/c70c078))
* fix(VDialog): focus the first child when tab leaves the dialog ([513cb56](https://github.com/vuetifyjs/vuetify/commit/513cb56)), closes [#6892](https://github.com/vuetifyjs/vuetify/issues/6892)

### ⚠ BREAKING CHANGES

* **VDataTable:** the virtual-rows prop (from alpha/beta) will no longer work
</details>

<hr>

For the previous alpha/betas, check out the below releases:

<details open>
<summary>Releases</summary>

- [v2.0.0-beta.9](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.9)
- [v2.0.0-beta.8](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.8)
- [v2.0.0-beta.7](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.7)
- [v2.0.0-beta.6](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.6)
- [v2.0.0-beta.5](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.5)
- [v2.0.0-beta.4](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.4)
- [v2.0.0-beta.3](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.3)
- [v2.0.0-beta.2](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.2)
- [v2.0.0-beta.1](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.1)
- [v2.0.0-beta.0](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-beta.0)
- [v2.0.0-alpha.20](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.20)
- [v2.0.0-alpha.19](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.19)
- [v2.0.0-alpha.18](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.18)
- [v2.0.0-alpha.17](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.17)
- [v2.0.0-alpha.16](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.16)
- [v2.0.0-alpha.15](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.15)
- [v2.0.0-alpha.14](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.14)
- [v2.0.0-alpha.13](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.13)
- [v2.0.0-alpha.12](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.12)
- [v2.0.0-alpha.11](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.11)
- [v2.0.0-alpha.10](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.10)
- [v2.0.0-alpha.9](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.9)
- [v2.0.0-alpha.8](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.8)
- [v2.0.0-alpha.7](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.7)
- [v2.0.0-alpha.6](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.6)
- [v2.0.0-alpha.5](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.5)
- [v2.0.0-alpha.4](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.4)
- [v2.0.0-alpha.3](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.3)
- [v2.0.0-alpha.2](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.2)
- [v2.0.0-alpha.1](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.1)
- [v2.0.0-alpha.0](https://github.com/vuetifyjs/vuetify/releases/v2.0.0-alpha.0)
</details>


### 🌐 New Locales
* Hebrew
* Korean
* Latvian
* Norwegian

<h2 id="known-issues">😱 Known Issues</h2>
Here is a list of known issues that were not able to be resolved before the official release. There is no need to create an issue, these are explicitly tracked and will be resolved in an upcoming patch.

* The upgraded grid does not have documentation
  * Can view on API Explorer
* Some components are missing slot descriptions
* Some components are missing a playground
* Some types are missing [follow this PR](https://github.com/vuetifyjs/vuetify/pull/7878)
* `v-data-table`
  * Missing virtualized rows
* `<v-btn fab>`
  * Missing extended variant
* `v-speed-dial`
  * Missing proper positioning for attaching to cards, toolbars etc
  * Missing icon change animation

<h2 id="i-need-help">🆘 I need help!</h2>

If you are stuck and need help, don't fret! We have a very large and dedicated community that is able to provide help 24/7. Come to the [#release-migration](https://discord.gg/QHWSAbA) channel.
