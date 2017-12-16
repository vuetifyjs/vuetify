require('../../stylus/components/_snackbars.styl')

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-snackbar',

  mixins: [Colorable, Toggleable],

  data () {
    return {
      isVisible: false,
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
    },
    snackbarQueue () {
      return this.$vuetify.store.getSnackbarQueue()
    }
  },

  watch: {
    isActive (current) {
      this.toggle()
    },
    isVisible (current) {
      if (current) {
        this.setTimeout()
      }
    },
    snackbarQueue (current, previous) {
      const activeSnackbar = this.$vuetify.store.getSnackbarFromQueue()
      if (activeSnackbar === this._uid) {
        this.isVisible = true
      }
    }
  },

  methods: {
    afterLeave () {
      this.$vuetify.store.removeSnackbarFromQueue(this._uid)
      this.isActive = false
    },
    close () {
      this.isVisible = false
    },
    setTimeout () {
      clearTimeout(this.activeTimeout)

      if (this.isVisible && this.timeout) {
        this.activeTimeout = setTimeout(this.close, this.timeout)
      }
    },
    toggle () {
      if (this.isActive) {
        this.$vuetify.store.addSnackbarToQueue(this._uid)
      } else {
        this.close()
      }
    }
  },

  mounted () {
    this.toggle()
  },

  render (h) {
    if (!this.isVisible) return

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

    children.push(h('div', {
      staticClass: 'snack',
      'class': this.classes,
      on: this.$listeners
    }, [h('div', {
      staticClass: 'snack__content'
    }, content)]))

    return h('transition', {
      on: {
        afterLeave: this.afterLeave
      }
    }, children)
  }
}
