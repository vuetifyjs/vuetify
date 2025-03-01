// Styles
import './VGrid.sass'

// Utilities
import { createSimpleFunctional } from '@/util'

export const VSpacer = createSimpleFunctional('v-spacer', 'div', 'VSpacer')

export type VSpacer = InstanceType<typeof VSpacer>
