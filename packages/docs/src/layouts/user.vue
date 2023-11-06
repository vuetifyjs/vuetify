<template>
  <v-app>
    <app-settings-drawer />

    <app-banner />

    <app-bar />

    <app-drawer />

    <v-main>
      <slot>
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
  import UserProfile from '@/components/user/UserProfile.vue'
  import UserTabs from '@/components/user/UserTabs.vue'

  // Composables
  import { useRoute, useRouter } from 'vue-router'
  import { useAuth0 } from '@/plugins/auth'

  // Utilities
  import { watch } from 'vue'

  const route = useRoute()
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuth0()

  watch(isLoading, val => {
    if (val || isAuthenticated.value) return

    router.push('/')
  }, { immediate: true })
</script>
