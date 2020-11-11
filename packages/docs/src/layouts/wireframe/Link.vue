<template>
  <v-btn
    :href="`https://github.com/vuetifyjs/vuetify/blob/master/packages/docs/src/examples/wireframes/${wireframe}.vue`"
    bottom
    color="primary"
    fab
    fixed
    rel="noopener"
    right
    target="_blank"
  >
    <v-icon>$mdiGithub</v-icon>
  </v-btn>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'WireframeLink',

    computed: { wireframe: get('route/params@wireframe') },
  }
</script>
