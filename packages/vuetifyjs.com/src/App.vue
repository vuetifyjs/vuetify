<template>
  <v-app>
    <router-view />

    <core-toolbar v-if="hasToolbar" />
  </v-app>
</template>

<script>
  // Mixins
  import Meta from '@/mixins/meta'

  // Utilities
  import { waitForReadystate } from '@/util/helpers'

  import { mapState } from 'vuex'

  export default {
    mixins: [Meta],

    data: () => ({
      isBooted: false
    }),

    computed: {
      ...mapState('app', ['isLoading']),
      ...mapState('route', ['hash', 'name']),
      hasToolbar () {
        return this.name !== 'Layouts'
      }
    },

    watch: {
      async isLoading (val) {
        if (this.isBooted || !this.hash || val) return

        await waitForReadystate()

        this.$vuetify.goTo(this.hash, { offset: -80 })
        this.isBooted = true
      }
    }
  }
</script>

<style>
  .text-decoration-none {
    text-decoration: none;
  }

  .wf-loading .material-icons {
    display: none;
  }
</style>
