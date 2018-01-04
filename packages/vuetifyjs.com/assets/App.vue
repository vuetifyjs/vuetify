<template lang="pug">
  v-fade-transition(appear)
    v-app(v-cloak v-if="!examples")
      app-drawer
      app-toolbar
      app-view
      app-fab

    div(v-else)#app
      router-view
</template>

<script>
  import AppDrawer from '@/components/core/AppDrawer'
  import AppFab from '@/components/core/AppFab'
  import AppToolbar from '@/components/core/AppToolbar'
  import AppView from '@/components/core/AppView'
  import Meta from '@/mixins/meta'

  import { mapState } from 'vuex'

  export default {
    name: 'documentation',

    components: {
      AppDrawer,
      AppFab,
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
  @import '../node_modules/vuetify/src/stylus/settings/_elevations.styl'

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
</style>
