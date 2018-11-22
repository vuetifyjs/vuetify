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
        id: 'october-2018-22572142',
        text: 'Go to video',
        msg: 'October framework update',
        href: 'https://www.patreon.com/posts/october-2018-22572142',
        timeout: 0
      })

      import('webfontloader').then(WebFontLoader => {
        WebFontLoader.load({
          google: {
            families: [
              'Roboto:100,300,400,500,700,900',
              'Roboto Mono',
              'Material Icons'
            ]
          }
        })
      })
    },

    methods: {
      ...mapMutations('app', ['setReleases']),
      ...mapMutations('snackbar', ['setSnackbar']),
      getReleases () {
        fetch('/releases/releases.json')
          .then(res => res.json())
          .then(({ data }) => {
            this.setReleases(data)
          }).catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>
