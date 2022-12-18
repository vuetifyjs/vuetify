<template>
  <v-app-bar
    id="app-bar"
    border="b"
    flat
  >
    <template #prepend>
      <app-bar-logo />

      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        @click="app.drawer = !app.drawer"
      />

      <app-bar-releases-menu v-if="smAndUp" />
    </template>

    <app-search />

    <v-spacer />

    <template #append>
      <template v-if="mdAndUp">
        <app-bar-learn-menu />

        <app-bar-support-menu />

        <app-bar-team-link />

        <app-bar-playground-link />

        <app-bar-sponsor-link />

        <app-bar-enterprise-link />

        <app-vertical-divider />
      </template>

      <app-bar-theme-toggle />

      <app-vertical-divider />

      <app-bar-store-link />

      <app-bar-jobs-link />

      <app-bar-notifications-menu />

      <app-bar-settings-toggle />

      <app-bar-language-menu v-if="smAndUp" />
    </template>
  </v-app-bar>
</template>

<script setup>
  // Components
  import AppBarEnterpriseLink from './EnterpriseLink.vue'
  import AppBarThemeToggle from './ThemeToggle.vue'
  import AppBarJobsLink from './JobsLink.vue'
  import AppBarLanguageMenu from './LanguageMenu.vue'
  import AppBarLearnMenu from './LearnMenu.vue'
  import AppBarLogo from './Logo.vue'
  import AppBarNotificationsMenu from './NotificationsMenu.vue'
  import AppBarPlaygroundLink from './PlaygroundLink.vue'
  import AppBarReleasesMenu from './ReleasesMenu.vue'
  import AppBarSettingsToggle from './SettingsToggle.vue'
  import AppBarSponsorLink from './SponsorLink.vue'
  import AppBarStoreLink from './StoreLink.vue'
  import AppBarSupportMenu from './SupportMenu.vue'
  import AppBarTeamLink from './TeamLink.vue'
  import AppSearch from '@/components/app/search/Search.vue'
  import AppVerticalDivider from '@/components/app/VerticalDivider.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay } from 'vuetify'

  const app = useAppStore()
  const { smAndUp, mdAndUp } = useDisplay()
</script>
