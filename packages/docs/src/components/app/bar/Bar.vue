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
        <app-bar-learn-menu />

        <app-bar-support-menu />

        <app-bar-ecosystem-menu />

        <app-bar-team-link v-if="lgAndUp" />

        <app-bar-playground-link v-if="lgAndUp" />

        <app-bar-enterprise-link />
      </template>

      <app-vertical-divider v-if="smAndUp" class="ms-3 me-2" />

      <app-bar-store-link v-if="smAndUp" />

      <app-bar-jobs-link v-if="smAndUp" />

      <app-bar-language-menu v-if="smAndUp" />

      <app-bar-settings-toggle />
    </template>
  </VoAppBar>
</template>

<script setup>
  const app = useAppStore()
  const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()
  const route = useRoute()
</script>
