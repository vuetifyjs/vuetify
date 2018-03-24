import VTextField from './VTextField'
import VTextArea from '../VTextArea/VTextArea'

// TODO: remove this in v2.0
const wrapper = {
  functional: true,

  props: {
    textarea: Boolean,
    multiLine: Boolean
  },

  render (h, { props, data, children }) {
    if (props.textarea) {
      console.warn(`[Vuetify] '<v-text-field textarea>' is deprecated, use '<v-text-area outline>' instead in ${parent._name}`)
    }

    if (props.multiLine) {
      console.warn(`[Vuetify] '<v-text-field multi-line>' is deprecated, use '<v-text-area>' instead in ${parent._name}`)
    }

    if (props.textarea || props.multiLine) {
      data.attrs.outline = props.textarea
      return h(VTextArea, data, children)
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
