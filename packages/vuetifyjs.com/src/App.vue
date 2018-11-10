<template>
  <v-app>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-app>
</template>

<script>
  import Meta from '@/mixins/meta'

  import {
    mapMutations
  } from 'vuex'

  export default {
    mixins: [Meta],

    mounted () {
      // this.getReleases()

      this.snackbar({
        color: 'store',
        close: true,
        id: 'cyber-monday-sale',
        text: 'Shop now',
        msg: 'Happy Cyber Monday',
        to: '/store/',
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
