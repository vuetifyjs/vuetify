---
meta:
  title: Menu 菜单
  description: 菜单组件显示了一个下拉式的潜在选择或用户可以进行的操作。
  keywords: 菜单, vuetify 菜单组件, vue 菜单组件
related:
  - /components/dialogs/
  - /components/tooltips/
  - /styles/transitions/
---

# 菜单 (Menus)

`v-menu`组件展示一个菜单在用于激活它的元素的位置上。

<entry-ad />

## 使用

请记住将激活菜单的元素放置在`activator`插槽中。

<example file="v-menu/usage" />

## API

- [v-menu](/api/v-menu)

<inline-api page="components/menus" />

## 示例

### 属性

#### 绝对定位

菜单可以使用 **absolute** 属性，将其绝对放置在激活器元素的顶部。 尝试点击图像上的任意位置。

<example file="v-menu/prop-absolute" />

#### 没有激活器的绝对定位

菜单也可以通过使用 **absolute** 以及 **position-x** 和 **position-y** 参数来在没有激活器的情况下使用。 尝试右键点击图像上的任何地方。

<example file="v-menu/prop-absolute-without-activator" />

#### 点击关闭

失去焦点时可以关闭菜单。

<example file="v-menu/prop-close-on-click" />

#### 点击内容后关闭

您可以配置在点击内容后是否关闭 `v-menu`。

<example file="v-menu/prop-close-on-content-click" />

#### 禁用

您可以禁用菜单。 无法打开已禁用的菜单。

<example file="v-menu/prop-disabled" />

#### X 偏移

菜单可以通过 X 轴偏移，以使激活器可见。

<example file="v-menu/prop-offset-x" />

#### Y 偏移

菜单可以通过 Y 轴偏移，以使激活器可见。

<example file="v-menu/prop-offset-y" />

#### 悬停时打开

设置使用 **open-on-hover** 属性时，菜单会悬停时打开而不是点击时打开。

<example file="v-menu/prop-open-on-hover" />

#### Rounded（圆角）

菜单可以通过 **rounded** 属性设置为圆角。 关于圆角样式的其他信息在 [Border Radius](/styles/border-radius)页。

<example file="v-menu/prop-rounded" />

### 插槽

#### 同时使用激活器和提示

在新的 `v-slot` 语法中， 嵌套的激活器，例如用 `v-menu` 和 `v-tooltip` 附加到同一激活按钮， 需要特定的设置才能正常运行。 **注意：此语法同样用于其他嵌套激活器，例如 `v-dialog` / `v-tooltip`。**

<example file="v-menu/slot-activator-and-tooltip" />

### 其他

#### 自定义过渡

Vuetify有三个标准过渡， **scale**， **slide-x** 和 **slide-y**。 您也可以创建自己的过渡并作为过渡参数传递。 For an example of how the stock transitions are constructed, visit [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/util/helpers.ts).

<example file="v-menu/misc-custom-transition" />

#### 弹出菜单

菜单可以配置为在打开时为静态菜单，使其充当弹出菜单。 当菜单内容中有多个交互式项目时，这很有用。

<example file="v-menu/misc-popover" />

#### 在组件中使用

菜单可以放在几乎任何组件中

<example file="v-menu/misc-use-in-components" />

## 无障碍

默认情况下， `v-menu` 组件被 _detached_ 并移动到您应用程序的根目录。 为了正确地支持 [ 动态插入内容到 DOM ](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR26)， 您 **必须** 使用 **attach** 参数。 这将确保当按下 <kbd>tab</kbd> 键时，焦点会从激活器转移到内容上。

<backmatter />
