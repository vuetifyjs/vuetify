---
meta:
  title: FAB 浮动按钮
  description: 浮动动作按钮（或 FAB）组件是一个被提升的动作，它被提升到 UI 的上方或附加到卡片等元素上。
  keywords: 浮动动作按钮, fab, vuetify fab 组件, vue fab 组件
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
---

# Buttons: Floating Action Button (按钮: 浮动动作按钮)

`v-btn` 组件可以用作浮动动作按钮。 这提供了一个具有主要行为点的应用程序。 结合 `v-speed-dial` 组件, 您可以创建一组可供用户使用的功能。

<entry-ad />

## 使用

浮动动作按钮可以附加到material上来表示应用程序中的提升操作。 在大多数情况下，将使用默认大小，而 `small` 变量可用于与大小相似的元素保持连续性。

<usage name="v-btn-fab" alt="v-btn" />

## API

- [v-btn](/api/v-btn)
- [v-speed-dial](/api/v-speed-dial)

<inline-api page="components/floating-action-buttons" />


<!-- ## Sub-components

### v-speed-dial

v-speed-dial description -->

## 示例

### 其他

#### 显示时的动画

当第一次显示时，浮动动作按钮应该在屏幕上显示动画。 这里我们使用v-show和 `v-fab-transition` 。 您也可以使用由Vuetify或自己提供的自定义过度。

<example file="v-btn-fab/misc-display-animation" />

#### 横向屏幕切换

当更改按钮的默认操作时，建议您显示一个过度来表示更改。 我们通过将`key`prop 绑定到一段数据上，该数据可以正确地向Vue 过度系统发出操作变化的信号。 虽然您可以为此使用自定义转换，但请确保将`mode` prop 设置为<strong x-id=“1”>out-in</strong>。

<example file="v-btn-fab/misc-lateral-screens" />

#### 小型按钮

为了达到更好的视觉效果，我们可以使用小型按钮以适配列表的头像。

<example file="v-btn-fab/misc-small" />

#### 快速拨号

`v-speed-dial` 组件为浮动动作按钮提供了强大的 api，你可以尽情定制你想要的效果。

<example file="v-btn-fab/misc-speed-dial" />

<backmatter />
