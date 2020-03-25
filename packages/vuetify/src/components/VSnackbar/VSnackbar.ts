// Styles
import './VSnackbar.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue'
import { removed } from '../../util/console'

export default mixins(
  Colorable,
  Toggleable,
  PositionableFactory(['absolute', 'top', 'bottom', 'left', 'right'])
/* @vue/component */
).extend({
  name: 'v-snackbar',

  props: {
    multiLine: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000,
    },
    vertical: Boolean,
  },

  data: () => ({
    activeTimeout: -1,
  }),

  computed: {
    classes (): object {
      return {
        'v-snack--active': this.isActive,
        'v-snack--absolute': this.absolute,
        'v-snack--bottom': this.bottom || !this.top,
        'v-snack--left': this.left,
        'v-snack--multi-line': this.multiLine && !this.vertical,
        'v-snack--right': this.right,
        'v-snack--top': this.top,
        'v-snack--vertical': this.vertical,
      }
    },
  },

  watch: {
    isActive () {
      this.setTimeout()
    },
  },

  created () {
    if (this.$attrs.hasOwnProperty('auto-height')) {
      removed('auto-height', this)
    }
  },

  mounted () {
    this.setTimeout()
  },

  methods: {
    setTimeout () {
      window.clearTimeout(this.activeTimeout)

      if (this.isActive && this.timeout) {
        this.activeTimeout = window.setTimeout(() => {
          this.isActive = false
        }, this.timeout)
      }
    },
  },

  render (h): VNode {
    return h('transition', {
      attrs: { name: 'v-snack-transition' },
    }, [
      this.isActive && h('div', {
        staticClass: 'v-snack',
        class: this.classes,
        on: this.$listeners,
      }, [
        h('div', this.setBackgroundColor(this.color, {
          staticClass: 'v-snack__wrapper',
          attrs: {
            role: 'alert',
          },
        }), [
          h('div', {
            staticClass: 'v-snack__content',
          }, this.$slots.default),
        ]),
      ]),
    ])
  },
})
