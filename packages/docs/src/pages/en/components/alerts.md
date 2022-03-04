---
nav: Alerts
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

The `v-alert` component is used to convey important information to the user through the use of contextual types, icons, and colors.

<entry />

## Usage

An alert is a [v-sheet](/components/sheets/) that specializes in getting the user's attention. While similar to [v-banner](/components/banners/) in functionality, `v-alert` is typically inline with content and used multiple times throughout an application.

<usage name="v-alert" />

## Specification

The `v-alert` component consists of 5 main areas; **prepend**, **content**, **title**, **append**, and **close**.

![Alert Specification](https://cdn.vuetifyjs.com/docs/images/specifications/alerts.png "VAlert Specification")

| Area       | Scope of Responsibility |
| ---------- | ----------------------- |
| 1. Prepend | Displays `v-icon` by **type** or a specifically defined **icon** |
| 2. Title   | The `v-alert-title` is located within the content area, displays **title** prop if present |
| 3. Content | Default slot, displays **text** prop if present |
| 4. Append  | Displays contents of the Append slot |
| 5. Close   | Displays `v-icon` that hides `v-alert` when clicked |

## API

<api-inline />

## Examples

### Props

#### Type

The **type** prop provides 4 default `v-alert` styles: **success**, **info**, **warning**, and **error**. Each of these styles provides a default icon and color. The default colors can be configured globally by customizing [Vuetify's theme](/features/theme).

<example file="v-alert/prop-type" />

#### Border

The **border** prop adds a simple border to one of the 4 sides of the alert. This can be combined with props like **color**, **dark**, and **type** to provide unique accents to the alert.

<example file="v-alert/prop-border" />

#### Colored border

The **colored-border** prop removes the alert background in order to accent the **border** prop. If a **type** is set, it will use the type's default color. If no **color** or **type** is set, the color will default to the inverted color of the applied theme (black for light and white/gray for dark).

<example file="v-alert/prop-colored-border" />

#### Density

The **density** prop decreases the height of the alert based upon 1 of 3 levels of density; **default**, **comfortable**, and **compact**.

<example file="v-alert/prop-density" />

#### Closable

The **closable** prop adds a close button to the end of the alert component. Clicking this button will set its value to false and effectively hide the alert. You can restore the alert by binding **v-model** and setting it to true. The close icon automatically has an `aria-label` applied that can be changed by modifying the **close-label** prop or changing **close** value in your locale. For more information on how to global modify your locale settings, navigate to the [Internationalization page](/features/internationalization).

<example file="v-alert/prop-closable" />

#### Icon

The **icon** prop allows you to add an icon to the beginning of the alert component. If a **type** is provided, this will override the default type icon. Additionally, setting the **icon** prop to _false_ will remove the icon altogether.

<example file="v-alert/prop-icon" />

#### Outlined

The **outlined** prop inverts the style of an alert, inheriting the currently applied **color**, applying it to the text and border, and making its background transparent.

<example file="v-alert/prop-outlined" />

<discovery />

#### Prominent

The **prominent** prop provides a more pronounced alert by increasing the size of the icon.

<example file="v-alert/prop-prominent" />

#### Variant

The **variant** prop provides an easy way to change the overall style of your alerts. Together with other props like **density**, **prominent**, **border**, and **shaped**, it allows you to create a unique and customized component.

<example file="v-alert/prop-variant" />

#### Rounded

The **rounded** prop will add or remove **border-radius** to the alert. Similar to other styled props, **rounded** can be combined with other props like **density**, **prominent**, and **variant** to create a unique and customized component.

<example file="v-alert/prop-rounded" />

## Accessibility

By default, `v-alert` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert) which denotes that the alert \"is a live region with important and usually time-sensitive information.\" When using the **closable** prop, the close icon will receive a corresponding `aria-label`. This value can be modified by changing either the **close-label** prop or globally through customizing the [Internationalization](/features/internationalization)'s default value for the _close_ property.

<backmatter />
