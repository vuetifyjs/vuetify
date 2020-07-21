<template>
  <v-container
    class="fill-height justify-center text-center py-16"
    tag="section"
  >
    <v-row>
      <v-col cols="12">
        <h1 class="text-h2 text-md-h1 font-weight-regular mb-6">
          Vuetify

          <small class="d-block text-h5 text--secondary font-weight-light">
            🔨 Under Construction
          </small>
        </h1>

        <v-img
          :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-${theme.isDark ? 'dark' : 'light'}-atom.svg`"
          class="mx-auto mb-16"
          max-width="100%"
          width="400"
        />

        <v-btn
          color="primary"
          depressed
          x-large
          :to="{
            name: 'Documentation',
            params: {
              category: 'getting-started',
              page: 'quick-start'
            }
          }"
        >
          Go to Documentation

          <v-icon right>
            $mdiOpenInNew
          </v-icon>
        </v-btn>

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

    inject: ['theme'],

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
