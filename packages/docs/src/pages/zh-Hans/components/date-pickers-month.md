---
meta:
  title: Month picker 月份选择器
  description: 月份选择器组件是一个独立的接口，允许选择月份或月份和年份。
  keywords: 月份选择器, vuetify 月份选择器组件, vue 月份选择器组件
related:
  - /components/date-pickers/
  - /components/menus/
  - /components/time-pickers/
---

# Date pickers - month (月份选择器)

`v-date-picker` 可以用作一个独立的月份选择器组件。

<entry-ad />

## 使用

月份选择器有两种方向变化：纵向 **(默认)** 和横向。

<example file="v-date-picker-month/usage" />

## API

- [v-date-picker](/api/v-date-picker)

<inline-api page="components/date-pickers-month" />

## 注意

<alert type="warning">

  `v-date-picker`  接受ISO 8601 **日期** 字符串(*YYYY-MM-DD*)。 有关 ISO 8601 和其他标准的更多信息，请访问 ISO（国际标准化组织） [国际标准](https://www.iso.org/standards.html) 官方网页。

</alert>

## 示例

### 属性

#### 允许的月份

您可以使用数组、对象或函数指定允许的月份。

<example file="v-date-picker-month/prop-allowed-months" />

#### 颜色

可以使用<strong x-id=“1”>color</strong>和<strong x-id=“1”>header-color</strong> prop 设置月份选取器的颜色。 如果没有提供 **header-color** prop, 头部将使用 `color` prop值。

<example file="v-date-picker-month/prop-colors" />

#### 图标 (Icons)

您可以覆盖选择器中使用的默认图标。

<example file="v-date-picker-month/prop-icons" />

#### 多选

月份选择器现在可以使用 **multiple** prop 选择多个月份。 如果使用 **multiple** ，月份选择器就会要求它的model是一个数组。

<example file="v-date-picker-month/prop-multiple" />

#### 只读

可以添加 **readonly** prop 来禁用选择新日期。

<example file="v-date-picker-month/prop-readonly" />

#### 显示当前月份

默认情况下，当前月份使用边框按钮显示 - <strong x-id=“1”>show current</strong> prop 允许您删除边框或选择其他月份作为当前月份显示。

<example file="v-date-picker-month/prop-show-current" />

#### 宽度

您可以指定选择器的宽度或使其宽度切边(100%)。

<example file="v-date-picker-month/prop-width" />

### 其他

#### 对话框和菜单

将选择器集成到  `v-text-field` 中时，建议使用 **readonly** prop。 这将防止手机键盘触发。 要节省垂直空间，还可以隐藏选择器标题。

拾取器公开一个允许您挂起保存和取消功能的插槽。 这将保持一个用户取消时可以替换的旧值。

<example file="v-date-picker-month/misc-dialog-and-menu" />

#### 国际化

月份选择器支持通过JavaScript日期对象进行国际化。 使用 **locale** prop 属性指定BCP 47语言标记。

<example file="v-date-picker-month/misc-internationalization" />

#### 方向

月份选择器有两种方向变化：纵向 **(默认)** 和横向。

<example file="v-date-picker-month/misc-orientation" />

<backmatter />
