import Vue from 'vue'

/* @vue/component */
export default Vue.extend({
  name: 'stackable',

  props: {
    fullscreen: Boolean
  },

  data () {
    return {
      activeZIndex: null as null | number,
      stackMinZIndex: 0,
      isActive: false
    }
  },

  watch: {
    isActive (val) {
      val
        ? this.$vuetify.stack.register(this)
        : this.$vuetify.stack.unregister(this)
    }
  }
})
