<template>
  <section>
    <base-heading id="playground">Generic.Pages.playground</base-heading>
    <doc-example
      :id="`usage-${-1}`"
      :value="internalValue"
    />
  </section>
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
