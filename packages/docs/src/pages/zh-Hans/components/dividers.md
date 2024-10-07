---
meta:
  title: Divider 分隔线
  description: 分隔线组件是列表或布局中常用来分隔内容组的细线。
  keywords: 分隔线, vuetify 分割线组件, vue 分割线组件
related:
  - /components/lists/
  - /components/navigation-drawers/
  - /components/toolbars/
---

# Dividers（分隔线）

`v-diver` 组件用于分隔列表或布局的各个部分。

<entry-ad />

## 使用

最简单的分隔线显示一条水平线。

<usage name="v-divider" />

## API

- [v-divider](/api/v-divider)

<inline-api page="components/dividers" />

## 示例

### 属性

#### 缩进

`inset`属性令分隔线向右缩进72px。 这将使他们与列表项保持一致。

<example file="v-divider/prop-inset" />

#### 垂直

垂直分隔线为您提供了更多用于独特布局的工具。

<example file="v-divider/prop-vertical" />

### 其他

#### 纵向视图

创建自定义卡片以适应任何用例.

<example file="v-divider/misc-portrait-view" />

#### Subheaders（副标题）

分割线和副标题可以帮助分解内容，并可以使用相同的 `inset` 属性来相互对齐。

<example file="v-divider/misc-subheaders" />

## 无障碍

默认， `v-divider` 组件被分配给 [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) 角色 [**separator**](https://www.w3.org/TR/wai-aria/#separator) 表示分隔符“分离并区分内容部分或菜单项的分组。” 然而，有时分隔符只是一种使界面看起来很好的方式。 在这种情况， [**presentation**](https://www.w3.org/TR/wai-aria/#presentation) 应该用来表示“一个其隐性本机角色不会被映射到可访问性API的元素”。 若要覆盖在 `v-divider`中默认的 **separator** 角色，只需添加一个 `role="presentation"` 属性到您的组件。 此外， `v-divider` 组件有一个 `aria-orientation="horizontal"` 属性。 如果 `vertical="true"`, 那么 `aria-orientation="vertical"` 也会自动设置。 如果 `role="presentation"`, 则默认`aria-orientation="undefined"`, 。

<backmatter />
