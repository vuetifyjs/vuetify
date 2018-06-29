<template>
  <v-app v-cloak>
    <app-drawer />

    <app-toolbar />

    <app-view />

    <app-fab />

    <app-snackbar />
  </v-app>
</template>

<script>
  import AppDrawer from '@/components/core/AppDrawer'
  import AppFab from '@/components/core/AppFab'
  import AppSnackbar from '@/components/core/AppSnackbar'
  import AppToolbar from '@/components/core/AppToolbar'
  import AppView from '@/components/core/AppView'

  export default {
    name: 'Documentation',

    components: {
      AppDrawer,
      AppFab,
      AppSnackbar,
      AppToolbar,
      AppView
    }
  }
</script>
