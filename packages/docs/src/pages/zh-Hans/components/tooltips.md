---
meta:
  title: Tooltip 工具提示
  description: 提示组件显示其附加元素的文本信息。
  keywords: 提示, vuetify 提示组件, vue 提示组件
related:
  - /components/badges/
  - /components/icons/
  - /components/menus/
---

# Tooltips（提示）

当用户悬停在元素上时， `v-tooltip` 组件可用于传递信息。 您还可以通过 `v-model` 来控制提示的显示。 当激活时，提示将显示用于标识元素的文本，例如其功能的描述。

<entry-ad />

## 使用

提示组件可以包装任何元素。

<example file="v-tooltip/usage" />

## API

- [v-tooltip](/api/v-tooltip)

<inline-api page="components/tooltips" />

## 注意

<alert type="info">

  为了正确定位 `v-tooltip`，需要一个位置支撑 ( `top` | `bottom` | `left` | `right` )

</alert>

## 示例

### 属性

#### 对齐

提示可以对齐到激活器元素的四个侧面.

<example file="v-tooltip/prop-alignment" />

#### 颜色

工具提示颜色可以使用 ` color` prop。

<example file="v-tooltip/prop-color" />

#### 可见性

可使用 `v-model` 编程性修改提示可见性。

<example file="v-tooltip/prop-visibility" />

<backmatter />
