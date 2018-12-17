<template>
  <v-app>
    <router-view />

    <core-toolbar v-if="hasToolbar" />
  </v-app>
</template>

<script>
  import Meta from '@/mixins/meta'

  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    mixins: [Meta],

    computed: {
      ...mapState('route', ['name']),
      hasToolbar () {
        return this.name !== 'Layouts'
      }
    },

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
