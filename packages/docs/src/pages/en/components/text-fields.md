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

| Element / Area | Description |
| - | - |
| 1. Container | The Text field container contains the `v-input` and `v-field` components |
| 2. Prepend icon | A custom icon that is located before `v-field` |
| 3. Prepend-inner icon | A custom icon that is located at the start of `v-field` |
| 4. Label | A content area for displaying text to users that correlates to the input |
| 5. Append-inner icon | A custom icon that is located at the end of `v-field` component |
| 6. Append icon | A custom icon that is located after `v-field` component |

## API

| Component | Description |
| - | - |
| [v-text-field](/api/v-text-field/) | Primary Component |

## Examples

The `v-text-field` component is a versatile `<input type="text">` field which combines both the `v-input` and `v-field` components into a single offering. It is a commonly used element that provides the baseline for other form inputs; such as [v-select](/components/selects/), [v-autocomplete](/components/autocompletes/), [v-combobox](/components/combobox/).

In the following section we walk through different ways to configure and implement the `v-text-field` into your application.

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

Sometimes a label alone doesn't convey enough information and you need to expose more. For those use-cases, use the **placeholder** property with or without the [label][#labeling] or [hint](#hints) properties.

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

#### Clearable

The **clearable** prop appends an icon that clears the `v-text-field` when clicked.

```html
<v-text-field
  label="Last name"
  placeholder="Doe"
  clearable
></v-text-field>
```

The clearable icon is configurable by using the **clearable** property in combination with the **clear-icon** property. By default, this value is set to the global default assigned in [Icon font](/features/icon-fonts) but still has the ability to overwrite in the local template.

In the following example we change the icon that is shown when the input can be cleared:

```html
<v-text-field
  label="Last name"
  placeholder="Doe"
  clearable
  clear-icon="mdi-trash"
></v-text-field>
```

<example file="v-text-field/prop-clearable" />

<!--

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
-->

<backmatter />
