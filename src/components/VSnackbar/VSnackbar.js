require('../../stylus/components/_snackbars.styl')

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-snackbar',

  mixins: [Colorable, Toggleable],

  data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    action: String,
    actionColor: String,
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    message: String,
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
    let content

    if (this.message) {
      content = [h('span', this.message)]
      if (this.action) {
        content.push(h('v-btn', {
          staticClass: 'snack__action',
          props: {
            color: this.actionColor,
            flat: true,
            ripple: false
          },
          on: {
            click: () => {
              this.$emit('action')
            }
          }
        }, this.action))
      }
    } else {
      // Developer should remove ripple from button if using slot
      // https://material.io/guidelines/components/snackbars-toasts.html
      content = this.$slots.default
    }

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'snack',
        'class': this.classes,
        on: this.$listeners
      }, [h('div', {
        staticClass: 'snack__content'
      }, content)]))
    }

    return h('transition', children)
  }
}
