// Types
import type { VConfirmEdit, VConfirmEditProps } from '@/components/VConfirmEdit/VConfirmEdit.types'
import type { VMenu } from '@/components/VMenu/VMenu.types'
import type { VTextField, VTextFieldProps, VTextFieldSlots } from '@/components/VTextField/VTextField.types'
import type { VTimePicker, VTimePickerProps } from '@/components/VTimePicker/VTimePicker.types'
import type { DisplayBreakpoint } from '@/composables/display.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { Anchor } from '@/util/anchor.types'
import type { DefaultKeysOf, VuetifyComponent } from '@/util/defineComponent.types'

export type VTimeInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VTimeInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VTimeInputActionsSlot
  default: never
}

type OmittedPickerKeys = 'format' | 'location' | 'rounded' | 'height' | 'minHeight' | 'maxHeight' | 'period' | 'variant' | 'viewMode'
type PickerProps = Omit<VTimePickerProps, OmittedPickerKeys>
type TextFieldProps = Omit<VTextFieldProps, keyof PickerProps>
type ConfirmEditProps = Omit<VConfirmEditProps, keyof PickerProps | keyof TextFieldProps>

export interface VTimeInputProps extends ConfirmEditProps, TextFieldProps, PickerProps {
  format?: 'ampm' | '24hr'
  location?: Anchor
  menu?: boolean
  menuProps?: VMenu['$props']
  mobile?: boolean | null
  mobileBreakpoint?: number | DisplayBreakpoint
  openOnFocus?: boolean
  pickerProps?: VTimePicker['$props']
  updateOn?: ('blur' | 'enter')[]
}

type VTimeInputDefaultKeys =
  | Exclude<DefaultKeysOf<typeof VConfirmEdit>, keyof PickerProps | keyof TextFieldProps>
  | Exclude<DefaultKeysOf<typeof VTextField>, keyof PickerProps>
  | Exclude<DefaultKeysOf<typeof VTimePicker>, OmittedPickerKeys>
  | 'hideActions'
  | 'hideTitle'
  | 'location'
  | 'menu'
  | 'mobile'
  | 'openOnFocus'
  | 'prependIcon'
  | 'updateOn'

export declare const VTimeInput: VuetifyComponent<
  VTimeInputProps,
  VTimeInputDefaultKeys,
  {
    save: (value: string | null) => true
    cancel: () => true
    'update:focused': (val: boolean) => true
    'update:modelValue': (val: string | null) => true
    'update:menu': (val: boolean) => true
  },
  VTimeInputSlots,
  ForwardRefs<{}, [VTextField]>
>
export type VTimeInput = InstanceType<typeof VTimeInput>

export {}
