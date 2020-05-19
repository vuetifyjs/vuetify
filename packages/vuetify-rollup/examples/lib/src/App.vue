<template>
  <div id="app">
    <v-app>
    </v-app>
  </div>
</template>

<script>
import { VApp } from 'vuetify/lib'

export default {
  name: 'App',
  components: {
    VApp,
    VAlert,
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
