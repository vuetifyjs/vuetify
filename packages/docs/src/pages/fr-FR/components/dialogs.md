---
meta:
  title: Dialog component
  description: The dialog component informs a user about a specific task and may contain critical information or require the user to take a specific action.
  keywords: dialogs, vuetify dialog component, vue dialog component
related:
  - /components/buttons/
  - /components/cards/
  - /components/menus/
---

# Boites de dialogues

The `v-dialog` component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks. Use dialogs sparingly because they are interruptive.

<entry-ad />

## Utilisation

A dialog contains two slots, one for its activator and one for its content (default). Good for Privacy Policies.

<example file="v-dialog/usage" />

## API

- [v-dialog](/api/v-dialog)

<inline-api page="components/dialogs" />

## Exemples

### Propriétés

#### Fullscreen

En raison d'un espace limité, les dialogues à écran plein peuvent être plus appropriés pour les appareils mobiles que les dialogues utilisés sur les appareils avec des écrans plus larges.

<example file="v-dialog/prop-fullscreen" />

#### Transitions

You can make the dialog appear from the top or the bottom.

<example file="v-dialog/prop-transitions" />

#### Persistant

Similar to a Simple Dialog, except that it's not dismissed when touching outside or pressing **esc** key.

<example file="v-dialog/prop-persistent" />

#### Scrollable

Example of a dialog with scrollable content.

<example file="v-dialog/prop-scrollable" />

### Divers

#### Form

Just a simple example of a form in a dialog.

<example file="v-dialog/misc-form" />

#### Loader

The `v-dialog` component makes it easy to create a customized loading experience for your application.

<example file="v-dialog/misc-loader" />

#### Nesting

Dialogs can be nested: you can open one dialog from another.

<example file="v-dialog/misc-nesting" />

#### Overflowed

Modals that do not fit within the available window space will scroll the container.

<example file="v-dialog/misc-overflowed" />

#### Without activator

If for some reason you are unable to use the activator slot, be sure to add the `.stop` modifier to the event that triggers the dialog.

<example file="v-dialog/misc-without-activator" />

<backmatter />
