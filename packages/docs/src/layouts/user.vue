<template>
  <v-app>
    <AppSettingsDrawer />

    <AppBanner />

    <AppBarBar />

    <AppDrawerDrawer />

    <AppSnackbarQueue />

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
            <UserUserTabs />

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
