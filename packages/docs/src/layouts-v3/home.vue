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

  import AppSettingsDrawer from '@/components-v3/app/settings/Drawer.vue'
  import AppBar from '@/components-v3/app/bar/index.vue'
  import HomeView from '@/components-v3/home/View.vue'

  export default defineComponent({
    name: 'HomeLayout',
    components: { AppSettingsDrawer, AppBar, HomeView },
  })
</script>
