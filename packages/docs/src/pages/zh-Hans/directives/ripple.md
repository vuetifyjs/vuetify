---
meta:
  title: 波纹指令
  description: 波纹指令以水波纹的形式为任何元素添加触摸和点击反馈。
  keywords: 涟漪, 墨迹, vuetify 涟漪指令, vue 涟漪指令
related:
  - /components/buttons/
  - /components/expansion-panels/
  - /styles/transitions/
---

# 波纹指令

`v-ripple` 指令用于显示用户的动作。 它可以应用于任何块级元素。 许多组件都内置了ripple指令，如 `v-btn`, `v-tabs-item` 和更多。

<entry-ad />

## 使用

只要在组件或HTML元素上使用 `v-ripple ` 指令，就可以启用基本的ripple功能

<example file="v-ripple/usage" />

## API

- [v-ripple](/api/v-ripple)

<inline-api page="directives/ripple" />

## 示例

### 选项

#### Center

当使用 `center` 选项时，始终会从目标的中心处产生波纹。

<example file="v-ripple/option-center" />

### 其他

#### 自定义色彩

您可以使用辅助器类改变波纹的颜色。

<example file="v-ripple/misc-custom-color" />

#### 组件中的波纹

有些组件提供了 ` ripple ` prop，使您能够控制波纹效果。 您可以通过使用 `class` 或 `centre` 选项来关闭或自定义行为。

<example file="v-ripple/misc-ripple-in-components" />

<backmatter />
