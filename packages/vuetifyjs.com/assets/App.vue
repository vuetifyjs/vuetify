<template lang="pug">
  v-app
    app-drawer
    app-toolbar
    app-view
    app-fab
</template>

<script>
  import AppDrawer from '@core/AppDrawer'
  import AppFab from '@core/AppFab'
  import AppToolbar from '@core/AppToolbar'
  import AppView from '@core/AppView'
  import Meta from '@mixins/meta'

  export default {
    name: 'documentation',

    components: {
      AppDrawer,
      AppFab,
      AppToolbar,
      AppView
    },

    mixins: [Meta],

    watch: {
      $route (current, previous) {
        this.setupLayout(200)
      }
    },

    mounted () {
      this.setupLayout()
    },

    methods: {
      setupLayout (timeout = 300) {
        const drawer = this.$route.fullPath !== '/'

        setTimeout(() => {
          this.$store.commit('app/STATELESS', !drawer)

          if (this.$route &&
            this.$route.fullPath !== '/' &&
            this.$route.from &&
            this.$route.from.fullPath !== '/'
          ) return
          
          if (this.$vuetify.breakpoint.mdAndDown) return

          this.$store.commit('app/DRAWER', drawer)
        }, timeout)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_elevations.styl'

  code
    elevation(1)
</style>
