import Toggleable from '../../mixins/toggleable'

export default {
  name: 'snackbar',

  mixins: [Toggleable],

  data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    timeout: {
      type: Number,
      default: 6000
    }
  },

  computed: {
    classes () {
      return {
        'snack': true,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--multi-line': this.multiLine
      }
    },
    computedTransition () {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'
    }
  },

  watch: {
    isActive () {
      clearTimeout(this.timeout)

      if (this.isActive) {
        this.activeTimeout = setTimeout(() => (this.isActive = false), this.timeout)
      }
    }
  },

  render (h) {
    const content = h('div', {
      'class': 'snack__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, [this.$slots.default])

    return h('div', {
      'class': this.classes
    }, [h(this.computedTransition, {}, [content])])
  }
}
