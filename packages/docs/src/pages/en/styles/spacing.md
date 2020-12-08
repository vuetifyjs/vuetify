---
meta:
  title: CSS Spacing helpers
  description: Spacing helper classes allow you to apply margin or padding to any element in increments from 1 to 5.
  keywords: spacing helper classes, spacing classes, vuetify spacing
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids/
---

# Spacing

Update your layout without creating new classes. Spacing helpers are useful for modifying the padding and margin of an element.<inline-ad slug="scrimba-spacing" />

<entry-ad />

Use the playground to get a feel for what the different helper classes can do. For an explanation of **how they work**, see the How it works section below.

<example file="spacing/usage" />

## How it works

The helper classes apply **margin** or **padding** to an element ranging from _0 to 16_. Each size increment was designed to align with common Material Design spacings. These classes can be applied using the following format `{property}{direction}-{size}`.

The **property** applies the type of spacing:

- `m` - applies `margin`
- `p` - applies `padding`

The **direction** designates the side the property applies to:

- `t` - applies the spacing for `margin-top` and `padding-top`
- `b` - applies the spacing for `margin-bottom` and `padding-bottom`
- `l` - applies the spacing for `margin-left` and `padding-left`
- `r` - applies the spacing for `margin-right` and `padding-right`
- `s` - applies the spacing for `margin-left`/`padding-left` _(in LTR mode)_ and `margin-right`/`padding-right` _(in RTL mode)_
- `e` - applies the spacing for `margin-right`/`padding-right` _(in LTR mode)_ and `margin-left`/`padding-left` _(in RTL mode)_
- `x` - applies the spacing for both `*-left` and `*-right`
- `y` - applies the spacing for both `*-top` and `*-bottom`
- `a` - applies the spacing for the property in all directions

The **size** controls the increment of the property in 4px intervals:

- `0` - eliminates all `margin` or `padding` by setting it to `0`
- `1` - sets `margin` or `padding` to 4px
- `2` - sets `margin` or `padding` to 8px
- `3` - sets `margin` or `padding` to 12px
- `4` - sets `margin` or `padding` to 16px
- `5` - sets `margin` or `padding` to 20px
- `6` - sets `margin` or `padding` to 24px
- `7` - sets `margin` or `padding` to 28px
- `8` - sets `margin` or `padding` to 32px
- `9` - sets `margin` or `padding` to 36px
- `10` - sets `margin` or `padding` to 40px
- `11` - sets `margin` or `padding` to 44px
- `12` - sets `margin` or `padding` to 48px
- `13` - sets `margin` or `padding` to 52px
- `14` - sets `margin` or `padding` to 56px
- `15` - sets `margin` or `padding` to 60px
- `16` - sets `margin` or `padding` to 64px
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

Vuetify comes with a 12 point grid system built using Flexbox. Spacing is used to create specific layouts within an application's content. It consists of 5 media breakpoints used to target specific screen sizes or orientations: **xs**, **sm**, **md**, **lg** and **xl**. The default resolutions are defined below in the *Viewport Breakpoints* table and can be modified by customizing the [breakpoint service config](/features/breakpoints).

<breakpoints-table />

The helper classes apply **margin** or **padding** at a given breakpoint. These classes can be applied using the following format: `{property}{direction}-{breakpoint}-{size}`. This does not apply to **xs** as it is inferred; e.g. `ma-xs-2` equals `ma-2`.

<example file="spacing/breakpoints" />

### Horizontal

Using the margin helper classes you can easily center content horizontally.

<example file="spacing/horizontal" />

### Negative margin

Margin can also be applied negatively at the same **1 to 16** intervals.

<example file="spacing/negative-margin" />

<backmatter />
