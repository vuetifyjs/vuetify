---
meta:
  title: Overflow button 溢出按钮
  description: 溢出按钮组件为一个选择创建了一个包含额外的特性和功能的界面。
  keywords: 溢出按钮，vuetify 按钮组件，vue 溢出按钮组件
related:
  - /components/forms/
  - /components/selection-controls/
  - /components/selects/
---

# Overflow buttons（溢出按钮）

`v-overflow-btn`用于让用户能够从列表中选择项目。 它有3个变化：`可编辑的`，`溢出`和`分段`

<entry-ad />

## 使用

`v-overflow-btn` 用于创建选择列表

<usage name="v-overflow-btn" />

## API

- [v-overflow-btn](/api/v-overflow-btn)

<inline-api page="components/overflow-btns" />

## 示例

### 属性

#### 计数器

您可以添加一个计数器到 `v-overflow-btn` 来控制最大字符数

<example file="v-overflow-btn/prop-counter" />

#### 紧凑

你可以使用`dense`属性来降低溢出按钮的高度并缩小列表项的最大高度。

<example file="v-overflow-btn/prop-dense" />

#### 禁用

`v-overflow-btn` 可以被禁用，以防止用户与其交互。

<example file="v-overflow-btn/prop-disabled" />

#### 可编辑

`可编辑的` `v-overflow-btn` 可以直接编辑，就像 `v-text-field`

<example file="v-overflow-btn/prop-editable" />

#### 填充

文本字段可以与其他(布局)盒子一起使用。

<example file="v-overflow-btn/prop-filled" />

#### 提示

您可以使用 `hint` 属性添加用户提示

<example file="v-overflow-btn/prop-hint" />

#### 加载

`v-overflow-btn`可以有`加载`状态，下面有一个线性进度条

<example file="v-overflow-btn/prop-loading" />

#### 菜单属性

您可以使用 `menu-props` 属性设置底层`v-menu` 属性

<example file="v-overflow-btn/prop-menu-props" />

#### 只读

`v-overflow-btn` 可以设置为 `readonly` 模式，它将处于非活动状态，但不会改变颜色

<example file="v-overflow-btn/prop-readonly" />

#### 分段

`分段的` `v-overflow-btn` 在内容和图标之间有额外的分隔符

<example file="v-overflow-btn/prop-segmented" />

<backmatter />
