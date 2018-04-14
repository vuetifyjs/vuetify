import VTimePicker from './VTimePicker'
import VTimePickerClock from './VTimePickerClock'
import VTimePickerTitle from './VTimePickerTitle'

export {
  VTimePicker,
  VTimePickerClock,
  VTimePickerTitle
}

/* istanbul ignore next */
VTimePicker.install = function install (Vue) {
  Vue.component(VTimePicker.name, VTimePicker)
  Vue.component(VTimePickerClock.name, VTimePickerClock)
  Vue.component(VTimePickerTitle.name, VTimePickerTitle)
}

export default VTimePicker
