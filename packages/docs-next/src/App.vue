<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'
  import { waitForReadystate } from '@/util/helpers'

  export default {
    name: 'App',

    metaInfo: {
      title: 'Welcome to Vuetify',
      titleTemplate: '%s | Vuetify.js',
    },

    data: () => ({ unwatch: undefined }),

    computed: {
      frontmatter: get('pages/frontmatter'),
      hash: get('route/hash'),
      initializing: sync('app/initializing'),
    },

    async created () {
      if (!this.hash) return

      this.initializing = true

      await waitForReadystate()

      this.unwatch = this.$watch('frontmatter', async () => {
        await this.$router.options.scrollBehavior({ hash: this.hash })

        this.initializing = false

        this.unwatch()
      })
    },

    updated () {
      this.initializing = false
    },
  }
</script>
