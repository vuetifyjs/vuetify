// Types
import type { ComputedRef, Ref, VNode } from 'vue'
import type { GenericProps, VuetifyComponent } from '@/util/defineComponent.types'

export type VConfirmEditSlots<T> = {
  default: {
    model: Ref<T>
    save: () => void
    cancel: () => void
    isPristine: boolean
    get actions (): (props?: {}) => VNode
  }
}

export interface VConfirmEditProps {
  cancelText?: string
  color?: string
  disabled?: boolean | ('save' | 'cancel')[]
  hideActions?: boolean
  modelValue?: any
  okText?: string
}

type VConfirmEditDefaultKeys =
  | 'cancelText'
  | 'disabled'
  | 'hideActions'
  | 'okText'

export declare const VConfirmEdit: VuetifyComponent<
  VConfirmEditProps,
  VConfirmEditDefaultKeys,
  {
    cancel: () => true
    save: (value: any) => true
    'update:modelValue': (value: any) => true
  },
  new <T> (
    props: {
      modelValue?: T
      'onUpdate:modelValue'?: (value: T) => void
      onSave?: (value: T) => void
    },
    slots: VConfirmEditSlots<T>
  ) => GenericProps<typeof props, typeof slots>,
  { save: () => void, cancel: () => void, isPristine: ComputedRef<boolean> }
>
export type VConfirmEdit = InstanceType<typeof VConfirmEdit>

export {}
