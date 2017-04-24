export default {
  name: 'icon',

  props: {
    light: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  computed: {
    classes () {
      return {
        'icon--dark': !this.light,
        'icon--large': this.large,
        'icon--left': this.left,
        'icon--light': this.light,
        'icon--medium': this.medium,
        'icon--right': this.right,
        'icon--x-large': this.xLarge,
        'material-icons icon': true
      }
    }
  },

  render (h) {
    return h('i', { 'class': this.classes }, this.$slots.default)
  }
}
