---
meta:
  title: Date picker 日期选择器
  description: 日期选择器组件是一个独立的接口，允许选择日期、月份和年份。
  keywords: 日期选择器，vuetify 日期选择器组件，vue 日期选择器组件
related:
  - /components/buttons/
  - /components/text-fields/
  - /components/time-pickers/
---

# Date pickers（日期选择器）

`v-date-selecter` 是一个功能齐全的日期选择组件, 它让用户选择一个日期或日期范围。

<entry-ad />

## 使用

日期选择器有两种方向变化，纵向<strong x-id=“1”>（默认）</strong>和横向。 默认情况下，当日期（用于日期选择器）或月份（用于月份选择器）选中时它们将发出`input`事件，但使用<strong x-id=“1”>reactive</strong> prop，它们甚至可以在单击年/月之后更新模型。

<example file="v-date-picker/usage" />

## API

- [v-date-picker](/api/v-date-picker)

<inline-api page="components/date-pickers" />

## 注意

<alert type="warning">

  `v-date-picker`  接受ISO 8601 **日期** 字符串(*YYYY-MM-DD*)。 有关 ISO 8601 和其他标准的更多信息，请访问 ISO（国际标准化组织） [国际标准](https://www.iso.org/standards.html) 官方网页。

</alert>

## 示例

### 属性

#### 允许的日期

您可以使用数组、对象和函数指定允许的日期。

<example file="v-date-picker/prop-allowed-dates" />

#### 颜色

可以使用 **color** 和 **header-color** props 设置日期选择器颜色。 如果没有提供 **header-color** prop, 头部将使用 **color** prop值。

<example file="v-date-picker/prop-colors" />

#### 高度(z轴)

`v-date-selecter` 组件支持最高高度(z轴)值为24。 欲了解更多关于高度的信息，请访问官方的 [Material Design高度](https://material.io/design/environment/elevation.html) 页面。

<example file="v-date-picker/prop-elevation" />

#### 图标 (Icons)

您可以覆盖选择器中使用的默认图标。

<example file="v-date-picker/prop-icons" />

#### 多选

日期选择器可以使用 **multiple** prop 选择多个日期。 如果使用 **multiple** ，日期选择器就会要求它的model是一个数组。

<example file="v-date-picker/prop-multiple" />

#### 选取的日期

您可以观察 **picker-date** ，它是显示的月份/年份（取决于选择器类型和激活的视图），以便在其更改时执行某些操作。 这使用了 `.sync` 修饰符。

<example file="v-date-picker/prop-picker-date" />

#### 范围

日期选择器使用 **range** prop 选择日期范围。 当使用 <strong x-id=“1”>range</strong> prop 日期选择器要求其model是长度为2的数组或空数组。

<example file="v-date-picker/prop-range" />

#### 只读

可以添加 **readonly** prop 来禁用选择新日期。

<example file="v-date-picker/prop-readonly" />

#### 显示当前月份

默认情况下，当前日期是使用边框按钮显示的 - **show-current** prop 允许您删除边框或选择其他日期显示为当前日期。

<example file="v-date-picker/prop-show-current" />

#### 显示相邻月份

默认情况下，前1个月和后1个月的天数不可见。 可以使用 **show-adjacent-months**属性显示。

<example file="v-date-picker/prop-show-adjacent-months" />

#### 宽度

您可以设置选择器指定宽度或100%。

<example file="v-date-picker/prop-width" />

### 事件

#### 日期按钮

Handle events such as `@click`, `@dblclick`, `@mouseenter`, and more when interacting with *date, month, and year* buttons.

<example file="v-date-picker/event-button-events" />

#### 日期事件

您可以使用数组、对象或函数指定事件。 要更改事件的默认颜色，请使用 **event-color** prop。 您的 **事件** 函数或对象可以返回数组颜色(材料或 css)，如果您想要显示多个事件指示器。

<example file="v-date-picker/event-events" />

### 其他

#### 活动选择器

默认情况下，从年份选择器开始，限制日期范围并在选择日期后关闭选择器菜单，使之成为理想的生日选择器。

<example file="v-date-picker/misc-birthday" />

#### 对话框和菜单

将选择器集成到  `v-text-field` 中时，建议使用 **readonly** prop。 这将防止手机键盘触发。 要节省垂直空间，还可以隐藏选择器标题。

拾取器公开一个允许您挂起保存和取消功能的插槽。 这将保持一个用户取消时可以替换的旧值。

<example file="v-date-picker/misc-dialog-and-menu" />

#### 格式化

如果您需要以自定义格式显示日期(不同于YYYY-MM-DD)，您需要使用格式化函数。

<example file="v-date-picker/misc-formatting" />

#### 使用外部库格式化

也可以使用外部库（例如 Moment.js 或 date-fns）格式化日期

<example file="v-date-picker/misc-formatting-external-libraries" />

#### 国际化

日期选择器支持通过 JavaScript 日期对象进行国际化。 Specify a BCP 47 language tag using the **locale** prop, and then set the first day of the week with the **first-day-of-week** prop.

<example file="v-date-picker/misc-internationalization" />

#### 方向

日期选择器有两种方向变化，纵向<strong x-id=“1”>（默认）</strong>和横向。

<example file="v-date-picker/misc-orientation" />

<backmatter />
