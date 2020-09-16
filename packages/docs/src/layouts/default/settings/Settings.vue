<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="settings"
    :color="dark ? '#272727' : undefined"
    :right="!rtl"
    disable-route-watcher
    fixed
    hide-overlay
    temporary
    width="300"
  >
    <default-settings-drawer-prepend />

    <v-container>
      <template v-if="!!install">
        <default-settings-pwa />

        <div class="mt-2 mb-3 mx-n3">
          <v-divider />
        </div>
      </template>

      <default-settings-theme />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-drawer-grouping />

      <div class="mt-4 mb-3 mx-n3">
        <v-divider />
      </div>

      <default-settings-rtl />
    </v-container>
  </v-navigation-drawer>
</template>

<script>
  // Components
  import DefaultSettingsDrawerGrouping from './DrawerGrouping'
  import DefaultSettingsDrawerPrepend from './DrawerPrepend'
  import DefaultSettingsPwa from './Pwa'
  import DefaultSettingsRtl from './Rtl'
  import DefaultSettingsTheme from './Theme'

  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettings',

    components: {
      DefaultSettingsDrawerGrouping,
      DefaultSettingsDrawerPrepend,
      DefaultSettingsPwa,
      DefaultSettingsRtl,
      DefaultSettingsTheme,
    },

    computed: {
      ...get('user', [
        'rtl',
        'theme@dark',
      ]),
      settings: sync('app/settings'),
      install: get('pwa/sw@install'),
    },
  }
</script>
