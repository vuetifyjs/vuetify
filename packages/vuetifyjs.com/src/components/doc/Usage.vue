<template>
  <div>
    <doc-heading>Generic.Pages.usage</doc-heading>
    <doc-text>{{ `${namespace}.${page}.examples.${value}.desc` }}</doc-text>
    <doc-example
      :id="`usage-${-1}`"
      :value="value"
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
        type: String,
        default: undefined
      }
    },

    methods: { kebabCase }
  }
</script>
