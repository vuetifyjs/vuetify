<template>
  <v-app>
    <default-bar />

    <default-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DefaultLayout',

    components: {
      DefaultBar: () => import('./AppBar'),
      DefaultView: () => import('./View'),
    },
  }
</script>
