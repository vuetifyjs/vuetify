---
meta:
  title: System bar 系统栏
  description: 系统栏组件创建了一个安卓风格的状态栏，它位于你的应用程序的顶部。
  keywords: 系统栏，vuetify 系统栏组件，vue 系统栏组件，android 状态栏，状态栏
related:
  - /components/buttons/
  - /components/toolbars/
  - /components/tabs/
---

# System bars（系统栏）

`v-system-bar` 组件可以用于向用户显示状态。 它看起来像Android系统栏，可以包含图标、空格和一些文本。

<entry-ad />

## 使用

`v-system-bar` 最最简单的形式是显示一个带有默认主题的小容器。

<usage name="v-system-bar" />

## API

- [v-system-bar](/api/v-system-bar)

<inline-api page="components/system-bars" />

## 示例

### 属性

#### 颜色

您可以选择使用 `color` prop更改 `v-system-bar` 的颜色。

<example file="v-system-bar/prop-color" />

#### 熄灯

您可以使用 `lights-out` 属性来降低 `v-system-bar` 的不透明度。

<example file="v-system-bar/prop-lights-out" />

#### 主题

可以将dark或light主题变量应用于 `v-system-bar`。

<example file="v-system-bar/prop-themes" />

#### 窗口

带有窗口控件和状态信息的窗口栏。

<example file="v-system-bar/prop-window" />

<backmatter />
