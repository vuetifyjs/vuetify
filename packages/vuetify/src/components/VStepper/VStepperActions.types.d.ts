// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VStepperActionsSlots = {
  prev: {
    props: { onClick: () => void }
  }
  next: {
    props: { onClick: () => void }
  }
}

export interface VStepperActionsProps {
  color?: string
  disabled?: boolean | 'next' | 'prev'
  nextText?: string
  prevText?: string
}

type VStepperActionsDefaultKeys =
  | 'disabled'
  | 'nextText'
  | 'prevText'

export declare const VStepperActions: VuetifyComponent<
  VStepperActionsProps,
  VStepperActionsDefaultKeys,
  {
    'click:prev': () => true
    'click:next': () => true
  },
  VStepperActionsSlots
>
export type VStepperActions = InstanceType<typeof VStepperActions>

export {}
