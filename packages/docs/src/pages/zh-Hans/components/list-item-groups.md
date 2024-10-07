---
meta:
  title: List item group 列表项目组
  description: 列表项目组组件提供一个接口，用于使用列表项显示一系列内容。
  keywords: 列表组, vuetify 列表组组件, vue 列表组组件
related:
  - /components/lists/
  - /components/item-groups/
  - /components/cards/
---

# List item groups（列表项目组）

`v-list-item-group` 提供创建一组可选的 `v-list-item` 的能力。 `v-list-item-group`组件以<a href=“/components/item groups”>v-item-group</a>为交互式列表提供一个干净的接口。

<entry-ad />

## 使用

默认情况下， `v-list-item-group` 的操作方式类似 `v-item-group`。 如果未提供<strong x-id=“1”>value</strong>，则组将根据其索引提供默认值。

<example file="v-list-item-group/usage" />

## API

- [v-list-group](/api/v-list-group)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-item-group)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<inline-api page="components/list-item-groups" />

## 示例

### 属性

#### 激活类

您可以设置一个在选择项目时将添加的类。

<example file="v-list-item-group/prop-active-class" />

#### 必填项

必须至少选定一项。

<example file="v-list-item-group/prop-mandatory" />

#### 多选

您可以一次选择多个项目。

<example file="v-list-item-group/prop-multiple" />

### 其他

#### 扁平列表

您可以轻松禁用所选 `v-list-item` 的默认高亮显示。 这为用户的选择创建了一个较低的配置文件。

<example file="v-list-item-group/misc-flat-list" />

#### 选择控件

使用默认插槽，您可以访问项目内部状态并进行切换。 因为 **active** 属性是一个 _布尔值_, 我们使用复选框上的 **true-value** prop 将其状态链接到 `v-list-items`

<example file="v-list-item-group/misc-selection-controls" />

<backmatter />
