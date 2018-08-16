<template lang="pug">
  views-example(:data="data")
    section(slot-scope="props")#create-your-own
      helpers-section-head(value="Motion.Transitions.createYourOwnHeader")
      helpers-section-text(value="Motion.Transitions.createYourOwnText1")
      helpers-markup(lang="javascript")
        | import { createSimpleTransition } from 'vuetify/es5/util/helpers'
        | &nbsp;
        | const myTransition = createSimpleTransition('my-transition')
        | &nbsp;
        | Vue.component('my-transition', myTransition)
      helpers-section-text(value="Motion.Transitions.createYourOwnText2")
      helpers-markup(lang="stylus")
        | .fade-transition
        |   &-leave-active
        |     position: absolute
        | &nbsp;
        |   &-enter-active, &-leave, &-leave-to
        |     transition: $primary-transition
        | &nbsp;
        |   &-enter, &-leave-to
        |     opacity: 0
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'
  import { camel, kebab } from '@/util/helpers'

  export default {
    data: () => ({
      component: 'transitions',
      section: 'motion'
    }),
    computed: {
      ...mapState('app', ['components']),
      computedComponent () {
        return camel(this.component)
      },
      computedComponents () {
        let component = this.components[this.component]

        // Temporary until all components are converted
        if (component) {
          return component.components
        } else {
          // TODO: move out of translation files
          component = `${this.computedSection}.${this.computedComponent}.components`
        }

        return this.$te(component)
          ? this.$t(component)
          : this.$te(component, 'en')
            ? this.$t(component, 'en')
            : []
      },
      computedSection () {
        return camel(this.section)
      },
      data () {
        return {
          components: this.computedComponents,
          examples: this.examples,
          folder: kebab(this.computedComponent),
          toc: this.toc
        }
      },
      examples () {
        const component = this.components[this.component]

        if (!component) return []

        return component.examples.map(example => {
          let file = example
          let newIn = false

          if (example === Object(example)) {
            file = example.file
            newIn = example.newIn
          }

          const namespace = `${this.computedSection}.${this.computedComponent}.examples.${file}`

          return {
            file,
            desc: `${namespace}.desc`,
            header: `${namespace}.header`,
            newIn
          }
        })
      }
    }
  }
</script>
