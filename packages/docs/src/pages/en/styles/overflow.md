---
meta:
  title: Overflow
  description: Overflow helper classes allow you to configure how content overflows when it beocomes too large.
  keywords: overflow helper classes, overflow classes, vuetify overflow
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids/
---

# Overflow

Configure how content overflows when it becomes out of container bounds.

<entry />

## How it works

Specify the elements `overflow`, `overflow-x`, or `overflow-y` property. These classes can be applied using the following format: `{overflow}-{value}`. Where **overflow** refers to the type: `overflow`, `overflow-x` or `overflow-y` and **value** can be one of: `auto`, `hidden`, or `visible`

here is a list of properties:

- `overflow-auto`
- `overflow-hidden`
- `overflow-visible`
- `overflow-x-auto`
- `overflow-x-hidden`
- `overflow-x-visible`
- `overflow-y-auto`
- `overflow-y-hidden`
- `overflow-y-visible`

## Examples

### Overflow property

`overflow-auto` is used to add scrollbars to an element when its content overflows the bounds. while `overflow-hidden` is used to clip any content that overflows the bounds. `overflow-visible` will prevent content from being clipped even when it overflows the bounds.

<example file="overflow/overflow" />

### Overflow X property

**overflow-x** can be used to specify horizontal overflows to an element if needed.

<example file="overflow/overflow-x" />
