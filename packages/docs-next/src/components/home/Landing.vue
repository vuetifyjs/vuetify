<template>
  <v-container class="fill-height justify-center">
    <div class="text-center">
      <v-alert
        v-if="updateAvailable"
        class="mb-4"
        dense
        type="info"
      >
        New Content Available!
        <v-btn
          class="ml-3"
          outlined
          small
          text
          @click="refreshContent"
        >
          Refresh
        </v-btn>
      </v-alert>

      <v-spacer />

      <v-btn
        v-if="canInstall"
        class="mb-4"
        color="primary"
        outlined
        x-large
        @click="promptInstaller"
      >
        Install Docs

        <v-icon right>
          $mdiPlusCircle
        </v-icon>
      </v-btn>

      <v-spacer />

      <v-btn
        class="mb-16"
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

      <v-img
        class="mb-4"
        max-width="300"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-light.png"
      />

      <div class="text-h4 font-weight-light">
        Under Construction
      </div>
    </div>
  </v-container>
</template>

<script>
  // Utilities
  import { call, sync } from 'vuex-pathify'

  export default {
    name: 'HomeLanding',

    computed: {
      ...sync('pwa', [
        'canInstall',
        'updateAvailable',
      ]),
    },

    methods: {
      ...call('pwa', [
        'promptInstaller',
        'refreshContent',
      ]),
    },
  }
</script>
