---
nav: Text fields
meta:
  title: Text field component
  description: The text field component accepts textual input from users.
  keywords: text fields, vuetify text field component, vue text field component
related:
  - /components/textareas/
  - /components/selects/
  - /components/forms/
---

# Text fields

Text field components are used for collecting user provided information.

![Text-field Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-text-field/v-text-field-entry.png)

----

## Usage

A simple text field with placeholder and/or label.

<usage name="v-text-field" />

<entry />

## API

| Component | Description |
| - | - |
| [v-text-field](/api/v-text-field/) | Primary Component |

<api-inline hide-links />

## Anatomy

The recommended placement of elements inside of `v-text-field` is:

* Place a `v-icon` at the start of the input or label
* Place label after prepended content

![Text-field Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-text-field/v-text-field-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The Text field container contains the `v-input` and `v-field` components |
| 2. Prepend icon | A custom icon that is located before `v-field` |
| 3. Prepend-inner icon | A custom icon that is located at the start of `v-field` |
| 4. Label | A content area for displaying text to users that correlates to the input |
| 5. Append-inner icon | A custom icon that is located at the end of `v-field` component |
| 6. Append icon | A custom icon that is located after `v-field` component |

## Guide

The `v-text-field` component is a versatile `<input type="text">` field which combines both the `v-input` and `v-field` components into a single offering. It is a commonly used element that provides the baseline for other form inputs; such as [v-select](/components/selects/), [v-autocomplete](/components/autocompletes/), [v-combobox](/components/combobox/). In this guide you learn the basic fundamentals of `v-text-field` and how its various properties interact with each other.

### Props

The `v-text-field` component has an massive API with numerous options to modify the display, functionality, or style of your inputs. Many of the configurable options are also available through [slots](#slots).

#### Labeling

The **label** prop displays custom text for identifying an input's purpose. The following code snippet is an example of a basic `v-text-field` component:

```html
<v-text-field label="First name"></v-text-field>
```

Using this baseline makes it easy to put together quick mock implementations of your interface without needing to hook up any functional logic.

The following code snippet is an example of a simple form for for collecting a user's **First** name:

<example file="v-text-field/prop-label" />

#### Placeholders

Sometimes a label alone doesn't convey enough information and you need to expose more. For those use-cases, use the **placeholder** property with or without the [label](#labeling) or [hint](#hint) properties.

In the following snippet, we improve the user experience of a `v-text-field` that is capturing an email address:

```html
<v-text-field
  label="Email address"
  placeholder="johndoe@gmail.com"
  type="email"
></v-text-field>
```

When the user focuses the input, the placeholder fades in as the label translates up. The added visual element improves the user experience when using multiple field inputs.

<example file="v-text-field/prop-placeholder" />

<alert type="info">

  Use the **persistent-placeholder** prop to force the **placeholder** to be visible, even when the input is not focused.

</alert>

#### Hints & messages

The **label** and **placeholder** props are useful for providing context to the input but are typically concise. For longer textual information, all Vuetify inputs contain a **details** section that is used to provide **hints**, regular **messages**, and **error-messages**. In the following example watch the custom hint message display when you focus the input:

<example file="v-text-field/prop-messages" open />

If you want to make the hint visible at all times, use the **persistent-hint** property. The following example demonstrates how to force a **hint** to show in the input's details:

```html
<v-text-field
  hint="Enter your password to access this website"
  label="Password"
  persistent-hint
  type="input"
></v-text-field>
```

In addition to **persistent-hint**, there are 3 other properties that support a persistent state:

* **persistent-clear** - always show the input clear icon when a **value** is present
* **persistent-counter** - always show input character length element
* **persistent-placeholder** - always show placeholder, causes label to automatically elevate

#### Clearable

The **clearable** prop appends an inner [v-icon](/components/icons/) that clears the `v-text-field` when clicked. When an input is cleared, it resets the current `v-text-field` value. The following example displays an interactive icon when the mouse hovers over the input:

<example file="v-text-field/prop-clearable" open />

Note that **readonly** will not remove the clear icon, to prevent readonly inputs from being cleared you should also disable **clearable**.

Sometimes you may need to perform an action when the user clears an input. By using a custom [Vue Event Handler](https://vuejs.org/guide/essentials/event-handling.html), you can bind a custom function that is invoked whenever the `v-text-field` is cleared by the user. The following example demonstrates how to use a a custom event handler to invoke the **onClear** method:

```html
<template>
  <v-text-field
    clearable
    label="Last name"
    placeholder="Doe"
    persistent-clear
    @click:clear="onClear"
  ></v-text-field>
</template>

<script>
  export default {
    methods: {
      onClear () {
        alert('User cleared the input')
      }
    }
  }
</script>
```

You can see more supported events on the `v-text-field` [API page](/api/v-text-field/#events).

#### Validation & rules

When working with inputs you often need to validate the user's input in some manner; i.e. Email, Password. Use the **rules** property to invoke custom functions based upon the `v-text-field`'s state. It accepts an array of **functions** that return either `true` or a `string`. In the following example, enter a value into the field and then clear it:

<example file="v-text-field/prop-rules" open />

#### Forms

Group multiple `v-text-field` components and other functionality within a `v-form` component; for a more detailed look at forms, please visit the [v-form](/components/forms/) page. Forms are useful for validating more than 1 input and make it easy to interact with the state of many fields at once. The following example combines multiple `v-text-field` components to create a login form:

<example file="v-text-field/misc-guide" />

### Examples

The following is a collection of `v-text-field` examples that demonstrate how different the properties work in an application.

#### Custom colors

The **color** prop provides an easy way to change the color of textual content; label, prefix, suffix, etc. This color is applied as long as `v-text-field` is focused.

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

You can add icons to the text field with **prepend-icon**, **append-icon** and **append-inner-icon** props.

<example file="v-text-field/prop-icon" />

#### Prefixes and suffixes

The **prefix** and **suffix** properties allows you to prepend and append inline non-modifiable text next to the text field.

<example file="v-text-field/prop-prefixes-and-suffixes" />

#### Validation

Vuetify includes simple validation through the **rules** prop. The prop accepts a mixed array of types `function`, `boolean` and `string`. When the input value changes, each element in the array will be validated. Functions pass the current v-model as an argument and must return either `true` / `false` or a `string` containing an error message.

<example file="v-text-field/prop-validation" />

#### Variant

The **variant** prop provides an easy way to customize the style of your text field. The following values are valid options: **solo**, **filled**, **outlined**, **plain**, and **underlined**.

<example file="v-text-field/prop-variant" />

### Events

#### Icon events

`click:prepend`, `click:append`, `click:append-inner`, and `click:clear` are emitted when you click on the respective icon. Note that these events will not be fired if the slot is used instead.

<example file="v-text-field/event-icons" />

### Slots

Slots allow you to customize the display of many `v-text-field` properties to modify what Vuetify does by default. The following slots are available on the `v-text-field` component:

| Slot name | Description |
| - | - |
| 1. prepend | Provided by `v-input`, positioned before the input field |
| 2. prepend-inner | Provided by `v-field`, positioned at the start of the input field |
| 3. label | The form input label |
| 4. append-inner | Provided by `v-field`, positioned at the end of the input field |
| 5. append | Provided by `v-input`, positioned after the input field |
| 6. details | Used for displaying **messages**, **hint**, **error-messages**, and more |

The following example uses the **label**, **prepend**, and **prepend-inner** slots and adds custom elements to the `v-text-field`

```html
<template>
  <v-text-field v-model="model">
    <template v-slot:label>
      <span>Type something...</span>
    </template>

    <template v-slot:prepend>
      <v-icon
        :color="model ? 'primary' : undefined"
        icon="$vuetify"
      />
    </template>

    <template v-slot:append-inner>
      <v-icon
        v-if="model"
        icon="mdi-check-circle"
      />
    </template>

    <template #details>
      <v-spacer />

      See our <a href="#">Terms and Service</a>
    </template>
  </v-text-field>
</template>

<script>
  export default {
    data: () => ({ model: null }),
  }
</script>
```

<vuetify />

#### Icon slots

Instead of using `prepend`/`append`/`append-inner` icons you can use slots to extend input's functionality.

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
