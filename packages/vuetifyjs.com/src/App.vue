<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-app>
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
      // this.getReleases()

      this.snackbar({
        color: 'default',
        close: true,
        id: 'twitter-vueconf-to',
        text: 'Join now',
        msg: 'Vuetify **VueConf** logo contest',
        href: 'https://twitter.com/vuetifyjs/status/1057766550508396544',
        timeout: 0
      })
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
