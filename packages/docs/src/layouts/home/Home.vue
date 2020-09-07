<template>
  <v-app>
    <default-system-bar />

    <home-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  // Components
  import DefaultSystemBar from '../default/SystemBar'
  import HomeBar from './AppBar'
  import HomeFooter from './Footer'
  import HomeView from './View'

  export default {
    name: 'HomeLayout',

    components: {
      DefaultSystemBar,
      HomeBar,
      HomeFooter,
      HomeView,
    },
  }
</script>
