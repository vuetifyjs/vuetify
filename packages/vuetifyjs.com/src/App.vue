<template>
  <v-app>
    <router-view />

    <core-toolbar />
  </v-app>
</template>

<script>
  import Meta from '@/mixins/meta'

  import {
    mapMutations
  } from 'vuex'

  export default {
    mixins: [Meta],

    methods: {
      ...mapMutations('app', ['setReleases']),
      ...mapMutations('snackbar', ['setSnackbar'])
    }
  }
</script>

<style>
  .wf-loading .material-icons {
    display: none;
  }
</style>
