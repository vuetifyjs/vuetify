<template>
  <v-toolbar
    app
    flat
    height="52"
  >
    <strong class="font-weight-black">Cooking:&nbsp;</strong>{{ cooking }} 🔥
    <v-spacer/>
    <codepen />
    <v-btn
      icon
      @click="$vuetify.dark = !$vuetify.dark"
    >
      <v-icon title="Change theme">
        mdi-invert-colors
      </v-icon>
    </v-btn>
    <v-btn
      :href="href"
      target="_blank"
      rel="noopener"
      icon
      title="Edit this page on Github"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
// Utilities
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    Codepen: () => import('@/components/Codepen')
  },

  computed: {
    ...mapGetters('app', ['cooking']),
    href () {
      return `https://github.com/vuetifyjs/vuetify/tree/master/packages/kitchen/src/pan/${this.cooking}`
    }
  }
}
</script>
