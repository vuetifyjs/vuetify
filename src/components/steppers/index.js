import { createSimpleFunctional } from '../../util/helpers'
import VStepper from './VStepper'
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

export default function install (Vue) {
  const VStepperHeader = createSimpleFunctional('stepper__header')

  Vue.component('v-stepper', VStepper)
  Vue.component('v-stepper-content', VStepperContent)
  Vue.component('v-stepper-header', VStepperHeader)
  Vue.component('v-stepper-step', VStepperStep)
}
