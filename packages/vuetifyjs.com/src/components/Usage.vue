<template>
  <div>
    <doc-subtitle>Generic.Pages.usage</doc-subtitle>
    <doc-text>{{ `${namespace}.${page}.examples.${value}.desc` }}</doc-text>
    <example
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
