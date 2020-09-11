<template>
  <v-fade-transition appear>
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call } from 'vuex-pathify'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    mounted () { this.init() },

    methods: { init: call('app/init') },
  }
</script>
