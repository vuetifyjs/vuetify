---
meta:
  title: Carousel 轮播
  description: 轮播组件用于循环浏览视觉内容，如图片或文字的幻灯片。
  keywords: 轮播, vuetify 轮播组件, vue 轮播组件
related:
  - /components/parallax/
  - /components/images/
  - /components/windows/
---

# 轮播 (Carousels)

`v-carousel` 组件用于在循环计时器上显示大量可视内容。

<entry-ad />

## 使用

`v-carousel`组件通过提供用于显示图像的附加功能扩展了`v-window`。

<example file="v-carousel/usage" />

## API

- [v-carousel](/api/v-carousel)
- [v-carousel-item](/api/v-carousel-item)

<inline-api page="components/carousels" />


<!-- ## Sub-components

### v-carousel-item

v-carousel-item description -->

## 示例

### 属性

#### 自定义分隔符

使用任何可用的图标来改变轮播的滑动分隔符。

<example file="v-carousel/prop-custom-icons" />

#### 自定义过渡

`v-carousel-item` 组件可以有它独有的 **transition/reverse-transition** 过渡.

<example file="v-carousel/prop-custom-transition" />

#### 周期

使用 **cycle** prop，您可以设置幻灯片每 6 s (默认)自动过渡到下一个可用的。

<example file="v-carousel/prop-cycle" />

#### 隐藏控件

您可以使用 `:show-arrows="false"` 隐藏轮播导航控件。

<example file="v-carousel/prop-hide-controls" />

#### 自定义箭头按钮

可以用 **prev** 和 **next** 槽来自定义窗口中的箭头部分。

<example file="v-carousel/slots-next-prev" />

#### Hide delimiters

You can hide the bottom controls with `hide-delimiters` prop.

<example file="v-carousel/prop-hide-delimiters" />

#### 模型

You can control carousel with model.

<example file="v-carousel/prop-model" />

<backmatter />
