---
meta:
  title: Parallax 视差
  description: 视差组件创建一个3D效果，使图像的滚动速度比窗口慢。
  keywords: 视差, vuetify 视差组件, vue 视差组件
related:
  - /components/aspect-ratios/
  - /components/cards/
  - /components/images/
---

# 视差 (Parallax)

`v-parallax` 组件创建一个3d效果，使图像的滚动速度看起来比窗口慢。

<entry-ad />

## 使用

当用户滚动页面时，视差引起背景图像的滚动。

<example file="v-parallax/usage" />

## API

- [v-parallax](/api/v-parallax)

<inline-api page="components/parallax" />

## 示例

### 其他

#### 内容

您可以将任何内容放置在parallax中。 这使您可以使用parallax作为英雄图像。

<example file="v-parallax/misc-content" />

#### 自定义高度

您可以在parallax上指定一个自定义高度。 请记住，如果图像大小不合适，这可能会打破parallax。

<example file="v-parallax/misc-custom-height" />

<backmatter />
