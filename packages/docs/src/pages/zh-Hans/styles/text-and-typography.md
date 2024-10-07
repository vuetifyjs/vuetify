---
meta:
  title: 文本和排版
  description: 查看各种各样的排版风格。 从页头到标题，有各种各样的加粗、大小和斜体。
  keywords: 排版, 页头, 标题, 文本
related:
  - /styles/display/
  - /styles/content/
  - /components/subheaders/
---

# 文本和排版

控制文本大小、对齐、换行、溢出、变形等等。 <inline-ad slug="scrimba-typography" />

<entry-ad />

## 排版

使用排版辅助类控制文本的大小和样式. 这些值基于 [Material设计规范](https://material.io/design/typography/the-type-system.html).

<example file="text-and-typography/typography" />

这些类可以应用于从 `xs` 到 `xl` 的所有断点。 当使用基础类 `.text-{value}` 时, 它被推断为 `.text-xs-${value}`.

- `.text-{value}` 用于 `xs`
- `.text-{breakpoint}-{value}` 用于 `sm`, `md`, `lg` 和 `xl`

该 _value_ 属性的值是以下之一：

- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `subtitle-1`
- `subtitle-2`
- `body-1`
- `body-2`
- `button`
- `caption`
- `overline`

<br>

<alert type="success">

  **提示**

在v2.3.0之前的所有版本中，这些类都是以下内容之一：

<br>

- `.display-4`
- `.display-3`
- `.display-2`
- `.display-1`
- `.headline`
- `.title`
- `.subtitle-1`
- `.subtitle-2`
- `.body-1`
- `.body-2`
- `.caption`
- `.overline`

</alert>

下面的示例演示如何在不同的断点显示不同的大小：

<example file="text-and-typography/typography-breakpoints" />

### 强调字体

Material 设计, 默认情况下, 支持 **100, 300, 400, 500, 700, 900** 字体宽度和斜体文本.

<example file="text-and-typography/font-emphasis" />

## 文本

### 对齐

Alignment 助手类允许你轻松的创建 re-align 文本。

<example file="text-and-typography/text-justify" />

还有可用于支持响应式显示的 alignment 类。

<example file="text-and-typography/text-align" />

### 装饰线

<alert type="info">

  **v2.3.0+ 新增**

</alert>

使用 `.text-decoration-none` 移除文本装饰线或使用 `.text-decoration-overline`, `.text-decoration-underline`, 和 `.text-decoration-line-through` 添加一个 *上划线, 下划线或删除线*.

<example file="text-and-typography/text-decoration" />

### 不透明度

不透明度辅助类可以让您轻松调整文本的重点. `text--primary` 与默认文本具有相同的不透明度。 `text--secondary` 用于提示和辅助文本。 使用 `text--disabled` 去除强调文本。

<example file="text-and-typography/text-opacity" />

### 变形

文本 capitalization 类可以转换文字的大小写。

<example file="text-and-typography/text-transform" />

也可以断开文本或删除 `text-transform` . 在第一个示例中, 自定义类 `text-transform: uppercase` 将被覆盖，并允许保留文本大小写。 在第二个示例中，我们将一个较长的单词拆分以填充可用空间。

<example file="text-and-typography/text-break" />

### 文本换行和溢出

您可以使用 `.text-no-wrap` 工具类来防止文本换行.

<example file="text-and-typography/text-no-wrap" />

Longer content can be truncated with a text ellipsis using the `.text-truncate` utility class.

<alert type="info">

  **Requires** `display: inline-block` **or** `display: block`.

</alert>

<example file="text-and-typography/text-truncate" />

## RTL 对齐

When using [RTL](/features/bidirectionality), you may want to keep the alignment regardless of the **rtl** designation. 这可以通过以下格式的文本对齐辅助类实现: `text-{breakpoint}-{direction}`, `breakpoint` 可以是 `sm`, `md`, `lg>` 或 `xl`, `direction` 可以是 `left` 或 `right`. 你也可以通过使用 `start` 和 `end` 对齐rtl.

<example file="text-and-typography/text-rtl" />

<backmatter />
