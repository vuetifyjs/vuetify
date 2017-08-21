import VDatePicker from './VDatePicker'
import VMonthPicker from './VMonthPicker'

export { VDatePicker, VMonthPicker }

VDatePicker.install = function install (Vue) {
  Vue.component(VDatePicker.name, VDatePicker)
  Vue.component(VMonthPicker.name, VMonthPicker)
}

export default VDatePicker
