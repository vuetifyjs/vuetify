<template>
  <v-app>
    <backend-app-bar />

    <backend-view />

    <backend-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'Backend',

    components: {
      BackendAppBar: () => import('./AppBar'),
      BackendView: () => import('./View'),
      BackendFooter: () => import('./Footer'),
    },
  }
</script>
