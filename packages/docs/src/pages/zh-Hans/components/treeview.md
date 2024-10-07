---
meta:
  title: Treeview 树形视图
  description: 树形视图组件是一个用户界面，用来表示树状结构中的分层数据。
  keywords: 树形视图, vuetify 树形视图组件, vue 树形视图组件
related:
  - /components/lists/
  - /components/list-item-groups/
  - /components/timelines/
---

# Treeview（树形视图）

`v-treeview` 组件适用于显示大量嵌套数据。

<entry-ad />

## 使用

一个基本示例

<example file="v-treeview/usage" />

## API

- [v-treeview](/api/v-treeview)

<inline-api page="components/treeview" />

## 示例

### 属性

#### 可激活

树形视图节点可以将其激活。

<example file="v-treeview/prop-activatable" />

#### 颜色

您可以控制活动的树形视图节点的文本和背景颜色。

<example file="v-treeview/prop-color" />

#### 密集模式

`dense`属性激活密集模式，提供了更紧凑的布局，同时降低了项目的高度。

<example file="v-treeview/prop-dense" />

#### 可悬停的

`hoverable` 属性令树形视图节点可以具有悬停效果。

<example file="v-treeview/prop-hoverable" />

#### 禁用项目

设置 **item-disabled** 属性，控制节点哪个属性在设置为 `true`时禁用节点。

<example file="v-treeview/prop-item-disabled" />

#### 加载子项

您可以通过提供 _promise_ 回调到 **load-children** 属性，来动态加载子数据。 此回调将在用户首次试图扩展一个包含一个空数组的子属性的项目时执行。

<example file="v-treeview/prop-load-children" />

#### 打开全部

树形视图节点可以在页面加载时预先打开。

<example file="v-treeview/prop-open-all" />

#### Rounded（圆角）

您可以使树视图节点变成圆角。

<example file="v-treeview/prop-rounded" />

#### 可选择

您可以轻松选择树形视图节点和子节点。

<example file="v-treeview/prop-selectable" />

#### 选择颜色

您可以控制所选节点复选框的颜色。

<example file="v-treeview/prop-selected-color" />

#### 选择类型

属性视图支持两种不同的选择类型。 默认类型是 **leaf**，它在 v-model 数组中只包含选中的叶节点。 但会渲染父节点状态为全选或半选。 另一种模式是 **independent**，允许选择父节点，但每个节点都独立于其父节点。

<example file="v-treeview/prop-selection-type" />

#### 形状

形状的树形视图在节点的一侧具有圆形边界。

<example file="v-treeview/prop-shaped" />

### 插槽

#### 附加和标签

使用 **label**和一个 **append** 插槽，我们能够创建一个直观的文件浏览器。

<example file="v-treeview/slot-append-and-label" />

### 其他

#### 搜索&过滤

使用 **search** 属性，轻松过滤您的树形视图。 如果您需要区分大小写或模糊过滤，通过设置 **filter** 树形，您可以轻松地应用您的自定义过滤功能。 这类似于 [v-autocomplete](/components/autocompletes) 组件。

<example file="v-treeview/misc-search-and-filter" />

#### 可选择的图标

为你的可选择树形视图自定义 **选中**, **未选中** 以及 **半选** 图标。 与诸如API加载项目等其他高级功能合并。

<example file="v-treeview/misc-selectable-icons" />

<backmatter />
