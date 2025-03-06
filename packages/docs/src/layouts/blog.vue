<template>
  <v-app>
    <VoNotificationsBanner order="-1" />

    <AppSettingsDrawer />

    <AppBarBar />

    <v-main class="text-start font-weight-light">
      <v-container style="max-width: 968px;">
        <router-view />
      </v-container>
    </v-main>

    <VoPromotionsFooter v-if="!auth.user || !user.disableAds" slug="vuetify-snips" app />

    <VoSocialFooter v-else app />
  </v-app>
</template>

<script setup>
  const auth = useAuthStore()
  const user = useUserStore()
</script>

<style lang="sass" scoped>
  :deep(ul)
    li > p
      margin: 0
</style>
