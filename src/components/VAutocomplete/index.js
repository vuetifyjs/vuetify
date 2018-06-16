import VAutocomplete from './VAutocomplete'

/* istanbul ignore next */
VAutocomplete.install = function install (Vue) {
  Vue.component(VAutocomplete.name, VAutocomplete)
}

export { VAutocomplete }
export default VAutocomplete
