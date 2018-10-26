import '../../stylus/components/_snackbars.styl'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'

import mixins from '../../util/mixins'
import { VNode, VNodeChildrenArrayContents } from 'vue'

export default mixins(
  Colorable,
  Toggleable,
  PositionableFactory(['absolute', 'top', 'bottom', 'left', 'right'])
/* @vue/component */
).extend({
  name: 'v-snackbar',

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

  data () {
    return {
      activeTimeout: -1
    }
  },

  computed: {
    classes (): object {
      return {
        'v-snack--active': this.isActive,
        'v-snack--absolute': this.absolute,
        'v-snack--auto-height': this.autoHeight,
        'v-snack--bottom': this.bottom || !this.top,
        'v-snack--left': this.left,
        'v-snack--multi-line': this.multiLine && !this.vertical,
        'v-snack--right': this.right,
        'v-snack--top': this.top,
        'v-snack--vertical': this.vertical
      }
    }
  },

  watch: {
    isActive () {
      this.setTimeout()
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
    }
  },

  render (h): VNode {
    const children: VNodeChildrenArrayContents = []

    if (this.isActive) {
      children.push(
        h('div', {
          staticClass: 'v-snack',
          class: this.classes,
          on: this.$listeners
        }, [
          h('div', this.setBackgroundColor(this.color, {
            staticClass: 'v-snack__wrapper'
          }), [
            h('div', {
              staticClass: 'v-snack__content'
            }, this.$slots.default)
          ])
        ])
      )
    }

    return h('transition', {
      attrs: { name: 'v-snack-transition' }
    }, children)
  }
})
