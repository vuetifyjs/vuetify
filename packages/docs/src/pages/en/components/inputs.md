---
meta:
  nav: Custom inputs
  title: Input component
  description: The input component is the baseline functionality for all of Vuetify's form components and provides a baseline for custom implementations.
  keywords: inputs, vuetify input component, vue input component
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
features:
  label: 'C: VInput'
  report: true
  github: /components/VInput/
---

# Inputs

The `v-input` component gives you a baseline to create your own custom inputs. It provides prepend/append areas, messages (hints and errors), validation plumbing for `v-form`, and a default slot for your control.

<PageFeatures />

## Usage

`v-input` has 4 main areas. The prepended slot, the appended slot, the default slot, and messages. These make up the core logic shared between all form components.

<ExamplesExample file="v-input/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-input](/api/v-input/) | Primary Component |
| [v-field](/api/v-field/) | Inner field chrome (variants, floating label, loader) |

<ApiInline hide-links />

## Guide

Built-in fields such as [v-text-field](/components/text-fields/) combine **`v-input`** (outer: messages, icons, validation) with **`v-field`** (inner: variant, floating label, loading bar). Prefer those when they fit. Use `v-input` / `v-field` directly when you need a custom control that still participates in `v-form`.

### VInput vs VField

| Piece | Responsibility |
| - | - |
| `v-input` | Prepend/append icons and slots, hint/messages/errors, `rules` / `v-model` validation |
| `v-field` | Visual field (filled/outlined/…), **label**, focus/active state, **loading** indicator, prepend-inner/append-inner |

See the [Text fields](/components/text-fields/) Anatomy section for how these nest in a typical text field.

### Label

Floating / visible labels belong on **`v-field`** via the `label` prop (or `label` slot), not on a bare `v-input`. A plain `v-input` with only a default slot will not show a Material-style floating label.

Wire focus and “has value” state so the label floats correctly: set `dirty` when your value is non-empty, and call the slot’s `focus()` / `blur()` from your real control’s focus events (or bind `active`).

<ExamplesExample file="v-input/prop-label" />

### Rules and modelValue

`v-input` includes validation through `makeValidationProps`: it **does** accept `v-model` / `modelValue` and `rules`. Rules receive the current model value (same pattern as other Vuetify inputs). Higher-level components like `v-text-field` pass their model into the inner `v-input` for that reason.

Use a real `v-input` with `v-model` and `:rules` when documenting or building custom fields — do not substitute `v-text-field` in these examples.

<ExamplesExample file="v-input/prop-rules" />

### Composition example

A common custom field looks like a text field, displays a label/name, stores an id in `v-model`, and opens a menu on click instead of typing. Compose `v-input` + `v-field` (+ `v-menu` as needed):

<ExamplesExample file="v-input/misc-composition" />

::: tip

`v-field` default-slot props such as `isActive` and `isFocused` are **Refs**. In `<script>` use `.value`. In the template they auto-unwrap when you bind them correctly; treating the Ref object itself as a boolean (for example in a mistaken script expression) always looks “truthy”.

:::

## Caveats

::: warning

The `v-input` component is used as a wrapper for all of the Vuetify form controls. It does **NOT** inherit attributes as they are expected to be passed down to inner inputs.

These primitives are public but lower-level. Prefer `v-text-field`, `v-select`, and friends unless you need a custom control.

:::

## Examples

### Props

#### Error

As any validatable Vuetify component, `v-input` can be set to error state using **error** prop, messages can be added using **error-messages** prop. You can determine error messages count to show using **error-count** property.

#### Error count

You can add multiple errors to `v-input` using **error-count** property.

<ExamplesExample file="v-input/prop-error-count" />

<ExamplesExample file="v-input/prop-error" />

#### Hide details

When the **hide-details** prop is set to `auto` messages will be rendered only if there's a message (hint, error message etc) to display.

<ExamplesExample file="v-input/prop-hide-details" />

#### Hint

`v-input` can have **hint** which can tell user how to use the input (when focused). **persistent-hint** prop makes the hint visible always if no `error-messages` are displayed.

<ExamplesExample file="v-input/prop-hint" />

#### Loading

The **loading** indicator lives on **`v-field`** (and composed fields like `v-text-field`), not on bare `v-input`. Wrap a loading `v-field` inside `v-input` when you need both messages/validation and a loader.

<ExamplesExample file="v-input/prop-loading" />

#### Rules

Add custom validation rules to `v-input` as functions returning `true` or an error message. Rules validate against the input's **model value** (`v-model`).

<ExamplesExample file="v-input/prop-rules" />

### Events

#### Slot clicks

`v-input` can have `click:append` and `click:prepend` events for its slots.

<ExamplesExample file="v-input/event-slot-clicks" />

### Slots

#### Append and prepend

`v-input` has `append` and `prepend` slots. You can place custom icons in them.

<ExamplesExample file="v-input/slot-append-and-prepend" />
