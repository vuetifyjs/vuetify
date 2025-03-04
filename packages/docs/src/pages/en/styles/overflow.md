---
meta:
  title: Overflow
  description: Overflow helper classes allow you to configure how content overflows when it becomes too large.
  keywords: overflow helper classes, overflow classes, vuetify overflow
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids/
features:
  report: true
---

# Overflow

Configure how content overflows when it becomes out of container bounds.

<PageFeatures />

| Class | Properties |
| - | - |
| **overflow** | overflow: auto; |
| **overflow-auto** | overflow: auto; |
| **overflow-hidden** | overflow: hidden; |
| **overflow-x** | overflow-x: auto; |
| **overflow-x-auto** | overflow-x: auto; |
| **overflow-x-hidden** | overflow-x: hidden; |
| **overflow-x-scroll** | overflow-x: scroll; |
| **overflow-y** | overflow-y: auto; |
| **overflow-y-auto** | overflow-y: auto; |
| **overflow-y-hidden** | overflow-y: hidden; |
| **overflow-y-scroll** | overflow-y: scroll; { style="max-height: 420px;" fixed-header } |

<PromotedEntry />

## Usage

Specify the elements `overflow`, `overflow-x`, or `overflow-y` property. These classes can be applied using the following format: `{overflow}-{value}`. Where **overflow** refers to the type: `overflow`, `overflow-x` or `overflow-y` and **value** can be one of: `auto`, `hidden`, or `visible`

### Overflow property

`overflow-auto` is used to add scrollbars to an element when its content overflows the bounds. while `overflow-hidden` is used to clip any content that overflows the bounds. `overflow-visible` will prevent content from being clipped even when it overflows the bounds.

<ExamplesExample file="overflow/overflow" />

### Overflow X property

**overflow-x** can be used to specify horizontal overflows to an element if needed.

<ExamplesExample file="overflow/overflow-x" />
