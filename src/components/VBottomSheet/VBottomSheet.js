require('../../stylus/components/_bottom-sheets.styl')

import VDialog from '../VDialog/VDialog'

export default {
  name: 'v-bottom-sheet',

  inheritAttrs: false,

  props: {
    inset: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 'auto'
    },
    value: null
  },

  render (h) {
    const activator = h('template', {
      slot: 'activator'
    }, this.$slots.activator)

    const contentClass = [
      'bottom-sheet',
      this.inset ? 'bottom-sheet--inset' : ''
    ].join(' ')

    return h(VDialog, {
      attrs: {
        ...this.$attrs
      },
      on: {
        ...this.$listeners
      },
      props: {
        maxWidth: this.maxWidth,
        contentClass: contentClass,
        transition: 'bottom-sheet-transition',
        value: this.value
      }
    }, [activator, this.$slots.default])
  }
}
