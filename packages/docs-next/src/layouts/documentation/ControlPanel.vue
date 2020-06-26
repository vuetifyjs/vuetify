<template>
  <v-toolbar
    class="v-bar--underline"
    flat
  >
    <v-list-item class="pa-0">
      <vuetify-logo class="mr-4" />

      <v-list-item-content>
        <v-list-item-title class="text-h6">
          Vuetify
        </v-list-item-title>

        <div>
          <a
            :href="`https://github.com/vuetifyjs/vuetify/releases/tag/${latest}`"
            class="d-inline-flex align-center text-decoration-none text--secondary text-caption"
            rel="noopener"
            target="_blank"
          >
            <v-icon
              class="mr-1"
              size="14"
            >
              $mdiTagOutline
            </v-icon>

            {{ latest }}
          </a>
        </div>
      </v-list-item-content>

      <notifications />
    </v-list-item>
  </v-toolbar>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DocumentationControlPanel',

    computed: {
      version: get('app/version'),
      latest () {
        return `v${this.version}`
      },
    },

  }
</script>
