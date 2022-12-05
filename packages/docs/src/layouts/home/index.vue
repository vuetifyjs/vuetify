<template>
  <v-app>
    <default-explore-system-bar />

    <home-bar />

    <home-view />

    <home-footer />

    <default-settings />
  </v-app>
</template>

<script>
  // Components
  import DefaultSettings from '@/layouts/default/settings/Settings'
  import DefaultExploreSystemBar from '@/layouts/default/ExploreSystemBar'
  import HomeBar from './AppBar'
  import HomeFooter from './Footer'
  import HomeView from './View'

  export default {
    name: 'HomeLayout',

    components: {
      DefaultSettings,
      DefaultExploreSystemBar,
      HomeBar,
      HomeFooter,
      HomeView,
    },
  }
</script>
