---
meta:
  title: Virtual scroller 虚拟滚动条
  description: 虚拟滚动组件是一个只渲染可见元素的容器。 当需要显示大量统一的数据时非常有用。
  keywords: 虚拟滚动, vuetify 虚拟滚动组件, vue 虚拟滚动组件, v-virtual-scroll组件
related:
  - /components/lists/
  - /components/data-tables/
  - /components/data-iterators/
---

# Virtual scroller (虚拟滚动条)

`v-virtual-scroll` 组件显示一个虚拟，_无限_ 的列表。 它支持动态高度和垂直滚动。

<entry-ad />

## 使用

虚拟滚动程序只显示足够的记录来填充视图，并使用现有组件，并用新的数据对其进行再填充。

<usage name="v-virtual-scroll" />

## API

- [v-virtual-scroll](/api/v-virtual-scroll)

<inline-api page="components/virtual-scroller" />

## 注意

<alert type="info">

我们正在将`v-virtual-scroll`组件纳入现有功能和组件中。 如果您对帮助感兴趣，请联系[Discord社区](https://community.vuetifyjs.com)**John Leider** 。

</alert>

## 示例

### 属性

#### Bench（替补）

默认情况下， `v-virtual-scroll` 不会预渲染出现在视图可见范围外的其它项。 使用 `bench` 属性会使滚动条渲染额外的项目作为 **替补**。 为了获得尽可能好的性能，建议尽量减小这个数字

<example file="v-virtual-scroll/prop-bench" />

### 其他

#### 用户目录

`v-virtual-scroll` 组件通过仅渲染填充滚动条所需要的内容来实现无限数量项目的渲染。

<example file="v-virtual-scroll/misc-user-directory" />

<backmatter />
