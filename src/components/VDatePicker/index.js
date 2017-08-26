import VDatePicker from './VDatePicker'

export { VDatePicker }

VDatePicker.install = function install (Vue) {
  Vue.component(VDatePicker.name, VDatePicker)
}

export default VDatePicker
