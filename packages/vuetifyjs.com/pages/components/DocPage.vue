<template lang="pug">
  example-view(:data="data" v-if="exists")
</template>

<script>
  import { camel } from '@/util/helpers'

  export default {
    computed: {
      components () {
        const components = `${this.section}.${this.name}.components`

        return this.$te(components)
          ? this.$t(components)
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
    },

    created () {
      if (!this.exists) {
        this.$router.replace('/404')
      }
    }
  }
</script>
