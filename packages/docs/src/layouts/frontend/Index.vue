<template>
  <v-app>
    <frontend-app-bar />

    <frontend-view />

    <frontend-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'LayoutsFrontend',

    components: {
      FrontendAppBar: () => import('./AppBar'),
      FrontendFooter: () => import('./Footer'),
      FrontendView: () => import('./View'),
    },
  }
</script>
