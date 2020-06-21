<template>
  <v-app-bar
    class="shrink"
    color="transparent"
    elevate-on-scroll
  >
    <v-spacer />

    <v-btn
      class="mx-1"
      color="primary"
      outlined
      x-large
      :to="{
        name: 'Documentation',
        params: {
          category: 'getting-started',
          page: 'quick-start'
        }
      }"
    >
      To Documentation

      <v-icon right>
        $mdiOpenInNew
      </v-icon>
    </v-btn>

    <v-btn
      v-if="canInstall"
      class="mx-1"
      color="primary"
      outlined
      x-large
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
      x-large
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
