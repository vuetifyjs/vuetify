---
meta:
  title: Display
  description: Display helper classes allow you to control when elements should display based upon viewport.
  keywords: display helper classes, display classes, vuetify display
related:
  - /styles/text-and-typography/
  - /directives/resize/
  - /features/display-and-platform/
features:
  report: true
---

# Display

Display helpers control content visibility and display type based on the viewport.

<PageFeatures />

| Class | Properties |
| - | - |
| **d-none** | display: none; |
| **d-sm-none** | display: none; |
| **d-md-none** | display: none; |
| **d-lg-none** | display: none; |
| **d-xl-none** | display: none; |
| **d-xxl-none** | display: none; |
| **d-sm-flex** | display: flex; |
| **d-md-flex** | display: flex; |
| **d-lg-flex** | display: flex; |
| **d-xl-flex** | display: flex; |
| **d-xxl-flex** | display: flex; |
| **d-sm-inline** | display: inline; |
| **d-md-inline** | display: inline; |
| **d-lg-inline** | display: inline; |
| **d-xl-inline** | display: inline; |
| **d-xxl-inline** | display: inline; |
| **d-sm-inline-block** | display: inline-block; |
| **d-md-inline-block** | display: inline-block; |
| **d-lg-inline-block** | display: inline-block; |
| **d-xl-inline-block** | display: inline-block; |
| **d-xxl-inline-block** | display: inline-block; |
| **d-sm-table** | display: table; |
| **d-md-table** | display: table; |
| **d-lg-table** | display: table; |
| **d-xl-table** | display: table; |
| **d-xxl-table** | display: table; |
| **d-sm-table-cell** | display: table-cell; |
| **d-md-table-cell** | display: table-cell; |
| **d-lg-table-cell** | display: table-cell; |
| **d-xl-table-cell** | display: table-cell; |
| **d-xxl-table-cell** | display: table-cell; |
| **d-sm-table-row** | display: table-row; |
| **d-md-table-row** | display: table-row; |
| **d-lg-table-row** | display: table-row; |
| **d-xl-table-row** | display: table-row; |
| **d-xxl-table-row** | display: table-row; |
| **d-sm-flex** | display: flex; |
| **d-md-flex** | display: flex; |
| **d-lg-flex** | display: flex; |
| **d-xl-flex** | display: flex; |
| **d-xxl-flex** | display: flex; |
| **d-sm-inline-flex** | display: inline-flex; |
| **d-md-inline-flex** | display: inline-flex; |
| **d-lg-inline-flex** | display: inline-flex; |
| **d-xl-inline-flex** | display: inline-flex; |
| **d-xxl-inline-flex** | display: inline-flex; |
| **d-print-none** | display: none; |
| **d-print-inline** | display: inline; |
| **d-print-inline-block** | display: inline-block; |
| **d-print-block** | display: block; |
| **d-print-table** | display: table; |
| **d-print-table-cell** | display: table-cell; |
| **d-print-table-row** | display: table-row; |
| **d-print-flex** | display: flex; |
| **d-print-inline-flex** | display: inline-flex; |
| **d-sr-only** | display: none; |
| **d-sr-only-focusable** | display: none; { style="max-height: 420px;" fixed-header } |

<PromotedEntry />

<FeaturesBreakpointsTable />

## Usage

Specify the element's `display` property. These classes can be applied to all breakpoints from `xs` to `xxl`. When using a base class,`.d-{value}`, it is inferred to be `.d-xs-{value}`.

- `.d-{value}` for `xs`
- `.d-{breakpoint}-{value}` for `sm`, `md`, `lg`, `xl`, and `xxl`

The _value_ property is one of:

- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

When setting a specific breakpoint for a display helper class, it will apply to all screen widths from the designation and up. For example, `d-lg-flex` will apply to `lg`, `xl` and `xxl` size screens.

<ExamplesExample file="display/display-inline" />

<ExamplesExample file="display/display-block" />

## Visibility

Conditionally display an element based upon the current **viewport**. Breakpoint utility classes always apply from the bottom up. That means if you have `.d-none`, it will apply to all breakpoints. However, `.d-md-none` will apply to only `md` and up.

| Screen size         | Class                            |
|---------------------|----------------------------------|
| Hidden on all       | `.d-none`                        |
| Hidden only on xs   | `.d-none .d-sm-flex`             |
| Hidden only on sm   | `.d-sm-none .d-md-flex`          |
| Hidden only on md   | `.d-md-none .d-lg-flex`          |
| Hidden only on lg   | `.d-lg-none .d-xl-flex`          |
| Hidden only on xl   | `.d-xl-none .d-xxl-flex`         |
| Hidden only on xxl  | `.d-xxl-none`                    |
| Visible on all      | `.d-flex`                        |
| Visible only on xs  | `.d-flex .d-sm-none`             |
| Visible only on sm  | `.d-none .d-sm-flex .d-md-none`  |
| Visible only on md  | `.d-none .d-md-flex .d-lg-none`  |
| Visible only on lg  | `.d-none .d-lg-flex .d-xl-none`  |
| Visible only on xl  | `.d-none .d-xl-flex .d-xxl-none` |
| Visible only on xxl | `.d-none .d-xxl-flex`            |

<ExamplesExample file="display/visibility" />

Alternatively you can hide an element based upon the current **viewport** using lateral display helper classes. These classes can be applied using the following format `hidden-{breakpoint}-{condition?}`

The _condition_ applies the class base on:

- nothing - hide the element only on the specified breakpoint
- `and-down` - hide the element on the specified breakpoint and down - `sm` through `xl` only
- `and-up` - hide the element on the specified breakpoint and up - `sm` through `xl` only

`hidden-{breakpoint}-and-up` is equivalent to `d-{breakpoint}-none`.

**Media types** can also be targeted using the `only` condition. Both `hidden-screen-only` and `hidden-print-only` are currently supported.

### Caveats

::: info
It is important to note that using any of the display classes above will result in any display style previously added being overwritten. This is because of the classes using `!important` in their display styling.
:::

## Display in print

You can also change the display property when printing. Print utility classes can also be combined with none print display utilities.

<ExamplesExample file="display/print" />

## Accessibility

### Screen readers

Use the `d-sr` utility classes to conditionally hide content on all devices _except_ screen readers.

- `d-sr-only` visually hides elements but will still announce to **screen readers**.
- `d-sr-only-focusable` visually hides an element until it is focused. This is useful when implementing _skip links_.
