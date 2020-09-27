<template>
  <v-container
    class="fill-height px-0"
    fluid
    tag="section"
  >
    <v-row no-gutters>
      <v-col cols="12">
        <component :is="component" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // Extensions
  import Documentation from './Documentation'

  // Utilities
  import { localeLookup } from '@/i18n/util'

  async function load (route) {
    const locale = localeLookup(route.params.locale)

    return import(
      /* webpackChunkName: "home-page-[request]" */
      `@/pages/${locale}/home.md`
    )
  }

  export default {
    name: 'HomeView',

    extends: Documentation,

    async asyncData ({ route, store }) {
      const md = await load(route)
      store.state.pages.md = md
    },
  }
</script>

<style lang="sass">
  #material-design-framework
    h1, h2, h3, h4, h5, h6
      > a
        display: none
</style>
