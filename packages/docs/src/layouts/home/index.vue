<template>
  <v-app>
    <home-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  // Components
  import HomeBar from './AppBar'
  import HomeFooter from './Footer'
  import HomeView from './View'

  export default {
    name: 'HomeLayout',

    components: {
      HomeBar,
      HomeFooter,
      HomeView,
    },
  }
</script>
