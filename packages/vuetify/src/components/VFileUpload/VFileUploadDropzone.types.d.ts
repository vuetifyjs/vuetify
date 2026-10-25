// Types
import type { StyleValue } from 'vue'
import type { VSheet } from '@/components/VSheet/VSheet.types'
import type { Density } from '@/composables/density.types'
import type { ForwardRefs } from '@/composables/forwardRefs.types'
import type { IconValue } from '@/composables/icons.types'
import type { Anchor } from '@/util/anchor.types'
import type { VuetifyComponent } from '@/util/defineComponent.types'
import type { JSXComponent } from '@/util/shared.types'

export type VFileUploadDropzoneSlots = {
  default: {
    isDragging: boolean
    hasFiles: boolean
    files: readonly File[]
    props: { onClick: () => void }
  }
  browse: {
    props: { onClick: (e: MouseEvent) => void }
  }
  icon: never
  title: never
  divider: never
  single: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  item: {
    file: File
    props: { 'onClick:remove': () => void }
  }
  input: never
  loader: never
}

export interface VFileUploadDropzoneProps {
  border?: string | number | boolean
  browseText?: string
  class?: any
  clearable?: boolean
  closeDelay?: string | number
  color?: string
  density?: Density
  disabled?: boolean
  dividerText?: string
  elevation?: string | number
  error?: boolean
  height?: string | number
  hideBrowse?: boolean
  hoverElevation?: string | number
  icon?: IconValue
  insetFileList?: boolean
  length?: string | number
  location?: Anchor | null
  maxHeight?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  minWidth?: string | number
  modelValue?: File[]
  multiple?: boolean
  opacity?: string | number
  openDelay?: string | number
  position?: 'fixed' | 'relative' | 'absolute' | 'static' | 'sticky'
  readonly?: boolean
  rounded?: string | number | boolean
  scrim?: string | boolean
  showSize?: boolean
  style?: StyleValue
  subtitle?: string
  tag?: string | JSXComponent
  theme?: string
  thickness?: string | number
  tile?: boolean
  title?: string
  width?: string | number
}

type VFileUploadDropzoneDefaultKeys =
  | 'browseText'
  | 'clearable'
  | 'density'
  | 'disabled'
  | 'dividerText'
  | 'error'
  | 'hideBrowse'
  | 'icon'
  | 'insetFileList'
  | 'length'
  | 'modelValue'
  | 'multiple'
  | 'readonly'
  | 'rounded'
  | 'scrim'
  | 'showSize'
  | 'style'
  | 'tag'
  | 'tile'
  | 'title'

export declare const VFileUploadDropzone: VuetifyComponent<
  VFileUploadDropzoneProps,
  VFileUploadDropzoneDefaultKeys,
  {
    'click:browse': () => true
    'click:remove': (index: number) => true
    drop: (files: File[]) => true
  },
  VFileUploadDropzoneSlots,
  ForwardRefs<{}, [VSheet]>
>
export type VFileUploadDropzone = InstanceType<typeof VFileUploadDropzone>

export {}
