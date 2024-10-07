---
meta:
  title: Sparkline 迷你图表
  description: 迷你图表组件可以创建美丽而富有表现力的简单图形来显示数字数据。
  keywords: 迷你图表, vuetify 迷你图表组件, vue 迷你图表组件, sparkline, graph, 曲线, 图表, 直线
related:
  - /components/cards/
  - /components/sheets/
  - /components/expansion-panels/
---

# 迷你图表（Sparklines）

迷你图表组件可以用来创建简单的图表，例如GitHub的贡献图。

任何<a href=“https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute“>SVG属性</a>可用于下列属性之外。

<entry-ad />

## 使用

迷你图表是一个提供数据可视化表示的小图表。 The sparkline component comes in 2 variations, **trend** (default) and **bar**. Each supports a multitude of options for customizing the look and feel of the sparkline.

<example file="v-sparkline/usage" />

## API

- [v-sparkline](/api/v-sparkline)

<inline-api page="components/sparklines" />

## 示例

### 属性

#### 填充

您可以使用 `fill` 属性创建一个 `v-sparkline` 并填充。

<example file="v-sparkline/prop-fill" />

### 其他

#### 自定义标签

By providing a **label** slot, we are able to modify the displayed content by adding a dollar sign ($). 对于文本内容来说，这个插槽是 **_exclusively_** 。 欲了解更多关于svg `<text>` 元素的信息， [请看这里](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text)。

<example file="v-sparkline/misc-custom-labels" />

#### 仪表盘卡片

`v-sparkline` 组件与`v-card`和`v-sheet`很好地搭配在一起，创建定制的信息卡，非常适合后台仪表盘。 我们在这里使用自定义标签为其提供额外的上下文.

<example file="v-sparkline/misc-dashboard-card" />

#### 心率

为了获得简明的信息，一张完整的图表可能会有点过头。 使用带有渐变的趋势线可以为用户提供足够的细节，而不会显示太多信息。

<example file="v-sparkline/misc-heart-rate" />

<backmatter />
