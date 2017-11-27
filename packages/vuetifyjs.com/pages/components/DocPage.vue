<template lang="pug">
  component-page(:data="data" :key="name")
</template>

<script>
  import { camel } from '@/util/helpers'

  export default {
    computed: {
      components () {
        const components = `Components.${this.name}.components`

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
        const examples = `Components.${this.name}.examples`

        return this.$te(examples)
          ? this.$t(examples)[0]
          : []
      },
      name () {
        const name = camel(this.$route.params.component)

        return `${name.substr(0, 1).toUpperCase()}${name.slice(1)}`
      }
    }
  }
</script>
