<template>
  <v-system-bar
    v-if="bar"
    app
    class="justify-center"
    color="#1697F6"
    dark
    window
  >
    <v-responsive max-width="24" />

    <v-spacer />

    <div>
      You are browsing the new v2.x documentation.

      <a
        class="text-subtitle-1 white--text text-decoration-none text-body-2"
        href="https://v2.vuetifyjs.com"
        rel="noopener"
        target="_blank"
      >
        Click here

        <v-icon small class="mr-0">$mdiOpenInNew</v-icon>
      </a>

      for the old v2.x documentation.
    </div>

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
