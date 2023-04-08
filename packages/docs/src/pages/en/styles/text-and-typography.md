---
meta:
  title: Text and typography
  description: View the various typography styles. From headings to captions, with various weights, sizes and italics.
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /features/internationalization/
---

# Text and typography

Control text size, alignment, wrapping, overflow, transforms and more. <inline slug="scrimba-typography" />

<entry />

## Typography

Control the size and style of text using the Typography helper classes. These values are based upon the [Material Design type specification](https://material.io/design/typography/the-type-system.html).

<example file="text-and-typography/typography" />

### Breakpoints

All of the typography classes support the responsive breakpoints seen in other parts of the framework. The base class `.text-{value}` corresponds to the `xsAndUp` breakpoint, while the classes `.text-{breakpoint}-{value}` can be used for the rest of the breakpoints (`sm`, `md`, `lg` and `xl`).

The following example shows a slightly contrived example of how one can use the different classes to effect:

<example file="text-and-typography/typography-breakpoints" />

### Font emphasis

Material design, by default, supports **100, 300, 400, 500, 700, 900** font weights and italicized text.

<example file="text-and-typography/font-emphasis" />

## Text

### Alignment

Alignment helper classes allow you to easily re-align text.

<example file="text-and-typography/text-alignment" />

The alignment classes also support responsive breakpoints.

<example file="text-and-typography/text-alignment-responsive" />

### Decoration

Remove text decoration with the `.text-decoration-none` class or add an *overline, underline or line-through* by using `.text-decoration-overline`, `.text-decoration-underline`, and `.text-decoration-line-through`.

<example file="text-and-typography/text-decoration" />

### Opacity

Opacity helper classes allow you to easily adjust the emphasis of text. `text-high-emphasis` has the same opacity as default text. `text-medium-emphasis` is used for hints and helper text. De-emphasize text with `text-disabled`.

<example file="text-and-typography/text-opacity" />

### Transform

Text can be transformed with text capitalization classes.

<example file="text-and-typography/text-transform" />

Text breaking and the removal of `text-transform` is also possible. In the first example, the `text-transform: uppercase` custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.

<example file="text-and-typography/text-break" />

### Wrapping and overflow

You can prevent wrapping text with the `.text-no-wrap` utility class.

<example file="text-and-typography/text-no-wrap" />

Longer content can be truncated with a text ellipsis using the `.text-truncate` utility class.

<alert type="info">

  **Requires** `display: inline-block` **or** `display: block`.

</alert>

<example file="text-and-typography/text-truncate" />

## RTL Alignment

When using [RTL](/features/bidirectionality), you may want to keep the alignment regardless of current text direction. This can be achieved by setting the direction to either `left` or `right`.

If instead you want the alignment to respond to the current text direction, use `start` and `end`.

<example file="text-and-typography/text-rtl" />
