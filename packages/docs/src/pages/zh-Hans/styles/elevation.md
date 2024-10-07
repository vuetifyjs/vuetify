---
meta:
  title: CSS 海拔助手
  description: 海拔辅助类允许你控制两个平面之间沿 Z 轴的相对深度或距离。
  keywords: 海拔辅助类、海拔类、Vuetify 海拔
related:
  - /components/cards/
  - /components/sheets/
  - /components/bottom-sheets/
---

# Elevation（海拔）

该工具可以让你控制两平面之间沿 z 轴方向的相对深度，或者说距离。 总共有25个高度。 您可以通过使用 `elevation-{n}`类设置元素的海拔， 其中 `n` 是0-24之间与所需海拔对应的整数。

<entry-ad />

## 使用

`海拔` 助手类允许您为任何元素分配一个自定义 **z-deep**。

<example file="elevation/usage" />

## 示例

### 属性

#### 动态海拔

众多组件使用 **高程** 混合，获得 **高程** prop。 对于不支持的组件, 您可以动态地更改类

<example file="elevation/prop-dynamic" />

<backmatter />
