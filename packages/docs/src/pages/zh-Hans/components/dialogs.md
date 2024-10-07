---
meta:
  title: Dialog 对话框
  description: 对话框组件告知用户特定的任务，可能包含关键信息，或要求用户采取特定行动。
  keywords: 对话框, vuetify 对话框组件, vue 对话框组件
related:
  - /components/buttons/
  - /components/cards/
  - /components/menus/
---

# Dialogs（对话框）

`v-dialog` 组件通知用户特定的任务，可能包含关键信息、需要决策或涉及多个任务。 尽量少用对话框，因为它们会中断(流程)。

<entry-ad />

## 使用

对话框包含两个插槽，一个用于它的激活器，另一个用于它的内容（默认）。 有利于隐私政策。

<example file="v-dialog/usage" />

## API

- [v-dialog](/api/v-dialog)

<inline-api page="components/dialogs" />

## 示例

### 属性

#### 全屏对话框

由于屏幕空间有限，相对于使用普通对话框的大屏设备，全屏对话框更适合移动设备。

<example file="v-dialog/prop-fullscreen" />

#### 过渡动画

您可以让对话框从顶部或底部出现。

<example file="v-dialog/prop-transitions" />

#### 保留

与普通对话框相似，但当用户点击对话框外部或按下 **esc** 键时，对话框不会关闭。

<example file="v-dialog/prop-persistent" />

#### 可滚动

一个可滚动内容的对话框示例。

<example file="v-dialog/prop-scrollable" />

### 其他

#### 表单

一个简单的表单对话框的例子。

<example file="v-dialog/misc-form" />

#### 加载器

`v-dialog` 组件可以轻松为您的应用程序创建自定义加载体验。

<example file="v-dialog/misc-loader" />

#### 嵌套

对话框可以嵌套：可以从一个对话框打开另一个对话框。

<example file="v-dialog/misc-nesting" />

#### 溢出

若对话框内容溢出，将在对话框内显示滚动条。

<example file="v-dialog/misc-overflowed" />

#### 没有激活器

如果因为某些原因不能使用激活器插槽，请确保将 `.stop` 修饰符添加到触发对话框的事件。

<example file="v-dialog/misc-without-activator" />

<backmatter />
