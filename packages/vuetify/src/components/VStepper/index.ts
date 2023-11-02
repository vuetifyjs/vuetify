// Components
import VStepper from './VStepper'
import VStepperContent from './VStepperContent'
import VStepperStep from './VStepperStep'

// Utilities
import { createSimpleFunctional } from '@/util'

const VStepperHeader = createSimpleFunctional('v-stepper__header')
const VStepperItems = createSimpleFunctional('v-stepper__items')

export {
  VStepper,
  VStepperContent,
  VStepperStep,
  VStepperHeader,
  VStepperItems,
}

export default {
  $_vuetify_subcomponents: {
    VStepper,
    VStepperContent,
    VStepperStep,
    VStepperHeader,
    VStepperItems,
  },
}
