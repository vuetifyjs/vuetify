---
meta:
  title: Switch 开关
  description: 开关组件是用于在两个值之间简单流畅的切换.
  keywords: 开关，开关组件，vuetify 开关组件，vue开关组件
related:
  - /components/checkboxes/
  - /components/forms/
  - /components/radio-buttons/
---

# 开关 (Switches)

`v-switch` 组件使用户能够在两个不同的值之间进行选择。 它们非常类似于一个切换，或开关，虽然视觉上不同于一个复选框。

<entry-ad />

## 使用

最简单形式的 `v-switch` 提供两个值之间的切换。

<example file="v-switch/usage" />

## API

- [v-switch](/api/v-switch)

<inline-api page="components/switches" />

## 示例

### 属性

#### 颜色

开关可以使用任何内置颜色和上下文名称使用 **color** prop 进行着色。

<example file="v-switch/prop-colors" />

#### 扁平

您可以使用 <strong x-id=“1”>flat</strong> 属性渲染没有高度(z轴)的开关。

<example file="v-switch/prop-flat" />

#### 嵌入

您可以在嵌入模式下使开关渲染。

<example file="v-switch/prop-inset" />

#### 数组模型

通过使用数组，多个 `v-switch`'可以共享相同的 **v-model**。

<example file="v-switch/prop-model-as-array" />

#### 布尔模型

单个 `v-switch` 使用一个布尔值作为其 **value**。

<example file="v-switch/prop-model-as-boolean" />

#### 状态

`v-switch` 可以有不同的状态，例如<strong x-id=“1”>默认</strong>，<strong x-id=“1”>禁用</strong>，以及<strong x-id=“1”>加载</strong>。

<example file="v-switch/prop-states" />

### 插槽

#### 标签

文本字段标签可以在`label`插槽中定义 - 允许使用 HTML 内容.

<example file="v-switch/slot-label" />

<backmatter />
