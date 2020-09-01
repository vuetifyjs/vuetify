<template>
  <v-app>
    <default-system-bar />

    <home-bar />

    <home-view />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeBar: () => import(
        /* webpackChunkName: "home-app-bar" */
        './AppBar'
      ),
      DefaultSystemBar: () => import(
        /* webpackChunkName: "default-system-bar" */
        '../default/SystemBar'
      ),
      HomeView: () => import(
        /* webpackChunkName: "home-view" */
        './View'
      ),
    },
  }
</script>
