<template lang="pug">
  component-page(:data="data")
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
      name () {
        return camel(this.$route.params.component)
      },
      section () {
        return camel(this.$route.params.section)
      }
    }
  }
</script>
