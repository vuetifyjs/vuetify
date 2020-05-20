<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import('./AppBar'),
      DefaultDrawer: () => import('./Drawer'),
      DefaultView: () => import('./View'),
    },
  }
</script>
