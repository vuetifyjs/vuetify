<template>
  <v-app>
    <app-settings-drawer />

    <app-banner />

    <app-bar />

    <app-drawer />

    <app-snackbar-queue />

    <v-main>
      <v-container
        fluid
        tag="section"
      >
        <v-row justify="center" justify-md="start">
          <v-col cols="auto">
            <user-profile />
          </v-col>

          <v-col
            class="me-auto"
            cols="12"
            sm="10"
            md="7"
          >
            <user-tabs />

            <br>

            <router-view v-slot="{ Component }">
              <v-fade-transition hide-on-leave>
                <div :key="route.name">
                  <component :is="Component" />
                </div>
              </v-fade-transition>
            </router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import UserProfile from '@/components/user/UserProfile.vue'
  import UserTabs from '@/components/user/UserTabs.vue'
  import AppSnackbarQueue from '@/components/app/SnackbarQueue.vue'

  // Composables
  import { onBeforeRouteUpdate, useRoute } from 'vue-router'

  // Stores
  import { useAuthStore } from '@vuetify/one'

  // Utilities
  import { onMounted } from 'vue'

  const route = useRoute()
  const auth = useAuthStore()

  onMounted(async () => {
    await auth.verify()
  })

  onBeforeRouteUpdate(async () => {
    await auth.verify()
  })
</script>
