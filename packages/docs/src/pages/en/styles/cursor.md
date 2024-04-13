---
emphasized: true
meta:
  title: Cursor
  description: Assign a custom cursor to any element.
  keywords: cursor, utility, helper, class
related:
  - /styles/content/
  - /styles/spacing/
  - /styles/text-and-typography/
features:
  report: true
---

# Cursor

Utilities for controlling the cursor styling when hovering over elements.

<PageFeatures />

| Class | Properties | |
| - | - | - |
| **cursor-auto** | cursor: auto; |
| **cursor-default** | cursor: default; |
| **cursor-grab** | cursor: grab; |
| **cursor-grabbing** | cursor: grabbing; |
| **cursor-help** | cursor: help; |
| **cursor-move** | cursor: move; |
| **cursor-none** | cursor: none; |
| **cursor-not-allowed** | cursor: not-allowed; |
| **cursor-pointer** | cursor: pointer; |
| **cursor-progress** | cursor: progress; |
| **cursor-text** | cursor: text; |
| **cursor-wait** | cursor: wait; { style="max-height: 420px;" fixed-header } |

<PromotedEntry />

## Usage

Apply custom cursor styling to a component or element.

<ExamplesExample file="cursor/usage" />

## SASS variables

You can also use the following SASS variables to customize the border color and width:

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $utilities: (
    "cursor": (
      property: cursor,
      class: cursor,
      values: auto default pointer wait text move help not-allowed progress grab grabbing none
    )
  )
);
```

Disable the generation of **cursor** utility classes by overwriting the utilities value:

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $utilities: (
    "cursor": false,
  ),
);
```
