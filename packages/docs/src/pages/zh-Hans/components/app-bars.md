---
meta:
  title: App-bar 应用栏
  description: App-bar组件是一个拥有先进的滚动技术和应用布局支持的超级工具栏。
  keywords: 应用栏，vuetify 应用栏组件，vue 应用栏组件
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
---

# App bars（应用栏）

`v-app-bar` 组件对于任何图形用户界面（GUI）都至关重要，因为它通常是站点导航的主要来源。 App-bar组件与 [v-navigation-drawer](/components/navigation-drawers) 配合使用，可以在应用程序中提供站点导航。

<entry-ad />

## 用例

`v-app-bar` 组件用于应用程序范围内的操作和信息。

<usage name="v-app-bar" />

## API

- [v-app-bar](/api/v-app-bar)
- [v-app-bar-nav-icon](/api/v-app-bar-nav-icon)
- [v-app-bar-title](/api/v-app-bar-title)

<inline-api page="components/app-bars" />

## 子组件

### v-app-bar-nav-icon

专门为与 [v-toolbar](/components/toolbars) 和 `v-app-bar` 一起使用而创建的样式化图标按钮组件。 在工具栏的左侧显示为汉堡菜单，它通常用于控制导航抽屉的状态。 `default` 插槽可以用于自定义此组件的图标和功能。 这是一个 **函数式** 组件。

### v-app-bar-title

修改过的 [v-toolbar-title](/components/toolbars/) 组件 ，用于配合 `shrink-on-scroll` 属性使用。 在小屏幕上，`v-toolbar-title` 将被截断(见 [issue #12514](https://github.com/vuetifyjs/vuetify/issues/12514))，但这个组件在展开时使用了绝对定位使其内容可见。 我们不建议您在没有使用 `shrink-on-scroll` 属性时使用 `v-app-bar-title` 组件。确实是因为向此组件添加了resize事件，并进行了很多额外的计算。

## 注意事项

<alert type="warning">

  当在 `v-toolbar` 和 `v-app-bar` 内部使用带有 `icon` prop的 `v-btn` 时，它们将自动增大其尺寸并应用负边距，以确保根据Material设计规范的适当间距。 如果您选择将按钮包装在任何容器例如`div`中，则需要对该容器应用负边距，以便正确对齐它们。

</alert>

## 示例

### 属性

#### 可折叠栏

With the **collapse** and **collapse-on-scroll** props you can easily control the state of toolbar that the user interacts with.

<example file="v-app-bar/prop-collapse" />

#### 紧凑

您可以使 **app-bar** 更加紧凑。 紧凑应用栏的高度低于普通应用栏。

<example file="v-app-bar/prop-dense" />

#### 滚动时的高度(z轴)

When using the **elevate-on-scroll** prop, the `v-app-bar` will rest at an elevation of 0dp until the user begins to scroll down. Once scrolling, the bar raises to 4dp.

<example file="v-app-bar/prop-elevate-on-scroll" />

#### 滚动时淡入淡出图像

The background image of a `v-app-bar` can fade on scroll. Use the `fade-img-on-scroll` property for this.

<example file="v-app-bar/prop-img-fade" />

#### 滚动时隐藏

`v-app-bar` can be hidden on scroll. Use the `hide-on-scroll` property for this.

<example file="v-app-bar/prop-hide" />

#### 图像

`v-app-bar` 可以包含背景图像。 您可以通过 `src` prop设置。 如果您需要自定义 `v-img` 属性，应用栏将为您提供一个 **img** 插槽。

<example file="v-app-bar/prop-img" />

#### 滚动反转

When using the **inverted-scroll** property, the bar will hide until the user scrolls past the designated threshold. Once past the threshold, the `v-app-bar` will continue to display until the users scrolls up past the threshold. If no **scroll-threshold** value is supplied a default value of _0_ will be used.

<example file="v-app-bar/prop-inverted-scroll" />

#### 突出

一个带有 `prominent` prop 的 `v-app-bar` 可以被设置为随着用户滚动而收缩。 当用户滚动浏览内容时，这提供了一个平滑的过渡，以减少视觉空间占用。 收缩高度有**dense**（紧密，48px）和**short**（短，56px）两种选择。

<example file="v-app-bar/prop-prominent" />

#### 滚动阈值

`v-app-bar` can have scroll threshold. It will start reacting to scroll only after defined via `scroll-threshold` property amount of pixels.

<example file="v-app-bar/prop-scroll-threshold" />

### 其他

#### 菜单

您可以通过添加 `VMenu` 来轻松地扩展应用栏的功能。 单击最后一个图标以查看其运行情况。

<example file="v-app-bar/misc-menu" />

#### 切换导航抽屉

使用函数式组件`v-app-bar-nav-icon`可以切换其他组件的状态，例如 [v-navigation-drawer ](/components/navigation-drawers)。

<example file="v-app-bar/misc-app-bar-nav" />

<backmatter />
