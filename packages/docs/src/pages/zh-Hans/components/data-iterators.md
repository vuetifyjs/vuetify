---
meta:
  title: Data iterator 数据迭代器
  description: 数据迭代器组件用于过滤和显示数据，包括排序、搜索、分页和选择。
  keywords: 数据迭代器，vuetify 数据迭代器组件，vue 数据迭代器组件
related:
  - /components/data-tables/
  - /components/simple-tables/
  - /components/toolbars/
---

# 数据迭代器（Data iterators）

`v-data-iterator` 组件用于显示数据，并且与 `v-data-table` 组件共享其大部分功能。 功能包括排序、搜索、分页和选择。

<entry-ad />

## 使用

`v-data-iterator` 允许您自定义如何显示您的数据。 在本例中，我们使用的是带卡片的网格。

<usage name="v-data-iterator" />

## API

- [v-data-iterator](/api/v-data-iterator)
- [v-data-footer](/api/v-data-footer)

<inline-api page="components/data-iterators" />

## 示例

### 插槽

#### 默认插槽

`v-data-iterator` 的内部具有选择和扩展状态，就像 `v-data-table` 一样。 在这个示例中，我们在默认插槽上使用使用 `isExpanded` 和 `expand` 。

<example file="v-data-iterator/slot-default" />

#### 页眉和页脚

`v-data-iterator` 有用于添加额外内容的header和footer插槽。

<example file="v-data-iterator/slot-header-and-footer" />

### 其他

#### 过滤器

排序，过滤和分页可以从外部使用单独的 props 进行控制

<example file="v-data-iterator/misc-filter" />

<backmatter />
