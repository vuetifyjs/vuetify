---
meta:
  title: 显示辅助
  description: 显示辅助类允许你根据视口控制元素的显示方式。
  keywords: 显示辅助类，显示类，vuetify 显示
related:
  - /styles/text-and-typography/
  - /directives/resize/
  - /features/breakpoints/
---

# 显示辅助

显示辅助器允许你控制内容的显示。 可以根据当前视图或实际元素显示类型有条件地显示内容。

<entry-ad />

<breakpoints-table />

## 显示

指定元素的 `display` 属性。 这些类可以应用于从 `xs` 到 `xl` 的所有断点。 当使用基础类时，`.d-{value}`, 被推断为 `.d-${value}-xs`。

- `.d-{value}` 用于 `xs`
- `.d-{breakpoint}-{value}` 用于 `sm`, `md`, `lg` 和 `xl`

该 _value_ 属性的值是以下之一：

- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

当为显示辅助类设置一个特定断点时，它将应用于所有屏幕从指定值开始的宽度。 例如， `d-lg-flex` 将适用于 `lg` 和 `xl` 的屏幕尺寸。

<example file="display/display-inline" />

<example file="display/display-block" />

## 可见性

根据当前 **viewport** 的宽度上限有条件的显示元素。 断点实用类始终自下而上应用。 这意味着如果你有 `.d-none`, 它将应用于所有断点。 然而， `.d-md-none` 将仅应用于 `md` 及以上。

| 屏幕大小        | 类                               |
| ----------- | ------------------------------- |
| 全部隐藏        | `.d-none`                       |
| 仅在 xs 大小时隐藏 | `.d-none .d-sm-flex`            |
| 仅在 sm 大小时隐藏 | `.d-sm-none .d-md-flex`         |
| 仅在 md 大小时隐藏 | `.d-md-none .d-lg-flex`         |
| 仅在 lg 大小时隐藏 | `.d-lg-none .d-xl-flex`         |
| 仅在 xl 大小时隐藏 | `.d-xl-none`                    |
| 全部可见        | `.d-flex`                       |
| 仅在 xs 大小时可见 | `.d-flex .d-sm-none`            |
| 仅在 sm 大小时可见 | `.d-none .d-sm-flex .d-md-none` |
| 仅在 md 大小时可见 | `.d-none .d-md-flex .d-lg-none` |
| 仅在 lg 大小时可见 | `.d-none .d-lg-flex .d-xl-none` |
| 仅在 xl 大小时可见 | `.d-none .d-xl-flex`            |

<example file="display/visibility" />

此外, 您还可以使用横向显示辅助类基于当前 **viewport** 宽度上限来显示元素。 这些类可以使用以下格式 `hidden-{breakpoint}-{condition}` 使用。

基于以下 _条件_ 应用类:

- `only` - 只在 `xs` 至 `xl` 断点隐藏元素
- `and-down` - 在指定的断点和以下隐藏元素, 从 `sm` 到 `lg` 断点
- `and-up` - 在指定的断点和以上隐藏元素, 从 `sm` 到 `lg` 断点

此外,  可以使用 `only` 条件确定目标 **媒体类型** 。 目前支持 `hidden-screen-only` 和 `hidden-print-only` 。

## 打印显示

你还可以在打印时更改显示属性。

- `.d-print-none`
- `.d-print-inline`
- `.d-print-inline-block`
- `.d-print-block`
- `.d-print-table`
- `.d-print-table-row`
- `.d-print-table-cell`
- `.d-print-flex`
- `.d-print-inline-flex`

打印功能类也可以与无打印显示功能组合。

<example file="display/print" />

## 无障碍

### 屏幕阅读器

使用 `d-sr` 工具类在 *除* 屏幕阅读器外所有的设备上隐藏内容。

- `d-sr-only` 视觉隐藏元素但仍会通知 **屏幕阅读器** 。
- `d-sr-focusable` 视觉隐藏一个元素直到它获取焦点。 这在实现 *跳过链接* 时非常有用。 <backmatter />
