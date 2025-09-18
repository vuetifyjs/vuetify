<template>
  <VoAppBar
    id="app-bar"
    border="b"
    class="px-md-3"
    logo="vuetify"
    flat
  >
    <template #prepend>
      <div class="px-1" />

      <AppBtn
        v-if="route.meta.layout !== 'home' && mdAndDown"
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />

      <AppSearchSearch />
    </template>

    <template #append>
      <div v-if="mdAndUp" class="d-flex ga-1">
        <AppBarBlogLink />

        <AppBarLearnMenu />

        <AppBarSupportMenu />

        <AppBarEcosystemMenu />

        <AppBarPlaygroundLink v-if="lgAndUp" />

        <AppBarSponsorLink />
      </div>

      <AppVerticalDivider v-if="mdAndUp" />

      <div class="d-flex ga-1">
        <AppBarStoreLink v-if="smAndUp" />

        <AppBarGitHubLink v-if="smAndUp" />

        <AppBarLanguageMenu />

        <AppBarSettingsToggle />
      </div>
    </template>
  </VoAppBar>
</template>

<script setup>
  const app = useAppStore()
  const { smAndUp, lgAndUp, mdAndDown, width } = useDisplay()
  const route = useRoute()

  const mdAndUp = computed(() => width.value >= 1077)
</script>
