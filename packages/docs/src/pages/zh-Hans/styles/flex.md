---
meta:
  title: CSS Flex 辅助
  description: Flex 辅助类允许你修改flexbox的父/子布局
  keywords: flex 辅助类, flex 类, vuetify flex
related:
  - /styles/display/
  - /components/grids/
  - /styles/css-reset/
---

# 弹性布局

使用响应的flexbox实用程序通过对齐、排列等方式控制flex容器的布局, 采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

<entry-ad />

## 注意

The `d-flex` sets the CSS of the according element to `display: flex !important`. As a result, it overrides any other settings.

## 启用 flexbox

使用 `display` 工具类, 你可以将任何元素转换为 flexbox 容器并将该元素的 **子元素** 转成 flex 元素. 使用附加的flex属性工具类，您可以进一步定制它们的交互。

<example file="flex/flexbox" />

<example file="flex/flexbox-inline" />

您还可以基于各种断点应用自定义的 flex 工具类。

- **.d-flex**
- **.d-inline-flex**
- **.d-sm-flex**
- **.d-sm-inline-flex**
- **.d-md-flex**
- **.d-md-inline-flex**
- **.d-lg-flex**
- **.d-lg-inline-flex**
- **.d-xl-flex**
- **.d-xl-inline-flex**

## Flex 方向

默认情况下，`d-flex` 应用了 `flex-direction: row` 属性，通常可以省略不写。 但是，有些情况下你可能需要显式地定义它。

<example file="flex/flex-direction" />

`flex-column` 和 `flex-column-reverse` 是用来改变 flexbox 容器方向的实用类。 Keep in mind that **IE11** and **Safari** may have issues with the column direction.

<example file="flex/flex-column" />

同时，还有用于 `flex-direction` 的响应式变体。

- **.flex-row**
- **.flex-row-reverse**
- **.flex-column**
- **.flex-column-reverse**
- **.flex-sm-row**
- **.flex-sm-row-reverse**
- **.flex-sm-column**
- **.flex-sm-column-reverse**
- **.flex-md-row**
- **.flex-md-row-reverse**
- **.flex-md-column**
- **.flex-md-column-reverse**
- **.flex-lg-row**
- **.flex-lg-row-reverse**
- **.flex-lg-column**
- **.flex-lg-column-reverse**
- **.flex-xl-row**
- **.flex-xl-row-reverse**
- **.flex-xl-column**
- **.flex-xl-column-reverse**

## Flex justify

可使用 flex justify 类更改 `justify-content` flex 设置。 这默认情况下会修改 flexbox 项目在 **x 轴**上的排列，但当使用 `flex-direction: column` 时，会修改在 **y 轴**上的排列。 从 `start` (浏览器默认), `end`, `center`, `space-between`, 或 `space-acound` 选择一个值.

<example file="flex/flex-justify" />

同样有用于 `justify-content` 的响应式变体。

- **.justify-start**
- **.justify-end**
- **.justify-center**
- **.justify-space-between**
- **.justify-space-around**
- **.justify-sm-start**
- **.justify-sm-end**
- **.justify-sm-center**
- **.justify-sm-space-between**
- **.justify-sm-space-around**
- **.justify-md-start**
- **.justify-md-end**
- **.justify-md-center**
- **.justify-md-space-between**
- **.justify-md-space-around**
- **.justify-lg-start**
- **.justify-lg-end**
- **.justify-lg-center**
- **.justify-lg-space-between**
- **.justify-lg-space-around**
- **.justify-xl-start**
- **.justify-xl-end**
- **.justify-xl-center**
- **.justify-xl-space-between**
- **.justify-xl-space-around**

## Flex align

可以使用 flex align 类来更改 `align-items` 的 flex 设置。 默认情况下，这将修改 **y 轴**上的 flexbox 项目，但在使用 `flex-direction: column` 时则相反，将修改 **x 轴**。 可选择 `start`、`end`、`center`、`baseline` 或 `stretch` （浏览器默认设置）。

<alert type="info">

  当在 IE11 使用 flex 纵轴对齐时，你需要显示设置一个 `height`，因为 `min-height` 的不足会导致不符合预期的结果。

</alert>

<example file="flex/flex-align" />

`align-items` 同样也有一些响应式变体。

