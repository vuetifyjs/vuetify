<template>
  <v-app-bar
    id="app-bar"
    :image="image"
    border="b"
    flat
  >
    <template #prepend>
      <app-bar-logo />

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

      <template v-if="!user.quickbar">
        <app-vertical-divider v-if="smAndUp" class="ms-3 me-2" />

        <app-bar-store-link v-if="smAndUp" />

        <app-bar-jobs-link v-if="smAndUp" />

        <app-bar-notifications-menu />

        <app-bar-language-menu v-if="smAndUp" />

        <app-bar-settings-toggle />
      </template>

      <app-vertical-divider v-if="lgAndUp" class="ms-2 me-3" />

      <vo-auth-dialog />
    </template>
  </v-app-bar>
</template>

<script setup>
  const app = useAppStore()
  const user = useUserStore()
  const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()
  const route = useRoute()
  const theme = useTheme()

  const image = computed(() => {
    if (['dark', 'light'].includes(theme.name.value)) return undefined

    return `https://cdn.vuetifyjs.com/docs/images/themes/${theme.name.value}-app-bar.png`
  })
</script>
