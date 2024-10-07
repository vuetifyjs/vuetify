---
meta:
  title: Overlay 遮罩层
  description: 遮罩层组件让您可以轻松地在组件或整个应用程序上创建一个边缘或悬停效果。
  keywords: 遮罩层，vuetify 遮罩层组件，vue 遮罩层组件
related:
  - /components/cards/
  - /components/sheets/
  - /components/dialogs/
---

# 遮罩层 (Overlays)

`v-overlay` 组件用于强调特定元素或它的一部分。 它向用户发出应用程序内状态变化的信号，可用于创建加载器、对话框等。

<entry-ad />

## 使用

最简单的形式， `v-overlay` 组件将在您的应用程序上添加一个黯淡图层。

<example file="v-overlay/usage" />

## API

- [v-overlay](/api/v-overlay)

<inline-api page="components/overlays" />

## 示例

### 属性

#### 绝对定位

**absolute** 遮罩层为绝对定位，并且包含在其父元素内。

<example file="v-overlay/prop-absolute" />

#### 透明度

**opacity** 允许您自定义 `v-overlay` 组件的透明度。

<example file="v-overlay/prop-opacity" />

#### Z-index

**z-index** 使您能够轻松地更改 `v-overlay` 组件的覆盖顺序。

<example file="v-overlay/prop-z-index" />

### 其他

#### 高级版

使用 [v-hover](/components/hover)，我们可以在信息卡上添加漂亮的稀松布，以及用户可以执行的其他操作。

<example file="v-overlay/misc-advanced" />

#### 加载器

使用 `v-overlay` 作为背景，添加进度组件来轻松创建自定义加载器。

<example file="v-overlay/misc-loader" />

<backmatter />
