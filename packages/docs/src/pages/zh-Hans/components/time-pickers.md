---
meta:
  title: Time picker 时间选择器
  description: Time picker 组件是一个独立的接口，允许以 AM/PM 格式和 24 小时格式选择小时数和分钟。
  keywords: 时间选择器, vuetify 时间选择器组件, vue 时间选择器组件
related:
  - /components/buttons/
  - /components/date-pickers/
  - /components/text-fields/
---

# Time pickers（时间选择器）

`v-time-picker` 是独立的组件，可以用于许多现有的 Vuetify 组件。 它为用户提供了选择时间的视觉表现。

<entry-ad />

## 使用

时间选择器默认情况下启用了浅色主题。

<usage name="v-time-picker" />

## API

- [v-time-picker](/api/v-time-picker)

<inline-api page="components/time-pickers" />

## 示例

### 属性

#### 允许的时间

您可以使用数组、对象和函数指定允许的时间。 您也可以指定时间步进/精度/间隔 - 例如10分钟。

<example file="v-time-picker/prop-allowed-times" />

#### 标题中的AM/PM

您可以移动 AM/PM 切换到选择器的标题。

<example file="v-time-picker/prop-ampm-in-title" />

#### 颜色

时间选择器颜色可以使用 `color` 和 `header-color` props设定。 如果没有提供 `header-color` prop, 头部将使用 `color` prop值。

<example file="v-time-picker/prop-color" />

#### 禁用

您无法使用已禁用的选择器。

<example file="v-time-picker/prop-disabled" />

#### 高度(z轴)

通过设置 **elevation** 从 0 到 24 来突出 `v-time-picker` 组件。 高度(z轴)将修改 `box-shadow` css 属性。

<example file="v-time-picker/prop-elevation" />

#### 格式化

时间选择器可以切换为24小时格式。 请注意， `format` prop 只定义选取器的显示方式，选取器的值 (model) 总是以24小时格式。

<example file="v-time-picker/prop-format" />

#### 无标题

您可以删除选择器的标题。

<example file="v-time-picker/prop-no-title" />

#### 范围

这是一个用 `min` 和 `max` props合并选择器的例子。

<example file="v-time-picker/prop-range" />

#### 只读

只读选择器的行为与禁用的一样，但看起来像默认的。

<example file="v-time-picker/prop-readonly" />

#### 可滚动

您可以使用鼠标滚轮编辑时间选择器的值。

<example file="v-time-picker/prop-scrollable" />

#### 使用秒

时间选择器可以输入秒数。

<example file="v-time-picker/prop-use-seconds" />

#### 宽度

You can specify the picker's width or make it full width.

<example file="v-time-picker/prop-width" />

### 其他

#### 对话框和菜单

由于选择器的灵活性，您可以真正按照自己的意愿进行输入。

<example file="v-time-picker/misc-dialog-and-menu" />

<backmatter />
