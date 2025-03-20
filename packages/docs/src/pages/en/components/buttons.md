---
meta:
  nav: Buttons
  title: Button component
  description: The button component communicates actions that a user can take and are typically placed in dialogs, forms, cards and toolbars.
  keywords: buttons, vuetify button component, vue button component
related:
  - /components/button-groups/
  - /components/icons/
  - /components/cards/
features:
  figma: true
  github: /components/VBtn/
  label: 'C: VBtn'
  report: true
  spec: https://m2.material.io/components/buttons
---

# Buttons

The `v-btn` component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color.

<PageFeatures />

## Usage

Buttons in their simplest form contain uppercase text, a slight elevation, hover effect, and a ripple effect on click.

<ExamplesUsage name="v-btn" />

<VoPromotionsCardVuetify slug="vuetify-snips" class="mb-4" />

## API

| Component | Description |
| - | - |
| [v-btn](/api/v-btn/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The recommended placement of elements inside of `v-btn` is:

* Place text in the center
* Place visual content around container text

![Button Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-btn/v-btn-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | In addition to text, the Button container typically holds a [v-icon](/components/icons/) component |
| 2. Icon (optional) | Leading media content intended to improve visual context |
| 3. Text | A content area for displaying text and other inline elements |

## Guide

The `v-btn` component is commonly used throughout Vuetify and is a staple for any application. It is used for everything from navigation to form submission; and can be styled in a multitude of ways.

The following code snippet is an example of a basic `v-btn` component only containing text:

```html
<v-btn>Button</v-btn>
```

### Props

A wide array of props can be employed to modify the `v-btn` component's look and functionality. Props like **prepend-icon** and **append-icon** offer a straightforward approach to incorporate positioned icons, whereas **block** and **stacked** props are utilized to manage the component's form.

#### Density

The **density** prop is used to control the vertical space that the button takes up.

<ExamplesExample file="v-btn/prop-density" />

#### Size

The **size** property is used to control the size of the button and scales with density. The default size is **undefined** which essentially translates to **medium**.

<ExamplesExample file="v-btn/prop-size" />

#### Block

Block buttons extend the full available width of their container. This is useful for creating buttons that span the full width of a card or dialog.

<ExamplesExample file="v-btn/prop-block" />

::: info
Block applies **width: 100%** which can cause overflow issues inside a flex container.
:::

#### Rounded

Use the **rounded** prop to control the border radius of a button.

<ExamplesExample file="v-btn/prop-rounded" />

#### Elevation

The **elevation** property provides up to 24 levels of shadow depth. By default, buttons rest at 2dp.

<ExamplesExample file="v-btn/prop-elevation" />

#### Ripple

The **ripple** property determines whether the [v-ripple](/directives/ripple/) directive is used.

<ExamplesExample file="v-btn/prop-ripple" />

#### Variants

The **variant** prop gives you easy access to several different button styles. Available variants are: **elevated**(default), **flat**, **tonal**, **outlined**, **text**, and **plain**.

| Value        | Example                                                  | Description                                                     |
|--------------|----------------------------------------------------------|-----------------------------------------------------------------|
| **elevated** | <v-btn color="primary" variant="elevated">Button</v-btn> | Elevates the button with a shadow                               |
| **flat**     | <v-btn color="primary" variant="flat">Button</v-btn>     | Removes button shadow                                           |
| **tonal**    | <v-btn color="primary" variant="tonal">Button</v-btn>    | Background color is a lowered opacity of the current text color |
| **outlined** | <v-btn color="primary" variant="outlined">Button</v-btn> | Applies a thin border with the current text color               |
| **text**     | <v-btn color="primary" variant="text">Button</v-btn>     | Removes the background and removes shadow                       |
| **plain**    | <v-btn color="primary" variant="plain">Button</v-btn>    | Removes the background and lowers the opacity until hovered     |

#### Icon

Icons can be used for the primary content of a button. They are commonly used in the [v-toolbar](/components/toolbars/) and [v-app-bar](/components/app-bars/) components.

<ExamplesExample file="v-btn/prop-icon" />

#### Loaders

Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a `v-progress-circular` component but this can be customized with the **loader** slot.

<ExamplesExample file="v-btn/prop-loaders" />

#### Inside of bars

A common use-case is to use the `v-btn` with the **icon** property within a [v-toolbar](/components/toolbars/) or [v-app-bar](/components/app-bars/) component.

<ExamplesExample file="v-btn/misc-toolbar" />

### Slots

The `v-btn` component provides slots that enable you to customize content created by its props or to add additional content.

![Button Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-btn/v-btn-slots.png)

| Slot | Description |
| - | - |
| 1. Default | The default slot |
| 2. Prepend | Content area before the default slot |
| 3. Append | Content area after the default slot |
| 4. Loader | Content area shown when **loading** is set to `true` |

Slots give you greater control to customize the content of the `v-btn` component while still taking advantage of the easy-to-use props.

#### Icon color

When you use the **prepend-icon** and **append-icon** props in conjunction with the corresponding slot, **prepend** or **append**, you are able to place a [v-icon](/components/icons/) that automatically injects the designated icon.

<ExamplesExample file="v-btn/slot-prepend-append" />

#### Custom loader

The **loader** slot allows you to customize the loading indicator. In this example we use a [v-progress-linear](/components/progress-linear/) component to create a loading bar that spans the full width of the button.

<ExamplesExample file="v-btn/slot-loader" />

<VoPromotionsCardVuetify class="mb-4" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-btn` component.

### Discord event

In this example we utilize multiple different button variants and styles to create a copy of the Discord event card.

<ExamplesExample file="v-btn/misc-discord-event" hide-invert />

### Survey group

In addition to [Button groups](/components/button-groups/), the `v-btn` component cant hook into a [v-item-group](/components/item-groups/) using a special symbol. In the next example we create a group of buttons that are used to select a survey answer and add custom **active** state styling.

<ExamplesExample file="v-btn/misc-group-survey" hide-invert />

### Tax form confirmation

This example utilizes the [v-text-field](/components/text-fields/) component to collect data from the user and the **loading** prop of `v-btn` when submitting the form.

<ExamplesExample file="v-btn/misc-tax-form" />

### Dialog action

Buttons are often used to trigger actions within a [v-dialog](/components/dialogs/). In this example we use the **outlined** variant and the **color** prop to create a button that is visually distinct from the other buttons.

<ExamplesExample file="v-btn/misc-dialog-action" />

### Cookie settings

In this example we use a [v-banner](/components/banners/) component to display a custom cookie consent banner. Clicking the "Manage Cookies" button will prompt a [v-dialog](/components/dialogs/) component.

<ExamplesExample file="v-btn/misc-cookie-settings" />

### Readonly buttons

In this example, we change the properties of the `v-btn` based upon a "subscription" state. When the user is subscribed, we want to disable interaction with the button, but not change its appearance; which is what occurs when using the **disabled** property.

<ExamplesExample file="v-btn/misc-readonly" />

## Global Configuration

Modify the default values and set a default style for all `v-btn` components using the [Global configuration](/features/global-configuration/). This helps keep your application consistent and allows you to change it in the future with minimal effort.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetifyjs'

export default createVuetify({
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'outlined',
      rounded: true,
    },
  },
})
```

## Aliasing

Utilize the [component aliasing](/features/aliasing/) feature to generate virtual components derived from the v-btn component. This proves valuable when dealing with numerous button variations within design specifications or when developing a custom library based on Vuetify.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetifyjs'
import { VBtn } from 'vuetifyjs/components'

export createVuetify({
  aliases: {
    VBtnSecondary: VBtn,
    VBtnTertiary: VBtn,
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'text',
    },
    VBtnSecondary: {
      color: 'secondary',
      variant: 'flat',
    },
    VBtnTertiary: {
      rounded: true,
      variant: 'plain',
    },
  },
})
```

## SASS Variables

Make fine tuned changes by modifying the `v-btn` [SASS variables](/features/sass-variables). This is useful when you want to change the default button height or padding.

```scss { resource="src/settings.scss" }
@use 'vuetify/settings' with (
  $button-banner-actions-padding: 16px,
  $button-height: 32px,
);
```

Some of these values can be modified using the [Global configuration](/features/global-configuration/) as well and will take precedence over the SASS variables. For example, the **height** prop can be used to change the default button height without modifying the SASS variables.

## Defaults Side Effects

There are instances where a set of default properties are injected or custom styling is applied to the `v-btn`. This can be for a variety of reasons, but the most common are:

* to match a design specification
* to provide a better visual appearance based upon context
* to avoid creating proprietary components; e.g. `v-bottom-navigation-btn` and `v-card-btn`

### Banners

The `v-banner-actions` component applies the **text** variant and **slim** prop, reducing button x-axis padding to **8px**.

| Documentation | API |
| - | - |
| [Banners](/components/banners/) | [v-banner-actions](/api/v-banner-actions/) |

<ExamplesExample file="v-btn/defaults-banner-actions" />

The following properties are modified when used within a `v-banner-actions` component:

| Property | Value |
| - | - |
| **color** | provided by `v-banner-actions` |
| **density** | provided by `v-banner-actions` |
| **slim** | `true` |
| **variant** | `text` |

### Bottom navigation

The `v-bottom-navigation` component **scopes** out all previously provided defaults and applies its own. This is to avoid changes made to `v-btn` in the [Global configuration](/features/global-configuration/). Buttons automatically register with `v-bottom-navigation`'s' group and will update the **model** when clicked.

| Documentation | API |
| - | - |
| [Bottom navigation](/components/bottom-navigation/) | [v-bottom-navigation](/api/v-bottom-navigation/) |

<ExamplesExample file="v-btn/defaults-bottom-navigation" />

The following properties are modified when used within a `v-bottom-navigation` component:

| Property | Value |
| - | - |
| **color** | provided by `v-bottom-navigation` |
| **density** | provided by `v-bottom-navigation` |
| **stacked** | `true` when **mode** is `shift` |
| **variant** | `text` |

### Button groups

The `v-btn-group` component makes multiple changes to the `v-btn` component.

| Documentation | API |
| - | - |
| [Button groups](/components/button-groups/) | [v-btn-group](/api/v-btn-group/) |

<ExamplesExample file="v-btn/defaults-btn-group" />

The following properties are modified when used within a `v-btn-group` component:

| Property | Value |
| - | - |
| **color** | provided by `v-btn-group` |
| **height** | `auto` |
| **density** | provided by `v-btn-group` |
| **flat** | `true` |
| **variant** | provided by `v-btn-group` |

### Cards

The `v-card-actions` component applies the **text** variant and **slim** prop, reducing button x-axis padding to **8px**, and applies a start margin for all siblings. This is to ensure the text from the button lines up with the text and title of the card and that there is space between its actions.

| Documentation | API |
| - | - |
| [Cards](/components/cards/) | [v-card-actions](/api/v-card-actions/) |

<ExamplesExample file="v-btn/defaults-card-actions" />

The following properties are modified when used within a `v-card-actions` component:

| Property | Value |
| - | - |
| **slim** | `true` |
| **variant** | `text` |

### Snackbars

The `v-snackbar` component applies the **text** variant, **slim** prop, and removes ripples from all `v-btn` components.

| Documentation | API |
| - | - |
| [Snackbars](/components/snackbars/) | [v-snackbar](/api/v-snackbar/) |

<ExamplesExample file="v-btn/defaults-snackbar" />

The following properties are modified when used within the **actions** slot of the `v-snackbar` component:

| Property | Value |
| - | - |
| **slim** | `true` |
| **ripple** | `false` |
| **variant** | `text` |

### Toolbars and AppBars

The `v-toolbar` component applies the **text** variant to all `v-btn` components. In addition, the [v-toolbar-items](/api/v-toolbar-items/) component is used to create a grouping of buttons that fill the height of the toolbar.

| Documentation | API |
| - | - |
| [Toolbars](/components/toolbars/) | [v-toolbar](/api/v-toolbar/)  |

<ExamplesExample file="v-btn/defaults-toolbar" />

::: info

The [v-app-bar](/components/app-bars/) component uses [v-toolbar](/components/toolbars/) internally. When applying global defaults, you must target the `v-toolbar` component.

:::

```js { resource="src/plugins/vuetify.js" }
export default createVuetify({
  defaults: {
    VToolbar: {
      VBtn: { variant: 'flat' },
    },
  },
})
```

The following properties are modified when used within a `v-toolbar` or `v-toolbar-items` component:

| Property | Value |
| - | - |
| **height** | provided by `v-toolbar-items` |
| **variant** | `text` |

<VoPromotionsCardVuetify class="mb-4" />

## Accessibility

The `v-btn` component is an extension of the native `button` element and supports all of the same accessibility features.

### ARIA Attributes

By default, the `v-btn` component includes relevant [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) attributes to enhance accessibility. The component is automatically assigned the `type="button"` attribute, which indicates its purpose as a button to assistive technologies.

### Keyboard Navigation

The `v-btn` component is natively focusable and responds to keyboard events, such as pressing the <v-kbd>Enter</v-kbd> or <v-kbd>Space</v-kbd> key to trigger the button's action. This ensures that users can navigate and interact with your application using just the keyboard.

### Accessible Labels

When using a [v-icon](/components/icons/) within the `v-btn` component (e.g., with the **icon** prop), it is essential to provide a text alternative for screen reader users. You can add an `aria-label` attribute with a descriptive label to ensure that the button's purpose is clear to all users.

```html
<v-btn
  aria-label="Refresh"
  icon="mdi-refresh"
></v-btn>
```

### Touch Target Size

Make sure your buttons have an adequate touch target size, especially on touch devices. A larger touch target can improve the usability of your buttons for users with motor impairments or those using small screens. You can use **large** or **x-large** values for the size prop to increase the button size:

```html
<v-btn size="large">
  Large Button
</v-btn>

<v-btn size="x-large">
  Extra Large Button
</v-btn>
```
