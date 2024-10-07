---
meta:
  title: Radio button 单选按钮
  description: 使用单选按钮组，只允许用户选择一组选项中的一个。
  keywords: radio groups, radio buttons, vuetify radio group 组件, vuetify radio 组件, vue radio 组件, vue radio group 组件
related:
  - /组件/button-groups(按钮组)/
  - /components/forms/
  - /components/checkboxes/
---

# 单选按钮 (Radio buttons)

`v-radio` 组件是一个简单的单选按钮。 与 `v-radio-group` 组件结合时，您可以提供分组的功能，允许用户从一组预定义的选项中进行选择。

<entry-ad />

## 使用

虽然 `v-radio` 可以单独使用，但它最好与 `v-radio-group` 一起使用。 在 `v-radio-group` 上使用 **v-model**，您可以访问组内所选单选按钮的值。

<example file="v-radio-group/usage" />

## API

- [v-radio](/api/v-radio)
- [v-radio-group](/api/v-radio-group)

<inline-api page="components/radio-buttons" />

## 示例

### 属性

#### 颜色

单选按钮可以使用 **color** 属性设置颜色，颜色可以是内置颜色和或其上下文名称。

<example file="v-radio-group/prop-colors" />

#### 布局

单选框组可以使用 column 或者 row 属性设置为一列或者一行的形式。 默认设置为列。

<example file="v-radio-group/prop-direction" />

#### 必填项

默认情况下，按钮组不是必填的。 可以使用 **mandatory** 属性改变这种状态。

<example file="v-radio-group/prop-mandatory" />

### 插槽

#### 标签

单选组标签可以在 `label` 中定义，允许使用 HTML 内容。

<example file="v-radio-group/slot-label" />

<backmatter />
