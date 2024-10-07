---
meta:
  title: Month picker component
  description: The month picker component is a stand-alone interface that allows the selection of month or both month and year.
  keywords: month pickers, vuetify month picker component, vue month picker component
related:
  - /components/date-pickers/
  - /components/menus/
  - /components/time-pickers/
---

# Date pickers - month

`v-date-picker` can be used as a standalone month picker component.

<entry-ad />

## Utilisation

Month pickers come in two orientation variations, portrait **(default)** and landscape.

<example file="v-date-picker-month/usage" />

## API

- [v-date-picker](/api/v-date-picker)

<inline-api page="components/date-pickers-month" />

## Caveats

<alert type="warning">

  `v-date-picker` accepts ISO 8601 **date** strings (*YYYY-MM-DD*). For more information regarding ISO 8601 and other standards, visit the official ISO (International Organization for Standardization) [International Standards](https://www.iso.org/standards.html) page.

</alert>

## Exemples

### Propriétés

#### Allowed months

You can specify allowed months using arrays, objects or functions.

<example file="v-date-picker-month/prop-allowed-months" />

#### Couleurs

Month picker colors can be set using the **color** and **header-color** props. If **header-color** prop is not provided header will use the `color` prop value.

<example file="v-date-picker-month/prop-colors" />

#### Icônes

You can override the default icons used in the picker.

<example file="v-date-picker-month/prop-icons" />

#### Multiple

Month pickers can now select multiple months with the **multiple** prop. If using **multiple** then the month picker expects its model to be an array.

<example file="v-date-picker-month/prop-multiple" />

#### Readonly

Selecting new date could be disabled by adding **readonly** prop.

<example file="v-date-picker-month/prop-readonly" />

#### Show current

By default the current month is displayed using outlined button - **show-current** prop allows you to remove the border or select different month to be displayed as the current one.

<example file="v-date-picker-month/prop-show-current" />

#### Largeur

Vous pouvez spécifier la largeur du sélecteur ou la rendre pleine largeur.

<example file="v-date-picker-month/prop-width" />

### Divers

#### Dialog and menu

When integrating a picker into a `v-text-field`, it is recommended to use the **readonly** prop. This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.

<example file="v-date-picker-month/misc-dialog-and-menu" />

#### Internationalisation

The month picker supports internationalization through the JavaScript Date object. Specify a BCP 47 language tag using the **locale** prop.

<example file="v-date-picker-month/misc-internationalization" />

#### Orientation

Month pickers come in two orientation variations, portrait **(default)** and landscape.

<example file="v-date-picker-month/misc-orientation" />

<backmatter />
