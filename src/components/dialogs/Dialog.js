import Bootable from '../../mixins/bootable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'dialog',

  mixins: [Bootable, Toggleable],

  props: {
    persistent: Boolean,
    fullscreen: Boolean,
    lazy: Boolean,
    overlay: {
      type: Boolean,
      default: true
    },
    origin: {
      type: String,
      default: 'center center'
    },
    width: {
      type: [String, Number],
      default: 320
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
            this.isActive = !this.isActive
          }
        }
      }, [this.$slots.activator]))
    }

    let dialog = h(this.computedTransition, {
      props: { origin: this.origin }
    }, [h('div', data, [h('v-card', [this.$slots.default])])])

    if (this.overlay) {
      dialog = h('v-overlay', {
        props: { value: this.isActive }
      }, [dialog])
    }

    children.push(dialog)

    return h('div', {
      'class': 'dialog__container'
    }, children)
  }
}
