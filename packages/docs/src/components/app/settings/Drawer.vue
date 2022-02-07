<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="app.settings"
    :position="isRtl ? 'left' : 'right'"
    disable-route-watcher
    fixed
    hide-overlay
    temporary
    width="300"
  >
    <v-toolbar flat>
      <v-toolbar-title text="Settings" class="pl-0" />

      <template #append>
        <v-btn icon="mdi-close" @click="app.settings = false" />
      </template>
    </v-toolbar>

    <v-divider />

    <v-container>

      <app-settings-pwa v-if="!!pwa.sw.install" />

      <app-settings-theme />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-rtl />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-api />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
  // Components
  import AppSettingsApi from './Api.vue'
  import AppSettingsPwa from './Pwa.vue'
  import AppSettingsRtl from './Rtl.vue'
  import AppSettingsTheme from './Theme.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { usePwaStore } from '@/store/pwa'
  import { useRtl } from 'vuetify'

  export default {
    name: 'AppSettingsDrawer',

    components: {
      AppSettingsApi,
      AppSettingsPwa,
      AppSettingsRtl,
      AppSettingsTheme,
    },

    setup () {
      const { isRtl } = useRtl()
      const app = useAppStore()
      const pwa = usePwaStore()

      return {
        app,
        isRtl,
        pwa,
      }
    },
  }
</script>
