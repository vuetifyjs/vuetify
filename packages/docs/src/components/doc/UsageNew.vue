<template>
  <section>
    <base-heading id="usage">Generic.Pages.usage</base-heading>

    <doc-text>{{ `${namespace}.${page}.usageText` }}</doc-text>

    <doc-usage-example
      :id="`usage-${-1}`"
      :value="value"
      eager
    />
  </section>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DocUsageNew',

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
