---
nav: System bars
meta:
  title: System-bar component
  description: The system bar component creates an android style status bar that rests on the very top of your application.
  keywords: system bars, vuetify system bar component, vue system bar component, android status bar, status bar
related:
  - /components/buttons/
  - /components/toolbars/
  - /components/tabs/
---

# System bars

The `v-system-bar` component can be used for displaying statuses to the user. It looks like the Android system bar and can contain icons, spacers, and some text.

![System Bar Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-system-bar/v-system-bar-entry.png)

---

## Usage

`v-system-bar` in its simplest form displays a small container with default theme.

<usage name="v-system-bar" />

<entry />

## API

| Component | Description |
| - | - |
| [v-system-bar](/api/v-system-bar/) | Primary Component |

<api-inline hide-links />

## Anatomy

The recommended placement of elements inside of `v-system-bar` is:

* Place informational icons to the right
* Place time or other textual information to the far right

![System Bar Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-system-bar/v-system-bar-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The System Bar container has a default slot with content justified right |
| 2. Icon items (optional) | Used to convey information through the use of icons |
| 3. Text (optional) | Textual content that is typically used to show time |

<api-inline hide-links />

## Examples

### Props

#### Color

You can optionally change the color of the `v-system-bar` by using the `color` prop.

<example file="v-system-bar/prop-color" />

#### Window

A window bar with window controls and status info.

<example file="v-system-bar/prop-window" />
