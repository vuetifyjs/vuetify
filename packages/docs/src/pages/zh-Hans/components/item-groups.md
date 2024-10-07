---
meta:
  title: Item group 项目组
  description: 项目组组件提供了从任何组件中创建可选择的项目组的能力。
  keywords: 项目组，vuetify 项目组组件，vue 项目组组件
related:
  - /components/button-groups/
  - /components/carousels/
  - /components/tabs/
---

# 项目组 (Item groups)

`v-item-group`提供从任何组件中创建一组可选项的功能。 这是`v-tabs`和`v-carousel` 等组件的基本功能。

<entry-ad />

## 使用

`v-item-group`的核心用法是创建由<strong x-id=“1”>model</strong>控制的任何对象的组。

<example file="v-item-group/usage" />

## API

- [v-item](/api/v-item)
- [v-item-group](/api/v-item-group)

<inline-api page="components/item-groups" />


<!-- ## Sub-components

### v-item

v-item description -->

## 示例

### 属性

#### 激活类

The **active-class** property allows you to set custom CSS class on active items.

<example file="v-item-group/prop-active-class" />

#### 必填项

**mandatory** 项目组必须至少选择一个项目。

<example file="v-item-group/prop-mandatory" />

#### 多选

项目组可以选择 **多个** 个项目。

<example file="v-item-group/prop-multiple" />

### 其他

#### 纸片 (Chip)

轻松绑定自定义纸片组。

<example file="v-item-group/misc-chips" />

#### 选择

当图标允许选择或取消选择单个选项（例如将项目标记为收藏）时，它们可以用作切换按钮。

<example file="v-item-group/misc-selection" />

<backmatter />
