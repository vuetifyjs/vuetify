<template>
  <v-system-bar
    v-if="bar"
    app
    class="justify-center"
    color="grey darken-4"
    dark
    window
  >
    <v-responsive max-width="24" />

    <v-spacer />

    <a
      class="text-subtitle-1 white--text text-decoration-none text-body-2"
      href="https://v2.vuetifyjs.com"
      rel="noopener"
      target="_blank"
    >
      Looking for the old docs?

      <v-icon small>$mdiOpenInNew</v-icon>
    </a>

    <v-spacer />

    <v-icon @click="bar = false">
      $close
    </v-icon>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'HomeSystemBar',

    data: () => ({ bar: true }),
  }
</script>
