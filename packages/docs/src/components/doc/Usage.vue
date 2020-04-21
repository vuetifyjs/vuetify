<template>
  <div>
    <base-heading>Generic.Pages.usage</base-heading>

    <doc-text>{{ `${namespace}.${page}.examples.${internalValue.file}.desc` }}</doc-text>

    <doc-example
      :id="`usage-${-1}`"
      :value="internalValue"
      eager
    />
  </div>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import {
    mapGetters,
  } from 'vuex'

  export default {
    props: {
      value: {
        type: [Object, String],
        default: undefined,
      },
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      internalValue () {
        return this.value === Object(this.value)
          ? this.value
          : { file: this.value }
      },
    },

    methods: { kebabCase },
  }
</script>
