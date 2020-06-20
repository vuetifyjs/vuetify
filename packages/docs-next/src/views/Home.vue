<template>
  <v-container
    class="fill-height justify-center"
    tag="section"
  >
    <component :is="component" />
  </v-container>
</template>

<script>
  // Extensions
  import Page from './Page'

  async function load (route) {
    const { locale } = route.params

    return import(
      /* webpackChunkName: "home-page" */
      `@/pages/${locale}/home.md`
    )
  }

  export default {
    name: 'Home',

    extends: Page,

    methods: { load },
  }
</script>