- **.align-start**
- **.align-end**
- **.align-center**
- **.align-baseline**
- **.align-stretch**
- **.align-sm-start**
- **.align-sm-end**
- **.align-sm-center**
- **.align-sm-baseline**
- **.align-sm-stretch**
- **.align-md-start**
- **.align-md-end**
- **.align-md-center**
- **.align-md-baseline**
- **.align-md-stretch**
- **.align-lg-start**
- **.align-lg-end**
- **.align-lg-center**
- **.align-lg-baseline**
- **.align-lg-stretch**
- **.align-xl-start**
- **.align-xl-end**
- **.align-xl-center**
- **.align-xl-baseline**
- **.align-xl-stretch**

## Flex align self

The `align-self` flex setting can be changed using the flex align-self classes. 这默认情况下会修改 flexbox 项目在 **x 轴**上的排列，但当使用 `flex-direction: column` 时，会修改在 **y 轴**上的排列。 从 `start` , `end`, `center`, `baseline`, `auto`, 或 `stretch`(浏览器默认) 选择一个值.

<example file="flex/flex-align-self" />

There are also responsive variations for `align-self-items`.

- **.align-self-start**
- **.align-self-end**
- **.align-self-center**
- **.align-self-baseline**
- **.align-self-auto**
- **.align-self-stretch**
- **.align-self-sm-start**
- **.align-self-sm-end**
- **.align-self-sm-center**
- **.align-self-sm-baseline**
- **.align-self-sm-auto**
- **.align-self-sm-stretch**
- **.align-self-md-start**
- **.align-self-md-end**
- **.align-self-md-center**
- **.align-self-md-baseline**
- **.align-self-md-auto**
- **.align-self-md-stretch**
- **.align-self-lg-start**
- **.align-self-lg-end**
- **.align-self-lg-center**
- **.align-self-lg-baseline**
- **.align-self-lg-auto**
- **.align-self-lg-stretch**
- **.align-self-xl-start**
- **.align-self-xl-end**
- **.align-self-xl-center**
- **.align-self-xl-baseline**
- **.align-self-xl-auto**
- **.align-self-xl-stretch**

## Auto margins

Using the margin helper classes in a flexbox container, you can control the positioning of flex items on the **x-axis** or **y-axis** when using `flex-row` or `flex-column` respectively.

