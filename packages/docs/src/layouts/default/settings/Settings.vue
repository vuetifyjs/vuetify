<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="settings"
    :color="dark ? '#272727' : undefined"
    :right="!rtl"
    fixed
    hide-overlay
    temporary
    width="300"
  >
    <default-settings-drawer-prepend />

    <v-container>
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
  import DefaultSettingsRtl from './Rtl'
  import DefaultSettingsTheme from './Theme'

  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSettings',

    components: {
      DefaultSettingsDrawerGrouping,
      DefaultSettingsDrawerPrepend,
      DefaultSettingsRtl,
      DefaultSettingsTheme,
    },

    computed: {
      ...get('user', [
        'rtl',
        'theme@dark',
      ]),
      settings: sync('app/settings'),
    },
  }
</script>
