import { createSimpleFunctional } from '../../util/helpers'
import VStepper from './VStepper'
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

const VStepperHeader = createSimpleFunctional('v-stepper__header')
const VStepperItems = createSimpleFunctional('v-stepper__items')

export { VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems }

/* istanbul ignore next */
VStepper.install = function install (Vue) {
  Vue.component(VStepper.name, VStepper)
  Vue.component(VStepperContent.name, VStepperContent)
  Vue.component(VStepperStep.name, VStepperStep)
  Vue.component(VStepperHeader.name, VStepperHeader)
  Vue.component(VStepperItems.name, VStepperItems)
}

export default VStepper
