<template>
  <v-app>
    <app-settings-drawer />

    <app-bar />

    <app-drawer temporary />

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
  import { defineComponent, onBeforeMount } from 'vue'
  import { useAppStore } from '@/store/app'

  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import HomeFooter from '@/components/home/Footer.vue'

  export default defineComponent({
    name: 'HomeLayout',
    components: { AppBar, AppDrawer, AppSettingsDrawer, HomeFooter },

    setup () {
      const app = useAppStore()
      onBeforeMount(() => {
        app.drawer = null
      })
    },
  })
</script>

<style lang="sass">
#material-design-framework
  h1, h2, h3, h4, h5, h6
    > a
      display: none
</style>
