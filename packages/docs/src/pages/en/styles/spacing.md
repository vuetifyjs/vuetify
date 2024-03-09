---
meta:
  title: Spacing
  description: Spacing helper classes allow you to apply margin or padding to any element in increments from 1 to 5.
  keywords: spacing helper classes, spacing classes, vuetify spacing
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids/
---

# Spacing

Update your layout without creating new classes. Spacing helpers are useful for modifying the padding and margin of an element.

<PageFeatures />

<PromotedEntry />

Use the playground to get a feel for what the different helper classes can do. For an explanation of **how they work**, see the How it works section below.

<ExamplesExample file="spacing/usage" />

## How it works

The helper classes apply **margin**, **padding**, or **gap** to an element ranging from _0 to 16_. Each size increment was designed to align with common Material Design spacings. These classes can be applied using the following format `{property}{direction}-{size}`.

The **property** applies the type of spacing:

- `m` - applies `margin`
- `p` - applies `padding`
- `g` - applies `gap`

The **direction** designates the side the property applies to:

- `t` - applies the spacing for `margin-top` and `padding-top`
- `b` - applies the spacing for `margin-bottom` and `padding-bottom`
- `l` - applies the spacing for `margin-left` and `padding-left`
- `r` - applies the spacing for `margin-right`, `padding-right`, and `row-gap`
- `s` - applies the spacing for `margin-left`/`padding-left` _(in LTR mode)_ and `margin-right`/`padding-right` _(in RTL mode)_
- `e` - applies the spacing for `margin-right`/`padding-right` _(in LTR mode)_ and `margin-left`/`padding-left` _(in RTL mode)_
- `x` - applies the spacing for margin and padding `*-left` and `*-right`
- `y` - applies the spacing for margin and padding `*-top` and `*-bottom`
- `a` - applies the spacing for `margin`, `padding` and `gap` in all directions
- `c` - applies the spacing for `column-gap`

The **size** controls the increment of the property in 4px intervals:

- `0` - eliminates all `margin`, `padding` or `gap` by setting it to `0`
- `1` - sets `margin`, `padding` or `gap` to 4px
- `2` - sets `margin`, `padding` or `gap` to 8px
- `3` - sets `margin`, `padding` or `gap` to 12px
- `4` - sets `margin`, `padding` or `gap` to 16px
- `5` - sets `margin`, `padding` or `gap` to 20px
- `6` - sets `margin`, `padding` or `gap` to 24px
- `7` - sets `margin`, `padding` or `gap` to 28px
- `8` - sets `margin`, `padding` or `gap` to 32px
- `9` - sets `margin`, `padding` or `gap` to 36px
- `10` - sets `margin`, `padding` or `gap` to 40px
- `11` - sets `margin`, `padding` or `gap` to 44px
- `12` - sets `margin`, `padding` or `gap` to 48px
- `13` - sets `margin`, `padding` or `gap` to 52px
- `14` - sets `margin`, `padding` or `gap` to 56px
- `15` - sets `margin`, `padding` or `gap` to 60px
- `16` - sets `margin`, `padding` or `gap` to 64px
- `n1` - sets `margin` to -4px
- `n2` - sets `margin` to -8px
- `n3` - sets `margin` to -12px
- `n4` - sets `margin` to -16px
- `n5` - sets `margin` to -20px
- `n6` - sets `margin` to -24px
- `n7` - sets `margin` to -28px
- `n8` - sets `margin` to -32px
- `n9` - sets `margin` to -36px
- `n10` - sets `margin` to -40px
- `n11` - sets `margin` to -44px
- `n12` - sets `margin` to -48px
- `n13` - sets `margin` to -52px
- `n14` - sets `margin` to -56px
- `n15` - sets `margin` to -60px
- `n16` - sets `margin` to -64px
- `auto` - sets the spacing to **auto**

## Examples

### Breakpoints

Vuetify comes with a 12 point grid system built using Flexbox. Spacing is used to create specific layouts within an application's content. It consists of 5 media breakpoints used to target specific screen sizes or orientations: **xs**, **sm**, **md**, **lg** and **xl**. The default resolutions are defined below in the *Viewport Breakpoints* table and can be modified by customizing the [breakpoint service config](/features/display-and-platform/).

<FeaturesBreakpointsTable />

The helper classes apply **margin** or **padding** at a given breakpoint. These classes can be applied using the following format: `{property}{direction}-{breakpoint}-{size}`. This does not apply to **xs** as it is inferred; e.g. `ma-xs-2` equals `ma-2`.

<ExamplesExample file="spacing/breakpoints" />

### Horizontal

Margin helper classes let you easily center content horizontally.

<ExamplesExample file="spacing/horizontal" />

### Gap

Use the gap helper classes to easily apply a gap between content.

<ExamplesExample file="spacing/gap" />

### Negative margin

Margin can also be applied negatively at the same **1 to 16** intervals.

<ExamplesExample file="spacing/negative-margin" />
