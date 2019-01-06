<template>
  <v-system-bar
    app
    window
  >
    <strong class="font-weight-black">Cooking:&nbsp;</strong>{{ cooking }} 🔥
    <v-spacer/>
    <v-icon
      title="Change theme"
      @click="$vuetify.dark = !$vuetify.dark"
    >
      mdi-invert-colors
    </v-icon>
    <a
      :href="href"
      target="_blank"
      rel="noopener"
      style="text-decoration: none;"
      title="Edit this page on Github"
    >
      <v-icon>mdi-pencil</v-icon>
    </a>
  </v-system-bar>
</template>

<script>
// Utilities
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('app', ['cooking']),
    href () {
      return `https://github.com/vuetifyjs/vuetify/tree/master/packages/kitchen/src/pan/${this.cooking}`
    }
  }
}
</script>
