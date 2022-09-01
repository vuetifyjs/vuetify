<template>
  <v-app>
    <app-system-bar />

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
        <router-view />
      </v-container>
    </v-main>

    <app-toc />

    <app-pwa-snackbar />
  </v-app>
</template>

<script setup>
  // Components
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppSystemBar from '@/components/app/SystemBar.vue'
  import AppToc from '@/components/app/Toc.vue'
  import AppPwaSnackbar from '@/components/app/PwaSnackbar.vue'

  // Composables
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  // Utilities
  import { computed, onBeforeMount } from 'vue'

  const app = useAppStore()
  const route = useRoute()

  const isApi = computed(() => route.name?.toString().startsWith('api-'))
  const style = { maxWidth: isApi.value ? '1368px' : '960px' }

  onBeforeMount(() => {
    app.drawer = null
  })

</script>
