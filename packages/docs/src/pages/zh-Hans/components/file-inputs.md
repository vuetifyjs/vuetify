---
meta:
  title: File input 文件上传
  description: 文件输入组件是一个专门的输入，提供了一个干净的选择界面，显示详细的选择信息和上传进度。
  keywords: 文件输入，文件上传，文件字段
related:
  - /components/text-fields/
  - /components/forms/
  - /components/icons/
---

# 上传文件 (File Input)

`v-file-input`是一个定制的输入组件，它提供了一个干净的选择界面，显示详细的选择信息和上传进度。 它意在直接取代标准文件输入。

<entry-ad />

## 使用

`v-file-input`组件的核心是一个基于[v-text-field](/components/text-fields)拓展的基本容器

<usage name="v-file-input" />

## API

- [v-file-input](/api/v-file-input)

<inline-api page="components/file-inputs" />

## 示例

### 属性

#### Accept（接收格式）

`v-file-input`组件可以选择接收你想要的媒体格式/文件类型 查看[accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)文档来获取更多信息。

<example file="v-file-input/prop-accept" />

#### 纸片 (Chip)

上传的文件可以作为[chip（纸片）](/components/chips)显示 同时启用**chips（纸片）**和**multiple（多选）**属性时，每个文件作为一个纸片显示（与选中文件数相反）

<example file="v-file-input/prop-chips" />

#### Counter（计数器）

当**show-size**属性和**counter**一同启用时，会下输入框下方显示文件总数和大小。

<example file="v-file-input/prop-counter" />

#### Dense（密集）

您可以使用`dense`属性降低文件输入高度。

<example file="v-file-input/prop-dense" />

#### Multiple（多选）

启用**multiple（多选）**属性可以使`v-file-input`同时包含多个文件

<example file="v-file-input/prop-multiple" />

#### Prepend icon（前置图标）

`v-file-input`拥有一个默认`prepend-icon`可以设置在组件上或在全局调整。 More information on changing global components can be found on the [customizing icons page](/features/icon-fonts).

<example file="v-file-input/prop-prepend-icon" />

#### Show size（显示大小）

**show-size（显示大小）**属性可以配置显示所选文件的尺寸 显示文件大小可以选择_1024_进位（提供**true**时默认使用）或_1000_进位

<example file="v-file-input/prop-show-size" />

#### Validation（验证）

与其他输入类似，您可以使用**rules** 属性来创建您自己的自定义验证参数。

<example file="v-file-input/prop-validation" />

### 插槽

#### Selection（选项）

使用 `selection` 插槽，您可以自定义输入选择的外观。 通常使用 [chips](/components/chips)完成，但您可以使用任何组件或标记。

<example file="v-file-input/slot-selection" />

### 其他

#### Complex selection slot（复杂选项插槽）

选项插槽的灵活性使其可以容纳复杂的用途。 在本示例中我们展示了如何只显示前两个文件并将剩余数量以计数器显示（当选中三个以上的文件时）

<example file="v-file-input/misc-complex-selection" />

<backmatter />
