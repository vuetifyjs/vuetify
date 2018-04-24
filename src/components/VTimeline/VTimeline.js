import '../../stylus/components/_timeline.styl'

export default {
  name: 'v-timeline',

  props: {
    right: Boolean,
    left: Boolean
  },

  computed: {
    classes () {
      return {
        'v-timeline--left': this.left,
        'v-timeline--right': this.right
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'v-timeline',
      'class': this.classes
    }, this.$slots.default)
  }
}
