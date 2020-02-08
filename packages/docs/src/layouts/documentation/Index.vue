<template>
  <v-app>
    <core-system-bar />

    <core-snackbar />

    <documentation-app-bar />

    <documentation-drawer />

    <documentation-view />

    <documentation-toc />

    <documentation-fab />
  </v-app>
</template>

<script>
  export default {
    name: 'LayoutsDocumentation',

    components: {
      DocumentationAppBar: () => import('./AppBar'),
      DocumentationDrawer: () => import('./Drawer'),
      DocumentationFab: () => import('./Fab'),
      DocumentationToc: () => import('./Toc'),
      DocumentationView: () => import('./View'),
    },
  }
</script>
