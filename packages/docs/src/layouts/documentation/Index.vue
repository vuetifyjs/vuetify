<template>
  <div>
    <core-system-bar />

    <documentation-app-bar />

    <documentation-drawer />

    <documentation-view />

    <documentation-toc />

    <documentation-fab />
  </div>
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
