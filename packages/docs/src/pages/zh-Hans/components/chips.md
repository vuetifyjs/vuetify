---
meta:
  title: Chip 纸片
  description: 纸片组件允许用户输入信息，进行选择、过滤内容或触发动作。
  keywords: 纸片, vuetify 纸片组件, vue 纸片组件
related:
  - /components/avatars/
  - /components/icons/
  - /components/selects/
---

# 纸片 (Chip)

`v-chip`组件用于传送小信息。 使用`close`属性，纸片将变为交互式，允许用户进行交互。 此组件由 [v-chip-group](/components/chip-groups) 用于高级选择选项。

<entry-ad />

## 使用

纸片有以下几种变化：封闭式、过滤式、轮廓式、药丸式。 `v-chip` 的默认插槽也接受文本旁边的头像和图标。

<usage name="v-chip" />

## API

- [v-chip](/api/v-chip)

<inline-api page="components/chips" />

## 示例

### 属性

#### 可关闭

可关闭的纸片可以使用 v-model控制。 您也可以侦听`click:close`事件，如果您想知道纸片何时关闭。

<example file="v-chip/prop-closable" />

#### 色彩

Material Design 调色板中的任何颜色都可用于更改纸片颜色。

<example file="v-chip/prop-colored" />

#### 可拖动

`可拖拽`, `v-chip` 组件可以被鼠标拖拽

<example file="v-chip/prop-draggable" />

#### 过滤器

`v-chip` 组件有 ` filter ` 选项，在纸片处于活动状态时向您显示额外的图标。 可以使用 `filter-icon` 来自定义。

<example file="v-chip/prop-filter" />

#### 标签

纸片标签使用 `v-card` 边框半径

<example file="v-chip/prop-label" />

#### 无波纹

`v-chip` 可以在 `ripple` prop 被设置为 `false` 情况下不渲染波纹效果

<example file="v-chip/prop-no-ripple" />

#### 轮廓

轮廓纸片从当前文本颜色继承其边框颜色。

<example file="v-chip/prop-outlined" />

#### 大小

`v-chip` 组件可以有从 `x-small` 到 `x-large` 不同的大小.

<example file="v-chip/prop-sizes" />

### 事件

#### 行为纸片

纸片可以用作可操作的项目。 只要有 _click_ 事件，纸片就会变成可交互并且可以调用方法。

<example file="v-chip/event-action-chips" />

### 插槽

#### 图标

纸片可以使用文本或“ Material Icons 字体库中可用的任何图标。

<example file="v-chip/slot-icon" />

### 其他

#### 自定义列表

在这个示例中，我们选择使用自定义列表而不是 [v-autocomplete](/components/autocompletes)。 这使我们能够始终显示可用的选项，同时提供相同的搜索和选择功能。

<example file="v-chip/misc-custom-list" />

#### 可展开

纸片可与`v-menu`组合使用，为纸片启用一组特定的操作。

<example file="v-chip/misc-expandable" />

#### 过滤

纸片非常适合为特定任务提供辅助操作。 在本例中，我们搜索一个项目列表并收集一个子集信息以显示可用的关键字。

<example file="v-chip/misc-filtering" />

#### 选中

选择可以使用纸片显示所选数据。 尝试在下方添加您自己的标签。

<example file="v-chip/misc-in-selects" />

<backmatter />
