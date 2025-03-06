---
meta:
  nav: Click outside
  title: Click outside directive
  description: The v-click-outside directive calls a function when something outside of the target element is clicked on.,
  keywords: click outside, click directive, vue click directive, vuetify click directives
related:
  - /components/dialogs/
  - /components/navigation-drawers/
  - /directives/intersect/
---

# Click outside

The `v-click-outside` directive calls a function when something outside of the target element is clicked on. This is used internally by components like `v-menu` and `v-dialog`.

<PageFeatures />

## Usage

The `v-click-outside` directive allows you to provide a handler to be invoked when the user clicks outside of the target element.

<ExamplesExample file="v-click-outside/usage" />

<PromotedEntry />

## API

<ApiInline />

## Examples

### Options

#### Close conditional

Optionally provide a `closeConditional` handler that returns `true` or `false`. This function determines whether the outside click function is invoked or not.

<ExamplesExample file="v-click-outside/option-close-on-outside-click" />

#### Include

Optionally provide an `include` function in the `options` object that returns an array of `HTMLElement`s. This function determines which additional elements that the click must be outside of, for the handler to be called.

<ExamplesExample file="v-click-outside/option-include" />
