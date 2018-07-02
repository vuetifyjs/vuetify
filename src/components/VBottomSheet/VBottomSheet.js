import '../../stylus/components/_bottom-sheets.styl'

import VDialog from '../VDialog/VDialog'

/* @vue/component */
export default {
  name: 'v-bottom-sheet',

  props: {
    disabled: Boolean,
    fullWidth: Boolean,
    hideOverlay: Boolean,
    inset: Boolean,
    lazy: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    persistent: Boolean,
    value: null
  },

  render (h) {
    const activator = h('template', {
      slot: 'activator'
    }, this.$slots.activator)

    const contentClass = [
      'v-bottom-sheet',
      this.inset ? 'v-bottom-sheet--inset' : ''
    ].join(' ')

    return h(VDialog, {
      attrs: {
        ...this.$props
      },
      on: {
        ...this.$listeners
      },
      props: {
        contentClass,
        noClickAnimation: true,
        transition: 'bottom-sheet-transition',
        value: this.value
      }
    }, [activator, this.$slots.default])
  }
}
