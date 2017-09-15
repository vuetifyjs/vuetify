<template lang="pug">
  v-app
    app-drawer
    app-toolbar
    app-view
    app-footer
</template>

<script>
  import Meta from 'mixins/meta'
  import AppDrawer from 'components/AppDrawer'
  import AppToolbar from 'components/AppToolbar'
  import AppView from 'components/AppView'
  import AppFooter from 'components/AppFooter'

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
        let watcher = true
        let drawer = true

        if (current.path === '/') drawer = false

        this.$store.commit('app:disable-route-watcher', watcher)
        this.$store.commit('app:drawer', drawer)
      }
    },

    mounted () {
      if (this.$route.path !== '/') return

      this.$store.commit('app:disable-route-watcher', true)
      this.$store.commit('app:drawer', false)
    }
  }
</script>
