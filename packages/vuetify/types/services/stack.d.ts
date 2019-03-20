// Mixins
import Stackable from '../../src/mixins/stackable'

// Types
export type StackableInstance = InstanceType<typeof Stackable>

export interface VuetifyStackService {
  register: (item: StackableInstance) => void
  unregister: (item: StackableInstance) => void
}

export interface VuetifyStackOptions {
  minZIndex?: number
}
