// Types
import type { VStepperActionsSlots } from '@/components/VStepper/VStepperActions.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VStepperVerticalActionsProps {
  color?: string
  disabled?: boolean | 'next' | 'prev'
  nextText?: string
  prevText?: string
}

type VStepperVerticalActionsDefaultKeys =
  | 'disabled'
  | 'nextText'
  | 'prevText'

export declare const VStepperVerticalActions: VuetifyComponent<
  VStepperVerticalActionsProps,
  VStepperVerticalActionsDefaultKeys,
  {
    'click:prev': () => true
    'click:next': () => true
  },
  VStepperActionsSlots
>
export type VStepperVerticalActions = InstanceType<typeof VStepperVerticalActions>

export {}
