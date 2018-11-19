<template>
  <v-app>
    <core-toolbar />

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

      this.setSnackbar({
        color: 'default',
        close: true,
        id: 'cyber-monday-sale',
        text: 'Shop now',
        msg: 'Happy Cyber Monday',
        to: '/store/',
        timeout: 0
      })
    },

    methods: {
      ...mapMutations('app', ['setReleases']),
      ...mapMutations('snackbar', ['setSnackbar']),
      getReleases () {
        this.$http.get('/releases/releases.json').then(({ data }) => {
          this.setReleases(data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
