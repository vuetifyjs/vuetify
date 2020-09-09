<template>
  <vue-file :file="`whiteframes/${whiteframe}`" />
</template>

<script>
  // Extensions
  import Documentation from './Documentation'

  // Utilities
  import { get } from 'vuex-pathify'
  import { localeLookup } from '@/i18n/util'

  export default {
    name: 'WhiteframesView',

    extends: Documentation,

    computed: { whiteframe: get('route/params@whiteframe') },

    methods: {
      async load () {
        const locale = localeLookup(this.locale)
        return import(
          /* webpackChunkName: "whiteframes-view-[request]" */
          `@/pages/${locale}/getting-started/whiteframes.md`
        )
      },
    },
  }
</script>
