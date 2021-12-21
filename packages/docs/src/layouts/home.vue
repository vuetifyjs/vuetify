<template>
  <v-app>
    <app-settings-drawer />

    <app-bar />

    <v-main>
      <v-container class="px-4 text-center font-weight-light">
        <router-view />
      </v-container>
    </v-main>

    <home-footer />

    <!--<default-snackbar />-->
  </v-app>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'

  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import HomeFooter from '@/components/home/Footer.vue'

  export default defineComponent({
    name: 'HomeLayout',
    components: { AppSettingsDrawer, AppBar, HomeFooter },
  })
</script>

<style lang="sass">
#material-design-framework
  h1, h2, h3, h4, h5, h6
    > a
      display: none
</style>
