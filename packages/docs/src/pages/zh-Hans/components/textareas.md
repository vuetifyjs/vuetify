---
meta:
  title: Textarea 文本区域
  description: 多行文本框组件是一个接受用户输入长篇文字的文本字段。
  keywords: 多行文本框, vuetify 多行文本框组件, vue 多行文本框组件
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
---

# 多行文本框 (Textareas)

多行文本框组件用于收集大量文本数据。

<entry-ad />

## 使用

`v-textarea`最简单的形式是多行文本字段，对于大量文本非常有用。

<example file="v-textarea/usage" />

## API

- [v-textarea](/api/v-textarea)

<inline-api page="components/textareas" />

## 示例

### 属性

#### 自动增长

当使用 `auto-grow` prop 时，当包含的文本超过其大小时，多行文本框的大小将自动增加。

<example file="v-textarea/prop-auto-grow" />

#### 背景色

`background-color` 和 `color` prop 让您更多地控制 `v-textarea` 的样式。

<example file="v-textarea/prop-background-color" />

#### 浏览器自动补全

`autocomplete` prop 让您可以启用浏览器预测用户输入的选项。

<example file="v-textarea/prop-browser-autocomplete" />

#### 可清除

您可以使用`clearable` prop 从 `v-textarea` 清除文本，并使用 `clearable-icon` prop 自定义清除图标。

<example file="v-textarea/prop-clearable" />

#### 计数器

`counter` prop 通知用户 `v-textarea` 的字符限制。

<example file="v-textarea/prop-counter" />

#### 图标 (Icons)

`append-icon` 和 `prepend-icon` props 帮助将上下文添加到 `v-textarea`.

<example file="v-textarea/prop-icons" />

#### 禁止缩放

`v-textarea`可以选择使用`no-resize` prop 保持相同的大小，而不管其内容大小。

<example file="v-textarea/prop-no-resize" />

#### 行数

`rows` prop 允许您定义textarea有多少行，当与`row-height` prop 结合使用时，您可以通过定义行的高度来进一步自定义行。

<example file="v-textarea/prop-rows" />

### 其他

#### 注册表单

利用替代的输入样式，您可以创建易于构建和使用的惊人界面。

<example file="v-textarea/misc-signup-form" />

<backmatter />
