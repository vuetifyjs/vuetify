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
          this.$store.commit('app/DISABLE_ROUTE_WATCHER', watcher)
          this.$store.commit('app/DRAWER', drawer)
          this.$store.commit('app/ENABLE_RESIZE_WATCHER', drawer)
        }, timeout)
      }
    }
  }
</script>
