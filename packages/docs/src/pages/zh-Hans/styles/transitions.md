---
meta:
  title: 过渡动画
  description: 利用 Vuetify 内置的 CSS 和 Javascript 将过渡应用到组件中。
  keywords: 运动, 过渡, vuetify 过渡
related:
  - /components/menus/
  - /styles/colors/
  - /components/expansion-panels/
---

# 过渡动画

平滑的动画让界面体验更好。 使用 Vue 的过渡系统和可复用的功能组件, 你可以轻松的控制应用程序的运动. 大多数组件可以通过 **stansition** prop改变它们的过渡动画.

<entry-ad />

## 使用

Vuetify 提供了 10 多个 css 动画模版，可快速应用于众多官方组件或自定义的组件上。

<example file="transitions/usage" />

## API

- [v-fab-transition](/api/v-fab-transition)
- [v-fade-transition](/api/v-fade-transition)
- [v-expand-transition](/api/v-expand-transition)
- [v-scale-transition](/api/v-scale-transition)
- [v-scroll-x-transition](/api/v-scroll-x-transition)
- [v-scroll-x-reverse-transition](/api/v-scroll-x-reverse-transition)
- [v-scroll-y-transition](/api/v-scroll-y-transition)
- [v-scroll-y-reverse-transition](/api/v-scroll-y-reverse-transition)
- [v-slide-x-transition](/api/v-slide-x-transition)
- [v-slide-x-reverse-transition](/api/v-slide-x-reverse-transition)
- [v-slide-y-transition](/api/v-slide-y-transition)
- [v-slide-y-reverse-transition](/api/v-slide-y-reverse-transition)

<inline-api page="styles/transitions" />

## 示例

### 属性

#### 自定义原点

用一个简单的 prop 以编程的方式控制变换原点。

<example file="transitions/prop-custom-origin" />

### 其他

#### Expand x

扩展过渡用于扩展面板和列表组。 同样还有一个水平版本 `v-expand-x-transition` 可用.

<example file="transitions/misc-expand-x" />

#### Fab

在 `v-speed-dial` 组件中可以找到fab过渡的示例.

<example file="transitions/misc-fab" />

#### Fade

在 Carousel 组件上可以找到淡入淡出过渡的示例。

<example file="transitions/misc-fade" />

#### Scale

许多 Vuetify 组件都包含一个 **transition** 属性允许你指定想要的效果。

<example file="transitions/misc-scale" />

#### Scroll x

X 轴滚动过渡沿着水平轴继续。

<example file="transitions/misc-scroll-x" />

#### Scroll y

Y 轴滚动过渡沿着垂直轴继续。

<example file="transitions/misc-scroll-y" />

#### Slide x

X 轴滑动过渡可沿水平方向移动。

<example file="transitions/misc-slide-x" />

#### Slide y

动画使用应用程序的 `$primary-transition`。

<example file="transitions/misc-slide-y" />

#### Todo list

使用多个自定义转场，可以轻松实现简单的待办事项清单！

<example file="transitions/misc-todo" />

## 创建您自己的

您可以使用Vuetify的过渡辅助功能来轻松创建您的自定义过渡。 此函数将返回一个可以导入 Vue 的对象. 使用 Vue 的 [功能组件](https://vuejs.org/v2/guide/render-function.html#Functional-Components) 选项将确保您的过渡尽可能有效。 只需导入函数：

```js
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('my-transition')

Vue.component('my-transition', myTransition)
```

**createSimpleTransition** 函数接受1个参数: name。 这个名称用于与您的过渡样式挂钩. 以下是 `v-fade-transition` 的示例:

```stylus
.fade-transition
  &-leave-active
    position: absolute

  &-enter-active, &-leave, &-leave-to
    transition: $primary-transition

  &-enter, &-leave-to
    opacity: 0
```

<backmatter />
