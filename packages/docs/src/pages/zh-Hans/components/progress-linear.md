---
meta:
  title: Progress linear 进度条
  description: 进度条组件用于显示直线上的数字数据的可视化指标。
  keywords: 进度条, vuetify 进度条组件, vue 进度条组件, 线性进度
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/lists/
---

# 进度条 (Progress linear)

`v-progress-linear` 组件用于直观地将数据展示给用户。 它们也可以表示一个不确定的数量，代表加载或处理中状态。

<entry-ad />

## 使用

最简单的形式， `v-progress-linear` 显示一个水平进度条。 使用 **value** 属性来控制进度。

<example file="v-progress-linear/usage" />

## API

- [v-progress-linear](/api/v-progress-linear)

<inline-api page="components/progress-linear" />

## 示例

### 属性

#### 缓冲值

缓冲状态同时表示两个值。 主值由 **v-model**控制，而缓冲值则由 **buffer-value** 属性控制。

<example file="v-progress-linear/prop-buffer-value" />

#### 颜色

您可以使用 **color** 和 **background-color** 属性设置颜色。

<example file="v-progress-linear/prop-colors" />

#### 不定线条

使用 **indeterminate** 属性， `v-progress-linear` 会保持动画状态。

<example file="v-progress-linear/prop-indeterminate" />

#### 反转

使用 `reverse` 属性显示反转的进度条(LTR模式为从右到左，RTL模式为从左到右)。

<example file="v-progress-linear/prop-reverse" />

#### Rounded（圆角）

**rounded** 属性是另一种样式，它为 `v-progress-linear ` 组件添加了圆角。

<example file="v-progress-linear/prop-rounded" />

#### 流

**stream** 属性可以使用 **buffer-value** 向用户表示正在进行一些操作。 您可以使用 **buffer-value** 和 **value** 的任何组合来实现您的设计。

<example file="v-progress-linear/prop-stream" />

#### 有条纹的

使用 `striped` 属性对 `v-progress-linear` 的值部分应用条纹背景。

<example file="v-progress-linear/prop-striped" />

#### 查询

当 **query** prop 设置为true时，**query**属性值由不确定的真实性控制。

<example file="v-progress-linear/prop-query" />

### 插槽

#### 默认值

`v-progress-linear` 组件将在使用 **v-model** 时响应用户输入。 您可以使用默认插槽或绑定本地model在进度内显示。 如果您在寻找线性组件上的高级功能，请查看 [v-slider](/components/sliders)。

<example file="v-progress-linear/slot-default" />

### 其他

#### 定值线条

进度条组件有一个由 **v-model** 修改的确定状态。

<example file="v-progress-linear/misc-determinate" />

#### 文件加载器

`v-progress-linear` 组件有助于向用户解释他们正在等待响应。

<example file="v-progress-linear/misc-file-loader" />

#### 工具栏加载器

使用 **absolute** 属性，我们可以将 `v-progress-linear` 组件定位在 `v-toolbar` 的底部。 我们还使用了 **active** 属性来控制进度条的可见性。

<example file="v-progress-linear/misc-toolbar-loader" />

<backmatter />
