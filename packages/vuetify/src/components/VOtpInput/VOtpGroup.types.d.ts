// Types
import type { VuetifyComponent } from '@/util/defineComponent.types'

export interface VOtpGroupProps {
  merged?: boolean | null
}

type VOtpGroupDefaultKeys =
  | 'merged'

export declare const VOtpGroup: VuetifyComponent<
  VOtpGroupProps,
  VOtpGroupDefaultKeys,
  Record<string, any>
>
export type VOtpGroup = InstanceType<typeof VOtpGroup>

export {}
