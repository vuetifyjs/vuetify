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

    computed: {
      ...mapState('app', ['isLoading']),
      ...mapState('route', ['hash', 'name']),
      hasToolbar () {
        return this.name !== 'Layouts'
      }
    },

    async mounted () {
      if (!this.hash) return

      await this.$nextTick()
      await waitForReadystate()

      this.$vuetify.goTo(this.hash)
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
