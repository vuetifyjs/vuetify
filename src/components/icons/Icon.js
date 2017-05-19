export default {
  name: 'icon',

  props: {
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  computed: {
    classes () {
      return {
        'material-icons icon': true,
        'icon--large': this.large,
        'icon--left': this.left,
        'icon--medium': this.medium,
        'icon--right': this.right,
        'icon--x-large': this.xLarge
      }
    }
  },

  render (h) {
    return h('i', { 'class': this.classes }, this.$slots.default)
  }
}
