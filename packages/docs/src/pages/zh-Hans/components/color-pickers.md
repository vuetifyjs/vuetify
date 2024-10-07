---
meta:
  title: Color picker 颜色选择器
  description: 颜色选择器组件允许用户使用各种不同的输入和格式从预定义或自定义的颜色中选择。
  keyword: 颜色选择器，vuetify 颜色选择器组件，vue 颜色选择器组件
related:
  - /components/menu/
  - /styles/colors/
  - /features/theme/
---

# 颜色选择器 (Color pickers)

`v-color-picker` 允许你使用各种输入方法来选择颜色。

<entry-ad />

## 使用

<usage name="v-color-picker" />

## API

- [v-color-picker](/api/v-color-picker)

<inline-api page="components/color-pickers" />

## 示例

### 属性

#### 画布

可以使用 `hide-canvas` 属性隐藏画布，也可以使用 `canvas-height` 属性设置其高度。 选择点的大小可以用 `dot-size` 属性来控制。

<example file="v-color-picker/prop-canvas" />

#### 海拔

使用 **elevation** 或 **flat** 属性调整 `v-color-picker` 组件的海拔。 设置 **flat** 相当于将 **elevation** 设置为0。

<example file="v-color-picker/prop-elevation" />

#### 输入

数字输入可以用 `hide-inputs` 属性隐藏，滑块可以用 `hide-sliders` 属性隐藏。 你也可以使用 `hide-mode-switch` 属性隐藏模式切换图标。 模式也可以通过 `mode` 属性进行外部控制。

<example file="v-color-picker/prop-inputs" />

#### 模型

`v-color-picker` 使用 `v-model` 属性来控制显示的颜色。 它支持十六进制字符串，如 **#FF00FF** 和 **#FF00FF00**，以及表示 **RGBA**、**HSLA** 和 **HSVA** 值的对象。

<example file="v-color-picker/prop-model" />

#### 色板

使用 `show-swatches` 属性，你可以显示一个色板供用户选择。 也可以使用 `swatches` 属性自定义显示什么颜色。 该属性接受一个二维数组，其中第一维定义一列，第二维通过提供 rgba 十六进制字符串定义从上到下的色板。 你也可以使用 `swatches-max-height` 属性设置色板部分的最大高度。

<example file="v-color-picker/prop-swatches" />

<backmatter />
