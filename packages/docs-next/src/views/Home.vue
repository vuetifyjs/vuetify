<template>
  <v-container
    class="fill-height mt-n16 px-0"
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

  export default {
    name: 'HomeView',

    extends: Documentation,

    methods: {
      async load () {
        return import(
          /* webpackChunkName: "home-page" */
          `@/pages/${this.locale}/home.md`
        )
      },
    },
  }
</script>

<style lang="sass">
  #material-design-framework
    h1, h2, h3, h4, h5, h6
      > a
        display: none
</style>
