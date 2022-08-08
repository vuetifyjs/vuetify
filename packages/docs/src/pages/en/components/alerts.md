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

![Alert Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-alert/v-alert-entry.png)

---

## Usage

An alert is a [v-sheet](/components/sheets/) that specializes in getting the user's attention. While similar to [v-banner](/components/banners/) in functionality, `v-alert` is typically inline with content and used multiple times throughout an application.

<usage name="v-alert" />

<entry slug="vs-vuetify-subscribe" />

## Anatomy

The recommended placement of elements inside of `v-alert` is:

* Place a `v-icon` on the far left
* Place `v-alert-title` to the right of the contextual icon
* Place textual content below the title
* Place closing actions to the far right

![Alert Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-alert/v-alert-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The Alert container holds all `v-alert` components |
| 2. Icon | An icon that correlates to the contextual state of the alert; **success, info, warning, error** |
| 3. Title | A heading with increased font-size |
| 4. Text | A content area for displaying text and other inline elements |
| 5. Close Icon (optional) | Used to hide the `v-alert` component |

## API

| Component | Description |
| - | - |
| [v-alert](/api/v-alert/) | Primary Component |
| **v-alert-title** | Functional Component used to display the `v-alert` title. Wraps the `#title` slot |

## Implementation

Unlike the `v-banner` component, `v-alert` is intended to be re-used throughout your application as callouts that draw a user's attention.

### Props

In addition to the standard [v-sheet](/components/sheets/) properties such as elevation, dimension, and rounded, `v-alert` supports **v-model**, **variants**, and **density**; and many more.

#### Type

The `v-alert` component has 4 contextual states: **success**, **info**, **warning**, and **error**. Each state has a default _color_ and _icon_ associated with it. The following example uses the **type** prop to tell the `v-alert` that it's in an **error** state:

<example file="v-alert/prop-type" />

While the **type** prop shorthand is preferred, **color** and **icon** are usable individually and can achieve the same effect. The following example produces the same result as using **type="info"** by defining a custom color and using the icon lookup table to get the globally defined info icon:

```html
<v-alert color="info" icon="$info">
  I'm an info alert that uses <strong>color</strong> and <strong>icon</strong> props instead of <strong>type</strong>
</v-alert>
```

The `v-alert` component has multiple customization options such as reducing overall height using or adding a customized **border**. The following example uses density to reduce the vertical space needed for the component:

<example file="v-alert/prop-density" />

The **density** prop supports 3 levels of component height; **default**, **comfortable**, and **compact**.

#### Variants

`v-alert` has 6 style variants, **elevated**, **flat**, **tonal**, **outlined**, **text**, and **plain**. By default, the `v-alert` component is **flat**; which means that it has a solid background and does not have a box-shadow (elevation).

<example file="v-alert/prop-variant" />

#### Closable

The **closable** prop adds a [v-icon](/components/icons) on the far right, after the main content. This control hides the `v-alert` when clicked, setting it's internal model to **false**. Manually control the visilibity of the alert by binding **v-model** or using **model-value**. The following example uses a dynamic model that shows and hides the `v-alert` component:

<example file="v-alert/prop-closable" />

The close icon automatically applies a default `aria-label` and is configurable by using the **close-label** prop or changing **close** value in your locale.

<alert type="info">

  For more information on how to global modify your locale settings, navigate to the [Internationalization page](/features/internationalization).

</alert>

### Slots

TODO

### More Examples

TODO

#### Colored border

The **colored-border** prop removes the alert background in order to accent the **border** prop. If a **type** is set, it will use the type's default color. If no **color** or **type** is set, the color will default to the inverted color of the applied theme (black for light and white/gray for dark).

<example file="v-alert/prop-colored-border" />

#### Icon

The **icon** prop allows you to add an icon to the beginning of the alert component. If a **type** is provided, this will override the default type icon. Additionally, setting the **icon** prop to _false_ will remove the icon altogether.

<example file="v-alert/prop-icon" />

#### Outlined

The **outlined** prop inverts the style of an alert, inheriting the currently applied **color**, applying it to the text and border, and making its background transparent.

<example file="v-alert/prop-outlined" />

## Theming

TODO

### Material Design 1

TODO

### Material Design 2

TODO

### Material Design 3

TODO

#### Grid

TODO

![Alert Grid](https://cdn.vuetifyjs.com/docs/images/components-temp/v-alert/v-alert-grid.png)

## Accessibility

By default, `v-alert` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert) which denotes that the alert \"is a live region with important and usually time-sensitive information.\" When using the **closable** prop, the close icon will receive a corresponding `aria-label`. This value can be modified by changing either the **close-label** prop or globally through customizing the [Internationalization](/features/internationalization)'s default value for the _close_ property.

<backmatter />
