---
meta:
  title: Timeline 时间轴
  description: 时间轴组件用于水平显示时间顺序信息。
  keywords: 时间轴, vuetify 时间轴组件, vue 时间轴组件
related:
  - /components/cards/
  - /components/icons/
  - /components/grids/
---

# 时间线 (Timeline)

`v-timeline ` 对于显示时间顺序信息非常有用。

<entry-ad />

## 使用

`v-timeline `以最简单的形式显示了一个垂直时间轴, 它至少应该包含一个 `v-timeline-item `

<example file="v-timeline/usage" />

## API

- [v-timeline](/api/v-timeline)
- [v-timeline-item](/api/v-timeline-item)

<inline-api page="components/timelines" />


<!-- ## Sub-components

### v-timeline-item

v-timeline-item description -->

## 示例

### 属性

#### 颜色

彩色的点可以创建可视的断点，使您的时间轴更容易阅读。

<example file="v-timeline/prop-color" />

#### 紧密

** dense ** 的时间轴将所有内容放置到右边。 在这个示例中， `v-alert ` 代替卡片以提供不同的设计。

<example file="v-timeline/prop-dense" />

#### 图标点

Conditionally use icons within the `v-timeline-item`'s dot to provide additional context.

<example file="v-timeline/prop-icon-dots" />

#### 反转

您可以通过使用 ** reverse ** prop来扭转时间轴项目的方向。 这既适用于默认模式，也适用于 ** dense ** 模式。

<example file="v-timeline/prop-reverse" />

#### 小号

**small** prop允许其它样式提供独特的设计。

<example file="v-timeline/prop-small" />

### 插槽

#### Icon

使用 ` icon ` 插槽和 `v-avatar` 将头像插入到点.

<example file="v-timeline/slot-icon" />

#### Opposite

**opposite** 插槽在您的时间线内提供额外的自定义层。

<example file="v-timeline/slot-opposite" />

#### Timeline item default

If you place a `v-card` inside of a `v-timeline-item`, a caret will appear on the side of the card.

<example file="v-timeline/slot-timeline-item-default" />

### 其他

#### 高级

模块化组件允许您创建高度定制的解决方案。

<example file="v-timeline/misc-advanced" />

<backmatter />
