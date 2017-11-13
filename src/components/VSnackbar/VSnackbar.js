require('../../stylus/components/_snackbars.styl')

import {
  VSlideYTransition,
  VSlideYReverseTransition
} from '../transitions'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-snackbar',

  components: {
    VSlideYTransition,
    VSlideYReverseTransition
  },

  mixins: [Colorable, Toggleable],

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
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--vertical': this.vertical
      })
    },
    computedTransition () {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'
    }
  },

  watch: {
    isActive () {
      this.setTimeout()
    }
  },

  methods: {
    setTimeout () {
      clearTimeout(this.activeTimeout)

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(() => {
          this.isActive = false
        }, this.timeout)
      }
    }
  },

  mounted () {
    this.setTimeout()
  },

  render (h) {
    const children = []

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'snack__content'
      }, this.$slots.default))
    }

    return h('div', {
      staticClass: 'snack',
      'class': this.classes,
      on: this.$listeners
    }, [h(this.computedTransition, children)])
  }
}
