---
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

<entry-ad />

## Usage

`v-overflow-btn` is used for creating selection lists

<usage name="v-overflow-btn" />

## API

- [v-overflow-btn](/api/v-overflow-btn)

## Examples

### Props

#### Counter

You can add a counter to `v-overflow-btn` to control the max char count

<example file="v-overflow-btn/prop-counter" />

#### Dense

You can use `dense` prop to reduce overflow button height and lower max height of list items.

<example file="v-overflow-btn/prop-dense" />

#### Disabled

`v-overflow-btn` can be disabled in order to prevent a user from interacting with it

<example file="v-overflow-btn/prop-disabled" />

#### Editable

`editable` `v-overflow-btn` can be directly edited, just as `v-text-field`

<example file="v-overflow-btn/prop-editable" />

#### Filled

Text fields can be used with an alternative box design. Append and prepend icon props are **not** supported in this mode.

<example file="v-overflow-btn/prop-filled" />

#### Hint

You can add a hint for the user using the `hint` property

<example file="v-overflow-btn/prop-hint" />

#### Loading

`v-overflow-btn` can have `loading` state with a linear progress bar under them

<example file="v-overflow-btn/prop-loading" />

#### Menu props

You can set underlying `v-menu` props using `menu-props` property

<example file="v-overflow-btn/prop-menu-props" />

#### Readonly

`v-overflow-btn` can be put into `readonly` mode, it'll become inactive but won't change the color

<example file="v-overflow-btn/prop-readonly" />

#### Segmented

`segmented` `v-overflow-btn` has and additional divider between the content and the icon

<example file="v-overflow-btn/prop-segmented" />

<backmatter />
