// Utilities
import { watch } from 'vue'
import { focusableChildren, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

// Types
export interface FocusTrapProps {
  focusTrap: boolean
}

// Composables
export const makeFocusTrapProps = propsFactory({
  focusTrap: Boolean,
}, 'focusTrap')

const registry = new Map<symbol, {
  isActive: Ref<boolean>
  contentEl: Ref<HTMLElement | undefined>
}>()

function onKeydown (e: KeyboardEvent) {
  const activeElement = document.activeElement as HTMLElement | null
  if (e.key !== 'Tab' || !activeElement) return

  const parentTraps = Array.from(registry.values())
    .filter(({ isActive, contentEl }) => isActive.value && contentEl.value?.contains(activeElement))
    .map(x => x.contentEl.value)

  let closestTrap
  let currentParent = activeElement.parentElement
  while (currentParent) {
    if (parentTraps.includes(currentParent)) {
      closestTrap = currentParent
      break
    }
    currentParent = currentParent.parentElement
  }

  if (!closestTrap) return

  const focusable = focusableChildren(closestTrap)
    .filter(x => !x.classList.contains('v-list'))

  if (!focusable.length) return

  const focusedIndex = focusable.indexOf(activeElement)
  let newIndex = focusedIndex + (e.shiftKey ? -1 : 1)
  if (newIndex === -1) {
    newIndex = focusable.length - 1
  } else if (newIndex === focusable.length) {
    newIndex = 0
  }

  e.preventDefault()
  focusable[newIndex].focus()
}

export function useFocusTrap (
  props: FocusTrapProps,
  { isActive, contentEl }: {
    isActive: Ref<boolean>
    contentEl: Ref<HTMLElement | undefined>
  }
) {
  const trapId = Symbol('trap')
  watch(() => props.focusTrap, val => {
    if (val) {
      registry.set(trapId, { isActive, contentEl })
    } else {
      registry.delete(trapId)
    }
  }, { immediate: true })

  IN_BROWSER && document.addEventListener('keydown', onKeydown)
}
