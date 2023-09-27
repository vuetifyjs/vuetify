<template>
  <v-app>
    <app-settings-drawer />

    <app-banner />

    <app-bar />

    <app-drawer />

    <app-pwa-snackbar />

    <v-main>
      <slot>
        <v-container
          fluid
          tag="section"
        >
          <v-row>
            <v-col cols="12" md="auto">
              <user-profile />
            </v-col>

            <v-col cols="8">
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
      </slot>
    </v-main>
  </v-app>
</template>

<script setup>
  // Components
  import AppBanner from '@/components/app/Banner.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppPwaSnackbar from '@/components/app/PwaSnackbar.vue'
  import UserProfile from '@/components/user/UserProfile.vue'

  import UserTabs from '@/components/user/UserTabs.vue'

  // Composables
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>
