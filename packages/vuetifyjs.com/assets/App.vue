<template lang="pug">
  v-fade-transition(appear)
    v-app(v-cloak v-if="!examples")
      app-drawer
      app-toolbar
      app-view
      app-fab
      app-snackbar

    div(v-else)#app
      router-view
</template>

<script>
  import AppDrawer from '@/components/core/AppDrawer'
  import AppFab from '@/components/core/AppFab'
  import AppSnackbar from '@/components/core/AppSnackbar'
  import AppToolbar from '@/components/core/AppToolbar'
  import AppView from '@/components/core/AppView'
  import Meta from '@/mixins/meta'

  import { mapState } from 'vuex'

  export default {
    name: 'Documentation',

    components: {
      AppDrawer,
      AppFab,
      AppSnackbar,
      AppToolbar,
      AppView
    },

    mixins: [Meta],

    computed: {
      ...mapState({
        isFullscreen: state => state.isFullscreen
      }),
      examples () {
        return !!this.$route.params.example
      }
    },

    mounted () {
      this.getReleases()
    },

    methods: {
      getReleases () {
        this.$http.get('/releases/releases.json').then(({ data }) => {
          this.$store.commit('app/RELEASES', data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_variables.styl'

  [v-cloak]
    display: none

  .dashme
    border: 1px dashed black !important

  main
    section
      &:before
        content ''
        display block
        position relative
        width 0
        height 80px
        margin-top -80px

  .container.page
    max-width: 1185px !important
    padding-top: 75px
    padding-bottom: 0
    transition: .2s $transition.fast-out-slow-in

    section
      margin-bottom: 48px
</style>
