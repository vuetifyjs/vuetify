import Vue from 'vue'

interface options extends Vue {
  $refs: {
    content: Element
  }
}

/* @vue/component */
export default Vue.extend<options>().extend({
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
