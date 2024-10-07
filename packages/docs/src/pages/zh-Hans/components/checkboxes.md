---
meta:
  title: Checkbox 复选框
  description: 复选框组件允许用户在两个值之间进行选择。
  keywords: 复选框，复选框组件，vuetify 复选框组件，vue 复选框组件
related:
  - /components/switches/
  - /components/forms/
  - /components/text-fields/
---

# 复选框 (Checkboxes)

`v-checbox` 组件为用户提供了在两个不同的值之间选择的能力。 它们与开关(switch) 非常相似，可用于复杂的表格和核对清单。 一个较简单的版本， `v-simple-checbox` 主要用作数据表组件中的轻量权重替代，用于选择行或显示行内的布尔数据。 <entry-ad />

## 使用

最简单形式的 `v-checbox` 提供了两个值之间的切换。

<example file="v-checkbox/usage" />

## API

- [v-checkbox](/api/v-checkbox)
- [v-simple-checkbox](/api/v-simple-checkbox)

<inline-api page="components/checkboxes" />

## 示例

### 属性

#### 颜色

复选框可以设置颜色通过使用 **color**属性，颜色可以是任何内置的颜色或者其上下文名称。

<example file="v-checkbox/prop-colors" />

#### 数组模型

多个 `v-checbox`可以通过数组分享相同的 **v-model**

<example file="v-checkbox/prop-model-as-array" />

#### 布尔模型

单个 `v-checbox` 将有一个布尔值作为其 **value**。

<example file="v-checkbox/prop-model-as-boolean" />

#### 状态

`v-checbox` 可能有不同的状态，如 **默认(default)**, **禁用(disabled)**, 和 **未确定(indeterminate)**。

<example file="v-checkbox/prop-states" />

### 插槽

#### Label

文本字段标签可以在`label`插槽中定义 - 允许使用 HTML 内容.

<example file="v-checkbox/slot-label" />

### 其他

#### 内联输入文本

您可以将`v-checkbox` 与其他组件（如`v-text-field`）对齐。

<example file="v-checkbox/misc-inline-textfield" />

<backmatter />
