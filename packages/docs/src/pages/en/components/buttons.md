---
nav: Buttons
meta:
  title: Button component
  description: The button component communicates actions that a user can take and are typically placed in dialogs, forms, cards and toolbars.
  keywords: buttons, vuetify button component, vue button component
related:
  - /components/button-groups/
  - /components/icons/
  - /components/cards/
---

# Buttons

The `v-btn` component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color. <inline slug="scrimba-buttons" />

![Button Entry](https://cdn.vuetifyjs.com/docs/images/components/v-btn/v-btn-entry.png)

---

## Usage

Buttons in their simplest form contain uppercase text, a slight elevation, hover effect, and a ripple effect on click.

<usage name="v-btn" />

<entry />

## API

| Component | Description |
| - | - |
| [v-btn](/api/v-btn/) | Primary Component |

<api-inline hide-links />

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

There are a multitude of props that can be used to customize the `v-btn` appearance and behavior. Props such as **prepend-icon** and **append-icon** are a simple interface for adding positioned icons while props such as **block** and **stacked** are used to control the component's shape.

#### Density

The **density** prop is used to control the vertical space that the button takes up.

<example file="v-btn/prop-density" />

#### Size

The **size** property is used to control the size of the button and scales with density. The default size is **undefined** which essentially translates to **medium**.

<example file="v-btn/prop-size" />

#### Block

Block buttons extend the full available width of their container. This is useful for creating buttons that span the full width of a card or dialog.

<example file="v-btn/prop-block" />

#### Rounded

Use the **rounded** prop to control the border radius of a button.

<example file="v-btn/prop-rounded" />

#### Elevation

The **elevation** property provides up to 24 levels of shadow depth. By default, buttons rest at 2dp.

<example file="v-btn/prop-elevation" />

#### Ripple

The **ripple** property determines whether the [v-ripple](/directives/ripple/) directive is used.

<example file="v-btn/prop-ripple" />

#### Variants

The **variant** prop gives you easy access to several different button styles. Available variants are: **elevated**(default), **flat**, **tonal**, **outlined**, **text**, and **plain**.

| Value | Example | Description |
| - | - | - |
| **elevated** | <v-btn variant="elevated">Button</v-btn> | Elevates the button with a shadow |
| **flat** | <v-btn variant="flat">Button</v-btn> | Removes button shadow |{ .bg-surface-variant }
| **tonal** | <v-btn variant="tonal">Button</v-btn> | Background color is a lowered opacity of the current text color |
| **outlined** | <v-btn variant="outlined">Button</v-btn> | Applies a thin border with the current text color |
| **text** | <v-btn variant="text">Button</v-btn> | Removes the background and removes shadow |
| **plain** | <v-btn variant="plain">Button</v-btn> | Removes the background and lowers the opacity until hovered |

<alert type="info">

  The block applies **width: 100%** which can have overflow issues when inside of a flex container.

</alert>

#### Icon

Icons can be used for the primary content of a button. They are commonly used in the [v-toolbar](/components/toolbars/) and [v-app-bar](/components/app-bars/) components.

<example file="v-btn/prop-icon" />

#### Loaders

Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a `v-progress-circular` component but this can be customized with the **loader** slot.

<example file="v-btn/prop-loaders" />

#### Inside of bars

A common use-case is to use the `v-btn` with the **icon** property within a [v-toolbar](/components/toolbars/) or [v-app-bar](/components/app-bars/) component.

<example file="v-btn/misc-toolbar" />

### Slots

The `v-btn` component provides slots that enable you to customize content created by its props or to add additional content.

![Button Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-btn/v-btn-slots.png)

| Slot | Description |
| - | - |
| 1. Default | In addition to text, the Button container typically holds a [v-icon](/components/icons/) component |
| 2. Icon (optional) | Leading media content intended to improve visual context |
| 3. Text | A content area for displaying text and other inline elements |
| 4. Loader | A content area for displaying a loading indicator |

<random />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-btn` component.

### Discord event

In this example we utilize multiple different button variants and styles to create a copy of the Discord event card.

<example file="v-btn/misc-discord-event" hide-invert />

### Survey group

In addition to [Button groups](/components/button-groups/), the `v-btn` component cant hook into a [v-item-group](/components/item-groups/) using a special symbol. In the next example we create a group of buttons that are used to select a survey answer and add custom **active** state styling.

<example file="v-btn/misc-group-survey" hide-invert />

### Tax form comfirmation

This example utilizes the [v-text-field](/components/text-fields/) component to collect data from the user and the **loading** prop of `v-btn` when submitting the form.

<example file="v-btn/misc-tax-form" />

### Dialog action

Buttons are often used to trigger actions within a [v-dialog](/components/dialogs/). In this example we use the **outlined** variant and the **color** prop to create a button that is visually distinct from the other buttons.

<example file="v-btn/misc-dialog-action" />

## Defaults Side Effects

There are instances where a set of default properties are injected or custom styling is applied to the `v-btn`. This can be for a variety of reasons, but the most common are:

* to match a design specification
* to provide a better visual appearance based upon context
* to avoid creating proprietary components; e.g. `v-bottom-navigation-btn` and `v-card-btn`

### Bottom navigation

The `v-bottom-navigation` component **scopes** out all previously provided defaults and applies its own. This is to avoid changes made to `v-btn` in the [Global configuration](/features/global-configuration/). Buttons automatically register with `v-bottom-navigation`'s' group and will update the **model** when clicked.

| Documentation | API |
| - | - |
| [Bottom navigation](/components/bottom-navigation/) | [v-bottom-navigation](/api/v-bottom-navigation/) |  |

| Property | Value |
| - | - |
| **color** | provided by `v-bottom-navigation` |
| **density** | provided by `v-bottom-navigation` |
| **stacked** | `true` when **mode** is `shift` |
| **variant** | `text` |

### Toolbars

The `v-toolbar` component applies the **text** variant to all `v-btn` components. In addition, the [v-toolbar-items](/api/v-toolbar-items/) component is used to create a grouping of buttons that fill the height of the toolbar.

| Documentation | API |
| - | - |
| [Toolbars](/components/toolbars/) | [v-toolbar](/api/v-toolbar/)  |

| Property | Value |
| - | - |
| **variant** | `text` |
