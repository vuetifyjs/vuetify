<template>
  <v-app>
    <VoNotificationsBanner order="-1" />

    <AppSettingsDrawer />

    <AppBarBar />

    <AppDrawerDrawer />

    <AppSnackbarQueue />

    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition hide-on-leave>
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  const route = useRoute()
  const auth = useAuthStore()

  onMounted(async () => {
    await auth.verify()
  })

  onBeforeRouteUpdate(async () => {
    await auth.verify()
  })
</script>
