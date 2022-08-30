<template>
  <v-app-bar
    id="app-bar"
    border="b"
    flat
  >
    <app-bar-logo />

    <v-app-bar-nav-icon
      class="hidden-lg-and-up"
      @click="app.drawer = !app.drawer"
    />

    <v-spacer />

    <template v-if="smAndUp">
      <app-vertical-divider />

      <app-bar-learn-menu />

      <app-bar-support-menu />

      <template v-if="mdAndUp">
        <app-bar-team-link />

        <app-vertical-divider />

        <app-bar-store-link />

        <app-bar-jobs-link />

        <app-bar-notifications-menu />

        <app-bar-settings-toggle />

        <app-bar-language-menu />
      </template>
    </template>
  </v-app-bar>
</template>

<script setup>
  // Components
  import AppBarJobsLink from './JobsLink.vue'
  import AppBarLanguageMenu from './LanguageMenu.vue'
  import AppBarLearnMenu from './LearnMenu.vue'
  import AppBarLogo from './Logo.vue'
  import AppBarNotificationsMenu from './NotificationsMenu.vue'
  import AppBarSettingsToggle from './SettingsToggle.vue'
  import AppBarStoreLink from './StoreLink.vue'
  import AppBarSupportMenu from './SupportMenu.vue'
  import AppBarTeamLink from './TeamLink.vue'
  import AppVerticalDivider from '@/components/app/VerticalDivider.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay } from 'vuetify'

  const app = useAppStore()
  const { smAndUp, mdAndUp } = useDisplay()
</script>
