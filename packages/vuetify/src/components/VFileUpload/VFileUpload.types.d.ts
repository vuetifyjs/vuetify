// Types
import type { Ref, StyleValue, VNode } from 'vue'
import type { VFileUploadDropzone } from '@/components/VFileUpload/VFileUploadDropzone.types'
import type { VInput, VInputSlots } from '@/components/VInput/VInput.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { LoaderSlotProps } from '@/composables/loader.types'
import type { ValidateOn, ValidationResult } from '@/composables/validation.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'

export type VFileUploadSlots = Omit<VInputSlots, 'default'> & {
  browse: {
    props: { onClick: (e: MouseEvent) => void }
  }
  default: never
  icon: never
  input: {
    inputNode: VNode
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  single: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  title: never
  divider: never
  loader: LoaderSlotProps
}

export interface VFileUploadProps {
  appendIcon?: IconValue
  baseColor?: string
  browseText?: string
  centerAffix?: boolean
  class?: any
  clearable?: boolean
  color?: string
  density?: Density
  detailsActive?: boolean
  disabled?: boolean | null
  dividerText?: string
  error?: boolean
  errorMessages?: string | readonly string[] | null
  filterByType?: string
  focused?: boolean
  glow?: boolean
  hideBrowse?: boolean
  hideDetails?: boolean | 'auto'
  hideSpinButtons?: boolean
  hint?: string
  icon?: IconValue
  iconColor?: string | boolean
  id?: string
  indentDetails?: boolean
  insetFileList?: boolean
  label?: string
  loading?: string | boolean
  maxErrors?: string | number
  maxWidth?: string | number
  messages?: string | readonly string[]
  minWidth?: string | number
  modelValue?: File | File[]
  multiple?: boolean
  name?: string
  'onClick:append'?: ((args_0: MouseEvent) => void)
  'onClick:prepend'?: ((args_0: MouseEvent) => void)
  'onUpdate:focused'?: ((args_0: boolean) => void)
  persistentHint?: boolean
  prependIcon?: IconValue
  readonly?: boolean | null
  rules?: readonly (string | boolean | PromiseLike<ValidationResult> | ((value: any) => ValidationResult) | ((value: any) => PromiseLike<ValidationResult>) | [string, any, (string | undefined)?])[]
  scrim?: string | boolean
  showSize?: boolean
  style?: StyleValue
  subtitle?: string
  theme?: string
  title?: string
  validateOn?: ValidateOn
  validationValue?: any
  width?: string | number
}

type VFileUploadDefaultKeys =
  | 'browseText'
  | 'centerAffix'
  | 'clearable'
  | 'density'
  | 'detailsActive'
  | 'disabled'
  | 'dividerText'
  | 'error'
  | 'errorMessages'
  | 'focused'
  | 'glow'
  | 'hideBrowse'
  | 'hideSpinButtons'
  | 'icon'
  | 'indentDetails'
  | 'insetFileList'
  | 'maxErrors'
  | 'messages'
  | 'modelValue'
  | 'multiple'
  | 'persistentHint'
  | 'readonly'
  | 'rules'
  | 'scrim'
  | 'showSize'
  | 'style'
  | 'title'

export declare const VFileUpload: VuetifyComponent<
  VFileUploadProps,
  VFileUploadDefaultKeys,
  {
    'update:modelValue': (files: File[]) => true
    'update:focused': (focused: boolean) => true
    rejected: (files: File[]) => true
  },
  VFileUploadSlots,
  ForwardRefs<{ controlRef: Ref<HTMLInputElement | null, HTMLInputElement | null> }, [VInput, VFileUploadDropzone]>
>
export type VFileUpload = InstanceType<typeof VFileUpload>

export {}
