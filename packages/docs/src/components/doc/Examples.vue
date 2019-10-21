<template>
  <section id="examples">
    <base-heading id="examples">Generic.Pages.examples</base-heading>

    <doc-markdown>Generic.Pages.examplesText</doc-markdown>

    <section
      v-for="(example, i) in examples"
      :id="example.id"
      :key="i"
    >
      <base-heading :id="example.id">{{ example.heading }}</base-heading>

      <doc-text>{{ example.desc }}</doc-text>

      <doc-example
        :key="i"
        :value="value[i]"
      />
    </section>
  </section>
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
          const heading = `${this.namespace}.${this.page}.examples.${file}.heading`

          return {
            heading,
            desc: `${this.namespace}.${this.page}.examples.${file}.desc`,
            id: kebabCase(this.$t(heading)),
          }
        })
      },
    },
  }
</script>
