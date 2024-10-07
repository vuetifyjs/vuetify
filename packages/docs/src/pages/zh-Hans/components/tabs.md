---
meta:
  title: Tabs 标签页
  description: 标签页组件提供了一种组织和导航的方式，可以在同一层次结构的相关内容组之间进行组织和导航。
  keywords: 标签, vuetify 标签组件, vue 标签组件
related:
  - /components/icons/
  - /components/toolbars/
  - /components/windows/
---

# Tabs（选项卡）

`v-tab` 组件用于将内容隐藏在可选择的项目后面。 这也可以用作页面的伪导航，其中选项卡是链接，选项卡项是内容。

<entry-ad />

## 使用

`v-tabs` 组件是 [v-item-group](/components/item-groups) 的样式扩展。 它提供了一个易于使用的接口来组织内容组。

<example file="v-tabs/usage" />

## API

- [v-tabs](/api/v-tabs)
- [v-tab](/api/v-tab)
- [v-tab-item](/api/v-tab-item)
- [v-tabs-items](/api/v-tabs-items)
- [v-tabs-slider](/api/v-tabs-slider)

<inline-api page="components/tabs" />


<!-- ## Sub-components

### v-tab

v-tab description

### v-tab-item

v-tab-item description

### v-tabs-items

v-tabs-items description

### v-tabs-slider

v-tabs-slider description -->

## 注意

<alert type="warning">

  当使用 **dark** 属性和 **不** 提供自定义 **color** 时，`v-tabs` 组件会将其颜色默认为 _white_。

</alert>

<alert type="warning">

  当使用包含必填输入字段的 `v-tab-item` 时，你必须使用 **eager** prop 来验证尚未显示的必填字段。

</alert>

## 示例

### 属性

#### 对齐标题

使用 **align-with-title** prop  将  `v-tabs` `v-toolbar-title`对齐（`v-app-bar-nav-icon` 或 `v-btn` 必须在 `v-toolbar` 中使用)。

<example file="v-tabs/prop-align-with-title" />

#### 激活项居中

The **center-active** prop will make the active tab always centered

<example file="v-tabs/prop-center-active" />

#### 自定义分隔符

**prev-icon** and **next-icon** can be used for applying custom pagination icons.

<example file="v-tabs/prop-icons" />

#### 固定选项卡

The **fixed-tabs** prop forces `v-tab` to take up all available space up to the maximum width (300px).

<example file="v-tabs/prop-fixed-tabs" />

#### 增长

The **grow** prop will make the tab items take up all available space up to a maximum width of 300px.

<example file="v-tabs/prop-grow" />

#### 图标和文本

Using **icons-and-text** prop increases the `v-tabs` height to 72px to allow for both icons as well as text to be used.

<example file="v-tabs/prop-icons-and-text" />

#### Pagination（分页）

If the tab items overflow their container, pagination controls will appear on desktop. For mobile devices, arrows will only display with the **show-arrows** prop.

<example file="v-tabs/misc-pagination" />

#### 右对齐

The **right** prop aligns the tabs to the right.

<example file="v-tabs/prop-right" />

#### 垂直标签页

The **vertical** prop allows for `v-tab` components to stack vertically.

<example file="v-tabs/prop-vertical" />

### 其他

#### 内容

It is common to put `v-tabs` inside the **extension** slot of `v-toolbar`. Using `v-toolbar`'s **tabs** prop auto adjusts its height to 48px to match `v-tabs`.

<example file="v-tabs/misc-content" />

#### 桌面选项卡

You can represent `v-tab` actions by using single icons. This is useful when it is easy to correlate content to each tab.

<example file="v-tabs/misc-desktop" />

#### 动态高度

When changing your `v-tab-item`, the content area will smoothly scale to the new size.

<example file="v-tabs/misc-dynamic-height" />

#### 动态标签

Tabs can be dynamically added and removed. This allows you to update to any number and the `v-tabs` component will react. In this example when we add a new tab, we automatically change our model to match. As we add more tabs and overflow the container, the selected item will be automatically scrolled into view. Remove all `v-tab`s and the slider will disappear.

<example file="v-tabs/misc-dynamic" />

#### 溢出到菜单

You can use a menu to hold additional tabs, swapping them out on the fly.

<example file="v-tabs/misc-overflow-to-menu" />

#### 标签项

The `v-tabs-items` component allows for you to customize the content per tab. Using a shared `v-model`, the `v-tabs-items` will sync with the currently selected `v-tab`.

<example file="v-tabs/misc-tab-items" />

<backmatter />
