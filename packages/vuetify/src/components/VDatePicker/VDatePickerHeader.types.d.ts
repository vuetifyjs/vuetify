// Types
import type { IconValue } from '@/composables/icons.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VDatePickerHeaderSlots = {
  prepend: never
  default: never
  append: never
}

export interface VDatePickerHeaderProps {
  appendIcon?: IconValue
  color?: string
  header?: string
  onClick?: ((args_0: MouseEvent) => void)
  onClickOnce?: ((args_0: MouseEvent) => void)
  transition?: string
}

export type VDatePickerHeaderDefaultKeys = never

export declare const VDatePickerHeader: VuetifyComponent<
  VDatePickerHeaderProps,
  VDatePickerHeaderDefaultKeys,
  {
    click: () => true
    'click:append': () => true
  },
  VDatePickerHeaderSlots
>
export type VDatePickerHeader = InstanceType<typeof VDatePickerHeader>
