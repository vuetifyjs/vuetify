<template>
  <v-navigation-drawer
    v-if="!user.dev"
    id="settings-drawer"
    v-model="app.settings"
    :location="isRtl ? 'left' : 'right'"
    disable-route-watcher
    position="fixed"
    temporary
    touchless
    width="350"
  >
    <v-toolbar flat>
      <v-toolbar-title text="Settings" />

      <template #append>
        <v-btn
          icon="mdi-close"
          variant="flat"
          @click="app.settings = false"
        />
      </template>
    </v-toolbar>

    <v-divider />

    <v-container>
      <app-settings-theme />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-rtl />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-api />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-code />
    </v-container>

    <template #append>
      <app-settings-append />
    </template>
  </v-navigation-drawer>

  <app-settings-dialog v-else />
</template>

<script setup>
  // Components
  import AppSettingsAppend from './Append.vue'
  import AppSettingsApi from './Api.vue'
  import AppSettingsCode from './Code.vue'
  import AppSettingsDialog from './Dialog.vue'
  import AppSettingsRtl from './Rtl.vue'
  import AppSettingsTheme from './Theme.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useUserStore } from '@/store/user'
  import { useRtl } from 'vuetify'

  const { isRtl } = useRtl()
  const app = useAppStore()
  const user = useUserStore()
</script>
