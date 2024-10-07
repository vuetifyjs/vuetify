---
meta:
  title: Data table 数据表格
  description: 数据表格组件用于显示表格数据，方便用户浏览。 功能包括排序，搜索，分页和选择。
  keywords: 数据表格, vuetify 数据表格组件, vue 数据表格组件
related:
  - /components/data-iterators/
  - /components/simple-tables/
  - /components/lists/
---

# 数据表格（Data tables）

`v-data-table` 组件用于显示表格数据。 功能包括排序，搜索，分页，内容编辑和行选择。

<vuetify-ad slug="vs-vuetify-subscribe" />

## 使用

标准数据表格默认会将数据呈现为简单的行。

<example file="v-data-table/usage" />

## API

- [v-data-table](/api/v-data-table)
- [v-data-table-header](/api/v-data-table-header)
- [v-data-footer](/api/v-data-footer)
- [v-edit-dialog](/api/v-edit-dialog)
- [v-simple-checkbox](/api/v-simple-checkbox)

<inline-api page="components/data-tables" />


<!-- ## Sub-components

### v-data-table-header

v-data-table-header description

### v-data-footer

v-data-footer description

### v-edit-dialog

v-edit-dialog description

### v-simple-checkbox

v-simple-checkbox description -->

## 示例

### 属性

#### 自定义过滤器

你可以向 **custom-filter** 属性提供一个函数，覆盖 **search** 属性的默认过滤。 如果你需要自定义特定列的过滤，你可以给表头数据项的 **filter** 属性提供一个函数。 类型是`(value: any, search: string | null, item: any) => boolean`。 即使没有提供 **search** 属性，这个函数也会一直运作。 因此，你需要确保在不应用过滤器的情况下，函数会返回 `true`。

<example file="v-data-table/prop-custom-filter" />

#### 紧凑

使用 **dense** 属性，可以让数据表格表现为另一种样式。

<example file="v-data-table/prop-dense" />

#### 可过滤

在搜索表格内容时，你可以设置表头数据项的 **filterable** 属性为 false，禁止对应列的内容被包含在搜索结果内。 下面的示例中，不会被搜索到 dessert 列的内容。

<example file="v-data-table/prop-filterable" />

#### 表脚属性

`v-data-table` 使用 `v-data-footer` 组件渲染一个默认的表脚。 你可以使用 **footer-props** 将属性传递给这个组件。

<example file="v-data-table/prop-footer-props" />

#### 分组

你可以使用 **group-by** 和 **group-desc** 属性分组。 **show-group-by** 属性将在默认表头中显示分组按钮。 你可以设置表头数据项的 **groupable** 属性为 false ，禁用对应属性的分组。

<example file="v-data-table/prop-grouping" />

#### 隐藏默认表头和表脚

你可以应用 **hide-default-header** 和 **hide-default-footer**属性，分别移除默认表头和表脚。

<example file="v-data-table/prop-hide-header-footer" />

#### 加载中

你可以使用 **loading** 属性来表示正在加载表格数据。 即使表格中没有数据，也会显示一条加载信息。 加载信息可以使用 **loading-text** 属性或 `loading` 插槽来自定义。

<example file="v-data-table/prop-loading" />

#### 多列排序

使用 **multi-sort** 属性可以根据多列同时排序。 启用后，你可以向 **sort-by** 和 **sort-desc** 传递数组以控制排序。

<example file="v-data-table/prop-multi-sort" />

#### 行选择

**show-select** 属性将在默认表头中渲染一个复选框以切换所有行是否被选择，同时也为每个默认行渲染一个复选框。 你可以分别使用 `header.data-table-select` 和 `item.data-table-select` 的插槽来自定义。 你还可以使用 **single-select** 属性，指定能同时选择多行还是只能选择一行。

<example file="v-data-table/prop-row-selection" />

#### 搜索

数据表格还提供了 **search** 属性以过滤数据。

<example file="v-data-table/prop-search" />

### 插槽

<vuetify-ad slug="vs-vue-3-slots" />

`v-data-table`提供了大量的插槽用于自定义。 下面的示例展示了其中一些插槽以及你可以用它们做什么。 It is important to note some slots (eg: `item`/`body`/`header`) will completely take over the internal rendering of the component which will require you to re-implement functionalities such as selection and expansion. Some slots will override each other such as: `body` > `item` > `item.<name>` and `header`/`header.<name>`.

<alert type="info">

  Some slots such as `item.<name>` and `header.<name>` use modifiers to target more scoped slots. Eslint by default will throw errors when slots use modifiers. To disable these errors, add the following rule to your eslint configuration: `"vue/valid-v-slot": ["error", { "allowModifiers": true }]`.

</alert>

<example file="v-data-table/slot-main" />

#### 表头

你可以使用动态插槽 `header.<name>` 来自定义某些列。 `<name>` 是传给 **headers** 的某一表头数据项的 `value` 属性的值。

<example file="v-data-table/slot-header" />

#### 项目

你可以使用动态插槽 `item.<name>` 来自定义某些列。 `<name>` 是传给 **headers** 的某一表头数据项的 `value` 属性的值。 所以要自定义 calories 列，我们要使用 `item.calories` 插槽。

<example file="v-data-table/slot-item" />

#### 简单复选框

如果想要在数据表格的插槽模板中使用复选框，请使用 `v-simple-checkbox` 组件，而不是 `v-checkbox` 组件。 `v-simplle-checbox` 组件被内部使用，跟随表头对齐方式。

<example file="v-data-table/slot-simple-checkbox" />

### 其他

#### CRUD 操作

带 CRUD 操作的 `v-data-table` 使用 `v-dialog` 组件来编辑每行数据。

<example file="v-data-table/misc-crud" />

#### 编辑用对话框

`v-edit-dialog` 组件可用于直接在 `v-data-table` 中编辑数据。 如果点击 `v-edit-dialog` 外部时不想关闭对话框，可以添加 **persistent** 属性。

<example file="v-data-table/misc-edit-dialog" />

#### 可展开行

**show-expand** 属性会在每个默认行上渲染一个展开图标。 你可以使用 `item.data-table-extension` 插槽来自定义。 添加一列 `value: 'data-table-expand'` 到 headers 数组，就能自定义这个插槽的位置。 你还可以使用 **single-expand** 属性，指定能同时展开多行还是只能展开一行。 The expanded rows are available on the synced prop `expanded.sync`. Row items require a unique key property for expansion to work. The default is `id`, but you can use the **item-key** prop to specify a different item property.

<example file="v-data-table/misc-expand" />

#### 外部分页

要在外部控制分页，可以使用单独的属性或使用 **options** 属性。 记住，你必须应用 **.sync** 修饰符。

<example file="v-data-table/misc-external-paginate" />

#### 外部排序

要在外部控制排序，可以使用单独的属性或使用 **options** 属性。 记住，你必须应用 **.sync** 修饰符。

<example file="v-data-table/misc-external-sort" />

#### 服务器端分页和排序

如果你正在从后端服务器加载已经分页和排序的数据，你可以使用 **server-items-length** 属性。 使用这个属性会禁用内置的排序和分页，因此，你需要用特定事件（`update:page`，`update:sortBy`，`update:options` 等）来得知什么时候要向后端服务器请求新页面。 获取数据时，使用 **loading** 属性显示进度条。

<example file="v-data-table/misc-server-side-paginate-and-sort" />

<backmatter />
