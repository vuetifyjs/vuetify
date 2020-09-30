---
meta:
  title: Text and typography
  description: View the various typography styles. From headings to captions, with various weights, sizes and italics.
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /components/subheaders/
---

# Text and typography

Control text size, alignment, wrapping, overflow, transforms and more. <inline-ad slug="scrimba-typography" />

<entry-ad />

## Typography

Control the size and style of text using the Typography helper classes. These values are based upon the [Material Design type specification](https://material.io/design/typography/the-type-system.html).

<example file="text-and-typography/typography" />

These classes can be applied to all breakpoints from `xs` to `xl`. When using a base class, `.text-{value}`, it is inferred to be `.text-xs-${value}`.

- `.text-{value}` for `xs`
- `.text-{breakpoint}-{value}` for `sm`, `md`, `lg` and `xl`

The _value_ property is one of:

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

  **TIP**

  In all versions prior to v2.3.0, these classes were one of the following:

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

The following example demonstrates how the various sizes would appear at different breakpoints:

<example file="text-and-typography/typography-breakpoints" />

### Font emphasis

Material design, by default, supports **100, 300, 400, 500, 700, 900** font weights and italicized text.

<example file="text-and-typography/font-emphasis" />

## Text

### Alignment

Alignment helper classes allow you to easily re-align text.

<example file="text-and-typography/text-justify" />

There are also available alignment classes that support responsive displays.

<example file="text-and-typography/text-align" />

### Decoration

<alert type="info">

  **New in v2.3.0+**

</alert>

Remove text decoration with the `.text-decoration-none` class or add an *overline, underline or line-through* by using `.text-decoration-overline`, `.text-decoration-underline`, and `.text-decoration-line-through`.

<example file="text-and-typography/text-decoration" />

### Opacity

Opacity helper classes allow you to easily adjust the emphasis of text. `text--primary` has the same opacity as default text. `text--secondary` is used for hints and helper text. De-emphasize text with `text--disabled`.

<example file="text-and-typography/text-opacity" />

### Transform

Text can be transformed with text capitalization classes.

<example file="text-and-typography/text-transform" />

Text breaking and the removal of `text-transform` is also possible. In the first example, the `text-transform: uppercase` custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.

<example file="text-and-typography/text-break" />

### Wrapping and overflow

You can prevent wrapping text with the `.text-no-wrap` utility class.

<example file="text-and-typography/text-no-wrap" />

Longer content can be truncated with a text ellipsis. **Requires** `display: inline-block` **or** `display: block`.

<example file="text-and-typography/text-truncate" />

## RTL Alignment

When using [RTL](/features/rtl), you may want to keep the alignment regardless of the **rtl** designation. This can be achieved using text alignment helper classes in the following format: `text-<breakpoint>-<direction>`, where breakpoint can be `sm`, `md`, `lg`, or `xl` and direction can be `left` or `right`. You may also want alignment to respond to rtl which can be done using directions `start` and `end`.

<example file="text-and-typography/text-rtl" />

<backmatter />
