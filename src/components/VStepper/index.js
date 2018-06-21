import { createSimpleFunctional } from '../../util/helpers'
import VStepper from './VStepper'
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

const VStepperHeader = createSimpleFunctional('v-stepper__header')
const VStepperItems = createSimpleFunctional('v-stepper__items')

export { VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems }

VStepper.$_vuetify_subcomponents = {
  VStepperContent,
  VStepperStep,
  VStepperHeader,
  VStepperItems
}

export default VStepper
