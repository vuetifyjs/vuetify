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

  export default {
    inject: ['namespace', 'page'],

    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },

    computed: {
      examples () {
        return this.value.map(example => {
          const file = example === Object(example) ? example.file : example
          return {
            header: `${this.namespace}.${this.page}.examples.${file}.header`,
            desc: `${this.namespace}.${this.page}.examples.${file}.desc`
          }
        })
      }
    }
  }
</script>
