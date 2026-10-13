// Types
import type { Ref } from 'vue'
import type { VCounterSlot } from '@/components/VCounter/VCounter.types'
import type { VField, VFieldBaseDefaultKeys, VFieldBaseProps, VFieldSlots } from '@/components/VField/VField.types'
import type { VInput, VInputDefaultKeys, VInputProps, VInputSlots } from '@/components/VInput/VInput.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VTextFieldProps extends Omit<VInputProps, 'direction' | keyof VFieldBaseProps>, VFieldBaseProps {
  autocomplete?: string
  autofocus?: boolean
  counter?: string | number | boolean | null
  counterValue?: number | ((value: any) => number)
  modelModifiers?: Record<string, boolean>
  persistentCounter?: boolean
  persistentPlaceholder?: boolean
  placeholder?: string
  prefix?: string
  role?: string
  suffix?: string
  type?: string
}

export type VTextFieldDefaultKeys =
  | Exclude<VInputDefaultKeys, 'direction'>
  | VFieldBaseDefaultKeys
  | 'autofocus'
  | 'counter'
  | 'persistentCounter'
  | 'persistentPlaceholder'
  | 'type'

export type VTextFieldSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  default: { id: Readonly<Ref<string>> }
  counter: VCounterSlot
}

export type VTextFieldEmits = {
  'click:control': (e: MouseEvent) => true
  'mousedown:control': (e: MouseEvent) => true
  'update:focused': (focused: boolean) => true
  'update:modelValue': (val: string) => true
}

export type VTextFieldExposed = ForwardRefs<{}, [VInput, VField, HTMLInputElement]>

export declare const VTextField: VuetifyComponent<
  VTextFieldProps,
  VTextFieldDefaultKeys,
  VTextFieldEmits,
  VTextFieldSlots,
  VTextFieldExposed
>
export type VTextField = InstanceType<typeof VTextField>
