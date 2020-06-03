---
layout: documentation
title: V-Alert API
description: API for the v-alert component.
keywords: v-alert, alerts, api, vue alert component, vuetify alert component
nav: v-alert-test
---

# V-Alert API

## Props
| Name | Type | Default | Source | Description |
| --- | --- | --- | --- | --- |
| border | string | ```undefined``` | v-alert | Puts a border on the alert. Accepts **top** | **right** | **bottom** | **left**. |
| closeLabel | string | ```'$vuetify.close'``` | v-alert | Text used for *aria-label* on **dismissible** alerts. Can also be customizing globally in [Internationalization](/customization/internationalization). |
| color | string | ```undefined``` | colorable | Applies specified color to the control - it can be the name of material color (for example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`). You can find list of built in classes on the [colors page](/styles/colors#material-colors). |
| coloredBorder | boolean | ```false``` | v-alert | Applies the defined **color** to the alert's border. |
| dark | boolean | ```false``` | themeable | Applies the dark theme variant to the component. You can find more information on the Material Design documentation for [dark themes](https://material.io/design/color/dark-theme.html). |
| dense | boolean | ```false``` | v-alert | Hides the alert icon and decreases component's height. |
| dismissible | boolean | ```false``` | v-alert | Adds a close icon that can hide the alert. |
| elevation | number,string | ```undefined``` | elevatable | Designates an elevation applied to the component between 0 and 24. You can find more information on the [elevation page](/styles/elevation). |
| height | number,string | ```undefined``` | measurable | Sets the height for the component. |
| icon | boolean,string | ```undefined``` | v-alert | Designates a specific icon. |
| light | boolean | ```false``` | themeable | Applies the light theme variant to the component. |
| maxHeight | number,string | ```undefined``` | measurable | Sets the maximum height for the component. |
| maxWidth | number,string | ```undefined``` | measurable | Sets the maximum width for the component. |
| minHeight | number,string | ```undefined``` | measurable | Sets the minimum height for the component. |
| minWidth | number,string | ```undefined``` | measurable | Sets the minimum width for the component. |
| mode | string | ```undefined``` | transitionable | Sets the transition mode (does not apply to transition-group). You can find more information on the Vue documentation [for transition modes](https://vuejs.org/v2/api/#transition). |
| origin | string | ```undefined``` | transitionable | Sets the transition origin on the element. You can find more information on the MDN documentation [for transition origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin). |
| outlined | boolean | ```false``` | v-sheet | Makes the background transparent and applies a thin border. |
| prominent | boolean | ```false``` | v-alert | Displays a larger vertically centered icon to draw more attention. |
| tag | string | ```'div'``` | v-sheet | Specify a custom tag used on the root element. |
| text | boolean | ```false``` | v-alert | Applies the defined **color** to text and a low opacity background of the same. |
| tile | boolean | ```false``` | roundable | Removes the component's border-radius. |
| transition | string | ```undefined``` | transitionable | Sets the component transition. Can be one of the [built in transitions](/styles/transitions) or one your own. |
| type | string | ```undefined``` | v-alert | Specify a **success**, **info**, **warning** or **error** alert. Uses the contextual color and has a pre-defined icon. |
| value | boolean | ```true``` | toggleable | Controls whether the component is visible or hidden. |
| width | number,string | ```undefined``` | measurable | Sets the width for the component. |

## Slots
| Name | Description |
| --- | --- |
| append | Slot for icon at end of alert. |
| close | Slot for icon used in **dismissible** prop. |
| prepend | Slot for icon at beginning of alert. |
| default | The default Vue slot. |

## Events
| Name | Value | Description |
| --- | --- | --- |
| input | ```boolean``` | The updated bound model |

## Functions
| Name | Signature | Description |
| --- | --- | --- |
| toggle | ```(): void``` | Toggles the alert's active state. Available in the close slot and used as the click action in **dismissible**. |

## SASS Variables
| Name | Default | Description |
| --- | --- | --- |
| $alert-border-opacity | ```0.26 !default;``` |  |
| $alert-border-radius | ```$border-radius-root !default;``` |  |
| $alert-border-width | ```4px !default;``` |  |
| $alert-dense-border-width | ```medium !default;``` |  |
| $alert-font-size | ```16px !default;``` |  |
| $alert-icon-size | ```24px !default;``` |  |
| $alert-margin | ```16px !default;``` |  |
| $alert-outline | ```thin solid currentColor !default;``` |  |
| $alert-padding | ```16px !default;``` |  |
| $alert-prominent-icon-font-size | ```32px !default;``` |  |
| $alert-prominent-icon-size | ```48px !default;``` |  |

<carbon-ad />

<up-next />

<vuetify-ad />

<contribute />

