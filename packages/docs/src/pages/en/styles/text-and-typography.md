---
meta:
  title: Text and typography
  description: View the various typography styles. From display to labels, with various weights, sizes and italics.
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /features/internationalization/
features:
  report: true
  spec: https://m3.material.io/styles/typography/type-scale-tokens
---

# Text and typography

Control text size, alignment, wrapping, overflow, transforms and more. By default, Vuetify uses the Material Design 3 specification [Roboto Font](https://fonts.google.com/specimen/Roboto).

<PageFeatures />

| Class | Properties |
| - | - |
| **text-display-large** | font-size: 57px;<br>font-weight: 500;<br>line-height: 64px;<br>letter-spacing: -0.25px; |
| **text-display-medium** | font-size: 45px;<br>font-weight: 500;<br>line-height: 52px;<br>letter-spacing: 0px; |
| **text-display-small** | font-size: 36px;<br>font-weight: 500;<br>line-height: 44px;<br>letter-spacing: 0px; |
| **text-headline-large** | font-size: 32px;<br>font-weight: 500;<br>line-height: 40px;<br>letter-spacing: 0px; |
| **text-headline-medium** | font-size: 28px;<br>font-weight: 500;<br>line-height: 36px;<br>letter-spacing: 0px; |
| **text-headline-small** | font-size: 24px;<br>font-weight: 500;<br>line-height: 32px;<br>letter-spacing: 0px; |
| **text-title-large** | font-size: 22px;<br>font-weight: 400;<br>line-height: 30px;<br>letter-spacing: 0px; |
| **text-title-medium** | font-size: 16px;<br>font-weight: 500;<br>line-height: 24px;<br>letter-spacing: 0.15px; |
| **text-title-small** | font-size: 14px;<br>font-weight: 500;<br>line-height: 20px;<br>letter-spacing: 0.1px; |
| **text-body-large** | font-size: 16px;<br>font-weight: 400;<br>line-height: 24px;<br>letter-spacing: 0.5px; |
| **text-body-medium** | font-size: 14px;<br>font-weight: 400;<br>line-height: 20px;<br>letter-spacing: 0.25px; |
| **text-body-small** | font-size: 12px;<br>font-weight: 400;<br>line-height: 16px;<br>letter-spacing: 0.4px; |
| **text-label-large** | font-size: 14px;<br>font-weight: 500;<br>line-height: 20px;<br>letter-spacing: 0.1px; |
| **text-label-medium** | font-size: 12px;<br>font-weight: 500;<br>line-height: 16px;<br>letter-spacing: 0.5px; |
| **text-label-small** | font-size: 11px;<br>font-weight: 500;<br>line-height: 16px;<br>letter-spacing: 0.5px; |
| **text-high-emphasis** | color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity)); |
| **text-medium-emphasis** | color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity)); |
| **text-disabled** | color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity)); |
| **text-uppercase** | text-transform: uppercase; |
| **text-lowercase** | text-transform: lowercase; |
| **text-capitalize** | text-transform: capitalize; |
| **text-none** | text-transform: none; |
| **text-start** | text-align: start; |
| **text-center** | text-align: center; |
| **text-end** | text-align: end; |
| **text-justify** | text-align: justify; |
| **text-left** | text-align: left; |
| **text-right** | text-align: right; |
| **text-truncate** | overflow: hidden;<br>text-overflow: ellipsis;<br>white-space: nowrap; |
| **text-no-wrap** | white-space: nowrap; |
| **text-pre-wrap** | white-space: pre-wrap; |
| **text-break** | overflow-wrap: break-word; |
| **text-decoration-none** | text-decoration: none; |
| **text-decoration-overline** | text-decoration: overline; |
| **text-decoration-underline** | text-decoration: underline; |
| **text-decoration-line-through** | text-decoration: line-through; |
| **font-weight-black** | font-weight: 900; |
| **font-weight-bold** | font-weight: 700; |
| **font-weight-semibold** | font-weight: 600; |
| **font-weight-medium** | font-weight: 500; |
| **font-weight-regular** | font-weight: 400; |
| **font-weight-light** | font-weight: 300; |
| **font-weight-thin** | font-weight: 100; |
| **font-italic** | font-style: italic; |
| **text-{breakpoint}-display-large** | Set the text-display-large style for the specified breakpoint. |
| **text-{breakpoint}-display-medium** | Set the text-display-medium style for the specified breakpoint. |
| **text-{breakpoint}-display-small** | Set the text-display-small style for the specified breakpoint. |
| **text-{breakpoint}-headline-large** | Set the text-headline-large style for the specified breakpoint. |
| **text-{breakpoint}-headline-medium** | Set the text-headline-medium style for the specified breakpoint. |
| **text-{breakpoint}-headline-small** | Set the text-headline-small style for the specified breakpoint. |
| **text-{breakpoint}-title-large** | Set the text-title-large style for the specified breakpoint. |
| **text-{breakpoint}-title-medium** | Set the text-title-medium style for the specified breakpoint. |
| **text-{breakpoint}-title-small** | Set the text-title-small style for the specified breakpoint. |
| **text-{breakpoint}-body-large** | Set the text-body-large style for the specified breakpoint. |
| **text-{breakpoint}-body-medium** | Set the text-body-medium style for the specified breakpoint. |
| **text-{breakpoint}-body-small** | Set the text-body-small style for the specified breakpoint. |
| **text-{breakpoint}-label-large** | Set the text-label-large style for the specified breakpoint. |
| **text-{breakpoint}-label-medium** | Set the text-label-medium style for the specified breakpoint. |
| **text-{breakpoint}-label-small** | Set the text-label-small style for the specified breakpoint. { style="max-height: 600px;" fixed-header } |

