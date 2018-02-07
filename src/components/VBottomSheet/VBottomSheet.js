import '../../stylus/components/_bottom-sheets.styl'

import VDialog from '../VDialog/VDialog'

/* @vue/component */
export default {
  name: 'v-bottom-sheet',

  functional: true,

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

  render (h, context) {
    const slots = context.slots()

    const contentClass = 'v-bottom-sheet' +
      (context.props.inset ? ' v-bottom-sheet--inset' : '')

    return h(VDialog, {
      ...context.data,
      props: {
        contentClass,
        noClickAnimation: true,
        transition: 'bottom-sheet-transition'
      }
    }, slots.activator ? [h('template', { slot: 'activator' }, slots.activator), slots.default] : slots.default)
  }
}
