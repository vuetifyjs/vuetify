// Utilities
import { cloneVNode, computed } from 'vue'
import { getCurrentInstance } from './getCurrentInstance'

// Types
import type { VNode } from 'vue'

export function useRender (render: () => VNode): void {
  const vm = getCurrentInstance('useRender') as any
  const _render = computed(render)
  vm.render = () => cloneVNode(_render.value)
}
