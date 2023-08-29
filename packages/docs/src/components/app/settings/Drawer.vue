<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="app.settings"
    :location="isRtl ? 'left' : 'right'"
    disable-route-watcher
    temporary
    touchless
    width="350"
  >
    <v-toolbar :title="t('settings')" flat>
      <template #append>
        <v-btn
          icon="mdi-close"
          variant="flat"
          @click="app.settings = false"
        />
      </template>
    </v-toolbar>

    <v-divider />

    <v-container class="px-1 py-3">
      <options />
    </v-container>

    <template #append>
      <app-settings-append />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
  // Components
  import AppSettingsAppend from './Append.vue'
  import Options from '@/components/app/settings/Options.vue'

  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useRtl } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useAuthStore } from '@/store/auth'

  // Utilities
  import { watch } from 'vue'

  const app = useAppStore()
  const auth = useAuthStore()
  const auth0 = useAuth0()
  const { t } = useI18n()
  const { isRtl } = useRtl()

  watch(auth0.user, async val => {
    if (!val?.sub) return

    await auth.getUser()
    auth.verifyUserSponsorship()
  }, { immediate: true })
</script>
