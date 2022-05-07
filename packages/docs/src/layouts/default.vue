<template>
  <v-app>
    <app-settings-drawer />

    <app-bar />

    <app-drawer />

    <v-main>
      <v-container
        :style="style"
        class="pa-4 pa-sm-6 pa-md-8"
        fluid
        tag="section"
      >
        <alert type="warning">
          This is <b>BETA</b> documentation for Vuetify 3, examples and information may be broken or outdated.
          <br>
          Components not listed in the sidebar are not available yet.
          <br>
          Vuetify 2 documentation can be found on <app-link href="https://vuetifyjs.com/">vuetifyjs.com</app-link>
        </alert>

        <router-view />
      </v-container>
    </v-main>

    <app-toc />

    <app-pwa-snackbar />
  </v-app>
</template>

<script lang="ts">
  // Components
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppToc from '@/components/app/Toc.vue'
  import AppPwaSnackbar from '@/components/app/PwaSnackbar.vue'

  // Composables
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  // Utilities
  import { computed, defineComponent, onBeforeMount } from 'vue'

  export default defineComponent({
    name: 'DefaultLayout',

    components: {
      AppBar,
      AppDrawer,
      AppSettingsDrawer,
      AppToc,
      AppPwaSnackbar,
    },

    setup () {
      const app = useAppStore()
      const route = useRoute()
      const isApi = computed(() => route.name?.toString().startsWith('api-'))
      const style = { maxWidth: isApi.value ? '1368px' : '960px' }

      onBeforeMount(() => {
        app.drawer = null
      })

      return { isApi, style }
    },
  })
</script>
