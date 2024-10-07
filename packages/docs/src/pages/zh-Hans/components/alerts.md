---
meta:
  title: Alert 提示框
  description: v-alert 组件用于向用户传递信息。 为了引人注目，提示框有四种上下文样式。
  keywords: v-alert, alerts, vue alert 组件, vuetify alert 组件
related:
  - /components/buttons/
  - /components/icons/
  - /components/snackbars/
---

# 警告框 (Alerts)

`v-alert`组件是以上下文类型、各种图标和颜色向用户传达重要的信息。 这些默认的组件类型有4种变体：**成功**（success）、**信息**（info）、**警告**（warning）和**错误**（error）。 默认图标可代表每种类型所传达的不同意思。 也可以自定义提示框的许多部分，例如 `border`, `icon`, 和 `color` 以适应几乎所有情况。

<entry-ad />

## 使用

Alert组件是为了传达一个信息而使用[工作表组件](/components/sheets)最简设计。

<usage name="v-alert" />

## API

- [v-alert](/api/v-alert)

<inline-api page="components/alerts" />

## 示例

### 属性

#### 边框

**border** 属性支持将一个简单的边框添加到提示框的 4 个边。 这个属性可以和例如：**color**（颜色设置）、**dark**（黑暗模式设计）和**type**（变体）的其他属性共同为Alert组件呈现出独特的设计。

<example file="v-alert/prop-border" />

#### 彩色边框

**colored-border** 属性会移除警报背景，以突出 **border**属性 。 如果设置了其中一个alert **变体** ，它会使用变体的默认颜色。 如果没有设置 **color** 或 **type**，颜色将默认为所应用的主题的反色（黑色代表浅色，白色/灰色代表深色）。

<example file="v-alert/prop-colored-border" />

#### 紧凑

**dense** 属性会降低提示框的高度来制造出一个简单且紧凑的风格。 如果和 <strong x-id=""1>border（边框）</strong> 功能结合使用，那么边框的长度会为了迎合设计而被减少。

<example file="v-alert/prop-dense" />

#### 可关闭

**dismissible** 属性将会在提示框的尾部添加一个关闭按钮。 点击此按钮将会将它的值设置为 false 且隐藏提示框。 你也能够通过绑定 **v-model** 的值为 true 来恢复提示框。 关闭图标会自动应用 `aria-label`，可以通过修改 **close-label** 属性或者改变本地设置 **close** 的值来进行更改它。 浏览 [Internationalization](/features/internationalization) 来了解如何全局修改你本地设置。

<example file="v-alert/prop-dismissible" />

#### 图标

**icon** 属性允许你在提示框的开头添加图标。 如果提供了 **type**属性，那么将会覆盖默认类型的图标。 另外，将**icon（图标）**属性设置为_false_将会移除提示框中的图标。

<example file="v-alert/prop-icon" />

#### 轮廓

**outlined** 属性将会反转提示框的风格，它会继承当前应用的 **color** 并应用与文本和边框且将其背景透明化。

<example file="v-alert/prop-outlined" />

<discovery-ad />

#### 突出

**prominent** 属性通过增加高度并向图标施加光晕来提供更明显的提示。 当同时应用 **prominent** 和 **dense** 时，提示框将会呈现出普通的风格但是会 **prominent** 图标特效。

<example file="v-alert/prop-prominent" />

#### 文本

**text** 属性是一个简单的提示框变量，它对所提供的**color**属性使用不透明的背景。 有着和其他设计属性相似的情况，**text**（文本）可以配合其他属性来创建独特又个性化的Alert组件。例如：**dense**（紧凑）、**prominent**（突出）、**outlined**（轮廓）和**shaped**（形状） 。

<example file="v-alert/prop-text" />

#### 形状

**shaped**（形状）属性会在Alert组件的左上角和右下角加上“大圆角”，即较大的**边界半径**。 **shaped**（形状）有和其他设计属性相似，可以和其他属性一并使用。例如：**dense**、**prominent**、**outlined**和**text**。这会创建一个独特；且个性化的Alert组件

<example file="v-alert/prop-shaped" />

#### 过渡

**transition** 属性可让你向提示框应用一个过渡，该动画在隐藏和显示组件时可见。 若要查询更多详情，不妨看看任何一个[Vuetify 自带过渡](/styles/transitions#motion)或者了解如何 [创建自己的过渡设计](/styles/transitions#create-your-own)。

<example file="v-alert/prop-transition" />

#### Twitter

将**color**、**dismissible**（可关闭）、**border**（边框）、**elevation**（组件海拔）、**icon**和**colored-border** （彩色边框）属性一起使用，您可以创建时髦的自定义Alert组件。其中之一就是下面这个Twitter（推特）通知。

<example file="v-alert/misc-twitter" />

#### 类型

**type** 属性提供 4 种默认的 `v-alert` 样式：**success**, **info**, **warning**, 和 **error**。 这些类型的设计都有着一个默认的图标和颜色。 默认颜色可通过 [Vuetify主题](/features/theme) 进行全局配置。

<example file="v-alert/prop-type" />

## 无障碍

<vuetify-ad slug="vs-video-accessibility" />

如果无误，`v-alert`组件在网页内的[WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/)角色为[**提示**](https://www.w3.org/TR/wai-aria/#alert)，这代表着提示 \"是一个带有重要成分和需要快速被关注；持续短时间的活动型组件。\" 当使用**dismissible**（可关闭）属性时，组件的关闭图标将会拥有一个相应的`aria-label`。 可以通过修改 **close-label** 属性来修改它或者全局自定义 [Internationalization](/features/internationalization) 默认值来修改 _close_ 属性。

<backmatter />
