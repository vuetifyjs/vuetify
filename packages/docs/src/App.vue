<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call, get } from 'vuex-pathify'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    computed: { initializing: get('app/initializing') },

    mounted () { this.initializing.then(this.init) },

    methods: { init: call('app/init') },
  }
</script>
