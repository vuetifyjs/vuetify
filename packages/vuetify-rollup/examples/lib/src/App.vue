<template>
  <div id="app">
    <v-app>
      <v-alert type="success">hello</v-alert>
    </v-app>
  </div>
</template>

<script>
  import { VApp, VAlert } from 'vuetify/lib'

  export default {
    name: 'App',
    components: {
      VApp,
      VAlert,
    },
  }
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
