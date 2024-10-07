---
meta:
  title: Skeleton loader 骨架屏
  description: v-skeleton-loader 组件是一个多功能工具，可以在一个项目中填充许多角色。 在其核心部分，该组件向用户提供了一个指示，指出某些东西即将出现但尚未可用。
  keywords: 骨架屏加载器、material 加载器、栏加载器
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/buttons/
---

# 骨架装载器（Skeleton Loaders）

v-skeleton-loader 组件是一个多功能工具，可以在一个项目中填充许多角色。  在其核心部分，该组件向用户提供了一个指示，指出某些东西即将出现但尚未可用。 有超过30个预先定义的选项，可以组合成定制的示例。

<entry-ad />

## 使用

`v-skeleton-loader` 组件为用户提供了一个内容即将到来/加载的视觉指示器。 这比传统的全屏加载器要好。

<example file="v-skeleton-loader/usage" />

## API

- [v-skeleton-loader](/api/v-skeleton-loader)

<inline-api page="components/skeleton-loaders" />

## 示例

### 其他

#### 样板组件

`v-skeleton-loader`可以在创建实体模型时用作样板设计。 混合和匹配各种预定义的选项或创建您自己独特的实现。 在此示例中，我们使用自定义 **data** 属性来将相同的属性一次应用到多个 `v-skeleton-loader`。

<example file="v-skeleton-loader/misc-boilerplate" />


<!-- #### Implementation methods

There are 2 ways that you can utilize the `v-skeleton-component`. The **default slot** or a **v-if** conditional. The built in slot is the most convenient and easiest to use, but generates an extra div once rendered. If the extra div is an issue in your setup, you can utilize a **v-if** conditional with a Vuetify [transition component](/styles/transitions) or a custom one.

<example file="v-skeleton-loader/misc-implementation" /> -->

## 无障碍

默认情况下， `v-skeleton-loader` 组件被分配给 [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) 的 [** alert **](https://www.w3.org/TR/wai-aria/#alert) 角色. 我们用两个aria属性来扩充这个角色。 一个 [**aria-busy**](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy) 值为 **true** 的属性表示部件缺少必要的元素。 一个 [**aria-live**](https://www.w3.org/TR/wai-aria-1.1/#aria-live) 值为 **polite** 设置屏幕阅读器对活动区域的优先级.

<backmatter />
