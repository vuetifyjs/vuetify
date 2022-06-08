// Utilities
import { getCurrentInstance } from './getCurrentInstance'

// Types
import type { VNodeChild } from 'vue'

export function useRender (render: () => VNodeChild): void {
  const vm = getCurrentInstance('useRender') as any
  vm.render = render
}
