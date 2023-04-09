---
nav: Dialogs
meta:
  title: Dialog component
  description: The dialog component informs a user about a specific task and may contain critical information or require the user to take a specific action.
  keywords: dialogs, vuetify dialog component, vue dialog component
related:
  - /components/buttons
  - /components/cards
  - /components/menus
---

# Dialogs

The `v-dialog` component inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks. Use dialogs sparingly because they are interruptive.

<!-- ![dialog Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-dialog/v-dialog-entry.png) -->

---

## Usage

In this basic example we use the **activator** slot to render a button that is used to open the dialog. When using the **activator** slot it is important that you bind the **props** object from the slot (using `v-bind`) to the element that will activate the dialog. See the examples below for more ways of activating a dialog.

<example file="v-dialog/usage" />

<entry />

## API

| Component | Description |
| - | - |
| [v-dialog](/api/v-dialog/) | Primary component |

<api-inline hide-links />

## Examples

### Props

#### Activator

In addition using the **activator** slot, we can instead use the **activator** prop to activate a dialog. By placing the dialog component inside the button, and setting the **activator** prop value to **"parent"** we can designate the parent (button) as the activator.

<example file="v-dialog/prop-activator" />

### v-model

You can also trigger a dialog by simply updating the v-model, without using either **activator** slot or prop. In this case, the dialog will not appear to be activated by any specific element, and will simply appear in the middle of the screen.

<example file="v-dialog/prop-model" />

#### Fullscreen

Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.

<example file="v-dialog/prop-fullscreen" />

#### Transitions

You can make the dialog appear from the top or the bottom.

<example file="v-dialog/prop-transitions" />

#### Persistent

Persistent dialogs are not dismissed when touching outside or pressing the **esc** key.

<example file="v-dialog/prop-persistent" />

#### Scrollable

Example of a dialog with scrollable content.

<example file="v-dialog/prop-scrollable" />

### Misc

#### Form

A simple example of a form in a dialog.

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

<!-- #### Without activator

If for some reason you are unable to use the activator slot, be sure to add the `.stop` modifier to the event that triggers the dialog.

<example file="v-dialog/misc-without-activator" /> -->
