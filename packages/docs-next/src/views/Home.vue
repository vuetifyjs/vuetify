<template>
  <v-container
    class="fill-height justify-center"
    tag="section"
  >
    <v-row>
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
