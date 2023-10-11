<template>
  <v-system-bar
    app
    class="px-4"
    flat
    color="#e7f0f6"
    height="72"
  >
    <div class="blue--text text--darken-3">
      <div class="text-subtitle-1 text-md-h6 font-weight-bold mr-2 text-truncate">
        <span class="d-md-none ">Vuetify 3 is now available!</span>
        <span class="d-none d-md-inline">The latest version of Vuetify is now available!</span>
      </div>

      <div class="text-caption d-none d-sm-block">
        Learn about Vuetify 3's new features <span class="d-none d-md-inline"> and functionality for modern Vue applications</span>
      </div>
    </div>

    <v-spacer />

    <v-btn
      class="text-capitalize"
      color="primary"
      dark
      depressed
      href="https://vuetifyjs.com/"
      target="_blank"
    >
      <span class="d-none d-md-block">Start exploring</span>
      <span class="d-md-none">Explore</span>
    </v-btn>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'DefaultExploreSystemBar',
  }
</script>
