---
meta:
  title: List 列表
  description: 列表组件是一组连续的文字、图像和图标，以及可选的基本的或补充的操作。
  keywords: 列表, vuetify 列表组件, vue 列表组件
related:
  - /components/item-groups/
  - /components/list-item-groups/
  - /components/subheaders/
---

# 列表 (Lists)

`v-list` 组件用于显示信息。 它可以包含头像、内容、操作、列表组标题等等。 列表以易于在集合中识别特定项目的方式显示内容。 它们为组织一组文本和图像提供了一致的样式。

<entry-ad />

## 使用

列表有三种基本形式。 **单行** (默认), **双行** 和 **三行**. 行声明指定了项目的最小高度，也可以使用相同的属性从 `v-list` 中进行控制。

<example file="v-list/usage" />

## API

- [v-list](/api/v-list)
- [v-list-group](/api/v-list-group)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-item-group)
- [v-list-item-icon](/api/v-list-item-icon)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<inline-api page="components/lists" />


<!-- ## Sub-components

### v-list-item

v-list-item description

### v-list-item-action

v-list-item-action description

### v-list-item-action-text

v-list-item-action-text description

### v-list-item-avatar

v-list-item-avatar description

### v-list-item-content

v-list-item-content description

### v-list-item-subtitle

v-list-item-subtitle description

### v-list-item-title

v-list-item-title description -->

## 注意

<alert type="info">

  如果您要查找有状态列表项，请查看 [v-list-item-group](/components/list-item-groups)。

</alert>

## 示例

### 属性

#### 密集

`v-list` 可以通过 **dense** 属性来减小高度。

<example file="v-list/prop-dense" />

#### 禁用

您不能与已禁用的 `v-list` 交互。

<promoted-ad slug="vuetify-lux-admin-pro" />

<example file="v-list/prop-disabled" />

#### 扁平

Items don't change when selected in `v-list` with **flat** property.

<example file="v-list/prop-flat" />

#### 导航列表

Lists can receive an alternative **nav** styling that reduces the width `v-list-item` takes up as well as adding a border radius.

<example file="v-list/prop-nav" />

#### Rounded（圆角）

You can make `v-list` items rounded.

<example file="v-list/prop-rounded" />

#### 形状列表

Shaped lists have rounded borders on one side of the `v-list-item`.

<example file="v-list/prop-shaped" />

#### 嵌套列表

Using the `v-list-group` component you can create up to **2** levels in depth using the **sub-group** prop.

<example file="v-list/prop-sub-group" />

#### 三行

For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature uses [line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp) and is not supported in all browsers.

<example file="v-list/prop-three-line" />

#### 两行和副标题

Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis if it extends past one line.

<example file="v-list/prop-two-line-and-subheader" />

### 插槽

#### 可展开的列表

A list can contain a group of items which will display on click utilizing `v-list-group`'s `activator` slot. Expansion lists are also used within the **[v-navigation-drawer](/components/navigation-drawers)** component.

<example file="v-list/slot-expansion-lists" />

### 其他

#### 操作和项目组

A **three-line** list with actions. Utilizing **[v-list-item-group](/components/list-item-groups)**, easily connect actions to your tiles.

<example file="v-list/misc-action-and-item-groups" />

#### 操作栈

A list can contain a stack within an action. This is useful when you need to display meta text next to your action item.

<example file="v-list/misc-action-stack" />

#### 卡片列表

A list can be combined with a card.

<example file="v-list/misc-card-list" />

#### 简单头像列表

A simple list utilizing `v-list-item-icon`, `v-list-item-title` and `v-list-item-avatar`.

<example file="v-list/misc-simple-avatar-list" />

#### 单行列表

Here we combine **v-list-item-avatar** and **v-list-item-icon** in a single-line list.

<example file="v-list/misc-single-line-list" />

#### 列表组标题和分割线

Lists can contain multiple subheaders and dividers.

<example file="v-list/misc-subheadings-and-dividers" />

<backmatter />
