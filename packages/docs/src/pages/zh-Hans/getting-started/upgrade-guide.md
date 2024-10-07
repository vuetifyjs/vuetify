---
meta:
  title: 升级指南
  description: 让您的Vuetify保持最新的错误修复、功能和功能。
  keywords: 迁移, 升级指南, 升级 vuetify
related:
  - /introduction/long-term-support/
  - /getting-started/contributing/
  - /introduction/roadmap/
---

# 升级指南

## 从 v1.5.x 升级到 v2.0.x

V2.0.x 包含不兼容的突破性更改。 这包括以前 v1.x.x  已废弃的功能。 对于相应的组件，控制台中会提示这些突破性的更改。

现有的网格仍在运行，并且有一个 [extlint插件](https://github.com/vuetifyjs/eslint-plugin-vuetify) 来帮助迁移。 This plugin can also be used to help upgrade to the [**new grid**](/components/grids).

### 启动

Vuetify 现在必须实例化并传递到初始Vue 实例。 这类似于 **vue-router** 和 **vuex** 的启动方式。

#### Vue-CLI 3 Vuetify 插件安装

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

<promoted-ad slug="vuetify-open-collective" />

#### 完整安装

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

#### A-La-Carte 安装 - vuetify-loader

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

### 框架

下面的组件默认是 **延迟** 的。 这意味着他们在被明确激活之前不会渲染其内容。 这大大提高了性能，但根据应用程序的需要，可能不需要这样做_(例如 用于SEO目的)_. 若要返回以前的行为，请使用 **eager** prop。

- `v-badge`
- `v-menu`
- `v-tooltip`
- `v-dialog`
- `v-bottom-sheet`

`vuetify/lib` 现在编译为**es6**. 这意味着支持IE 需要 [`transpileDependencies`](https://cli.vuejs.org/config/#transpiledependencies) 或类似的用法，同时使用 `@babel/polyfill` 使用 vue-cli-3 时会自动添加编译依赖项。 如果你有一个旧版本，你可以简单地将“vuetify”添加到列表中。

### 主题

现在支持dark/light主题变量。 _dark_ 属性已被移动到主题属性。 在切换 **$vuetify.theme.dark** 时将动态变化。 如果只使用一个变量，你只需要定义它的颜色。

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

要禁用主题样式表创建，您必须使用主题对象的 **disable** 属性。

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

### 图标 (Icons)

图标和字体图标声明的作用域现在在 **icons** 属性下。

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

- 现在默认使用 [mdi](https://materialdesignicons.com/) 图标。 For information on how to install please navigate [here](/features/icon-fonts#install-material-design-icons)
- 现在位于Vuetify 选项的 **icons** 属性

如果您想要使用自定义字体图标，您必须在 Vuetify 的初始化选项中设置它。

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

### Goto - 滚动辅助

导入位置已更改。 必须使用Vuetify实例显式引导以用于**vue-router**滚动行为。 Example of how to do this [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/docs/src/router/scroll-behavior.js). Reference documentation for scroll-behavior usage [here](/features/scrolling/#use-with-router).

```js
// v1.5

import goTo from 'vuetify/es5/components/Vuetify/goTo'
```

```js
// v2.0

import goTo from 'vuetify/lib/services/goto'
```

<promoted-ad type="theme" />

### 语言

_translator_ 函数 **t** 现在嵌套在lang属性下。

```js
// v1.5

this.$vuetify.t(...)
```

```js
// v2.0

this.$vuetify.lang.t(...)
```

### 网格

网格是在系统引导之后重建的。 现有的网格工程仍然需要一些轻微的修改。 [Kael](https://github.com/KaelWD) 创建了一个 eslint 插件来帮助此进程。

- [eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) **为您修复大部分需要的调整**
- 空格辅助已经改变为表示从0-12(0-48px) 的以4px为间距的数字
- 例如 px-7 是 7 * 4 = 28px
- 3 → 4
- 4 → 6
- 5 → 12
- 大多数“断点”和“非断点”助手都已规范化，例如。 `.text-xs-centre` 现在是 `.text-center` ，因为它适用于所有屏幕宽度，除非被覆盖.
- `.d-flex` 的子节点不再应用额外的弹性规则. 这(弹性规则)可以通过 `.flex-grow-1` 手动完成。
- 辅助类已更改：
- `.fluid` → `.container--fluid`
- `.scroll-y` → `.overflow-y-auto`
- `.hide-overflow` → `.overflow-hidden`
- `.show-overflow` → `.overflow-visible`
- `.no-wrap` → `.text-no-wrap`
- `.ellipsis` → `.text-truncate`
- `.left` → `.float-left`
- `.right` → `.float-right`
- 不应该再使用`<v-layout row>`,  应该使用 `.row` 并且它现在是新栅格系统的一部分 (#7956)

使用以下正则表达式来更新间隔类：

```html
find: ([\s"][mp][axytblr])-5
replace: $1-12

find: ([\s"][mp][axytblr])-4
replace: $1-6

find: ([\s"][mp][axytblr])-3
replace: $1-4
```

关于v2栅格与v1.5栅格对比的示例，请查看 [github gist](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32)。

### 样式

主框架样式现在自动导入。

```js
// v1.5
// src/plugins/vuetify.js

import 'vuetify/src/styles/main.sass' // 可以移除
```

必须安装 **sass** 包

```bash
yarn add sass -D
// 或
npm install sass -D
```

**不要安装 _node-sass_**, 它不是正确的库。

### 排版

根字体大小 (MD2 规格) 现在是 _16px_。

- 以下排版类已被替换：
- subheading → subtitle-1

### 事件名称

所有事件名称已从camelCase更改为kebab case：

- `update:searchInput` → `update:search-input`
- `update:inputValue` → `update:input-value`
- `update:miniVariant` → `update:mini-variant`
- `update:pickerDate` → `update:picker-date`
- `update:selectingYear` → `update:selecting-year`
- `tableDate` → `update:table-date`
- `update:returnValue` → `update:return-value`

### 激活器

- 具有激活器的组件, `v-tooltip`, `v-menu`, `v-dialog`, `v-list-group` 和 `v-bottom-sheet` 现在必须使用新的 [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) 插槽语法绑定(激活器)
- 要求 Vue@2.6
- 我们知道这比v1.5版本要复杂得多。 我们仍在探索如何以更简洁的方式支持新的 **v-slot** 插槽
- 您可以在Vue官方文档中找到关于 [解构插槽Props](https://vuejs.org/v2/guide/components-slots.html#Destructuring-Slot-Props) 的更多信息
- 您可以在Vue官方文档中找到关于 [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) 的更多信息
- 此更改好的方面是更容易支持嵌套激活器和提供适当的 a11y 支持

#### 常规激活器

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

#### 嵌套激活器

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
          下拉列表 w/ 提示
        </v-btn>
      </template>
      <span>我是一个提示</span>
    </v-tooltip>
  </template>
</v-menu>
```

### 单元测试

Vuetify测试现在类似于 **vue-router** 和 **vuex**。

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

### 表单输入验证

使用**dark**属性时，所有表单输入默认为白色，除非应用程序_显式_设置为**dark**模式

### 移除组件属性

以下是早期版本中不推荐使用的属性，现在已被删除：

- `<v-text-field textarea>` 将不再渲染 `<v-textarea>`
- `<v-select autocomplete>` 将不再渲染 `<v-autocomplete>`
- `<v-select combobox>` 将不再渲染 `<v-combobox>`
- `<v-select overflow>` 将不再渲染 `<v-overflow-btn>`
- `<v-select segmented>` 将不再渲染 `<v-overflow-btn segmented>`
- `<v-select editable>` 将不再渲染 `<v-overflow-btn editable>`

### 单个组件

这些是现有组件所需的更改。

#### v-app

- 组件类已经预先以 **v-** 添加.  例如 `.application` → `.v-application`
- dark和light prop不再对应用程序主题变量产生影响

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

- 提示默认可见

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

- 从 `v-bottom-nav` 重命名为 `v-bottom-navigation`

#### v-bottom-navigation

- **color** prop 现在变更为 **background-color**
- **color** prop 现在影响激活的 `<v-btn>` 颜色

#### v-bottom-sheet-transition

- 组件已被移除 **开发者的笔记：** _从未在API中明确列出_

#### v-btn

- **flat** prop 现在变更为 **text**
- **round** prop 现在变更为 **rounded**
- 不再有明确的边距

#### v-card-media

- 组件已被移除

#### v-carousel

- **cycle** prop 不再是隐式的, 必须定义才能启动屏幕切换

#### v-chip

- **value** prop 现在变更为 **active**
- **value** 不再控制可见性。 **input** 事件在点击时触发
- **selected** prop 现在变更为  **input-value** 或 **v-model**
- **close** 事件现在变更为 **click:close**

#### v-data-iterator 和 v-data-table

数据表（和迭代器）已经从头开始重写，这样既更易于使用，又允许在更高级的用例中具有更大的灵活性。 这导致了一些突破性的变化。 其中一些(变化) 是在两个组件之间共有的，而有些 (变化) 则是每个组件所独有的。

#### 共用的变化

- **disable-initial-sort** 已被移除. 这两个组件初始化时都不再对数据进行排序。 使用 **sort-by** (或 **options**) prop 进行排序
- **filter** prop 已被移除. 使用 **custom-filter** 代替. 这样做是为了减少自定义筛选的混淆.
- **custom-filter** 的签名从 `(items: object[], search: string, filter: Filter): object[]` 改变为 `(value: any, search: string, item: any) => boolean`.
- **pagination** prop 已被移除. 使用单独的 **page**, **sort-by** 等props代替. 如果你想要提供单个对象，你可以使用新的 ** options ** prop 代替。 **注意**:  **options** 与 **pagination** 是不同的结构. 查看API文档了解详细信息
- **total-items** prop 已重命名为 **server-items-length**
- **hide-actions** prop 已重命名为 **hide-default-footer**. 它也不再改变每页的可见项
- 与默认页脚相关的Props已经移动到 **footer-props** prop。 它们是:
- **prev-icon**
- **next-icon**
- **rows-per-page-items** → **items-per-page-options**
- **rows-per-page-text** → **items-per-page-text**
- **filter** prop 已被移除

#### v-data-iterator

- **content-tag**, **content-props**, **content-class** props 已被移除. 相反，只需使用默认的作用域插槽来实现预期的标记。

#### v-data-table

- **items** slot 已重命名为 **item**
- **headers** slot 已重命名为 **header**
- **item** slot (和 **header**) 现在需要您定义一个 `<tr>` 元素. 此前是可选的
- **expand** slot 已重命名为 **expanded-item**. 它不再包含一个扩展过渡, 并且插槽在 `<tr>` 元素内, 以便您可以定义自己的 `<td>` 列. 要恢复到类似1.5中的外观，您需要一个 `<td>`，其中 *colspan* 等于标题中的列数
- **hide-header** 已重命名为 **hide-default-header**
- **select-all** 已重命名为 **show-select**. 只要您没有定义覆盖内部行的渲染插槽（例如<strong x-id=“1”>item</strong>或<strong x-id=“1”> body </strong>)，这也将在每个行上呈现一个复选框
- 与默认标题相关的Props已被移动到 **header-props** prop。 它们是:
- **sort-icon**

#### v-expansion-panel et a

- 许多组件已重命名并移动props
- `v-expansion-panel` → `v-expansion-panels`
- `v-expansion-panel-content` → `v-expansion-panel`
- 新组件
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

- 现在有显式的填充来匹配其他类似的MD组件。 可以使用**padless** prop 或辅助类 `class="pa-0"` 移除.

#### v-jumbotron

- 组件已被移除

#### v-list et a

- 许多组件已被重命名
- `v-list-tile` → `v-list-item`
- `v-list-tile-action` → `v-list-item-action`
- `v-list-tile-avatar` → `v-list-item-avatar`
- `v-list-tile-content` → `v-list-item-content`
- `v-list-tile-title` → `v-list-item-title`
- `v-list-tile-sub-title` → `v-list-item-subtitle`
- **avatar** prop 已被移除

#### v-list-group

- 再也不能在激活器插槽中使用 `v-list-item`.
- 激活器的侦听器传递到内部的 `v-list-item` .
- 使用 `v-list-item-content`/`v-list-item-title` 等代替

#### v-navigation-drawer

- 默认宽度已从 300px 更改为 256px。 您可以使用 **width** prop 来调整它。

#### v-select - v-autocomplete - v-combobox - v-overflow-btn

- 现在将 ** attributes ** 和 ** listeners ** 传递到 ** item ** 插槽以获得适当的 a11y 支持 (从平铺分割以匹配其他实现)。

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

`{ tile }` 的作用域插槽值 现在是 `{ attrs, on }`. 现在绑定了类似于 `v-menu` 的激活器插槽.

#### v-select

- 不再有默认启用的 **autocomplete**

#### v-speed-dial

- 图标交换不再通过css进行激活。
- 激活器槽将在将来提供一个model.

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

- **color** prop 已变更为 **background-color**. 颜色现在影响默认文本和滑块颜色
- 各种类名在整个过程中都被改变了
- **v-tab__div** 已被移除, 使用 **v-tab** 代替
- **v-tab__item** → **v-tab**
- **v-tabs__slider** → **v-tabs-slider**
- **v-tabs__bar** → **v-tabs-bar**

#### v-tabs-items

- 嵌套时不再隐性继承 `v-tabs` 模型。 必须使用 **:value** 或 **v-model** 显示绑定.

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

_开发人员注意：tabs-items组件不必提供，仅对自定义实现是必需的。_

#### v-text-field

- **mask** prop 和功能已被移除. 您应该使用第三方库如 `vue-the-mask` 代替.
- The `prepend-icon-cb`, `prepend-inner-icon-cb`, `append-icon-cb`, and `append-outer-icon-cb` props have been removed. Instead you can use `@click:prepend`,  `@click:prepend-inner`, `@click:append`, and `@click:append-outer` events, respectively.

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox

- **box** prop 已变更为 **filled**

```html
<!-- v1.5 -->

<v-text-field box></v-text-field>
```

```html
<!-- v2.0 -->

<v-text-field filled></v-text-field>
```

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox - v-btn - v-alert

- **outline** prop 已变更为 **outlined**

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

- 所有现有的滚动技术和 `app` 功能已被弃用并移动到 `v-app-bar`
- `v-toolbar-side-icon` → `v-app-bar-nav-icon`

## 我需要帮助

如果你陷入困境需要帮助，不要担心！ 我们有一个非常大和专注的社区，能够提供全天候的帮助。 请到<a href=“https://discord.gg/QHWSAbA“>发布迁移</a>频道。

<vuetify-ad slug="consulting-support" />

<backmatter />
