---
meta:
  title: Sheet 工作表
  description: 工作表组件是Vuetify中使用的许多Material Design实现的基础。
  keywords: 工作表, vuetify 工作表组件, vue 工作表组件
related:
  - /components/cards/
  - /components/grids/
  - /styles/elevation/
---

# Sheets（工作表）

`v-sheet`  组件是许多组件的基础，如 [v-card](/components/cards/),  [v-toolbar](/components/toolbars/)等等。 The available properties form the foundation of Material Design — the concept of paper and elevation (shadows).

<entry-ad />

## 使用

`v-sheet` 组件是一块可改变的 _paper_ ，为Vuetify 的功能提供了基础。 For example, properties such as **rounded** and **shaped** modify the `border-radius` property while **elevation** increases/decreases `box-shadow`.

<usage name="v-sheet" />

## API

- [v-sheet](/api/v-sheet)

<inline-api page="components/sheets" />

## 示例

### 属性

#### 高度(z轴)

The `v-sheet` component accepts a custom elevation between **0** and **24** (0 is default). *elevation* 属性修改 `box-shadow` 属性。 更多信息位于MD [ Elevation设计规格](https://material.io/design/environment/elevation.html)。

<example file="v-sheet/prop-elevation" />

#### 圆角

**rounded** prop 增加了默认 _4px_ 的 `border-radius`。 默认情况下， `v-sheet` 组件没有边框半径。 通过提供自定义的圆角值来定义半径的大小和位置；例如，圆角值 *tr-xl l-pill* 等于 *rounded-tr-xl rounded-l-pill*。 关于圆角样式的其他信息在 [边框半径](/styles/border-radius/)页。

<example file="v-sheet/prop-rounded" />

#### 颜色

纸张和基于它们的部件可以有不同的尺寸和颜色。

The `v-sheet` component accepts custom [Material Design Color](/styles/colors/) values such as `warning`, `amber darken-3`, and `deep-purple accent` — as well as *rgb*, *rgba*, and *hexadecimal* values.

<example file="v-sheet/prop-color" />

<backmatter />
