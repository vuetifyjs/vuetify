// Styles
import './VCode.sass'

// Utilities
import { createSimpleFunctional } from '@/util'

export const VCode = createSimpleFunctional('v-code')

export type VCode = InstanceType<typeof VCode>
