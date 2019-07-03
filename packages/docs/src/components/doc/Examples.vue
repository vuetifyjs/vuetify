<template>
  <div>
    <doc-heading>Generic.Pages.examples</doc-heading>
    <div />
    <template v-for="(example, i) in examples">
      <doc-heading :key="`heading-${i}`">
        {{ example.header }}
      </doc-heading>
      <doc-text :key="`text-${i}`">
        {{ example.desc }}
      </doc-text>
      <doc-example
        :key="i"
        :value="value[i]"
      />
    </template>
  </div>
</template>

<script>
  // Utilities
  import {
    mapGetters,
  } from 'vuex'

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
          return {
            header: `${this.namespace}.${this.page}.examples.${file}.header`,
            desc: `${this.namespace}.${this.page}.examples.${file}.desc`,
          }
        })
      },
    },
  }
</script>
