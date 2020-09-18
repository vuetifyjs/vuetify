<template>
  <v-fade-transition appear>
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call, get } from 'vuex-pathify'
  import { waitForReadystate } from '@/util/helpers'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    computed: { hash: get('route/hash') },

    async mounted () {
      await waitForReadystate()
      await this.init()

      if (!this.hash) return

      try {
        this.$vuetify.goTo(this.hash)
      } catch (e) {
        console.log(e)
      }
    },

    methods: { init: call('app/init') },
  }
</script>
