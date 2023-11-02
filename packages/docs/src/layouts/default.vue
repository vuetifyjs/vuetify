<template>
  <v-app>
    <app-settings-drawer />

    <app-banner />

    <app-bar />

    <app-drawer />

    <app-toc />

    <app-back-to-top />

    <app-snackbar-queue />

    <v-main>
      <slot>
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

          <backmatter v-if="hasBackmatter" :key="route.name" />
        </v-container>
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppBackToTop from '@/components/app/BackToTop.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppToc from '@/components/app/Toc.vue'
  import AppSnackbarQueue from '@/components/app/SnackbarQueue.vue'

  // Composables
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  const route = useRoute()

  const isApi = computed(() => route.meta?.category === 'api')
  const isDashboard = computed(() => route.meta?.category === 'user')
  const style = computed(() => ({ maxWidth: isApi.value || isDashboard.value ? '1368px' : '960px' }))
  const hasBackmatter = computed(() => !isApi.value && route.meta?.backmatter !== false)
</script>
