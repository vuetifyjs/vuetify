---
meta:
  title: Navigation drawer 导航抽屉
  description: 导航抽屉组件包含了应用程序的内部导航链接，可以在屏幕上永久显示，也可以通过程序控制。
  keywords: 导航抽屉，vuetify 导航抽屉组件，vue 导航抽屉组件
related:
  - /components/lists/
  - /components/icons/
  - /getting-started/wireframes/
---

# Navigation drawers（导航抽屉）

`v-navigation-drawer` 是您的用户用于导航应用程序的组件。 导航抽屉被预先配置为可以在有或没有 **vue-router** 的情况下使用。 为了显示的目的，一些示例被包装在 `v-card` 元素中。 在您的应用程序中，通常会把 `v-navigation-drawer` 组件作为 `v-app` 的直接子组件。

<entry-ad />

## 使用

导航抽屉主要用于存放您应用程序中页面的链接。 使用 `null` 作为其 **v-model 的初始值** 将会将抽屉初始化为在移动设备上关闭，在桌面环境下打开。 通常使用 **nav** 属性将抽屉与 [v-list](/components/lists) 组件配对。

<example file="v-navigation-drawer/usage" />

## API

- [v-navigation-drawer](/api/v-navigation-drawer)

<inline-api page="components/navigation-drawers" />

## 注意

<alert type="error">

  如果使用启用了 `app` 属性的 `v-navigation-drawer`，则不需要像示例中那样使用 `absolute` 属性。

</alert>

<alert type="info">

  **extension-on-hover** 参数不会改变**v-main**的内容区域。 要使内容区域响应**extension-on-hover**，请绑定**mini-variant.sync** 到数据。

</alert>

## 示例

### 属性

#### 底部抽屉

使用 **bottom** 参数，我们能够在移动设备上重新定位抽屉，让其从屏幕底部出来。 这是另一种样式，只能遇到 **mobile-breakpoint** 时激活。

<example file="v-navigation-drawer/prop-bottom-drawer" />

#### 悬停时扩展

将组件放置在 **mini-variant** 模式中，并在悬停时扩展开。 **不** 更改 **v-main** 的内容区域。 宽度可以使用 **mini-variant-width** 属性来控制。

<example file="v-navigation-drawer/prop-expand-on-hover" />

#### 图像 (Images)

通过 **src** 属性将自定义背景应用于抽屉。 如果你需要自定义 `v-img`的属性，你可以使用 `img` 插槽。

<example file="v-navigation-drawer/prop-images" />

#### 迷你模式

当使用 **mini-variant** 属性时，抽屉将会缩小(默认56px)，并隐藏除第一个元素外的 `v-list` 内的所有内容。 在这个示例中，我们使用了 **.sync** 修饰符，它允许我们以程序化的方式绑定抽屉的扩展/收缩。

<example file="v-navigation-drawer/prop-mini-variant" />

#### 永久浮动抽屉

默认情况下，导航抽屉有一个 1px 右边框，将其与内容分开。 在这个例子中，我们要把抽屉从左边分离出来，让它自己浮动。 **floating** 属性可移除右边的边框(如果使用 **right** 则移除左边框)。

<example file="v-navigation-drawer/prop-permanent-and-floating" />

#### 右侧

导航抽屉也可以放置在应用程序（或元素）的右侧。 This is also useful for creating a side-sheet with auxiliary information that may not have any navigation links. 当使用 **RTL** 时，您必须为抽屉明确定义 **right**。

<example file="v-navigation-drawer/prop-right" />

#### 临时的

临时抽屉位于它的应用程序上方，并使用一个scrim（覆盖层）使背景变暗。 在移动设备上默认模拟此抽屉行为。 在抽屉外点击将导致它关闭。

<example file="v-navigation-drawer/prop-temporary" />

### 其他

#### 彩色的抽屉

导航抽屉可以自定义，以适合任何应用程序的设计。 我们在这里使用 **append** 插槽自定义背景颜色和附加的内容区域。

<example file="v-navigation-drawer/misc-colored" />

#### 组合抽屉

在此示例中，我们定义了一个自定义宽度来容纳嵌套抽屉。 我们使用 `v-row` 确保抽屉和列表在水平方向彼此相邻。

<example file="v-navigation-drawer/misc-combined" />

<backmatter />
