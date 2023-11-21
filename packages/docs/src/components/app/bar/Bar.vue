<template>
  <v-app-bar
    id="app-bar"
    :image="image"
    border="b"
    flat
  >
    <template #prepend>
      <app-bar-logo />

      <app-btn
        v-if="route.meta.layout !== 'home' && mdAndDown"
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

      <app-bar-auth-dialog />
    </template>
  </v-app-bar>
</template>

<script setup>
  // Components
  import AppBarAuthDialog from './AuthDialog.vue'
  import AppBarEcosystemMenu from './EcosystemMenu.vue'
  import AppBarEnterpriseLink from './EnterpriseLink.vue'
  import AppBarJobsLink from './JobsLink.vue'
  import AppBarLanguageMenu from './LanguageMenu.vue'
  import AppBarLearnMenu from './LearnMenu.vue'
  import AppBarLogo from './Logo.vue'
  import AppBarNotificationsMenu from './NotificationsMenu.vue'
  import AppBarPlaygroundLink from './PlaygroundLink.vue'
  import AppBarSettingsToggle from './SettingsToggle.vue'
  import AppBarStoreLink from './StoreLink.vue'
  import AppBarSupportMenu from './SupportMenu.vue'
  import AppBarTeamLink from './TeamLink.vue'
  import AppSearch from '@/components/app/search/Search.vue'
  import AppVerticalDivider from '@/components/app/VerticalDivider.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useDisplay, useTheme } from 'vuetify'
  import { useRoute } from 'vue-router'

  // Stores
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

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
