<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { wait, waitForReadystate } from '@/util/helpers'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    computed: {
      hash: get('route/hash'),
    },
    async mounted () {
      if (!this.hash) return

      await this.$nextTick()
      await waitForReadystate()
      await wait(200)

      // TODO: Handle fallback if not found / error
      this.$vuetify.goTo(this.hash)
    },
  }
</script>
