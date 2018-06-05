import VTextField from './VTextField'
import VTextarea from '../VTextarea/VTextarea'
import rebuildSlots from '../../util/rebuildFunctionalSlots'

// TODO: remove this in v2.0
const wrapper = {
  functional: true,

  $_wrapperFor: VTextField,

  props: {
    textarea: Boolean,
    multiLine: Boolean
  },

  render (h, { props, data, slots, parent }) {
    const children = rebuildSlots(slots(), h)

    if (props.textarea) {
      console.warn(`[Vuetify] '<v-text-field textarea>' is deprecated, use '<v-textarea outline>' instead in ${parent._name}`)
    }

    if (props.multiLine) {
      console.warn(`[Vuetify] '<v-text-field multi-line>' is deprecated, use '<v-textarea>' instead in ${parent._name}`)
    }

    if (props.textarea || props.multiLine) {
      data.attrs.outline = props.textarea
      return h(VTextarea, data, children)
    } else {
      return h(VTextField, data, children)
    }
  }
}

/* istanbul ignore next */
wrapper.install = function install (Vue) {
  Vue.component(VTextField.name, wrapper)
}

export default wrapper
