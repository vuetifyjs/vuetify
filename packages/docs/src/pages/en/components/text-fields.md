---
meta:
  title: Text field component
  description: The text field component accepts textual input from users.
  keywords: text fields, vuetify text field component, vue text field component
related:
  - /components/forms/
  - /components/selects/
  - /components/textarea/
---

# Text fields

Text fields components are used for collecting user provided information.

<entry-ad />

## Usage

A simple text field with placeholder and/or label.

<example file="v-text-field/usage" />

## API

- [v-text-field](/api/v-text-field)

## Examples

### Props

#### Counter

Use a **counter** prop to inform a user of the character limit. The counter does not perform any validation by itself. You will need to pair it with either the internal validation system, or a 3rd party library. You can use it on regular, box or outlined text fields.

<example file="v-text-field/prop-counter" />

#### Clearable

When **clearable**, you can customize the clear icon with **clear-icon**.

<example file="v-text-field/prop-clearable" />

#### Custom colors

You can optionally change a text field into any color in the Material design palette. Below is an example implementation of a custom form with validation.

<example file="v-text-field/prop-custom-colors" />

#### Dense

You can reduces the text field height with **dense** prop.

<example file="v-text-field/prop-dense" />

#### Disabled and readonly

Text fields can be **disabled** or **readonly**.

<example file="v-text-field/prop-disabled-and-readonly" />

#### Filled

Text fields can be used with an alternative box design. **append-icon** and **prepend-icon** props are _**not**_ supported in this mode.

<example file="v-text-field/prop-filled" />

#### Hide details

When **hide-details** is set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display.

<example file="v-text-field/prop-hide-details" />

#### Hint

The **hint** property on text fields adds the provided string beneath the text field. Using **persistent-hint** keeps the hint visible when the text field is not focused. Hint prop is _**not**_ supported in solo mode.

<example file="v-text-field/prop-hint" />

#### Icons

You can add icons to the text field with **prepend-icon**, **append-icon** and **append-outer-icon** props.

<example file="v-text-field/prop-icon" />

#### Outlined

Text fields can be used with an alternative outlined design.

<example file="v-text-field/prop-outlined" />

#### Prefixes and suffixes

The **prefix** and **suffix** properties allows you to prepend and append inline non-modifiable text next to the text field.

<example file="v-text-field/prop-prefixes-and-suffixes" />

#### Shaped

**shaped** text fields are rounded if they're **outlined** and have higher **border-radius** if **filled**.

<example file="v-text-field/prop-shaped" />

#### Single line

**single-line** text fields do not float their label on focus or with data.

<example file="v-text-field/prop-single-line" />

#### Solo

Text fields can be used with an alternative solo design.

<example file="v-text-field/prop-solo" />

#### Validation

Vuetify includes simple validation through the **rules** prop. The prop accepts an array of callbacks. While validating rules, the current v-model value will be passed to the callback. This callback should return either `true` or a `String`, the error message.

<example file="v-text-field/prop-validation" />

### Events

#### Icon events

`click:prepend`, `click:append`, `click:append-outer`, and `click:clear` will be emitted when you click on the respective icon. Note that these events will not be fired if the slot is used instead.

<example file="v-text-field/event-icons" />

### Slots

#### Icon slots

Instead of using `prepend`/`append`/`append-outer` icons you can use slots to extend input's functionality.

<example file="v-text-field/slot-icons" />

#### Label

Text field label can be defined in `label` slot - that will allow to use HTML content

<example file="v-text-field/slot-label" />

#### Progress

You can display a progress bar instead of the bottom line. You can use the default indeterminate progress having same color as the text field or designate a custom one using the `progress` slot

<example file="v-text-field/slot-progress" />

### Misc

#### Custom validation

While the built in `v-form` or 3rd party plugin such as [vuelidate](https://github.com/monterail/vuelidate) or [vee-validation](https://github.com/logaretm/vee-validate) can help streamline your validation process, you can choose to simply control it yourself.

<example file="v-text-field/misc-custom-validation" />

#### Full width with counter

Full width text fields allow you to create boundless inputs. In this example, we use a `v-divider` to separate the fields.

<example file="v-text-field/misc-full-width-with-counter" />

#### Password input

Using the HTML input **type** [password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)can be used with an appended icon and callback to control the visibility.

<example file="v-text-field/misc-password" />

<backmatter />
