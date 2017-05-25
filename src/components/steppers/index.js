import { createSimpleFunctional } from '../../util/helpers'
import Stepper from './Stepper'
import StepperStep from './StepperStep'
import StepperContent from './StepperContent'

const StepperHeader = createSimpleFunctional('stepper__header')

export default {
  Stepper,
  StepperContent,
  StepperHeader,
  StepperStep
}
