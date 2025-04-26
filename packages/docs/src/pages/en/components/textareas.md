---
meta:
  nav: Textareas
  title: Textarea component
  description: The textarea component is a text field that accepts lengthy textual input from users.
  keywords: textareas, vuetify textarea component, vue textarea component
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
features:
  label: 'C: VTextarea'
  report: true
  github: /components/VTextarea/
  spec: https://m2.material.io/components/text-fields#input-types
---

# Textareas

Textarea components are used for collecting large amounts of textual data.

<PageFeatures />

## Usage

`v-textarea` in its simplest form is a multi-line text-field, useful for larger amounts of text.

<ExamplesUsage name="v-textarea" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-textarea](/api/v-textarea/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Auto grow

When using the `auto-grow` prop, textarea's will automatically increase in size when the contained text exceeds its size.

<ExamplesExample file="v-textarea/prop-auto-grow" />

#### Background color

The `background-color` and `color` props give you more control over styling `v-textarea`'s.

<ExamplesExample file="v-textarea/prop-background-color" />

#### Browser autocomplete

The `autocomplete` prop gives you the option to enable the browser to predict user input.

<ExamplesExample file="v-textarea/prop-browser-autocomplete" />

#### Clearable

You can clear the text from a `v-textarea` by using the `clearable` prop, and customize the icon used with the `clearable-icon` prop.

<ExamplesExample file="v-textarea/prop-clearable" />

#### Counter

The `counter` prop informs the user of a character limit for the `v-textarea`.

<ExamplesExample file="v-textarea/prop-counter" />

#### Icons

The `append-icon` and `prepend-icon` props help add context to `v-textarea`.

<ExamplesExample file="v-textarea/prop-icons" />

#### No resize

`v-textarea`'s have the option to remain the same size regardless of their content's size, using the `no-resize` prop.

<ExamplesExample file="v-textarea/prop-no-resize" />

#### Rows

The `rows` prop allows you to define how many rows the textarea has, when combined with the `row-height` prop you can further customize your rows by defining their height.

<ExamplesExample file="v-textarea/prop-rows" />

### Misc

#### Signup form

Utilizing alternative input styles, you can create amazing interfaces that are easy to build and easy to use.

<ExamplesExample file="v-textarea/misc-signup-form" />
