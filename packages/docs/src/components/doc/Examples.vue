<template>
  <div>
    <doc-heading>Generic.Pages.examples</doc-heading>
    <div />
    <section
      v-for="(example, i) in examples"
      :id="example.id"
      :key="i"
    >
      <doc-heading>{{ example.header }}</doc-heading>
      <doc-text>{{ example.desc }}</doc-text>
      <doc-example
        :key="i"
        :value="value[i]"
      />
    </section>
  </div>
</template>

<script>
  // Utilities
  import {
    mapGetters,
  } from 'vuex'
  import kebabCase from 'lodash/kebabCase'

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      examples () {
        return this.value.map(example => {
          const path = example === Object(example) ? example.file : example
          const file = path.split('/').pop()
          const header = `${this.namespace}.${this.page}.examples.${file}.header`
          return {
            header,
            desc: `${this.namespace}.${this.page}.examples.${file}.desc`,
            id: kebabCase(this.$t(header)),
          }
        })
      },
    },
  }
</script>
