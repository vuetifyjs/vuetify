<template>
  <v-fade-transition appear>
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call, get, sync } from 'vuex-pathify'
  import { genAppMetaInfo } from '@/util/metadata'
  import { wait, waitForReadystate } from '@/util/helpers'

  // Data
  import metadata from '@/data/metadata'

  export default {
    name: 'App',

    metaInfo () {
      const suffix = this.name !== 'Home' ? ' — Vuetify' : ''

      return {
        ...genAppMetaInfo(metadata),
        titleTemplate: chunk => `${chunk}${suffix}`,
      }
    },

    computed: {
      ...get('route', [
        'hash',
        'name',
      ]),
      scrolling: sync('app/scrolling'),
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
