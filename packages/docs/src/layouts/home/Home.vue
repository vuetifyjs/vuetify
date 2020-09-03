<template>
  <v-app>
    <default-system-bar />

    <home-bar />

    <home-view />

    <home-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      DefaultSystemBar: () => import(
        /* webpackChunkName: "default-system-bar" */
        '../default/SystemBar'
      ),
      HomeBar: () => import(
        /* webpackChunkName: "home-app-bar" */
        './AppBar'
      ),
      HomeFooter: () => import(
        /* webpackChunkName: "home-footer" */
        './Footer'
      ),
      HomeView: () => import(
        /* webpackChunkName: "home-view" */
        './View'
      ),
    },
  }
</script>
