---
meta:
  title: Bottom navigation 底部导航
  description: 底部导航组件用于移动设备，作为您的应用程序的主要导航。
  keywords: 底部导航，vuetify 底部导航组件，vue 底部导航组件
related:
  - /components/buttons/
  - /components/icons/
  - /components/tabs/
---

# Bottom navigation（底部导航栏）

`v-bottom-navigation` 组件是侧边栏的替代品。 它主要用于移动应用程序，并且有三个变体： **icons** 和 **text**和 **shift**。

<entry-ad />

## 使用

While `v-bottom navigation` is meant to be used with [vue-router](https://router.vuejs.org/), you can also programmatically control the active state of the buttons by using the **value** property. 按钮的<em x-id=“4”> index </em>具有`v-bottom-navigation`的默认值。

<example file="v-bottom-navigation/usage" />

## API

- [v-bottom-navigation](/api/v-bottom-navigation)

<inline-api page="components/bottom-navigation" />

## 示例

### 属性

#### 颜色

The **color** prop applies a color to the background of the bottom navigation. 我们建议使用 ** light ** 和 ** dark ** props 来正确对比文字颜色。

<example file="v-bottom-navigation/prop-color" />

#### 长大

使用 ** grow ** 属性强制 [v-btn](/components/buttons/) 组件 _填充_ 所有可用的空间。 按钮的最大宽度为 **168px** 。根据 [MD底部导航规格](https://material.io/components/bottom-navigation#specs)。

<example file="v-bottom-navigation/prop-grow" />

#### 滚动时隐藏

`v-bottom-navigation` 组件在 *滚动* 时使用 **hide-on-scroll** 属性隐藏。 这类似于<a href=“/components/app bars/”>v-app-bar</a>支持的<a href=“https://material.io/archive/guidelines/patterns/scrolling-technologies.html">滚动技术</a>。 在下面的示例中，<em x-id=“3”>上下滚动</em> 以查看此行为。

<example file="v-bottom-navigation/prop-hide-on-scroll" />

#### 水平布局

使用 ** horizontal ** prop来调整按钮和图标的样式。 此操作将按钮文本与提供的<a href=“/components/icons/”>v-icon</a><em x-id=“3”>内联</em>。

<example file="v-bottom-navigation/prop-horizontal" />

#### 滚动阈值

修改 **scroll-threshold** 属性，以增加用户在隐藏 `v-bottom-navigation` 之前必须滚动的距离。

<example file="v-bottom-navigation/prop-scroll-threshold" />

#### 上档

** shift ** prop 隐藏未激活时的按钮文本。 这为 `v-bottom-navigation` 组件这提供了另一种视觉样式。

<alert type="info">

  要使其正常工作，`v-btn`文本**需要**被包装在一个`span `标签中。

</alert>

<example file="v-bottom-navigation/prop-shift" />

#### 切换

`v-bottom-navigation` 的显示状态可以使用 **input-value** prop 进行切换。 您也可以使用 **v-model** 来控制当前激活的按钮。

<example file="v-bottom-navigation/prop-toggle" />

<backmatter />
