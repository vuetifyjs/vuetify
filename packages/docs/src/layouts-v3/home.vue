<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />

    <!--<default-snackbar />-->

    <!--<default-settings />-->
  </v-app>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HomeLayout',

  })
</script>
