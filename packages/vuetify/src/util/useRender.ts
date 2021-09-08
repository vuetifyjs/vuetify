// Utilities
import { getCurrentInstance } from '@/util'
import type { VNode } from 'vue'

export function useRender (render: () => VNode): void {
  const vm = getCurrentInstance('useRender') as any
  vm.render = render
}
