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
  import HomeBar from './AppBar'
  import DefaultSystemBar from '@/layouts/default/SystemBar'
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
