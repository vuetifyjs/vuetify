import '../../stylus/components/_snackbars.styl'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'

export default {
  name: 'v-snackbar',

  mixins: [Colorable, Toggleable, PositionableFactory(['absolute', 'top', 'bottom', 'left', 'right'])],

  data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    autoHeight: Boolean,
    multiLine: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes () {
      return {
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--auto-height': this.autoHeight,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--vertical': this.vertical
      }
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
      children.push(
        h('div', {
          staticClass: 'snack',
          class: this.classes,
          on: this.$listeners
        }, [
          h('div', {
            staticClass: 'snack__wrapper',
            class: this.addBackgroundColorClassChecks()
          }, [
            h('div', {
              staticClass: 'snack__content'
            }, this.$slots.default)
          ])
        ])
      )
    }

    return h('transition', {
      attrs: { name: 'snack-transition' }
    }, children)
  }
}
