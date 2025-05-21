<template>
  <VoAppBar id="app-bar" border="b" class="px-md-3" logo="vuetify" flat>
    <template #prepend-fixed>
      <AppBtn
        v-if="route.meta.layout !== 'home' && mdAndDown"
        class="ms-2"
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />
    </template>

    <template #prepend>
      <AppSearchSearch />
    </template>

    <template #append>
      <AppBarLearnMenu />

      <AppBarSupportMenu />

      <AppBarEcosystemMenu />

      <AppBarPlaygroundLink />

      <AppBarSponsorLink />

      <AppVerticalDivider v-if="!one.mobileBreakpoint" />
      <v-divider v-else class="mt-4 mb-2" />

      <AppBarStoreLink />

      <AppBarGitHubLink />

      <AppBarLanguageMenu />

      <AppBarSettingsToggle />
    </template>
  </VoAppBar>
</template>

<script setup>
  const app = useAppStore()
  const route = useRoute()
  const one = useOneStore()

  const { mdAndDown } = useDisplay()
</script>
