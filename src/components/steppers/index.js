import { createSimpleFunctional } from '~util/helpers'
import VStepper from './VStepper'
import VStepperStep from './VStepperStep'
import VStepperContent from './VStepperContent'

const VStepperHeader = createSimpleFunctional('stepper__header')

export default {
  VStepper,
  VStepperContent,
  VStepperHeader,
  VStepperStep
}
