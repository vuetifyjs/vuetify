<template>
  <VoAppBar
    id="app-bar"
    border="b"
    logo="vuetify"
    flat
  >
    <template #prepend>
      <AppBtn
        v-if="route.meta.layout !== 'home' && mdAndDown"
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />

      <AppSearchSearch />
    </template>

    <template #append>
      <template v-if="mdAndUp">
        <AppBarLearnMenu />

        <AppBarSupportMenu />

        <AppBarEcosystemMenu />

        <AppBarTeamLink v-if="lgAndUp" />

        <AppBarPlaygroundLink v-if="lgAndUp" />

        <AppBarEnterpriseLink />
      </template>

      <AppVerticalDivider v-if="smAndUp" class="ms-3 me-2" />

      <AppBarStoreLink v-if="smAndUp" />

      <AppBarJobsLink v-if="smAndUp" />

      <AppBarLanguageMenu v-if="smAndUp" />

      <AppBarSettingsToggle />
    </template>
  </VoAppBar>
</template>

<script setup>
  const app = useAppStore()
  const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()
  const route = useRoute()
</script>
