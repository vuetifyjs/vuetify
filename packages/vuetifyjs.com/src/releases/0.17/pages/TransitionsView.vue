<template lang="pug">
  component-view(:doc="doc")
    h6 Create your own
    section-text You can use Vuetify's transition helper function to easily create your own custom transitions. This function will return an object that you can import into Vue. Using Vue's <a href="https://vuejs.org/v2/guide/render-function.html#Functional-Components" target="_blank" rel="noopener">functional component</a> option will make sure your transition is as efficient as possible. Simply import the function:
    markup(lang="javascript")
      |import { createSimpleTransition } from '../../node_modules/vuetify/src/util/helpers'
      |&nbsp;
      |const myTransition = createSimpleTransition('my-transition')
      |&nbsp;
      |Vue.component('my-transition', myTransition)
    section-text The <code>createSimpleTransition</code> function accepts 1 argument, name. This will be the name that you can hook into with your style. This is an example of what <code>v-fade-transition</code> looks like:
    markup(lang="stylus")
      |.fade-transition
      |   &-leave-active
      |     position: absolute
      |&nbsp;
      |   &-enter-active, &-leave, &-leave-to
      |     transition: $primary-transition
      |&nbsp;
      |   &-enter, &-leave-to
      |     opacity: 0
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Motion',
          edit: 'TransitionsView',
          desc: `Smooth animations help make a UI feel great. Using Vue's transition system and re-usable functional components, you can easily control the motion of your application. Most components can have their transition altered through the <code>transition</code> prop.`,
          examples: [
            { header: "Slide X transitions", file: 'transitions/slide-x-transitions', desc: 'Slide x transitions move along the horizontal axis.' },
            { header: "Slide Y transitions", file: 'transitions/slide-y-transitions', desc: 'Animations use the applications <code>$primary-transition</code>.' },
            { header: "Scale transition", file: 'transitions/scale-transition', desc: `Many of Vuetify's components contain a <code>transition</code> prop which allows you to specify your own.` },
            { header: "Fade transition", file: 'transitions/fade-transition', desc: `Another example of the fade transition can be found on the <router-link to="/components/carousel">Carousel</router-link> component.` },
            { header: "Custom Origin", file: 'transitions/custom-origin', desc: `Programmatically control the transition origin with a simple prop.` }
          ]
        }
      }
    }
  }
</script>
