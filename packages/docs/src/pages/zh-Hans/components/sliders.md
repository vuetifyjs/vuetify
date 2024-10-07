---
meta:
  title: Slider 滑块
  description: 滑块组件是一个更好的可视化数字输入工具。 它用于收集数字数据。
  keywords: 滑块，vuetify 滑块组件，vue 滑块组件
related:
  - /components/forms/
  - /components/selects/
  - /components/range-sliders/
---

# 滑块 (Sliders)

`v-slider` 组件是一个更好的可视化数字输入工具。 它用于收集数字数据。

<entry-ad />

## 使用

滑块表示一根条上的一系列值，用户可以从中选择一个值。 滑块组件适用于调节音量、亮度，或者图像滤镜的强度。

<usage name="v-slider" />

## API

- [v-slider](/api/v-slider)
- [v-range-slider](/api/v-range-slider)

<inline-api page="components/sliders" />

## 示例

### 属性

#### 颜色

您可以使用 **color**、**track-color** 和 **thumb-color** 属性设置滑块的颜色。

<example file="v-slider/prop-colors" />

#### 禁用

您不能与 **disabled** 滑块交互。

<example file="v-slider/prop-disabled" />

#### 离散的

离散滑块提供一个显示当前准确数量的标签。 您可以使用 **step** 属性让滑块只能选择部分值。

<example file="v-slider/prop-discrete" />

#### 图标 (Icons)

您可以使用 **append-icon** 和 **prepend-icon** 属性添加图标到滑块。 您可以使用 `@click:append` 和 `@click:prepend` 绑定图标点击事件回调函数。

<example file="v-slider/prop-icons" />

#### 反向标签

带有 **inverse-label** 属性的 `v-slider` 的标签显示在末尾。

<example file="v-slider/prop-inverse-label" />

#### 最小值和最大值

您可以通过 **min** 和 **max** 设置滑块的最小值和最大值。

<example file="v-slider/prop-min-and-max" />

#### 只读

您不能与 **readonly** 滑块交互，但它们看起来与普通滑块一样。

<example file="v-slider/prop-readonly" />

#### 步长

`v-slider` 可以有1以上的步长。 这对您需要更准确地调整值的应用程序可能有帮助。

<example file="v-slider/prop-step" />

#### 缩略图标签

您可以使用 **thumb-label** 属性让滑块在滑动时始终显示缩略图标签。 可以通过 **thumb-color** 属性设置缩略图颜色，通过 **thumb-size** 属性设置大小。 使用 **always-dirty** 属性可使其颜色保持不变，即使在 **min** 值上也是如此。

<example file="v-slider/prop-thumb" />

#### 刻度

刻度线决定了用户能将滑块移动到的预定值。

<example file="v-slider/prop-ticks" />

#### 验证

Vuetify包括通过 **规则** prop进行简单的验证。 prop 接受了各种类型 `函数`, `布尔值` 和 `字符串` 的组合。 当输入值发生变化时，数组中的每个元素将被验证。 函数传递当前的v-model 作为参数，必须返回 `true` / `false` 或 `字符串` 包含错误消息。

<example file="v-slider/prop-validation" />

#### 垂直滑块

您可以使用 **vertical** 属性将滑块切换为垂直方向。 如果您需要更改滑块的高度，请使用 CSS。

<example file="v-slider/prop-vertical" />

### 插槽

#### 附加代码

使用 `append` 和 `prepend` 插槽来轻松自定义 `v-slider` 以便适应任何情况。

<example file="v-slider/slot-append-and-prepend" />

#### 追加文本字段

滑块可以与它的 `append` 插槽中的其他组件合并，例如 `v-text field`，以便为组件添加额外的功能。

<example file="v-slider/slot-append-text-field" />

<backmatter />
