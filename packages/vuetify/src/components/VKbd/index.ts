// Styles
import './VKbd.sass'

// Utilities
import { createSimpleFunctional } from '@/util'

export const VKbd = createSimpleFunctional('v-kbd', 'kbd')

export type VKbd = InstanceType<typeof VKbd>
