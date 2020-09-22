<template>
  <v-fade-transition appear>
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call, get, sync } from 'vuex-pathify'
  import { wait, waitForReadystate } from '@/util/helpers'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    computed: {
      scrolling: sync('app/scrolling'),
      hash: get('route/hash'),
    },

    async mounted () {
      await waitForReadystate()
      await this.init()

      if (!this.hash) return

      await wait(500)

      this.scrolling = true

      try {
        await this.$vuetify.goTo(this.hash)
      } catch (e) {
        console.log(e)
      }

      this.scrolling = false
    },

    methods: { init: call('app/init') },
  }
</script>
