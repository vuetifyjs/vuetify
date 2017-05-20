import Toggleable from '../../mixins/toggleable'
import Contextualable from '../../mixins/contextualable'

export default {
  name: 'snackbar',

  mixins: [Contextualable, Toggleable],

  data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes () {
      return {
        'snack': true,
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--vertical': this.vertical,
        'primary': this.primary,
        'secondary': this.secondary,
        'success': this.success,
        'info': this.info,
        'warning': this.warning,
        'error': this.error
      }
    },
    computedTransition () {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'
    }
  },

  watch: {
    isActive () {
      clearTimeout(this.activeTimeout)

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(() => (this.isActive = false), this.timeout)
      }
    }
  },

  render (h) {
    const children = []

    if (this.isActive) {
      children.push(h('div', {
        'class': 'snack__content'
      }, [this.$slots.default]))
    }

    return h('div', {
      'class': this.classes
    }, [h(this.computedTransition, {}, children)])
  }
}
