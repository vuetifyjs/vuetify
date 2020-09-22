---
meta:
  title: Alert component
  description: The v-alert component is used to convey information to the user. Designed to stand out, the alerts come in four contextual styles.
  keywords: v-alert, alerts, vue alert component, vuetify alert component
related:
  - /components/buttons/
  - /components/icons/
  - /components/snackbars/
---

# Alerts

The `v-alert` component is used to convey important information to the user through the use contextual types icons and color. These default types come in in 4 variations: **success**, **info**, **warning**, and **error**. Default icons are assigned which help represent different actions each type portrays. Many parts of an alert such as `border`, `icon`, and `color` can also be customized to fit almost any situation.

<entry-ad />

## Usage

Alerts in their simplest form are a flat [sheets of paper](/components/sheets) that display a message.

<usage name="v-alert" />

## API

- [v-alert](/api/v-alert)

## Examples

### Props

#### Border

The **border** prop adds a simple border to one of the 4 sides of the alert. This can be combined props like with **color**, **dark**, and **type** to provide unique accents to the alert.

<example file="v-alert/prop-border" />

#### Colored border

The **colored-border** prop removes the alert background in order to accent the **border** prop. If a **type** is set, it will use the types default color. If no **color** or **type** is set, the color will default to the inverted color of the applied theme (black for light and white/gray for dark).

<example file="v-alert/prop-colored-border" />

#### Dense

The **dense** prop decreases the height of the alert to create a simple and compact style. When combined with the **border** prop the border thickness will be decreased to stay consistent with the style.

<example file="v-alert/prop-dense" />

#### Dismissible

The **dismissible** prop adds a close button to the end of the alert component. Clicking this button will set its value to false and effectively hide the alert. You can restore the alert by binding **v-model** and setting it to true. The close icon automatically has an `aria-label` applied that can be changed by modifying the **close-label** prop or changing **close** value in your locale. For more information on how to global modify your locale settings, navigate to the [Internationalization page](/features/internationalization).

<example file="v-alert/prop-dismissible" />

#### Icon

The **icon** prop allows you to add an icon to the beginning of the alert component. If a **type** is provided, this will override the default type icon. Additionally setting the **icon** prop to _false_ will remove the icon altogether.

<example file="v-alert/prop-icon" />

#### Outlined

The **outlined** prop inverts the style of an alert, inheriting the currently applied **color**, applying it to the text and border, and making its background transparent.

<example file="v-alert/prop-outlined" />

<discovery-ad />

#### Prominent

The **prominent** prop provides a more pronounced alert by increasing the height and applying a halo to the icon. When applying both **prominent** and **dense** together, the alert will take on the appearance of a normal alert but with the **prominent** icon effects.

<example file="v-alert/prop-prominent" />

#### Text

The **text** prop is a simple alert variant that applies a reduced opacity background of the provided **color**. Similar to other styled props, **text** can be combined with other props like **dense**, **prominent**, and **outlined** to create a unique and customized component.

<example file="v-alert/prop-text" />

#### Transition

The **transition** prop allows you to apply a transition to the alert which is viewable when the component hides and shows. For more information, you can checkout any of [Vuetify's prebuilt transitions](/styles/transitions#motion) or review how to [create your own](/styles/transitions#create-your-own).

<example file="v-alert/prop-transition" />

#### Twitter

By combining **color**, **dismissible**, **border**, **elevation**, **icon**, and **colored-border** props you can create stylish custom alerts such as this twitter notification.

<example file="v-alert/misc-twitter" />

#### Type

The **type** prop provides 4 default `v-alert` styles: **success**, **info**, **warning**, and **error**. Each of these styles provide a default icon and color. The default colors can be configured globally by customizing [Vuetify's theme](/features/theme).

<example file="v-alert/prop-type" />

## Accessibility

By default, `v-alert` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert) which denotes that the alert \"is a live region with important and usually time-sensitive, information.\" When using the **dismissible** prop the close icon will receive a corresponding `aria-label`. This value can be modified by changing either the **close-label** prop or globally through customizing the [Internationalization](/features/internationalization)'s default value for the _close_ property.

<backmatter />
