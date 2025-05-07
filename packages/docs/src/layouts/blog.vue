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

    <VoSocialFooter app />
  </v-app>
</template>

<script setup>
  //
</script>

<style lang="sass" scoped>
  :deep(ul)
    li > p
      margin: 0
</style>
