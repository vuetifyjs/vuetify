<template>
  <VoAppBar
    id="app-bar"
    border="b"
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
      <div v-if="showExtraLinks" class="d-flex ga-1 pe-2">
        <AppBarBlogLink />

        <AppBarLearnMenu />

        <AppBarSupportMenu />

        <AppBarEcosystemMenu />

        <AppBarPlaygroundLink v-if="showPlaygroundLink" />

        <AppBarOneLink class="ml-4" />
      </div>

      <AppVerticalDivider v-if="showExtraLinks" />

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
  const { smAndUp, mdAndDown, width } = useDisplay()
  const route = useRoute()

  const showExtraLinks = computed(() => width.value >= 1052)
  const showPlaygroundLink = computed(() => width.value >= 1220)
</script>
