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
        color: 'default',
        close: true,
        id: 'october-2018-22572142',
        text: 'Go to video',
        msg: 'October framework update',
        href: 'https://www.patreon.com/posts/october-2018-22572142',
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
