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

      <app-bar-team-link />

      <app-bar-enterprise-link />

      <app-vertical-divider v-if="smAndUp" />

      <app-bar-store-link v-if="mdAndUp" />

      <app-bar-jobs-link v-if="mdAndUp" />

      <app-bar-notifications-menu v-if="smAndUp" />

      <app-bar-settings-toggle v-if="smAndUp" />

      <app-bar-language-menu v-if="smAndUp" />
    </template>
  </v-app-bar>
</template>

<script setup>
  // Components
  import AppBarEnterpriseLink from './EnterpriseLink.vue'
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
