---
meta:
  title: Progress circular 进度环
  description: 进度环组件用于显示圆圈中的数字数据的视觉指示器。
  keywords: 进度环, vuetify 进度环组件, vue 进度环组件 环形进度
related:
  - /components/cards/
  - /components/progress-linear/
  - /components/lists/
---

# 环状进度 (Progress circular)

`v-progress-circular` 组件用于向用户展示环形的数据。 它也可以设置为不确定的状态来表示加载。

<entry-ad />

## 使用

In its simplest form, v-progress-circular displays a circular progress bar. Use the value prop to control the progress.

<example file="v-progress-circular/usage" />

## API

- [v-progress-circular](/api/v-progress-circular)

<inline-api page="components/progress-circular" />

## 示例

### 属性

#### 颜色

可以使用 `color` 属性为 `v-progress-circular`设置其他颜色。

<example file="v-progress-circular/prop-color" />

#### 不定线条

使用 `indeterminate` 属性，`v-progress-circular` 将会一直处于动画中。

<example file="v-progress-circular/prop-indeterminate" />

#### 旋转

`rotate` 参数使您能够自定义 `v-progress-circular`的原点。

<example file="v-progress-circular/prop-rotate" />

#### 大小和宽度

`size` 和 `width` 属性允许您轻松修改 `v-progress-circular` 组件的大小和宽度。

<example file="v-progress-circular/prop-size-and-width" />

<backmatter />
