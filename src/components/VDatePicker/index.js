import VDatePicker from './VDatePicker'
import VDatePickerTitle from './VDatePickerTitle'
import VDatePickerHeader from './VDatePickerHeader'
import VDatePickerDateTable from './VDatePickerDateTable'
import VDatePickerMonthTable from './VDatePickerMonthTable'
import VDatePickerYears from './VDatePickerYears'

export {
  VDatePicker,
  VDatePickerTitle,
  VDatePickerHeader,
  VDatePickerDateTable,
  VDatePickerMonthTable,
  VDatePickerYears
}

/* istanbul ignore next */
VDatePicker.install = function install (Vue) {
  Vue.component(VDatePicker.name, VDatePicker)
  Vue.component(VDatePickerTitle.name, VDatePickerTitle)
  Vue.component(VDatePickerHeader.name, VDatePickerHeader)
  Vue.component(VDatePickerDateTable.name, VDatePickerDateTable)
  Vue.component(VDatePickerMonthTable.name, VDatePickerMonthTable)
  Vue.component(VDatePickerYears.name, VDatePickerYears)
}

export default VDatePicker
