---
meta:
  title: Lazy 懒加载
  description: 懒加载组件允许你根据用户的视口动态渲染内容。
  keywords: 懒加载
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# 懒加载 (Lazy)

`v-lazy` 组件用于根据元素的可见性动态加载组件。

<entry-ad />

## 使用

`v-lazy` 组件默认情况下并不会显示它的内容, 直到它与屏幕相交。 向下滚动并在经过元素时观察它的显示。

<example file="v-lazy/usage" />

## API

- [v-lazy](/api/v-lazy)

<inline-api page="components/lazy" />

## 注意

<alert type="info">

  `v-lazy` 组件使用 [v-intersect](/directives/intersect) 指令，它需要 [Polyfill](/directives/intersect#polyfill) 才能在 IE11 / Safari中工作。 它可以在某些iOS版本上使用但是同样需要此polyfill。

</alert>

<backmatter />
