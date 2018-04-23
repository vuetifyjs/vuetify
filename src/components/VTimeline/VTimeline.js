import '../../stylus/components/_timeline.styl'

export default {
  name: 'v-timeline',

  props: {
    right: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    alignClass () {
      return {
        'v-timeline': true,
        'v-timeline--left': this.left,
        'v-timeline--right': this.right
      }
    }
  },

  render (h) {
    return h('ul', {
      class: this.alignClass
    }, this.$slots.default)
  }
}
