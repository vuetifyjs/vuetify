import { createSimpleFunctional } from '../../util/helpers'
import VStepper from './VStepper'
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

VStepper.install = function install (Vue) {
  const VStepperHeader = createSimpleFunctional('stepper__header')

  Vue.component(VStepper.name, VStepper)
  Vue.component(VStepperContent.name, VStepperContent)
  Vue.component(VStepperStep.name, VStepperStep)
  Vue.component('v-stepper-header', VStepperHeader)
}

export default VStepper
