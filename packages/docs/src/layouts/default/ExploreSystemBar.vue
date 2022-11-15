<template>
  <v-system-bar
    v-if="$vuetify.breakpoint.smAndUp"
    app
    flat
    color="#e7f0f6"
    height="72"
  >
    <div class="pl-2 pl-md-8 pr-8 blue--text text--darken-3 mt-n1">
      <div class="text-subtitle-1 text-md-h6 font-weight-bold">
        The latest version of Vuetify is now available!
      </div>

      <div class="text-caption ">
        Learn about Vuetify 3's new features and functionality for modern Vue applications
      </div>
    </div>

    <v-spacer />

    <v-btn
      class="text-capitalize mr-2 mr-md-8"
      color="primary"
      dark
      depressed
      href="https://next.vuetifyjs.com/"
      target="_blank"
    >
      Start exploring <span class="hidden-sm-and-down">Vuetify 3</span>

      <v-icon color="white" right>mdi-arrow-right</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'DefaultExploreSystemBar',
  }
</script>
