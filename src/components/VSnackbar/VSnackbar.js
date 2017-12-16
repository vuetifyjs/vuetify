require('../../stylus/components/_snackbars.styl')

import {
  VSlideYTransition,
  VSlideYReverseTransition
} from '../transitions'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Delayable from '../../mixins/delayable'

export default {
  name: 'v-snackbar',

  components: {
    VSlideYTransition,
    VSlideYReverseTransition
  },

  mixins: [Colorable, Toggleable, Delayable],

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
    closeDelay: {
      type: [Number, String],
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
      this.clearAndRunDelay()
    }
  },

  methods: {
    clearAndRunDelay () {
      this.clearDelay()

      if (this.isActive && this.closeDelay) {
        this.runDelay('close', () => {
          this.isActive = false
        })
      }
    }
  },

  mounted () {
    this.clearAndRunDelay()
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
