<template>
  <v-app-bar
    absolute
    class="shrink"
    color="transparent"
    flat
  >
    <v-spacer />

    <v-btn
      v-if="canInstall"
      class="mx-1"
      color="primary"
      outlined
      @click="promptInstaller"
    >
      Install

      <v-icon right>
        $mdiPlusCircle
      </v-icon>
    </v-btn>

    <v-btn
      v-if="updateAvailable"
      class="mx-1"
      color="primary"
      outlined
      @click="refreshContent"
    >
      Refresh Content

      <v-icon right>
        $mdiRefreshCircle
      </v-icon>
    </v-btn>
    <v-spacer />
  </v-app-bar>
</template>

<script>
  import { call, sync } from 'vuex-pathify'

  export default {
    name: 'HomeBar',

    computed: {
      ...sync('pwa', ['canInstall', 'updateAvailable']),
    },

    methods: {
      ...call('pwa', ['promptInstaller', 'refreshContent']),
    },
  }
</script>