<PromotedEntry />

## Usage

Control the size and style of text using the Typography helper classes. These values are based upon the [Material Design type specification](https://m3.material.io/styles/typography/type-scale-tokens).

<ExamplesExample file="text-and-typography/typography" />

### Breakpoints

All of the typography classes support the responsive breakpoints seen in other parts of the framework. The base class `.text-{variant}` corresponds to the `xsAndUp` breakpoint, while the classes `.text-{breakpoint}-{variant}` can be used for the rest of the breakpoints (`sm`, `md`, `lg` and `xl`).

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

## Customizing Fonts

By default, Vuetify uses **Roboto** as font family for regular text and headings. You can customize the font-family by overriding the following SASS variables:

- `$body-font-family` — Used for body text and most components
- `$heading-font-family` — Used for headings. (defaults to `$body-font-family`)

### Loading Custom Fonts

Before configuring Vuetify, ensure your chosen font is available in your application. There are several ways to load fonts:

- **Fonts from CDN** — Add an `@import` in your CSS or a `<link>` tag in your HTML
- **Local font files** — Use `@font-face` declarations
- **NPM packages** — Install packages like `@fontsource/open-sans`

### Configuring Vuetify

Ensure you have [SASS Variables](/features/sass-variables) configured in your project, then set the font-family variables:

```scss { resource="src/styles/settings.scss" }
@use 'sass:string';
@use 'vuetify/settings' with (
  $body-font-family: string.unquote('"Open Sans", sans-serif'),
  $heading-font-family: string.unquote('"Montserrat", sans-serif')
);
```

### Using CSS Variables

You can use CSS custom properties for font-family values, allowing runtime changes or integration with theming systems:

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $body-font-family: var(--font-sans)
  // $heading-font-family inherits the same font in this example
);
```

## RTL Alignment

When using [RTL](/features/bidirectionality), you may want to keep the alignment regardless of current text direction. This can be achieved by setting the direction to either `left` or `right`.

If instead you want the alignment to respond to the current text direction, use `start` and `end`.

<ExamplesExample file="text-and-typography/text-rtl" />
