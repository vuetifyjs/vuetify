// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VOtpFieldProps {
  index: number
}

type VOtpFieldDefaultKeys = never

export declare const VOtpField: VuetifyComponent<
  VOtpFieldProps,
  VOtpFieldDefaultKeys,
  Record<string, any>
>
export type VOtpField = InstanceType<typeof VOtpField>

export {}
