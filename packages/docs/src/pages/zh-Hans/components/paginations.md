---
meta:
  title: Pagination 分页
  description: 分页组件用于分离长数据集，以便用户消化信息。
  keywords: 分页, vuetify 分页组件, vue 分页组件
related:
  - /components/data-iterator/
  - /components/data-tables/
  - /components/lists/
---

# Pagination（分页）

`v-pagination` 组件用于分离长数据集，以便用户消化信息。 根据提供的数据量，分页组件将自动缩放。 要维护当前页面，只需提供 **v-model** 属性。

<entry-ad />

## 使用

分页默认根据设置的 **length** 属性显示页数，两边有 **prev** 和 **next** 按钮帮助导航。

<example file="v-pagination/usage" />

## API

- [v-pagination](/api/v-pagination)

<inline-api page="components/paginations" />

## 示例

### 属性

#### 圆形

**circle** 属性为你提供了分页按钮的另一种样式。

<example file="v-pagination/prop-circle" />

#### 禁用

使用 **disabled** 属性，可以手动禁用分页。

<example file="v-pagination/prop-disabled" />

#### 图标 (Icons)

上一页和下一页的图标可以通过 **prev-icon** 和 **next-icon** 属性自定义。

<example file="v-pagination/prop-icons" />

#### 长度

使用 **length** 属性可以设置 `v-pagination` 的长度，如果页面按钮的数量超过了父容器，分页将被从中截断。

<example file="v-pagination/prop-length" />

#### 最大可见分页数

你也可以通过 **total-visible** 属性手动设置最大可见分页数。

<example file="v-pagination/prop-total-visible" />

<backmatter />
