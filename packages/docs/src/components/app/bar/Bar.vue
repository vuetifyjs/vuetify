<template>
  <VoAppBar
    id="app-bar"
    border="b"
    class="px-md-3"
    logo="vuetify"
    flat
    responsive
    v-model:mobile-menu="app.mobileMenu"
  >
    <template #menu-activator="activatorProps">
      <AppBtn
        v-bind="activatorProps"
        icon="mdi-dots-vertical"
      />
    </template>

    <template #prepend>
      <AppSearchSearch />
    </template>

    <template  #prepend-fixed>
        <AppBtn
          v-if="route.meta.layout !== 'home'"
          icon="mdi-menu"
          class="ms-2"
          @click="app.drawer = !app.drawer"
      />
    </template>

    <template #append>
      <div class="d-flex ga-1 flex-wrap">
        <AppBarLearnMenu />

        <AppBarSupportMenu />

        <AppBarEcosystemMenu />

        <AppBarPlaygroundLink />

        <AppBarSponsorLink />
      </div>
      
      <AppVerticalDivider v-if="!mobile"/>

      <div class="d-flex ga-1" :class="{ 'mt-4': mobile }">
        <AppBarStoreLink />

        <AppBarGitHubLink />

        <template v-if="!mobile || xs">
          <AppBarLanguageMenu />

          <AppBarSettingsToggle />
        </template>
      </div>

    </template>

    <template v-if="mobile && !xs" #append-fixed>
        <AppBarLanguageMenu />
        <AppBarSettingsToggle />
    </template>

  </VoAppBar>
</template>

<script setup>
  const app = useAppStore()
  const route = useRoute()

  const { mobile, xs } = useDisplay()
</script>
