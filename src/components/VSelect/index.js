import VSelect from './VSelect'
import VSelectList from './VSelectList'

/* istanbul ignore next */
VSelect.install = function install (Vue) {
  Vue.component(VSelect.name, VSelect)
  Vue.component(VSelectList.name, VSelectList)
}

export { VSelect, VSelectList }

export default VSelect
