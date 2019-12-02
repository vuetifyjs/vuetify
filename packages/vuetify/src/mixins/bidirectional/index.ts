// Types
import Vue from 'vue'

/* @vue/component */
const Bidirectional = Vue.extend({
  name: 'bidirectional',

  provide (): object {
    return { rtl: this.rtlProvide }
  },

  inject: {
    rtl: {
      default: { isRtl: false },
    },
  },

  props: { rtl: Boolean },

  data: () => ({
    rtlProvide: { isRtl: false },
  }),

  computed: {
    isRtl (): boolean {
      return this.rtl || this.$vuetify.rtl
    },
    rtlClasses (): Dictionary<boolean> {
      return {
        'dir--ltr': !this.isRtl,
        'dir--rtl': this.isRtl,
      }
    },
  },

  watch: {
    isRtl: {
      handler (newVal, oldVal) {
        if (newVal === oldVal) return

        this.rtlProvide.isRtl = this.isRtl
      },
      immedidate: true,
    },
  },
})

export default Bidirectional
