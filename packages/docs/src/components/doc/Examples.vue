<template>
  <div>
    <base-heading>Generic.Pages.examples</base-heading>

    <base-markdown>Generic.Pages.examplesText</base-markdown>

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

      <ad-card
        v-if="adIndex === i"
        :key="`ad-${i}`"
      />
    </section>
  </div>
</template>

<script>
  // Utilities
  import {
    get,
  } from 'vuex-pathify'

  import kebabCase from 'lodash/kebabCase'

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
      adIndex () {
        if (this.examples.length < 4) return -1

        return Math.ceil(this.examples.length / 2) - 1
      },
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
