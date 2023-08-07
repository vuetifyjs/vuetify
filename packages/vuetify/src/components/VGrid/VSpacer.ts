// Utilities
import { createSimpleFunctional } from '@/util'

export const VSpacer = createSimpleFunctional('flex-grow-1', 'div', 'VSpacer')

export type VSpacer = InstanceType<typeof VSpacer>
