<template>
  <vue-file :file="`wireframes/${wireframe}`" />
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
      /* webpackChunkName: "wireframes-view-[request]" */
      `@/pages/${locale}/getting-started/wireframes.md`
    )
  }

  export default {
    name: 'WireframesView',

    extends: Documentation,

    async asyncData ({ route, store }) {
      const md = await load(route)
      store.state.pages.md = md
    },

    computed: { wireframe: get('route/params@wireframe') },
  }
</script>
