---
meta:
  title: Click outside directive
  description: The v-click-outside directive calls a function when something outside of the target element is clicked on.,
  keyword: click outside, click directive, vue click directive, vuetify click directives
related:
  - /components/dialogs/
  - /directives/intersect/
---

# Click outside

The `v-click-outside` directive calls a function when something outside of the target element is clicked on. This is used internally by components like `v-menu` and `v-dialog`.

<entry-ad />

## Usage

The `v-click-outside` directive allows you to provide a handler to be invoked when the user clicks outside of the target element.

<example file="v-click-outside/usage" />

## API

- [v-click-outside](/api/v-click-outside)

## Examples

### Options

#### Close on outside click

Optionally provide a `closeOnOutsideClick` handler that returns `true` or `false`. This function determines whether the outside click function is invoked or not.

<example file="v-click-outside/option-close-on-outside-click" />

<backmatter />
