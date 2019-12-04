<template>
  <div>
    <base-heading>Generic.Pages.accessibility</base-heading>
    <doc-text>{{ `${namespace}.${page}.accessibility.desc` }}</doc-text>
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
        type: [Object, String],
        default: undefined,
      },
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
    },

  }
</script>
