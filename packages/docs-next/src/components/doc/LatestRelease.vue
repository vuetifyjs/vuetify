<template>
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
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'LatestRelease',

    computed: {
      version: get('app/version'),
      latest () {
        return `v${this.version}`
      },
    },
  }
</script>
