<template>
  <div>
    <doc-heading>Generic.Pages.usage</doc-heading>
    <doc-text>{{ `${namespace}.${page}.usageText` }}</doc-text>
    <doc-usage-example
      :id="`usage-${-1}`"
      :value="value"
      eager
    />
  </div>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { mapGetters } from 'vuex'

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

    methods: { kebabCase },
  }
</script>
