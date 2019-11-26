// Types
import Vue from 'vue'

const Bidirectional = Vue.extend({
  name: 'bidirectional',

  props: { rtl: Boolean },

  computed: {
    isRtl (): boolean {
      return this.rtl || this.$vuetify.rtl
    },
  },
})

export default Bidirectional
