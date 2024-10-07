---
meta:
  title: Snackbar 消息条
  description: Snackbar 组件会让用户知道您的应用程序将要执行的过程。 它是临时性的，往往包含操作。 Timer will stop when user hovers over the snackbar.
  keywords: 消息条, vuetify 消息组件, vue 消息条组件
related:
  - /components/buttons/
  - /styles/colors/
  - /components/forms/
---

# 消息条 (Snackbars)

`v-snackbar` 组件用于向用户显示快速消息。 Snackbars 支持定位、移除延迟和回调。

<entry-ad />

## 使用

`v-snackbar` 以最简单的形式向用户显示一个临时且可关闭的通知。

<example file="v-snackbar/usage" />

## API

- [v-snackbar](/api/v-snackbar)

<inline-api page="components/snackbars" />

## 示例

### 属性

#### 多行

**multi-line** 属性扩展了 `v-snackbar` 的高度，让您有更多的内容空间。

<example file="v-snackbar/prop-multi-line" />

#### 超时

**timeout** 属性允许您自定义 `v-snackbar` 隐藏之前的延迟。

<example file="v-snackbar/prop-timeout" />

#### 变体

使用 **text**, **shaped**, **outlined**等属性将不同样式应用于snackbar。

<example file="v-snackbar/prop-variants" />

#### 垂直

**vertical** 属性允许您堆叠 `v-snackbar` 的内容。

<example file="v-snackbar/prop-vertical" />

<backmatter />
