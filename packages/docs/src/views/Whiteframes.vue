<template>
  <vue-file :file="`whiteframes/${whiteframe}`" />
</template>

<script>
  // Extensions
  import Documentation from './Documentation'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'WhiteframesView',

    extends: Documentation,

    computed: { whiteframe: get('route/params@whiteframe') },

    methods: {
      async load () {
        return import(
          /* webpackChunkName: "whiteframes-view" */
          `@/pages/${this.locale}/getting-started/whiteframes.md`
        )
      },
    },
  }
</script>
