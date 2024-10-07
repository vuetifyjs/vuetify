---
meta:
  title: Window 窗口
  description: 窗口组件是一个包装器容器，允许在内容之间过渡。 它是标签页和轮播的基础。
  keywords: 窗口，vuetify 窗口组件，vue 窗口组件
  related:
    - /components/carousels
    - /components/steppers
    - /components/tabs
---

# 窗格 (Windows)

`v-window`组件提供了将内容从一个窗格过渡到另一个窗格的基础功能。 其他组件如`v-tabs`、`v-carousel`和`v-stepper`使用此组件作为其核心。

<entry-ad />

## 使用

`v-window` 被设计成可以轻松地循环浏览内容，它提供了一个简单的接口来创建真正的自定义实现。

<example file="v-window/usage" />

## API

- [v-window](/api/v-window)
- [v-window-item](/api/v-window-item)

<inline-api page="components/windows" />


<!-- ## Sub-components

### v-window-item

v-window-item description -->

## 示例

`v-window` 被设计成可以轻松地循环浏览内容，它提供了一个简单的接口来创建真正的自定义实现。

### 属性

#### 反转

反转 `v-window` 总是显示反向过渡。

<example file="v-window/prop-reverse" />

#### 垂直

`v-window` 可以是垂直的。 垂直窗口有 Y 轴过渡而不是 X 轴过渡。

<example file="v-window/prop-vertical" />

#### 自定义箭头按钮

可以用 **prev** 和 **next** 槽来自定义窗口中的箭头部分。

<example file="v-window/slots-next-prev" />

### 其他

#### 创建账户

创建具有平滑动画的丰富表单。 `v-window` 能够自动跟踪当前的选择索引，来改变过渡动画的方向。 这可以通过 **reverse** prop 来手动控制。

<example file="v-window/misc-account-creation" />

#### 新手教学

`v-window` 使创建自定义组件（如不同样式的幻灯片）变得很轻松。

<example file="v-window/misc-onboarding" />

<backmatter />
