<template>
  <v-app>
    <default-bar />

    <default-drawer />

    <default-view />

    <default-toc />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import('./AppBar'),
      DefaultDrawer: () => import('./Drawer'),
      DefaultToc: () => import('./Toc'),
      DefaultView: () => import('./View'),
    },
  }
</script>
