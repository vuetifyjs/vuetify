<template lang="pug">
  example-view(:data="data" v-if="exists")
  not-found(v-else)
</template>

<script>
  import { camel } from '@/util/helpers'
  import NotFound from '@/pages/general/404Page'

  export default {
    components: { NotFound },

    computed: {
      components () {
        const components = `${this.section}.${this.name}.components`

        return this.$te(components)
          ? this.$t(components)
          : this.$te(components, 'en')
            ? this.$t(components, 'en')
            : []
      },
      data () {
        return {
          components: this.components,
          examples: this.examples
        }
      },
      examples () {
        const examples = `${this.section}.${this.name}.examples`

        return this.$te(examples)
          ? this.$t(examples)[0]
          : this.$te(examples, 'en')
            ? this.$t(examples, 'en')[0]
            : []
      },
      exists () {
        return this.components.length > 0 || this.examples.length > 0
      },
      name () {
        return camel(this.$route.params.component)
      },
      section () {
        return camel(this.$route.params.section)
      }
    }
  }
</script>
