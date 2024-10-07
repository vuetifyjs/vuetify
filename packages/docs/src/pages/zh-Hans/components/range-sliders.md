---
meta:
  title: Range Slider 滑块
  description: 范围滑块是一个更好的可视化数字输入组件。 它用于收集数字数据。
  keywords: 滑块、范围、 vuetify 滑块组件，vuetify range Slider 组件，vue Slider 组件
related:
  - /components/forms/
  - /components/selects/
  - /components/sliders/
---

# Range Sliders (范围滑块)

`v-slider` 组件是一个更好的可视化数字输入组件。 它用于收集数字数据。

<entry-ad />

## 使用

滑块表示一个条形栏上的一系列值，用户可以从中选择一个值。 滑块组件适用于调节音量、亮度，或者图像滤镜的强度。

<usage name="v-range-slider" />

## API

- [v-range-slider](/api/v-range-slider)
- [v-slider](/api/v-slider)

<inline-api page="components/range-sliders" />

## 示例

### 属性

#### 禁用

您不能与 **disabled** 滑块交互。

<example file="v-range-slider/prop-disabled" />

#### 最小值和最大值

您可以通过 **min** 和 **max** 设置滑块的最小值和最大值。

<example file="v-range-slider/prop-min-and-max" />

#### 步长

`v-range-slider` 可以有1以外的步长。 这对您需要更准确地调整值的应用程序可能有帮助。

<example file="v-range-slider/prop-step" />

#### 垂直滑块

您可以使用 **vertical** 属性将滑块切换为垂直方向。 如果您需要更改滑块的高度，请使用 CSS。

<example file="v-range-slider/prop-vertical" />

### 插槽

#### thumb标签

使用 **tick-labels** prop 和 `thumb-label` 插槽，您可以创建一个非常自定义的解决方案。

<example file="v-range-slider/slot-thumb-label" />

<backmatter />
