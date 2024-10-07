---
meta:
  title: 交叉观察者指令
  description: Intersection observer指令使用intersection observer API。 它允许您确定元素何时在屏幕上可见。
  keywords: 交叉, vuetify交叉指令, 交叉观察者指令
related:
  - /components/cards/
  - /components/images/
---

# 交叉观察者

`v-intersect `指令使用<a href=“https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API“>Intersection Observer API</a>。 它提供了一个易于使用的接口，用于检测元素在用户视图中是否可见。 这也适用于 [v-lazy](/components/lazy) 组件。

<entry-ad />

## 使用

滚动窗口并观察彩色点。 请注意，当<a href=“/components/cards”>v-cards</a>出现时，它会从error变为success。

<example file="v-intersect/usage" />

## API

- [v-intersect](/api/v-intersect)

<inline-api page="directives/intersect" />

## 注意

<alert type="info">

  [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)默认情况下在IE11中不可用，它可以使用[polyfill]实现(https://github.com/w3c/IntersectionObserver)

</alert>

## 示例

### 属性

#### 选项

`v-intersect` 指令接受选项。 可用的选项可以在 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 中找到。 下面是一个使用 ` threshold ` 选项的示例。

<example file="v-intersect/prop-options" />

<backmatter />
