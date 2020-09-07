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
  // Utilities
  import { get, sync } from 'vuex-pathify'

  // Components
  import DefaultSettingsDrawerGrouping from './DrawerGrouping'
  import DefaultSettingsDrawerPrepend from './DrawerPrepend'
  import DefaultSettingsTheme from './Theme'
  import DefaultSettingsRtl from './Rtl'

  export default {
    name: 'DefaultSettings',

    components: {
      DefaultSettingsDrawerGrouping,
      DefaultSettingsDrawerPrepend,
      DefaultSettingsTheme,
      DefaultSettingsRtl,
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
