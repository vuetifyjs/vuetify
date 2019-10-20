<template>
  <v-app>
    <documentation-app-bar />

    <documentation-drawer />

    <documentation-view />

    <documentation-toc />

    <documentation-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'LayoutsDocumentation',

    components: {
      DocumentationAppBar: () => import('./AppBar'),
      DocumentationDrawer: () => import('./Drawer'),
      DocumentationView: () => import('./View'),
      DocumentationFooter: () => import('./Footer'),
      DocumentationToc: () => import('./Toc'),
    },
  }
</script>
