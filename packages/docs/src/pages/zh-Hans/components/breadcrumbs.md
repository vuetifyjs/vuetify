---
meta:
  title: Breadcrumbs 面包屑
  description: 面包屑组件是页面的导航辅助。 它可以接受Material图标或文本字符作为分隔符。
  keywords: 面包屑, vuetify 面包屑组件, vue 面包屑组件, v-breadcrumbs 组件
related:
  - /components/buttons/
  - /components/navigation-drawers/
  - /components/icons/
---

# Breadcrumbs（面包屑导航）

`v-breadcrumbs` 组件是页面的导航辅助。 它可以接受 ** Material图标** 或文本字符作为分隔符。 对象数组可以传递到组件的 ** items ** 属性。  此外，还存在更多控制面包屑的插槽，使用 `v-breadcrumbs-item ` 或其他自定义标记。

<entry-ad />

## 使用

默认情况下，面包屑导航使用文本分隔符。 可以是任何字符串。

<usage name="v-breadcrumbs" />

## API

- [v-breadcrumbs](/api/v-breadcrumbs)
- [v-breadcrumbs-item](/api/v-breadcrumbs-item)

<inline-api page="components/breadcrumbs" />


<!-- ## Sub-components

### v-breadcrumbs-item

v-breadcrumbs-item description -->

## 注意

<alert type="info">

  默认情况下，`v-backscrumbs` 将禁用嵌套路径中截到当前页面的所有路径。 可以通过对 `items` 数组中每个适用的面包屑使用 `exact: true` 来防止这种行为。

</alert>

## 示例

### 属性

#### 分隔线

可以使用 `divider` 属性来设置面包屑分隔符。

<example file="v-breadcrumbs/prop-divider" />

#### 大号

大的面包屑具有较大的字体。

<example file="v-breadcrumbs/prop-large" />

### 插槽

#### 图标分隔符

对于图标变量，面包屑可以使用Material设计中的任何图标。

<example file="v-breadcrumbs/slot-icon-dividers" />

#### 项目

您可以使用 ` item ` 插槽自定义每个面包屑。

<example file="v-breadcrumbs/slot-item" />

<backmatter />
