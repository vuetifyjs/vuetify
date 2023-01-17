<template>
  <v-app>
    <app-banner />

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
        <router-view v-slot="{ Component }">
          <v-fade-transition hide-on-leave>
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </v-fade-transition>
        </router-view>

        <backmatter v-if="!isApi" :key="route.name" />
      </v-container>
    </v-main>

    <app-toc />

    <app-pwa-snackbar />
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
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
  const style = computed(() => ({ maxWidth: isApi.value ? '1368px' : '960px' }))

  onBeforeMount(() => {
    app.drawer = null
  })
</script>
