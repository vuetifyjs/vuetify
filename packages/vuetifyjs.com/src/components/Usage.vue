<template>
  <div>
    <core-subtitle>Generic.Pages.usage</core-subtitle>
    <core-text>{{ `${namespace}.${page}.examples.${value}.desc` }}</core-text>
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
