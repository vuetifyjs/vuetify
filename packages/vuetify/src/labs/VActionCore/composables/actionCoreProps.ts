import type { PropType } from 'vue'
import type { ActionDefinition } from '../types'
import { propsFactory } from '@/util'

// Define and export the keys for ActionCore props
export const VActionCorePropsKeys = {
  command: 'command',
  commandData: 'commandData',
} as const;

export const makeActionCoreProps = propsFactory({
  [VActionCorePropsKeys.command]: [String, Object] as PropType<string | ActionDefinition>,
  [VActionCorePropsKeys.commandData]: undefined as any,
}, 'action-core')
