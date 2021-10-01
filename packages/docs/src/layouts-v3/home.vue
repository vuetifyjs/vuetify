<template>
  <v-app>
    <app-settings-drawer />

    <app-bar />

    <home-view />

    <!--<default-snackbar />-->
  </v-app>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HomeLayout',
  })
</script>
