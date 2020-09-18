---
meta:
  title: File input component
  description: The file input component is a specialized input that provides a clean interface for selecting files, showing detailed selection information and upload progress.
  keywords: file input, file upload, file field
related:
  - /components/text-fields/
  - /components/forms/
  - /components/icons/
---

# File inputs

The `v-file-input` component is a specialized input that provides a clean interface for selecting files, showing detailed selection information and upload progress. It is meant to be a direct replacement for a standard file input.

<entry-ad />

## Usage

At its core, the `v-file-input` component is a basic container that extends [v-text-field](/components/text-fields).

<usage name="v-file-input" />

## API

- [v-file-input](/api/v-file-input)

## Examples

### Props

#### Accept

`v-file-input` component can accept only specific media formats/file types if you want. For more information, checkout the documentation on the [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).

<example file="v-file-input/prop-accept" />

#### Chips

A selected file can be displayed as a [chip](/components/chips). When using the **chips** and **multiple** props, each chip will be displayed (as opposed to the file count).

<example file="v-file-input/prop-chips" />

#### Counter

When using the **show-size** property along with **counter**, the total number of files and size will be displayed under the input.

<example file="v-file-input/prop-counter" />

#### Dense

You can reduces the file input height with `dense` prop.

<example file="v-file-input/prop-dense" />

#### Multiple

The `v-file-input` can contain multiple files at the same time when using the **multiple** prop.

<example file="v-file-input/prop-multiple" />

#### Prepend icon

The `v-file-input` has a default `prepend-icon` that can be set on the component or adjusted globally. More information on changing global components can be found on the [customizing icons page](/features/icons).

<example file="v-file-input/prop-prepend-icon" />

#### Show size

The displayed size of the selected file(s) can be configured with the **show-size** property. Display sizes can be either _1024_ (the default used when providing **true**) or _1000_.

<example file="v-file-input/prop-show-size" />

#### Validation

Similar to other inputs, you can use the **rules** prop to can create your own custom validation parameters.

<example file="v-file-input/prop-validation" />

### Slots

#### Selection

Using the `selection` slot, you can customize the appearance of your input selections. This is typically done with [chips](/components/chips), however any component or markup can be used.

<example file="v-file-input/slot-selection" />

### Misc

#### Complex selection slot

The flexibility of the selection slot allows you accommodate complex use-cases. In this example we show the first 2 selections as chips while adding a number indicator for the remaining amount.

<example file="v-file-input/misc-complex-selection" />

<backmatter />
