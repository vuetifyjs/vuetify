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
  import { genMetaData } from '@/util/metadata'
  import { call, sync } from 'vuex-pathify'

  export default {
    name: 'Home',

    metaInfo: genMetaData(
      'Vuetify — A Material Design Framework for Vue.js',
      'Vuetify is a Material Design component framework for Vue.js. It aims to provide all the tools necessary to create beautiful content rich applications.',
      'vue, material design components, vue components, material design components, vuetify, vuetify.js, component framework',
    ),

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
