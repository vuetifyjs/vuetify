---
meta:
  title: Banner 横幅
  description: Banner组件为用户显示一条重要而简洁的信息. 它还可以为用户采取的行动提供依据。
  keywords: banners, vuetify banner组件, vue banner组件
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
---

# 横幅 (Banners)

`v-banner` 横幅组件被用来作为向用户发送1-2动作的中间断信息。 它有两个变量 **单行** and **多行** (默示)。 这些图标可以与您的消息和操作一起使用。

<entry-ad />

## 使用

横幅可以有 1-2 行文本、动作和图标。

<usage name="v-banner" />

## API

- [v-banner](/api/v-banner)

<inline-api page="components/banners" />

## 示例

### 属性

#### 单行亮色主题

**单行文字**的`v-banner`横幅组件是为了向用户传达少量的资料。它被推荐在**桌面端**使用。 为此，您可以选择启用**sticky**属性，使您的`v-banner`横幅组件可被固定在屏幕的某个位置上。（注意：此项功能不适用于IE 11浏览器）。 前往 [此网站](https://developer.mozilla.org/en-US/docs/Web/CSS/position) 可获得更多有关在网页上固定元素位置的详情。

<example file="v-banner/prop-single-line" />

### 事件

#### 图标包

横幅上的图标在点击时发出 `click:icon` 事件，该事件带有自定义图标插槽。

<example file="v-banner/event-icon-click" />

### 插槽

#### 行为

`Actions` 插槽在其范围内具有 `dismiss` 功能，你可以使用它来轻松地隐藏横幅。

<example file="v-banner/slot-actions" />

#### 图标

图标插槽允许你明确控制其包含的内容和功能。

<example file="v-banner/slot-icon" />

### 其他

#### 两行

**双行**的`v-banner`横幅组件可用来放置更多的文字或数据，以向用户传达性质较大的信息。 这项功能被推荐应用在**移动端**上。

<example file="v-banner/misc-two-line" />

<backmatter />
