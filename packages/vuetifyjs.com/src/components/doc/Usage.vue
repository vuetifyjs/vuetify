<template>
  <div>
    <doc-heading>Generic.Pages.usage</doc-heading>
    <doc-text>{{ `${namespace}.${page}.examples.${internalValue.file}.desc` }}</doc-text>
    <doc-example
      :id="`usage-${-1}`"
      :value="internalValue"
    />
  </div>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'

  export default {
    inject: ['namespace', 'page'],

    props: {
      value: {
        type: [Object, String],
        default: undefined
      }
    },

    computed: {
      internalValue () {
        return this.value === Object(this.value)
          ? this.value
          : { file: this.value }
      }
    },

    methods: { kebabCase }
  }
</script>
