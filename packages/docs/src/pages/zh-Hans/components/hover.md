---
meta:
  title: Hover 悬停
  description: 悬停组件通过包裹可选择的内容，当用户悬停事件发生时，悬停组件可以轻松响应。
  keywords: 悬停，vuetify 悬停组件，vue 悬停组件
related:
  - /components/cards/
  - /components/images/
  - /components/tooltips/
---

# 悬停 (Hover)

`v-hover` 组件为处理任何组件的悬停状态提供了一个干净的接口。

<entry-ad />

## 使用

`v-hover`组件是一个包装器，它应该只包含一个子元素并且可以在悬停时可以触发事件。 In order for `v-hover` to work properly, either the **value** prop should be set to `true` or the wrapped element should contain `v-slot="{ wrapper }"`.

<usage name="v-hover" />

## API

- [v-hover](/api/v-hover)

<inline-api page="components/hover" />

## 示例

### 属性

#### 禁用

**disabled** prop 禁用了悬停功能.

<example file="v-hover/prop-disabled" />

#### 打开和关闭延迟

通过组合或单独使用 **open-delay** 和 **close-delay** props 延迟 `v-hover` 事件。

<example file="v-hover/prop-open-and-close-delay" />

### 其他

#### 悬停列表

`v-hover` 可以与 `v-for` 结合使用，以便在用户与列表交互时突出单个项目。

<example file="v-hover/misc-hover-list" />

#### 过渡

创建高度定制的组件以响应用户交互。

<example file="v-hover/misc-transition" />

<backmatter />
