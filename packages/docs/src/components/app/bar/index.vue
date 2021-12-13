<template>
  <v-app-bar
    id="app-bar"
    app
    class="v-bar--underline"
    flat
  >
    <app-bar-logo
      :alt="lgAndUp"
      class="ml-4 mr-2"
    />

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

        <app-vertical-divider />

        <app-bar-settings-toggle />
        <app-bar-language-menu />
      </template>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useAppStore } from '@/store/app'

  import AppBarLogo from './Logo.vue'
  import AppBarLearnMenu from './LearnMenu.vue'
  import AppBarSupportMenu from './SupportMenu.vue'
  import AppBarTeamLink from './TeamLink.vue'
  import AppBarStoreLink from './StoreLink.vue'
  import AppBarJobsLink from './JobsLink.vue'
  import AppBarNotificationsMenu from './NotificationsMenu.vue'
  import AppBarSettingsToggle from './SettingsToggle.vue'
  import AppBarLanguageMenu from './LanguageMenu.vue'
  import AppVerticalDivider from '@/components/app/VerticalDivider.vue'

  export default defineComponent({
    name: 'AppBar',

    components: {
      AppBarLogo,
      AppBarLearnMenu,
      AppBarSupportMenu,
      AppBarTeamLink,
      AppBarStoreLink,
      AppBarJobsLink,
      AppBarNotificationsMenu,
      AppBarSettingsToggle,
      AppBarLanguageMenu,
      AppVerticalDivider,
    },

    setup () {
      const { lgAndUp, smAndUp, mdAndUp } = useDisplay()
      const app = useAppStore()

      // data
      const dark = false

      return {
        app,
        dark,
        lgAndUp,
        mdAndUp,
        smAndUp,
      }
    },

  })
</script>
