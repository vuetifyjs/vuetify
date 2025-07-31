---
meta:
  title: Transitions
  description: Utilize Vuetify's built in CSS and Javascript transitions within components.
  keywords: motion, transitions, vuetify transitions
related:
  - /components/menus/
  - /styles/colors/
  - /components/expansion-panels/
---

# Transitions

Smooth animations help make a UI feel great. Using Vue's transition system and re-usable functional components, you can easily control the motion of your application. Most components can have their transition altered through the **transition** prop.

<PageFeatures />

<PromotedEntry />

## API

| Name | Description |
| - | - |
| [v-expand-transition](/api/v-expand-transition/) | The expand transition is used in Expansion Panels and List Groups. There is also a horizontal version available with `v-expand-x-transition`. |
| [v-fab-transition](/api/v-fab-transition/) | An example of the fab transition can be found in the `v-speed-dial` component. |
| [v-fade-transition](/api/v-fade-transition/) | An example of the fade transition can be found on the Carousel component. |
| [v-scale-transition](/api/v-scale-transition/) | Many of Vuetify's components contain a **transition** prop which allows you to specify your own. |
| [v-scroll-x-transition](/api/v-scroll-x-transition/) | Scroll X transitions continue along the horizontal axis. |
| [v-scroll-y-transition](/api/v-scroll-y-transition/) | Scroll Y transitions continue along the vertical axis. |
| [v-slide-x-reverse-transition](/api/v-slide-x-reverse-transition/) | Slide X reverse transitions slide in from the right. |
| [v-slide-x-transition](/api/v-slide-x-transition/) | Slide X transitions slide in from the left. |
| [v-slide-y-reverse-transition](/api/v-slide-y-reverse-transition/) | Slide Y reverse transitions slide in from the bottom. |
| [v-slide-y-transition](/api/v-slide-y-transition/) | Slide Y transitions slide in from the top. |
| [v-tab-reverse-transition](/api/v-tab-reverse-transition/) | Tab reverse transitions slide in from the right. |
| [v-tab-transition](/api/v-tab-transition/) | Tab transitions slide in from the left. |
| [v-toggle-slide-x-reverse-transition](/api/v-toggle-slide-x-reverse-transition/) | Toggle Slide X reverse transitions slide in from the right. |
| [v-toggle-slide-x-transition](/api/v-toggle-slide-x-transition/) | Toggle Slide X transitions slide in from the left. |
| [v-toggle-slide-y-reverse-transition](/api/v-toggle-slide-y-reverse-transition/) | Toggle Slide Y reverse transitions slide in from the bottom. |
| [v-toggle-slide-y-transition](/api/v-toggle-slide-y-transition/) | Toggle Slide Y transitions slide in from the top. |

<ApiInline hide-links />

## Examples

<!--
### Props

#### Custom Origin

Programmatically control the transition origin with a simple prop.

<ExamplesExample file="transitions/prop-custom-origin" />
-->

### Misc

#### Expand x

The expand transition is used in Expansion Panels and List Groups. There is also a horizontal version available with `v-expand-x-transition`.

<ExamplesExample file="transitions/misc-expand-x" />

#### Fab

An example of the fab transition can be found in the `v-speed-dial` component.

<ExamplesExample file="transitions/misc-fab" />

#### Fade

An example of the fade transition can be found on the Carousel component.

<ExamplesExample file="transitions/misc-fade" />

#### Scale

Many of Vuetify's components contain a **transition** prop which allows you to specify your own.

<ExamplesExample file="transitions/misc-scale" />

#### Scroll x

Scroll X transitions continue along the horizontal axis.

<ExamplesExample file="transitions/misc-scroll-x" />

#### Scroll y

Scroll Y transitions continue along the vertical axis.

<ExamplesExample file="transitions/misc-scroll-y" />

#### Slide x

Slide x transitions move along the horizontal axis.

<ExamplesExample file="transitions/misc-slide-x" />

#### Slide y

Animations use the application's `$primary-transition`.

<ExamplesExample file="transitions/misc-slide-y" />

#### Todo list

Using multiple custom transitions, it is easy to bring a simple todo list to life!

<ExamplesExample file="transitions/misc-todo" />

## Create your own

You can use Vuetify's transition helper function to easily create your own custom transitions.

```js
import { createCssTransition } from 'vuetify/util/transitions';

createCssTransition('my-transition')
```

The argument passed to the **createCssTransition** function will be the name of the transition that you can hook into your style. This is an example of what `my-transition` looks like:

```scss
.my-transition {
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: 1s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
```

You can now use this custom transition in a few different ways.

### As a component

The **createCssTransition** function will return a component that you can use in your template.

<ExamplesExample file="transitions/create-css-transition-component" />

### As a prop

Many of Vuetify’s components contain a **transition** prop. You can send the name of your custom transition to the transition prop.

<ExamplesExample file="transitions/create-css-transition-prop" />
