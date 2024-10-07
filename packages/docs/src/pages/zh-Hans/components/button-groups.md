---
meta:
  title: Button group 按钮组
  description: Button group组件允许您在单行中合并一系列可选按钮。
  keywords: button group，vuetify 按钮组，vue 按钮组
related:
  - /components/buttons/
  - /components/icons/
  - /components/selection-controls/
---

# Button groups（按钮组）

`v-btn-toggle` 组件是专门针对` v-btn `构建的 `v-item-group `的简单包装器。

<entry-ad />

## 使用

切换按钮允许您创建一个样式化的按钮组，可以在单个 **v-model** 下选择或切换

<example file="v-btn-toggle/usage" />

## API

- [v--btn-toggle](/api/v-btn-toggle)
- [v-btn](/api/v-btn)

<inline-api page="components/button-groups" />

## 示例

### 属性

#### 必填项

`v-btn-toggle` 带有 **mandatory** 属性 将总是有一个（被选中的）值。

<example file="v-btn-toggle/prop-mandatory" />

#### 多选

一个 `v-btn-twitch` 带有 **multiple** 属性将允许用户选中多个值并以数组的形式返回。

<example file="v-btn-toggle/prop-multiple" />

#### 圆角

你可以使用 **rounded** 属性让 `v-btn-toggle` 变成圆角样式。

<example file="v-btn-toggle/prop-rounded" />

### 其他

#### 工具栏

可与 `v-toolbar` 轻松集成自定义按钮方案。

<example file="v-btn-toggle/misc-toolbar" />

#### WYSIWYG/所见即所得

对类似的操作进行分组，并设计自己的 WYSIWYG 组件。

<example file="v-btn-toggle/misc-wysiwyg" />

<backmatter />
