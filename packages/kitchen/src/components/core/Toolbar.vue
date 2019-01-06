<template>
  <v-toolbar
    app
    flat
    height="56"
  >
    <strong class="font-weight-black">Cooking:&nbsp;</strong>{{ cooking }} 🔥
    <v-spacer/>
    <v-select
      :value="meal"
      :items="meals"
      label="Select"
      hide-details
      single-line
      solo
      class="shrink mr-3"
      style="width: 175px;"
      flat
      @change="onMealChange"
    />
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

import meals from '@/pan'

export default {
  components: {
    Codepen: () => import('@/components/Codepen')
  },

  data: vm => ({
    meal: vm.$route.params.component,
    meals
  }),

  computed: {
    ...mapGetters('app', ['cooking']),
    href () {
      return `https://github.com/vuetifyjs/vuetify/tree/master/packages/kitchen/src/pan/${this.cooking}`
    }
  },

  methods: {
    onMealChange (val) {
      this.$router.push(`/${val}`)
    }
  }
}
</script>
