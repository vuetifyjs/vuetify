<template>
  <v-app>
    <home-bar />

    <home-view />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeBar: () => import('./AppBar'),
      HomeView: () => import('./View'),
    },
  }
</script>
