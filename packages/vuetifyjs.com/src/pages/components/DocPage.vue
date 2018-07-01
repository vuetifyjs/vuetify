<template lang="pug">
  views-example(
    v-if="exists"
    :data="data"
  )
    slot
  not-found(v-else)
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { camel, kebab } from '@/util/helpers'
  import NotFound from '@/pages/general/404Page'

  export default {
    components: { NotFound },

    props: {
      component: {
        type: String,
        default: ''
      },
      section: {
        type: String,
        default: ''
      },
      toc: {
        type: String,
        default: ''
      }
    },

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
      },
      exists () {
        return (this.computedComponents || []).length > 0 ||
          (this.examples || []).length > 0
      }
    }
  }
</script>