<alert type="error">

  **IE11**不能正确支持具有非默认“justify content”值的 flexbox 容器的 flex 元素的自动边距。 更多详细信息请 [参阅此 StackOverflow 答案](https://stackoverflow.com/a/375355548)。

</alert>

<example file="flex/margins" />

### 使用 align-items

Mixing `flex-direction: column` and `align-items`, you can utilize `.mt-auto` and `.mb-auto` helper classes to adjust flex item positioning.

<example file="flex/margins-align-items" />

## Flex wrap

By default `.d-flex` does not provide any wrapping (behaves similarly to `flex-wrap: nowrap`). This can be modified by applying flex-wrap helper classes in the format `flex-{condition}` where condition can be `nowrap`, `wrap`, or `wrap-reverse`.

- **.flex-nowrap**
- **.flex-wrap**
- **.flex-wrap-reverse**

<example file="flex/flex-nowrap" />

<example file="flex/flex-wrap" />

<example file="flex/flex-wrap-reverse" />

These helper classes can also be applied in the format `flex-{breakpoint}-{condition}` to create more responsive variations based on breakpoints. The following combinations are available:

- **.flex-sm-nowrap**
- **.flex-sm-wrap**
- **.flex-sm-wrap-reverse**
- **.flex-md-nowrap**
- **.flex-md-wrap**
- **.flex-md-wrap-reverse**
- **.flex-lg-nowrap**
- **.flex-lg-wrap**
- **.flex-lg-wrap-reverse**
- **.flex-xl-nowrap**
- **.flex-xl-wrap**
- **.flex-xl-wrap-reverse**

## Flex order

You can change the visual order of flex items with the `order` utilities.

<example file="flex/flex-order" />

There are also responsive variations for `order`.

- **.order-first**
- **.order-0**
- **.order-1**
- **.order-2**
- **.order-3**
- **.order-4**
- **.order-5**
- **.order-6**
- **.order-7**
- **.order-8**
- **.order-9**
- **.order-10**
- **.order-11**
- **.order-12**
- **.order-last**
- **.order-sm-first**
- **.order-sm-0**
- **.order-sm-1**
- **.order-sm-2**
- **.order-sm-3**
- **.order-sm-4**
- **.order-sm-5**
- **.order-sm-6**
- **.order-sm-7**
- **.order-sm-8**
- **.order-sm-9**
- **.order-sm-10**
- **.order-sm-11**
- **.order-sm-12**
- **.order-sm-last**
- **.order-md-first**
- **.order-md-0**
- **.order-md-1**
- **.order-md-2**
- **.order-md-3**
- **.order-md-4**
- **.order-md-5**
- **.order-md-6**
- **.order-md-7**
- **.order-md-8**
- **.order-md-9**
- **.order-md-10**
- **.order-md-11**
- **.order-md-12**
- **.order-md-last**
- **.order-lg-first**
- **.order-lg-0**
- **.order-lg-1**
- **.order-lg-2**
- **.order-lg-3**
- **.order-lg-4**
- **.order-lg-5**
- **.order-lg-6**
- **.order-lg-7**
- **.order-lg-8**
- **.order-lg-9**
- **.order-lg-10**
- **.order-lg-11**
- **.order-lg-12**
- **.order-lg-last**
- **.order-lg-first**
- **.order-xl-0**
- **.order-xl-1**
- **.order-xl-2**
- **.order-xl-3**
- **.order-xl-4**
- **.order-xl-5**
- **.order-xl-6**
- **.order-xl-7**
- **.order-xl-8**
- **.order-xl-9**
- **.order-xl-10**
- **.order-xl-11**
- **.order-xl-12**
- **.order-xl-last**

## Flex align content

The `align-content` flex setting can be changed using the flex align-content classes. 这默认情况下会修改 flexbox 项目在 **x 轴**上的排列，但当使用 `flex-direction: column` 时，会修改在 **y 轴**上的排列。 从 `start` (浏览器默认) , `end`, `center`, `between`, `around`, 或 `stretch` 选择一个值.

<example file="flex/flex-align-content-start" />

<example file="flex/flex-align-content-end" />

<example file="flex/flex-align-content-center" />

<example file="flex/flex-align-content-between" />

<example file="flex/flex-align-content-around" />

There are also responsive variations for `align-content`.

- **align-content-start**
- **align-content-end**
- **align-content-center**
- **align-content-space-between**
- **align-content-space-around**
- **align-content-stretch**
- **align-sm-content-start**
- **align-sm-content-end**
- **align-sm-content-center**
- **align-sm-content-space-between**
- **align-sm-content-space-around**
- **align-sm-content-stretch**
- **align-md-content-start**
- **align-md-content-end**
- **align-md-content-center**
- **align-md-content-space-between**
- **align-md-content-space-around**
- **align-md-content-stretch**
- **align-lg-content-start**
- **align-lg-content-end**
- **align-lg-content-center**
- **align-lg-content-space-between**
- **align-lg-content-space-around**
- **align-lg-content-stretch**
- **align-xl-content-start**
- **align-xl-content-end**
- **align-xl-content-center**
- **align-xl-content-space-between**
- **align-xl-content-spacearound**
- **align-xl-content-stretch**

## Flex grow and shrink

Vuetify has helper classes for applying grow and shrink manually. These can be applied by adding the helper class in the format `flex-{condition}-{value}`, where condition can be either `grow` or `shrink` and value can be either `0` or `1`. The condition `grow` will permit an element to grow to fill available space, whereas `shrink` will permit an element to shrink down to only the space needs for its contents. However, this will only happen if the element must shrink to fit their container such as a container resize or being effected by a `flex-grow-1`. The value `0` will prevent the condition from occurring whereas `1` will permit the condition. The following classes are available:

- **flex-grow-0**
- **flex-grow-1**
- **flex-shrink-0**
- **flex-shrink-1**

<example file="flex/grow-shrink" />

These helper classes can also be applied in the format `flex-{breakpoint}-{condition}-{state}` to create more responsive variations based on breakpoints. The following combinations are available:

- **flex-sm-grow-0**
- **flex-md-grow-0**
- **flex-lg-grow-0**
- **flex-xl-grow-0**
- **flex-sm-grow-1**
- **flex-md-grow-1**
- **flex-lg-grow-1**
- **flex-xl-grow-1**
- **flex-sm-shrink-0**
- **flex-md-shrink-0**
- **flex-lg-shrink-0**
- **flex-xl-shrink-0**
- **flex-sm-shrink-1**
- **flex-md-shrink-1**
- **flex-lg-shrink-1**
- **flex-xl-shrink-1**

<backmatter />
