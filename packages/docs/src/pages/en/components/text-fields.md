---
nav: Text fields
meta:
  title: Text field component
  description: The text field component accepts textual input from users.
  keywords: text fields, vuetify text field component, vue text field component
related:
  - /components/textarea/
  - /components/selects/
  - /components/forms/
---

# Text fields

Text field components are used for collecting user provided information.

![Text-field Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-text-field/v-text-field-entry.png)

---

## Usage

A simple text field with placeholder and/or label.

<usage name="v-text-field" />

<entry />

## Anatomy

The recommended placement of elements inside of `v-text-field` is:

* Place a `v-icon` at the start of the input or label
* Place label after prepended content

![Text-field Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-text-field/v-text-field-anatomy.png)

## API

<api-inline />

## Examples

### Props

#### Counter

Use a **counter** prop to inform a user of the character limit. The counter does not perform any validation by itself - you will need to pair it with either the internal validation system, or a 3rd party library. The counter can be customised with the **counter-value** prop and **counter** scoped slot.

<example file="v-text-field/prop-counter" />

#### Clearable

The **clearable** prop appends an icon that clears the `text field` when clicked. The clearable icon is easily customizable by using **clearable** in combination with the **clear-icon** prop.

<example file="v-text-field/prop-clearable" />

#### Custom colors

The **color** prop provides an easy way to change the color of your text field.

<example file="v-text-field/prop-custom-colors" />

#### Density

The **density** prop decreases the height of the text field based upon 1 of 3 levels of density; **default**, **comfortable**, and **compact**.

<example file="v-text-field/prop-dense" />

#### Disabled and readonly

The state of a text field can be changed by providing the **disabled** or **readonly** props.

<example file="v-text-field/prop-disabled-and-readonly" />

#### Hide details

When **hide-details** is set to `auto` messages will be rendered only if there's a message (hint, error message, counter value etc) to display.

<example file="v-text-field/prop-hide-details" />

#### Hint

The **hint** property on text fields adds the provided string beneath the text field. Using **persistent-hint** keeps the hint visible when the text field is not focused. Hint prop is _**not**_ supported in solo mode.

<example file="v-text-field/prop-hint" />

#### Icons

You can add icons to the text field with **prepend-icon**, **append-icon** and **append-outer-icon** props.

<example file="v-text-field/prop-icon" />

#### Prefixes and suffixes

The **prefix** and **suffix** properties allows you to prepend and append inline non-modifiable text next to the text field.

<example file="v-text-field/prop-prefixes-and-suffixes" />

#### Shaped

**shaped** text fields are rounded if they're **outlined** and have higher **border-radius** if **filled**.

<example file="v-text-field/prop-shaped" />

#### Single line

**single-line** text fields do not float their label on focus or with data.

<example file="v-text-field/prop-single-line" />

#### Validation

Vuetify includes simple validation through the **rules** prop. The prop accepts a mixed array of types `function`, `boolean` and `string`. When the input value changes, each element in the array will be validated. Functions pass the current v-model as an argument and must return either `true` / `false` or a `string` containing an error message.

<example file="v-text-field/prop-validation" />

#### Variant

The **variant** prop provides an easy way to customize the style of your text field. The following values are valid options: **solo**, **filled**, **outlined**, **plain**, and **underlined**.

<example file="v-text-field/prop-variant" />

### Events

#### Icon events

`click:prepend`, `click:append`, `click:append-outer`, and `click:clear` will be emitted when you click on the respective icon. Note that these events will not be fired if the slot is used instead.

<example file="v-text-field/event-icons" />

### Slots

<vuetify slug="vs-vue-3-slots" />

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

Using the HTML input **type** [password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password) can be used with an appended icon and callback to control the visibility.

<example file="v-text-field/misc-password" />

<backmatter />
