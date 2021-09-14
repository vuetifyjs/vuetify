// Utilities
import { getCurrentInstance } from './getCurrentInstance'

// Types
import type { VNode } from 'vue'

export function useRender (render: () => VNode): void {
  const vm = getCurrentInstance('useRender') as any
  vm.render = render
}
