---
meta:
  title: 外部单击指令
  description: 当目标元素以外的东西被点击时，v-click-out指令会调用函数。
  keyword: 外部单击, 单击指令, vue 单击指令, vuetify 单击指令
related:
  - /components/dialogs/
  - /directives/intersect/
---

# 在外部点击

当目标元素以外的东西被点击时，`v-click-outside` 指令会调用指定的函数。 Vuetify 的一些组件已经用到了这条指令，例如 `v-menu` 和 `v-dialog`。

<entry-ad />

## 使用

`v-click-outside` 指令允许您提供一个处理函数并且在用户点击目标元素之外时被调用。

<example file="v-click-outside/usage" />

## API

- [v-click-outside](/api/v-click-outside)

<inline-api page="directives/click-outside" />

## 示例

### 可选项

#### 点击内容后关闭

可选地提供一个`closeOnOutsideClick` 处理函数，它返回`true`或`false`。 此函数决定是否调用外部点击函数。

<example file="v-click-outside/option-close-on-outside-click" />

#### Include

`include` 是本指令的一条可选参数，它的值是一个函数，这个函数需要返回一个 `HTMLElement` 数组。 此函数决定点击必须在哪些附加元素之外。

<example file="v-click-outside/option-include" />

<backmatter />
