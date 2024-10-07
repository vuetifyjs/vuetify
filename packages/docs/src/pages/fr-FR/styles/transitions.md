---
meta:
  title: Transitions
  description: Utilize Vuetify's built in CSS and Javascript transitions within components.
  keywords: motion, transitions, vuetify transitions
related:
  - /components/menus/
  - /styles/colors/
  - /fr/components/expansion-panels/
---

# Transitions

Smooth animations help make a UI feel great. Using Vue's transition system and re-usable functional components, you can easily control the motion of your application. Most components can have their transition altered through the **transition** prop.

<entry-ad />

## Utilisation

Vuetify est possède plus de 10 animations css personnalisées qui peuvent être appliquées à de nombreux composants ou votre propre cas d'utilisation personnalisé

<example file="transitions/usage" />

## API

- [v-fab-transition](/api/v-fab-transition)
- [v-fade-transition](/api/v-fade-transition)
- [v-expand-transition](/api/v-expand-transition)
- [v-scale-transition](/api/v-scale-transition)
- [v-scroll-x-transition](/api/v-scroll-x-transition)
- [v-scroll-x-reverse-transition](/api/v-scroll-x-reverse-transition)
- [v-scroll-y-transition](/api/v-scroll-y-transition)
- [v-scroll-y-reverse-transition](/api/v-scroll-y-reverse-transition)
- [v-slide-x-transition](/api/v-slide-x-transition)
- [v-slide-x-reverse-transition](/api/v-slide-x-reverse-transition)
- [v-slide-y-transition](/api/v-slide-y-transition)
- [v-slide-y-reverse-transition](/api/v-slide-y-reverse-transition)

<inline-api page="styles/transitions" />

## Exemples

### Propriétés

#### Custom Origin

Contrôlez l'origine de transition en codant avec un simple prop.

<example file="transitions/prop-custom-origin" />

### Divers

#### Expand x

The expand transition is used in Expansion Panels and List Groups. There is also a horizontal version available with `v-expand-x-transition`.

<example file="transitions/misc-expand-x" />

#### Fab

An example of the fab transition can be found in the `v-speed-dial` component.

<example file="transitions/misc-fab" />

#### Fade

An example of the fade transition can be found on the Carousel component.

<example file="transitions/misc-fade" />

#### Scale

De nombreux composants de Vuetify contiennent un **transition** prop qui vous permet de spécifier votre propre code.

<example file="transitions/misc-scale" />

#### Scroll x

Les transitions de Scroll X se poursuivent le long de l'axe horizontal.

<example file="transitions/misc-scroll-x" />

#### Scroll y

Les transitions de défilement Y se poursuivent le long de l'axe vertical.

<example file="transitions/misc-scroll-y" />

#### Slide x

Les transitions Slide x se déplacent sur l'axe horizontal.

<example file="transitions/misc-slide-x" />

#### Slide y

Les animations utilisent l'application `$primary-transition`.

<example file="transitions/misc-slide-y" />

#### Todo list

En utilisant plusieurs transitions personnalisées, il est facile d'apporter une simple liste de todo à vie!

<example file="transitions/misc-todo" />

## Create your own

You can use Vuetify's transition helper function to easily create your own custom transitions. This function will return an object that you can import into Vue. Using Vue's [functional component](https://vuejs.org/v2/guide/render-function.html#Functional-Components) option will make sure your transition is as efficient as possible. Simply import the function:

```js
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('my-transition')

Vue.component('my-transition', myTransition)
```

The **createSimpleTransition** function accepts 1 argument, name. This will be the name that you can hook into with your style. This is an example of what `v-fade-transition` looks like:

```stylus
.fade-transition
  &-leave-active
    position: absolute

  &-enter-active, &-leave, &-leave-to
    transition: $primary-transition

  &-enter, &-leave-to
    opacity: 0
```

<backmatter />
