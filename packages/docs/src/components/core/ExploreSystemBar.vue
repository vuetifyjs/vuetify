<template>
  <v-system-bar
    app
    class="px-4"
    flat
    color="#e7f0f6"
    height="72"
  >
    <div class="blue--text text--darken-3">
      <div class="headline font-weight-bold mr-2 text-truncate mb-1">
        <span class="hidden-md-and-up">Vuetify 3 is now available!</span>
        <span class="hidden-sm-and-down">The latest version of Vuetify is now available!</span>
      </div>

      <div class="caption hidden-xs-only">
        Learn about Vuetify 3's new features <span class="hidden-md-and-down"> and functionality for modern Vue applications</span>
      </div>
    </div>

    <v-spacer />

    <v-btn
      class="text-capitalize"
      color="primary"
      depressed
      href="https://vuetifyjs.com/"
      target="_blank"
    >
      <span class="hidden-sm-and-down">Start exploring</span>
      <span class="hidden-md-and-up">Explore</span>
    </v-btn>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'CoreExploreSystemBar'
  }
</script>
