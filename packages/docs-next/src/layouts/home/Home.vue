<template>
  <v-app>
    <home-bar />

    <home-view />

    <home-toc />
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
      HomeView: () => import(
        /* webpackChunkName: "home-view" */
        './View'
      ),
      HomeToc: () => import(
        /* webpackChunkName: "home-toc" */
        '@/layouts/default/Toc'
      ),
    },
  }
</script>
