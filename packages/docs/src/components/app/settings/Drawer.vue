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
    <!-- <v-toolbar
      class="v-bar--underline"
      variant="flat"
    >
      <app-headline path="settings" />

      <v-spacer />

      <v-btn
        icon="$close"
        variant="text"
        @click="app.settings = false"
      />
    </v-toolbar> -->

    <v-container>
      <template v-if="!!pwa.sw.install">
        <app-settings-pwa />

        <div class="mt-2 mb-3 mx-n3">
          <v-divider />
        </div>
      </template>

      <app-settings-theme />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <!-- <default-settings-drawer-grouping /> -->

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <app-settings-rtl />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <app-settings-api />

    </v-container>
  </v-navigation-drawer>
</template>

<script>
  import { useRtl } from 'vuetify'
  import { useAppStore } from '@/store/app'
  import { usePwaStore } from '@/store/pwa'

  // Components
  import AppSettingsApi from './Api.vue'
  // import AppSettingsDrawerGrouping from './DrawerGrouping.vue'
  // import AppSettingsDrawerPrepend from './DrawerPrepend.vue'
  import AppSettingsPwa from './Pwa.vue'
  import AppSettingsRtl from './Rtl.vue'
  import AppSettingsTheme from './Theme.vue'

  // Utilities
  // import { get, sync } from 'vuex-pathify'

  // :color="dark ? '#272727' : undefined"

  export default {
    name: 'AppSettingsDrawer',

    components: {
      AppSettingsApi,
      // AppSettingsDrawerGrouping,
      // AppSettingsDrawerPrepend,
      AppSettingsPwa,
      AppSettingsRtl,
      AppSettingsTheme,
    },

    // computed: {
    //   ...get('user', [
    //     'rtl',
    //     'theme@dark',
    //   ]),
    //   settings: sync('app/settings'),
    //   install: get('pwa/sw@install'),
    // },

    setup () {
      const app = useAppStore()
      const pwa = usePwaStore()
      const { isRtl } = useRtl()

      return {
        pwa,
        isRtl,
        app,
      }
    },
  }
</script>
