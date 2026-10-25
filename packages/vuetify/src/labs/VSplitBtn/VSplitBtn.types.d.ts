// Types
import type { VBtnGroup, VBtnGroupProps } from '@/components/VBtnGroup/VBtnGroup.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { IconValue } from '@/composables/icons.types'
import type { DefaultKeysOf, VuetifyComponent } from '@/util/defineComponent.types'

export type VSplitBtnSlots = {
  default: never
  menu: never
}

export interface VSplitBtnProps extends Omit<VBtnGroupProps, 'connected' | 'direction'> {
  disabled?: boolean
  icon?: IconValue
  loading?: string | boolean
  menu?: boolean
  menuIcon?: IconValue
  menuLabel?: string
  menuProps?: VMenu['$props']
  prependIcon?: IconValue
  text?: string | number
}

type VSplitBtnDefaultKeys =
  | Exclude<DefaultKeysOf<typeof VBtnGroup>, 'connected' | 'direction'>
  | 'disabled'
  | 'menu'
  | 'menuIcon'
  | 'menuLabel'

export declare const VSplitBtn: VuetifyComponent<
  VSplitBtnProps,
  VSplitBtnDefaultKeys,
  {
    click: (e: MouseEvent) => true
    'update:menu': (value: boolean) => true
  },
  VSplitBtnSlots
>
export type VSplitBtn = InstanceType<typeof VSplitBtn>

export {}
