// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VDialogTransitionProps {
  target?: HTMLElement | [x: number, y: number]
}

export type VDialogTransitionDefaultKeys = never

export declare const VDialogTransition: VuetifyComponent<
  VDialogTransitionProps,
  VDialogTransitionDefaultKeys,
  Record<string, any>
>
export type VDialogTransition = InstanceType<typeof VDialogTransition>
