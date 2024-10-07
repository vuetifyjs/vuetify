---
meta:
  title: Chip group 纸片组
  description: 纸片组组件将许多可选择的芯片合并为单行或多行。
  keywords: 纸片组，vuetify 纸片组组件，vue 纸片组组件
related:
  - /components/chips/
  - /components/slide-groups/
  - /components/item-groups/
---

# 纸片组 (Chip groups)

`v-chip-group`通过提供可分组的功能来增强`v-chip`组件。 它使用纸片来创建选择组。

<entry-ad />

## 使用

纸片组使得用户可以很容易地为更复杂的实现选择过滤选项。 默认情况下 `v-chip-group` 会溢出到右边, 但可以更改为只允许 ** column ** 的模式。

<usage name="v-chip-group" />

## API

- [v-chip-group](/api/v-chip-group)
- [v-chip](/api/v-chip)

<inline-api page="components/chip-groups" />

## 示例

### 属性

#### 列

使用 ** column ** prop 的纸片组可以包装它们的纸片。

<example file="v-chip-group/prop-column" />

#### 过滤结果

使用<strong x-id=“1”> filter </strong> prop轻松创建提供额外反馈的纸片组。 这就与用户选中的纸片产生了一种可供选择的视觉样式。

<example file="v-chip-group/prop-filter" />

#### 必填项

具有<strong x-id=“1”>mandatory</strong> prop的纸片组必须始终选择一个值。

<example file="v-chip-group/prop-mandatory" />

#### 多选

具有<strong x-id=“1”>multiple</strong> prop的纸片组可以选择多个值。

<example file="v-chip-group/prop-multiple" />

### 其他

#### 产品卡

`v-chip` 组件可以有一个用于其model的明确值。 这会传递到 `v-chip-group` 组件并且在您不想使用纸片索引作为其值时非常有用。

<example file="v-chip-group/misc-product-card" />

#### 牙刷卡

纸片组允许创建自定义接口，这些接口执行与项组或单选控件相同的操作，但在风格上有所不同。

<example file="v-chip-group/misc-toothbrush-card" />

<backmatter />
