<template>
  <v-app>
    <VoNotificationsBanner order="-1" />

    <AppSettingsDrawer />

    <AppBarBar />

    <AppBackToTop />

    <v-main class="text-center">
      <router-view />
    </v-main>

    <HomeFooter />
  </v-app>
</template>

<style lang="sass">
#vue-component-framework
  h1, h2, h3, h4, h5, h6
    > a
      display: none
</style>
