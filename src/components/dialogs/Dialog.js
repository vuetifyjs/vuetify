import Bootable from '../../mixins/bootable'
import Overlayable from '../../mixins/overlayable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'dialog',

  mixins: [Bootable, Overlayable, Toggleable],

  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    lazy: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 290
    },
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'v-dialog-transition'
    }
  },

  computed: {
    classes () {
      return {
        'dialog': true,
        'dialog--active': this.isActive,
        'dialog--persistent': this.persistent,
        'dialog--fullscreen': this.fullscreen,
        'dialog--stacked-actions': this.stackedActions && !this.fullscreen,
        'dialog--scrollable': this.scrollable
      }
    },
    computedTransition () {
      return !this.transition
        ? 'transition'
        : this.transition
    }
  },

  watch: {
    isActive (val) {
      if (val) {
        !this.fullscreen && !this.hideOverlay && this.genOverlay()
      } else {
        this.removeOverlay()
      }
    }
  },

  methods: {
    closeConditional (e) {
      // close dialog if !persistent and clicked outside
      return !this.persistent
    }
  },

  render (h) {
    const children = []
    const data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [
        { name: 'click-outside', value: this.closeConditional },
        { name: 'show', value: this.isActive }
      ]
    }

    if (!this.fullscreen) {
      data.style = {
        width: isNaN(this.width) ? this.width : `${this.width}px`
      }
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: e => {
            e.stopPropagation()
            if (!this.disabled) this.isActive = !this.isActive
          }
        }
      }, [this.$slots.activator]))
    }

    const dialog = h(this.computedTransition, {
      props: { origin: this.origin }
    }, [h('div', data, [this.$slots.default])])

    if (this.overlay) {
      dialog = h('v-overlay', {
        props: { value: this.isActive }
      }, [dialog])
    }

    children.push(h('div', {
      'class': 'dialog__content'
    }, [dialog]))

    return h('div', {
      'class': 'dialog__container'
    }, children)
  }
}
