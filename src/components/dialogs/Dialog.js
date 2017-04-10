
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'dialog',

  mixins: [Toggleable],

  props: {
    persistent: Boolean,
    fullscreen: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    transition: {
      type: String,
      default: 'v-modal-transition'
    }
  },

  computed: {
    classes () {
      return {
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent
        'dialog--fullscreen': this.fullscreen
      }
    },

    computedOrigin () {
      return this.origin
    },

    computedTransition () {
      if (this.transition !== 'v-modal-transition') {
        return this.transition
      }

      return this.bottom ? 'v-slide-y-reverse-transition' : this.transition
    },

    overlayClasses () {
      return {
        'overlay--modal-bottom': this.bottom
      }
    }
  },

  methods: {
    wasClickInside (target) {
      return this.$refs.dialog !== target && !this.$refs.dialog.contains(target)
    },
    closeConditional (e) {
      return this.persistent ? false : this.wasClickInside()
    }
  },

  render (h) {
    h('div', {
      'class': 'dialog',
      ref: 'dialog',
      directives: [{ name: 'click-outside', value: closeConditional }],
    }, this.$slots.default)
  }
}
