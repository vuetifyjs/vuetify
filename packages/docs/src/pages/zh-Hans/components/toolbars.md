---
meta:
  title: Toolbar 工具栏
  description: 工具栏组件位于它所影响的内容上方，并提供了一个标签和附加操作的区域。
  keywords: 工具栏，vuetify 工具栏组件，vue 工具栏组件
  related:
    - /components/buttons/
    - /components/footer/
    - /components/tabs/
---

# Toolbars（工具栏）

The `v-toolbar` component is pivotal to any graphical user interface (GUI), as it generally is the primary source of site navigation. 工具栏组件与[v-navigation-drawer](/components/navigation-drawers)和[v-card](/components/cards) 配合使用非常有效。

<entry-ad />

## 使用

工具栏是一个灵活的容器，可以通过多种方式使用。 默认情况下，工具栏在桌面上是64px高，在移动设备上是56px高。 有许多辅助组件可供工具栏使用。 `v-toolbar-title`用于显示标题并且 `v-toolbar-items` 允许 [v-btn](/components/buttons) 扩展全高度。

<usage name="v-toolbar" />

## API

- [v-toolbar](/api/v-toolbar)
- [v-toolbar-items](/api/v-toolbar-items)
- [v-toolbar-title](/api/v-toolbar-title)

<inline-api page="components/toolbars" />


<!-- ## Sub-components

### v-toolbar-items

v-toolbar-items description

### v-toolbar-title

v-toolbar-title description -->

## 注意

<alert type="warning">

  当在 `v-toolbar` 和 `v-app-bar` 内部使用带有 `icon` prop的 `v-btn` 时，它们将自动增大其尺寸并应用负边距，以确保根据Material设计规范的适当间距。 如果您选择将您的按钮包装在任何容器中，例如`div'， 您需要对容器应用负边距，以便正确对齐。

</alert>

## 示例

### 属性

#### 背景

工具栏可以使用 **src** 属性显示背景而不是纯色。 这可以通过使用 **img** 插槽并提供您自己的<a href=“/components/images”>v-img</a>组件来修改。 可以使用[v-app-bar](/components/app-bars#prominent-w-scroll-shrink-and-image)使背景淡入淡出

<example file="v-toolbar/prop-background" />

#### 折叠

可以折叠工具栏以节省屏幕空间。

<example file="v-toolbar/prop-collapse" />

#### 紧凑工具栏

紧凑工具栏将其高度降低到 _48px_。 当与 **prominent** prop 同时使用时，将会将高度降低到 _96px_。

<example file="v-toolbar/prop-dense" />

#### 扩展

工具栏可以在不使用 `扩展` 插槽的情况下扩展。

<example file="v-toolbar/prop-extended" />

### 扩展高度

扩展的高度可以定制。

<example file="v-toolbar/prop-extension-height" />

#### 搜索时浮动

浮动工具栏变成内联元素，只占用所需空间的。 这在将工具栏放置在内容上时特别有用。

<example file="v-toolbar/prop-floating-with-search" />

#### 浅色和深色

工具栏有 **2** 种变体，浅色和深色。 浅色工具栏具有深色按钮和深色文本，而深色工具栏具有白色按钮和白色文本。

<example file="v-toolbar/prop-light-and-dark" />

#### 突出的工具栏

突出的工具栏将 `v-toolbar` 的高度增加到 _128px_ ，并将 `v-toolbar-title` 放置到容器底部。 This is expanded upon in [v-app-bar](/components/app-bars#prominent-w-scroll-shrink) with the ability to shrink a **prominent** toolbar to a **dense** or **short** one.

<example file="v-toolbar/prop-prominent" />

### 其他

#### 上下文操作栏

可以更新工具栏的外观以响应应用程序状态的改变。 在本例中，工具栏的颜色和内容会随着用户在 `v-select` 中的选择而改变。

<example file="v-toolbar/misc-contextual-action-bar" />

#### 灵活的卡片工具栏

在本例中，我们使用 **extended** prop 将卡片偏移到工具栏的扩展内容区域。

<example file="v-toolbar/misc-flexible-and-card" />

#### 变量

`v-toolbar` 有多个变量，可以应用主题和辅助类。 这些主题包括浅色和深色的主题、彩色和透明。

<example file="v-toolbar/misc-variations" />

<backmatter />
