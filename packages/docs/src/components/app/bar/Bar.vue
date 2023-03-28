<template>
  <v-app-bar
    id="app-bar"
    border="b"
    flat
  >
    <template #prepend>
      <app-bar-logo />

      <v-btn
        v-if="name !== 'home' && mdAndDown"
        icon="mdi-menu"
        @click="app.drawer = !app.drawer"
      />

      <app-search />
    </template>

    <template #append>
      <template v-if="mdAndUp">
        <app-bar-learn-menu />

        <app-bar-support-menu />

        <app-bar-ecosystem-menu />

        <app-bar-team-link v-if="lgAndUp" />

        <app-bar-playground-link v-if="lgAndUp" />

        <app-bar-sponsor-link />

        <app-bar-enterprise-link />
      </template>

      <app-vertical-divider />

      <app-bar-theme-toggle />

      <app-vertical-divider />

      <app-bar-store-link />

      <app-bar-jobs-link v-if="lgAndUp" />

      <app-bar-notifications-menu />

      <app-bar-settings-toggle />

      <app-bar-language-menu v-if="smAndUp" />
    </template>
  </v-app-bar>
</template>

<script setup>
  // Components
  import AppBarEcosystemMenu from './EcosystemMenu.vue'
  import AppBarEnterpriseLink from './EnterpriseLink.vue'
  import AppBarJobsLink from './JobsLink.vue'
  import AppBarLanguageMenu from './LanguageMenu.vue'
  import AppBarLearnMenu from './LearnMenu.vue'
  import AppBarLogo from './Logo.vue'
  import AppBarNotificationsMenu from './NotificationsMenu.vue'
  import AppBarPlaygroundLink from './PlaygroundLink.vue'
  import AppBarSettingsToggle from './SettingsToggle.vue'
  import AppBarSponsorLink from './SponsorLink.vue'
  import AppBarStoreLink from './StoreLink.vue'
  import AppBarSupportMenu from './SupportMenu.vue'
  import AppBarTeamLink from './TeamLink.vue'
  import AppBarThemeToggle from './ThemeToggle.vue'
  import AppSearch from '@/components/app/search/Search.vue'
  import AppVerticalDivider from '@/components/app/VerticalDivider.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay } from 'vuetify'
  import { useRoute } from 'vue-router'

  const app = useAppStore()
  const { smAndUp, mdAndUp, lgAndUp, mdAndDown } = useDisplay()
  const { name } = useRoute()
</script>
