---
meta:
  title: 网格系统
  description: Vuetify 支持 12 格的 Material Design 网格，用于布局和控制你的应用的断点。
  keywords: 栅格，vuetify 网格组件，布局组件，flex 组件
related:
  - /styles/flex/
  - /features/breakpoints/
  - /styles/display/
---

# Grid system（网格系统）

Vuetify 配备了一个使用 flexbox 构建的 12 格网格系统。 网格用于在应用的内容中创建特定的布局。  它包含 5 种类型的媒体断点，用于针对特定的屏幕尺寸或方向，**xs**、**sm**、**md**、**lg** 和 **xl**。 这些分辨率在视口断点表中定义如下，可以通过自定义[断点](/features/breakpoints)进行修改。

<promoted-ad slug="vuemastery-grids" />

<breakpoints-table />

## 使用

Vuetify 网格深受 [Bootstrap 网格](https://getbootstrap.com/docs/4.0/layout/grid/)的启发。 它使用一系列的容器、行、列来整合内容的布局和排列。 **如果你不熟悉 flexbox**，[阅读 CSS Tricks flexbox 指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)，了解背景、术语、指南和代码片段。

<example file="grid/usage" />

## API

- [v-container](/api/v-container)
- [v-row](/api/v-row)
- [v-col](/api/v-col)
- [v-spacer](/api/v-spacer)

<inline-api page="components/grids" />

## 子组件

### v-container

`v-container` 提供了将你的网站内容居中和水平填充的功能。 你还可以使用 **fluid** 属性将容器在所有视口和设备尺寸上完全扩展。 Maintains previous 1.x functionality in which props are passed through as classes on `v-container` allowing for the application of helper classes (such as `ma-#`/`pa-#`/`fill-height`) to easily be applied.

### v-col

`v-col` 包裹内容，它必须是 `v-row` 的直接子代。 这是 2.x 版本对 1.x 版本中 `v-flex` 的替代。

### v-row

`v-row` 是 `v-col` 的容器组件。 它使用 flex 属性来控制其内栏的布局和流。 它使用的是 **24px** 的标准间隔。 这可以用 **dense** 属性来减小，或者用 **no-gutters** 来完全去除。 这是 2.x 版本对 1.x 版本中 `v-layout` 的替代。

### v-spacer

`v-spacer` 是一个基本而又通用的间隔组件，用于分配父子组件之间的剩余宽度。 当一个 `v-spacer` 放置在子组件之前或之后时，组件将推到其容器的左右两侧。 当多个组件之间使用多个 `v-spacer` 时，剩余的宽度将均匀地分布在每个 spacer 之间。

## Helper Classes

`fill-height` applies `height: 100%` to an element. When applied to `v-container` it will also `align-items: center`.

## 注意

<alert type="info">

  1.x 网格系统已被废弃，请改用 2.x 网格系统。 1.x 网格的文档可以在 [v1.5 文档](https://v15.vuetifyjs.com/framework/grid) 中找到。

</alert>

<alert type="info">

  网格组件上基于断点的属性以 `andUp` 的方式工作。 考虑 **xs** 断点已经被删除的情况， 这将会影响到 **offset**、**justify**、**align** 和 `v-col` 上的断点属性。

- 像 **justify-sm** 和 **justify-md** 这样的属性仍然存在，但 **justify-xs** 会变成 **justify**。
- `v-col`上不存在 **xs** 属性。 与此对应的是 **cols** 属性。

</alert>

<alert type="info">

  当在 IE11 使用网格系统时，你需要设置一个显式的 `height`，因为 `min-height` 不足进而导致非预期结果。

</alert>

## 示例

### 属性

#### 垂直对齐

使用 **align** 和 **align-self** 属性来改变 flex 项目及其父项的垂直对齐方式。

<example file="grid/prop-align" />

#### 断点尺寸

列将自动占用其父容器内相等的空间。 这可以使用 **cols** 属性来修改。 你还可以使用 **sm**、**md**、**lg** 和 **xl** 属性来进一步定义不同视口尺寸下的列占用空间。

<example file="grid/prop-breakpoint-sizing" />

#### 水平对齐

使用 **justify** 属性改变 flex 项目的水平对齐方式。

<example file="grid/prop-justify" />

#### 无间隔

你可以使用 **no-gutters** 属性从 `v-row` 中移除负值外边距，从其直接子 `v-col` 中移除内边距。

<example file="grid/prop-no-gutters" />

#### 偏移

偏移对于控制元素不可见或控制内容位置很有用。 就像断点一样，你可以为任何可用的尺寸设置一个偏移。 这使你可以根据自己的需求精确地调整应用布局。

<example file="grid/prop-offset" />

#### 偏移断点

偏移也可以在每个断点的基础上设置。

<example file="grid/prop-offset-breakpoint" />

#### 排序

你可以控制网格项目的排序。 与偏移一样，你可以为不同的尺寸设置不同的顺序。 设计专门的屏幕布局，以适应任何应用。

<example file="grid/prop-order" />

#### 先后排序

你也可以明确指定 **first** 或 **last**，这将分别为 `order` CSS 属性分配 **-1** 或 **13** 值。

<example file="grid/prop-order-first-and-last" />

### 其他

#### 换行列

当在给定的行中放置了超过 12 个列时（没有使用 `.flex-nowrap`），每一组额外的列都将被包入新的行。

<example file="grid/misc-column-wrapping" />

#### 等宽列

你可以把等宽列分成多行。 虽然旧版本的浏览器有解决办法，但仍有一个 [Safari flexbox 问题](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items)。 如果你是最新的 Safari，无需担心这个问题。

<example file="grid/misc-equal-width-columns" />

#### 增长与收缩

默认情况下，flex 组件将自动填充行或列中的可用空间。 没有指定具体尺寸时，它们也会相对于 flex 容器中的其他 flex 项目收缩。 你可以使用 **cols** 属性定义 `v-col` 的列宽，并提供 **1 到 12** 的值。

<example file="grid/misc-grow-and-shrink" />

#### 外边距辅助

使用[外边距工具类](/styles/flex#auto-margins)可以强行把同级列分开。

<example file="grid/misc-margin-helpers" />

#### 嵌套网格

与其他框架类似，网格可以被嵌套，以实现非常自定义的布局。

<example file="grid/misc-nested-grid" />

#### 一列宽度

使用自动布局时，你可以只定义一列的宽度，并且仍然可以让它的同级元素围绕它自动调整大小。

<example file="grid/misc-one-column-width" />

#### 行和列断点

根据分辨率动态地改变你的布局。 **（调整你的屏幕大小，并观看顶部 `row` 布局在 sm、md 和 lg 断点上的变化）**。

<example file="grid/misc-row-and-column-breakpoints" />

#### 空白

`v-spacer` 组件在你想要填充可用空间或在两个组件之间留出空间时非常有用。

<example file="grid/misc-spacer" />

#### 独特的布局

Vuetify 网格系统的强大和灵活性使你能够创建出色的用户界面。

<example file="grid/misc-unique-layouts" />

#### 可变内容宽度

为列分配断点宽度可以根据其内容的性质宽度来配置调整大小。

<example file="grid/misc-variable-content" />

<backmatter />
