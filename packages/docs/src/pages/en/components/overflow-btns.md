---
disabled: true
meta:
  title: Overflow button component
  description: The overflow button component creates an interface for a select that contains additional features and functionality.
  keywords: overflow buttons, vuetify overflow button component, vue overflow button component
related:
  - /components/forms/
  - /components/selection-controls/
  - /components/selects/
---

# Overflow buttons

`v-overflow-btn` is used to give the user the ability to select items from the list. It has 3 variations: `editable`, `overflow` and `segmented`

<PromotedEntry />

## Usage

`v-overflow-btn` is used for creating selection lists

<ExamplesUsage name="v-overflow-btn" />

## API

<ApiInline />

## Examples

### Props

#### Counter

You can add a counter to `v-overflow-btn` to control the max char count

<ExamplesExample file="v-overflow-btn/prop-counter" />

#### Dense

You can use `dense` prop to reduce overflow button height and lower max height of list items.

<ExamplesExample file="v-overflow-btn/prop-dense" />

#### Disabled

`v-overflow-btn` can be disabled in order to prevent a user from interacting with it

<ExamplesExample file="v-overflow-btn/prop-disabled" />

#### Editable

`editable` `v-overflow-btn` can be directly edited, just as `v-text-field`

<ExamplesExample file="v-overflow-btn/prop-editable" />

#### Filled

Text fields can be used with an alternative box design.

<ExamplesExample file="v-overflow-btn/prop-filled" />

#### Hint

You can add a hint for the user using the `hint` property

<ExamplesExample file="v-overflow-btn/prop-hint" />

#### Loading

`v-overflow-btn` can have `loading` state with a linear progress bar under them

<ExamplesExample file="v-overflow-btn/prop-loading" />

#### Menu props

You can set underlying `v-menu` props using `menu-props` property

<ExamplesExample file="v-overflow-btn/prop-menu-props" />

#### Readonly

`v-overflow-btn` can be put into `readonly` mode, it'll become inactive but won't change the color

<ExamplesExample file="v-overflow-btn/prop-readonly" />

#### Segmented

`segmented` `v-overflow-btn` has and additional divider between the content and the icon

<ExamplesExample file="v-overflow-btn/prop-segmented" />
