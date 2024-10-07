---
meta:
  title: Expansion panel 扩展面板
  description: 扩展面板组件是一种轻量级的容器，它将信息隐藏在可膨胀和可收缩的容器后面。
  keywords: 扩展面板，vuetify 扩展面板组件，vue 扩展面板组件
related:
  - /components/cards/
  - /components/data-tables/
  - /components/lists/
---

# 扩展面板 (Expansion panels)

`v-expansion-panel` 组件有助于减少大量信息的垂直空间占用。 组件的默认功能是仅显示一个扩展面板； 然而，使用 `multiple` 属性后，扩展面板可以保持打开，直到显式地关闭。

<entry-ad />

## 使用

最简单的扩展面板显示可扩展项目的列表。

<example file="v-expansion-panels/usage" />

## API

- [v-expansion-panels](/api/v-expansion-panels)
- [v-expansion-panel](/api/v-expansion-panel)
- [v-expansion-panel-header](/api/v-expansion-panel-header)
- [v-expansion-panel-content](/api/v-expansion-panel-content)

<inline-api page="components/expansion-panels" />


<!-- ## Sub-components

### v-expansion-panel

v-expansion-panel description

### v-expansion-panel-header

v-expansion-panel-header description

### v-expansion-panel-content

v-expansion-panel-content description -->

## 示例

### 属性

#### 手风琴

**accordion** 属性激活时，当前扩展面板周围不会有边距。

<example file="v-expansion-panels/prop-accordion" />

#### 禁用

扩展面板及其内容都可以使用 **disabled** 属性禁用。

<example file="v-expansion-panels/prop-disabled" />

#### 调焦

扩展面板头部可以使用 **focusable** 属性使其可以聚焦。

<example file="v-expansion-panels/prop-focusable" />

#### 缩进

**inset** 属性激活时，当前扩张面板变得更小。

<example file="v-expansion-panels/prop-inset" />

#### 外部控制

可以通过修改 **v-model** 来从外部控制扩展面板。 它的值对应于当前打开的扩展面板索引（从0开始）。 如果使用 **multiple** 属性，则是一个包含打开项索引的数组。

<example file="v-expansion-panels/prop-model" />

#### 弹出

扩展面板还具有 **popout** 设计。 如果扩展面板激活`popout`属性，扩张面板将会在激活时扩大。

<example file="v-expansion-panels/prop-popout" />

#### 只读

**readonly** 属性做了与 **disabled** 相同的事情，但不涉及样式。

<example file="v-expansion-panels/prop-readonly" />

### 其他

#### 高级版

扩展面板为构建真正高级的实现提供了丰富的平台。 在这里，我们可以利用 `v-expansion-panel-header` 组件中的插槽，通过淡入淡出内容来响应打开或关闭的状态。

<example file="v-expansion-panels/misc-advanced" />

#### 自定义图标

展开操作的图标可以使用 **expand-icon** 属性或 `actions` 插槽自定义。

<example file="v-expansion-panels/misc-custom-icons" />

<backmatter />
