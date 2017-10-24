<template lang="pug">
  v-app
    app-drawer
    app-toolbar
    app-view
    app-footer
</template>

<script>
  import Meta from '@mixins/meta'
  import AppDrawer from '@components/AppDrawer'
  import AppToolbar from '@components/AppToolbar'
  import AppView from '@components/AppView'
  import AppFooter from '@components/AppFooter'

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
        if (current.path !== '/' && previous.path !== '/') return
        const watcher = true
        const drawer = current.path !== '/'

        setTimeout(() => {
          this.$store.commit('app/DISABLE_ROUTE_WATCHER', watcher)
          this.$store.commit('app/DRAWER', drawer)
        }, 300)
      }
    },

    mounted () {
      if (this.$route.path !== '/') return

      this.$store.commit('app/DISABLE_ROUTE_WATCHER', true)
      this.$store.commit('app/DRAWER', false)
    }
  }
</script>
