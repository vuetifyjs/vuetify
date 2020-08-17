<template>
  <v-app-bar
    id="home-app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
  >
    <vuetify-logo />

    <v-spacer />

    <template v-if="!$vuetify.breakpoint.smAndDown || search">
      <default-search />

      <vertical-divider />
    </template>

    <learn-menu />

    <team-link />

    <support-menu />

    <vertical-divider />

    <language-menu />

    <template
      v-if="canInstall || updateAvailable"
      #extension
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
    </template>
  </v-app-bar>
</template>

<script>
  import { call, sync } from 'vuex-pathify'

  export default {
    name: 'HomeBar',

    components: {
      DefaultSearch: () => import('@/layouts/default/Search'),
    },

    computed: {
      ...sync('app', [
        'search',
      ]),
      ...sync('pwa', [
        'canInstall',
        'updateAvailable',
      ]),
      ...sync('user', [
        'theme@dark',
        'rtl',
      ]),
    },

    methods: {
      ...call('pwa', ['promptInstaller', 'refreshContent']),
    },
  }
</script>
