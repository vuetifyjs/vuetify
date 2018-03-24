import VTextField from './VTextField'
// import VTextArea from '../VTextArea/VTextArea'

// // TODO: remove this in v2.0
// const wrapper = {
//   props: {
//     textarea: Boolean,
//     multiLine: Boolean
//   },

//   render (h) {
//     if (this.textarea) {
//       console.warn(`[Vuetify] '<v-text-field textarea>' is deprecated, use '<v-text-area outline>' instead in ${parent._name}`)
//     }

//     if (this.multiLine) {
//       console.warn(`[Vuetify] '<v-text-field multi-line>' is deprecated, use '<v-text-area>' instead in ${parent._name}`)
//     }

//     if (this.textarea || this.multiLine) {
//       return h(VTextArea, this.$props, this.$slots.default)
//     } else {
//       return h(VTextField, this.$props, this.$slots.default)
//     }
//   }
// }

/* istanbul ignore next */
VTextField.install = function install (Vue) {
  Vue.component(VTextField.name, VTextField)
}

export default VTextField
