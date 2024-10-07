---
meta:
  title: Time picker component
  description: The time picker component is a stand-alone interface that allows the selection of hours and minutes in AM/PM and 24hr formats.
  keywords: time pickers, vuetify time picker component, vue time picker component
related:
  - /components/buttons/
  - /components/date-pickers/
  - /components/text-fields/
---

# Sélecteurs de temps

The `v-time-picker` is stand-alone component that can be utilized in many existing Vuetify components. It offers the user a visual representation for selecting the time.

<entry-ad />

## Utilisation

Les sélecteurs de temps ont le thème de lumière activé par défaut.

<usage name="v-time-picker" />

## API

- [v-time-picker](/api/v-time-picker)

<inline-api page="components/time-pickers" />

## Exemples

### Propriétés

#### Allowed times

You can specify allowed times using arrays, objects, and functions. You can also specify time step/precision/interval - e.g. 10 minutes.

<example file="v-time-picker/prop-allowed-times" />

#### AMPM in title

Vous pouvez déplacer le changement AM/PM pour le titre du sélecteur.

<example file="v-time-picker/prop-ampm-in-title" />

#### Couleurs

Time picker colors can be set using the `color` and `header-color` props. If `header-color` prop is not provided  header will use the `color` prop value."

<example file="v-time-picker/prop-color" />

#### Disabled

Vous ne pouvez pas interagir avec le sélecteur désactivé.

<example file="v-time-picker/prop-disabled" />

#### Élévation

Emphasize the `v-time-picker` component by providing an **elevation** from 0 to 24. Elevation modifies the `box-shadow` css property.

<example file="v-time-picker/prop-elevation" />

#### Format

A time picker can be switched to 24hr format. Note that the `format` prop defines only the way the picker is displayed, picker's value (model) is always in 24hr format.

<example file="v-time-picker/prop-format" />

#### No title

Vous pouvez supprimer le titre du sélecteur.

<example file="v-time-picker/prop-no-title" />

#### Range

This is an example of joining pickers together using `min` and `max` prop.

<example file="v-time-picker/prop-range" />

#### Read-only

Le sélecteur en lecture seule se comporte comme désactivé, mais il semble que celui-ci soit par défaut.

<example file="v-time-picker/prop-readonly" />

#### Scrollable

Vous pouvez modifier la valeur du sélecteur de temps en utilisant la roue de la souris.

<example file="v-time-picker/prop-scrollable" />

#### Use seconds

Le sélecteur de temps peut avoir une entrée de secondes.

<example file="v-time-picker/prop-use-seconds" />

#### Largeur

You can specify the picker's width or make it full width.

<example file="v-time-picker/prop-width" />

### Divers

#### Dialog and menu

Grâce à la flexibilité des sélecteurs, vous pouvez vraiment composer dans l'expérience exactement comment vous le souhaitez.

<example file="v-time-picker/misc-dialog-and-menu" />

<backmatter />
