<template>
  <v-fade-transition appear>
    <core-documentation v-if="!examples" />
    <div
      v-else
      id="app"
    >
      <router-view />
    </div>
  </v-fade-transition>
</template>

<script>
  import Meta from '@/mixins/meta'

  // Utilities
  import asyncData from '@/util/asyncData'

  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    mixins: [asyncData, Meta],

    asyncData ({ store }) {
      if (store.state.store.hasFetchedProducts &&
        store.state.store.products.length
      ) return Promise.resolve()

      return store.dispatch('store/getProducts')
    },

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
      ...mapMutations('app', {
        snackbar: 'SNACKBAR'
      }),
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
