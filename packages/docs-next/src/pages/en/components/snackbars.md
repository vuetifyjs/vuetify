---
meta:
  title: Snackbar component
  description: The snackbar component informs user of a process that your application has performed is will perform. It can be temporary and often contains actions.
  keywords: snackbars, vuetify snackbar component, vue snackbar component
related:
  - /components/buttons/
  - /styles/colors/
  - /components/forms/
---

# Snackbars

The `v-snackbar` component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.

<entry-ad />

## Usage

a `v-snackbar` in its simplest form displays a temporary and closable notification to the user.

<example file="v-snackbar/usage" />

## API

- [v-snackbar](/api/v-snackbar)

## Examples

### Props

#### Multi line

The **multi-line** property extends the height of the `v-snackbar` to give you a little more room for content.

<example file="v-snackbar/prop-multi-line" />

#### Timeout

The **timeout** property lets you customize the delay before the `v-snackbar` is hidden.

<example file="v-snackbar/prop-timeout" />

#### Variants

Apply different styles to the snackbar using props such as **text**, **shaped**, **outlined**, and more.

<example file="v-snackbar/prop-variants" />

#### Vertical

The **vertical** property allows you to stack the content of your `v-snackbar`.

<example file="v-snackbar/prop-vertical" />

<backmatter />
