// Utilities
import { nextTick, onBeforeUnmount, toRef, toValue, watch } from 'vue'
import { focusableChildren, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'

// Types
export interface FocusTrapProps {
  retainFocus: boolean
  disableInitialFocus: boolean
}

// Composables
export const makeFocusTrapProps = propsFactory({
  retainFocus: Boolean,
  disableInitialFocus: Boolean,
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
  { isActive, globalTop, contentEl }: {
    isActive: Readonly<Ref<boolean>>
    globalTop: Readonly<Ref<boolean>>
    contentEl: Readonly<Ref<HTMLElement | undefined>>
  }
) {
  const trapId = Symbol('trap')
  watch(() => props.retainFocus, val => {
    if (val) {
      registry.set(trapId, { isActive, contentEl })
    } else {
      registry.delete(trapId)
    }
  }, { immediate: true })

  async function captureFocus (e: FocusEvent) {
    const before = e.relatedTarget as HTMLElement | null
    const after = e.target as HTMLElement | null

    await nextTick()

    if (
      isActive.value &&
      before !== after &&
      contentEl.value &&
      // We're the topmost menu
      toValue(globalTop) &&
      // It isn't the document or the container body
      ![document, contentEl.value].includes(after!) &&
      // It isn't inside the container body
      !contentEl.value.contains(after)
    ) {
      const focusable = focusableChildren(contentEl.value)
      focusable[0]?.focus()
    }
  }

  const shouldCapture = toRef(() => isActive.value && !props.disableInitialFocus)

  IN_BROWSER && watch(shouldCapture, val => {
    if (val) {
      document.addEventListener('focusin', captureFocus, { once: true })
    } else {
      document.removeEventListener('focusin', captureFocus)
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    document.removeEventListener('focusin', captureFocus)
  })

  IN_BROWSER && document.addEventListener('keydown', onKeydown)
}
