// Utilities
import { getVuetify } from '../../util/helpers'

// Types
import Vue from 'vue'

const Bidirectional = Vue.extend({
  name: 'bidirectional',

  props: { rtl: Boolean },

  computed: {
    hasRtl (): boolean {
      return this.rtl || getVuetify(this, 'rtl', false)
    },
  },
})

export default Bidirectional
