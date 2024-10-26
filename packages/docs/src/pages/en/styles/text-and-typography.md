---
meta:
  title: Text and typography
  description: View the various typography styles. From headings to captions, with various weights, sizes and italics.
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /features/internationalization/
features:
  report: true
  spec: https://m2.material.io/design/typography/the-type-system.html
---

# Text and typography

Control text size, alignment, wrapping, overflow, transforms and more. By default, Vuetify uses the Material Design specification [Roboto Font](https://fonts.google.com/specimen/Roboto).

<PageFeatures />

| Class | Properties |
| - | - |
| **text-h1** | font-size: 6rem;<br>font-weight: 300;<br>line-height: 1;<br>letter-spacing: -0.015625em |
| **text-h2** | font-size: 3.75rem;<br>font-weight: 300;<br>line-height: 1;<br>letter-spacing: -0.0083333333em; |
| **text-h3** | font-size: 3rem;<br>font-weight: 400;<br>line-height: 1.05;<br>letter-spacing: normal; |
| **text-h4** | font-size: 2.125rem;<br>font-weight: 400;<br>line-height: 1.175;<br>letter-spacing: 0.0073529412em; |
| **text-h5** | font-size: 1.5rem;<br>font-weight: 400;<br>line-height: 1.333;<br>line-height: normal; |
| **text-h6** | font-size: 1.25rem;<br>font-weight: 500;<br>line-height: 1.6;<br>letter-spacing: 0.0125em; |
| **text-subtitle-1** | font-size: 1rem;<br>font-weight: normal;<br>line-height: 1.75;<br>letter-spacing: 0.009375em; |
| **text-subtitle-2** | font-size: 0.875rem;<br>font-weight: 500;<br>line-height: 1.6;<br>letter-spacing: 0.0071428571em; |
| **text-body-1** | font-size: 1rem;<br>font-weight: 400;<br>line-height: 1.5;<br>letter-spacing: 0.03125em; |
| **text-body-2** | font-size: font-size: 0.875rem;<br>font-weight: 400;<br>line-height: 1.425;<br>letter-spacing: 0.0178571429em; |
| **text-button** | font-size: 0.875rem;<br>font-weight: 500;<br>line-height: 2.6;<br>letter-spacing: 0.0892857143em;<br>text-transform: uppercase; |
| **text-caption** | font-size: 0.75rem;<br>font-weight: 400;<br>line-height: 1.667;<br>letter-spacing: 0.0333333333em; |
| **text-overline** | font-size: 0.75rem;<br>font-weight: 500;<br>line-height: 2.667;<br>letter-spacing: 0.1666666667em;<br>text-transform: uppercase; |
| **text-high-emphasis** | color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity)); |
| **text-medium-emphasis** | color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity)); |
| **text-disabled** | color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity)); |
| **text-uppercase** | text-transform: uppercase; |
| **text-lowercase** | text-transform: lowercase; |
| **text-capitalize** | text-transform: capitalize; |
| **text-start** | text-align: start; |
| **text-center** | text-align: center; |
| **text-end** | text-align: end; |
| **text-justify** | text-align: justify; |
| **text-left** | text-align: left; |
| **text-right** | text-align: right; |
| **text-truncate** | overflow: hidden;<br>text-overflow: ellipsis;<br>white-space: nowrap; |
| **text-no-wrap** | white-space: nowrap; |
| **text-break** | overflow-wrap: break-word; |
| **text-decoration-none** | text-decoration: none; |
| **text-decoration-overline** | text-decoration: overline; |
| **text-decoration-underline** | text-decoration: underline; |
| **text-decoration-line-through** | text-decoration: line-through; |
| **font-weight-black** | font-weight: 900; |
| **font-weight-bold** | font-weight: 700; |
| **font-weight-medium** | font-weight: 500; |
| **font-weight-regular** | font-weight: 400; |
| **font-weight-light** | font-weight: 300; |
| **font-weight-thin** | font-weight: 100; |
| **font-italic** | font-style: italic; |
| **text-{breakpoint}-h1** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-h2** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-h3** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-h4** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-h5** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-h6** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-subtitle-1** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-subtitle-2** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-body-1** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-body-2** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-button** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-caption** | Set the font size for the specified breakpoint. |
| **text-{breakpoint}-overline** | Set the font size for the specified breakpoint. { style="max-height: 600px;" fixed-header } |

<PromotedEntry />

## Typography

Control the size and style of text using the Typography helper classes. These values are based upon the [Material Design type specification](https://material.io/design/typography/the-type-system.html).

<ExamplesExample file="text-and-typography/typography" />

### Breakpoints

All of the typography classes support the responsive breakpoints seen in other parts of the framework. The base class `.text-{value}` corresponds to the `xsAndUp` breakpoint, while the classes `.text-{breakpoint}-{value}` can be used for the rest of the breakpoints (`sm`, `md`, `lg` and `xl`).

The following example shows a slightly contrived example of how one can use the different classes to effect:

<ExamplesExample file="text-and-typography/typography-breakpoints" />

### Font emphasis

Material design, by default, supports **100, 300, 400, 500, 700, 900** font weights and italicized text.

<ExamplesExample file="text-and-typography/font-emphasis" />

## Text

### Alignment

Alignment helper classes allow you to easily re-align text.

<ExamplesExample file="text-and-typography/text-alignment" />

The alignment classes also support responsive breakpoints.

<ExamplesExample file="text-and-typography/text-alignment-responsive" />

### Decoration

Remove text decoration with the `.text-decoration-none` class or add an *overline, underline or line-through* by using `.text-decoration-overline`, `.text-decoration-underline`, and `.text-decoration-line-through`.

<ExamplesExample file="text-and-typography/text-decoration" />

### Opacity

Opacity helper classes allow you to easily adjust the emphasis of text. `text-high-emphasis` has the same opacity as default text. `text-medium-emphasis` is used for hints and helper text. De-emphasize text with `text-disabled`.

<ExamplesExample file="text-and-typography/text-opacity" />

### Transform

Text can be transformed with text capitalization classes.

<ExamplesExample file="text-and-typography/text-transform" />

Text breaking and the removal of `text-transform` is also possible. In the first example, the `text-transform: uppercase` custom class is overwritten and allows the text casing to remain. In the second example, we break up a longer word to fit the available space.

<ExamplesExample file="text-and-typography/text-break" />

### Wrapping and overflow

You can prevent wrapping text with the `.text-no-wrap` utility class.

<ExamplesExample file="text-and-typography/text-no-wrap" />

Longer content can be truncated with a text ellipsis using the `.text-truncate` utility class.

::: info
  **Requires** `display: inline-block` **or** `display: block`.
:::

<ExamplesExample file="text-and-typography/text-truncate" />

## RTL Alignment

When using [RTL](/features/bidirectionality), you may want to keep the alignment regardless of current text direction. This can be achieved by setting the direction to either `left` or `right`.

If instead you want the alignment to respond to the current text direction, use `start` and `end`.

<ExamplesExample file="text-and-typography/text-rtl" />
