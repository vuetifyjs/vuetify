<template lang="pug">
  v-app
    app-drawer
    app-toolbar
    app-view
    app-footer
</template>

<script>
  import Meta from '@mixins/meta'
  import AppDrawer from '@core/AppDrawer'
  import AppToolbar from '@core/AppToolbar'
  import AppView from '@core/AppView'
  import AppFooter from '@core/AppFooter'

  export default {
    name: 'documentation',

    components: {
      AppDrawer,
      AppToolbar,
      AppView,
      AppFooter
    },

    mixins: [Meta],

    watch: {
      $route (current, previous) {
        this.setupLayout(300)
      }
    },

    mounted () {
      this.setupLayout()
    },

    methods: {
      setupLayout (timeout = 0) {
        const watcher = true
        const drawer = this.$route.fullPath !== '/'

        setTimeout(() => {
          this.$store.commit('app/ROUTE_WATCHER', !drawer)
          this.$store.commit('app/RESIZE_WATCHER', drawer)

          if (drawer) return

          this.$store.commit('app/DRAWER', false)
        }, timeout)
      }
    }
  }
</script>
