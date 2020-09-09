<template>
  <vue-file :file="`whiteframes/${whiteframe}`" />
</template>

<script>
  // Extensions
  import Documentation from './Documentation'

  // Utilities
  import { get } from 'vuex-pathify'
  import { localeLookup } from '@/i18n/util'

  async function load (route) {
    const locale = localeLookup(route.params.locale)

    return import(
      /* webpackChunkName: "whiteframes-view-[request]" */
      `@/pages/${locale}/getting-started/whiteframes.md`
    )
  }

  export default {
    name: 'WhiteframesView',

    extends: Documentation,

    async asyncData ({ route, store }) {
      const md = await load(route)
      store.state.pages.md = md
    },

    computed: { whiteframe: get('route/params@whiteframe') },
  }
</script>
