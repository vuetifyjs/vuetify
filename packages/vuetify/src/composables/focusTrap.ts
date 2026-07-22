// Utilities
import { onScopeDispose, toRef, toValue, watch } from 'vue'
import { focusableChildren, getActiveElement, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { Ref } from 'vue'

// Types
export interface FocusTrapProps {
  retainFocus: boolean
  captureFocus: boolean
  disableInitialFocus?: boolean
}

// Composables
export const makeFocusTrapProps = propsFactory({
  retainFocus: Boolean,
  captureFocus: Boolean,
  /** @deprecated */
  disableInitialFocus: Boolean,
}, 'focusTrap')

const registry = new Map<symbol, {
  isActive: Ref<boolean>
  contentEl: Ref<HTMLElement | undefined>
}>()
let subscribers = 0

function lastActiveTrap (): HTMLElement | undefined {
  let el: HTMLElement | undefined
  for (const { isActive, contentEl } of registry.values()) {
    if (isActive.value && contentEl.value) el = contentEl.value
  }
  return el
}

function onKeydown (e: KeyboardEvent) {
  const activeElement = getActiveElement() as HTMLElement | null
  if (e.key !== 'Tab' || !activeElement) return

  const parentTraps = Array.from(registry.values())
    .filter(({ isActive, contentEl }) => isActive.value && contentEl.value?.contains(activeElement))
    .map(x => x.contentEl.value)

  let closestTrap: HTMLElement | undefined
  let currentNode: HTMLElement | null = activeElement
  while (currentNode) {
    if (parentTraps.includes(currentNode)) {
      closestTrap = currentNode
      break
    }
    currentNode = currentNode.parentElement
  }

  if (!closestTrap) {
    const trapEl = lastActiveTrap() // assuming last registered == topmost panel
    if (!trapEl) return

    const focusable = focusableChildren(trapEl).filter(x => x.tabIndex >= 0)
    e.preventDefault()
    if (!focusable.length) {
      trapEl.focus({ preventScroll: true })
    } else if (e.shiftKey) {
      focusable[focusable.length - 1].focus()
    } else {
      focusable[0].focus()
    }
    return
  }

  const focusable = focusableChildren(closestTrap)
    // excluding VListItems with tabindex="-2"
    .filter(x => x.tabIndex >= 0)

  if (!focusable.length) return

  if (
    focusable.length === 1 &&
    focusable[0].classList.contains('v-list') &&
    focusable[0].contains(activeElement)
  ) {
    e.preventDefault()
    return
  }

  const firstElement = focusable[0]
  const lastElement = focusable[focusable.length - 1]

  // contentEl wrapper (tabindex=-1) counts as "before first"
  const atFirst = (
    activeElement === firstElement ||
    activeElement === closestTrap ||
    (firstElement.classList.contains('v-list') && firstElement.contains(activeElement))
  )

  const atLast = (
    activeElement === lastElement ||
    (lastElement.classList.contains('v-list') && lastElement.contains(activeElement))
  )

  if (e.shiftKey && atFirst) {
    e.preventDefault()
    lastElement.focus()
  }

  if (!e.shiftKey && atLast) {
    e.preventDefault()
    firstElement.focus()
  }
}

export function useFocusTrap (
  props: FocusTrapProps,
  { isActive, localTop, contentEl }: {
    isActive: Ref<boolean>
    localTop: Readonly<Ref<boolean>>
    contentEl: Readonly<Ref<HTMLElement | undefined>>
  }
) {
  const trapId = Symbol('trap')

  let focusTrapSuppressed = false
  let focusTrapSuppressionTimeout = -1

  async function onPointerdown () {
    focusTrapSuppressed = true
    focusTrapSuppressionTimeout = window.setTimeout(() => {
      focusTrapSuppressed = false
    }, 100)
  }

  async function captureOnFocus (e: FocusEvent) {
    const before = e.relatedTarget as HTMLElement | null
    const after = e.target as HTMLElement | null

    document.removeEventListener('pointerdown', onPointerdown)
    document.removeEventListener('keydown', captureOnKeydown)

    await new Promise(resolve => requestAnimationFrame(resolve))

    if (
      isActive.value &&
      !focusTrapSuppressed &&
      before !== after &&
      contentEl.value &&
      // We're the menu without open submenus or overlays
      toValue(localTop) &&
      // It isn't the document or the container body
      ![document, contentEl.value].includes(after!) &&
      // It isn't inside the container body
      !contentEl.value.contains(after)
    ) {
      const focusable = focusableChildren(contentEl.value)
      focusable[0]?.focus()
    }
  }

  function captureOnKeydown (e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    document.removeEventListener('keydown', captureOnKeydown)

    if (
      isActive.value &&
      contentEl.value &&
      e.target &&
      !contentEl.value.contains(e.target as Element)
    ) {
      const allFocusableElements = focusableChildren(document.documentElement)

      if (
        (e.shiftKey && e.target === allFocusableElements.at(0)) ||
        (!e.shiftKey && e.target === allFocusableElements.at(-1))
      ) {
        const focusable = focusableChildren(contentEl.value)
        if (focusable.length > 0) {
          e.preventDefault()
          focusable[0].focus()
        }
      }
    }
  }

  const shouldCapture = toRef(() => isActive.value && props.captureFocus && !props.disableInitialFocus)

  if (IN_BROWSER) {
    watch(() => props.retainFocus, val => {
      if (val) {
        registry.set(trapId, { isActive, contentEl })
      } else {
        registry.delete(trapId)
      }
    }, { immediate: true })

    watch(shouldCapture, val => {
      if (val) {
        document.addEventListener('pointerdown', onPointerdown)
        document.addEventListener('focusin', captureOnFocus, { once: true })
        document.addEventListener('keydown', captureOnKeydown)
      } else {
        document.removeEventListener('pointerdown', onPointerdown)
        document.removeEventListener('focusin', captureOnFocus)
        document.removeEventListener('keydown', captureOnKeydown)
      }
    }, { immediate: true })

    if (subscribers++ < 1) {
      document.addEventListener('keydown', onKeydown)
    }
  }

  onScopeDispose(() => {
    registry.delete(trapId)
    if (!IN_BROWSER) return
    clearTimeout(focusTrapSuppressionTimeout)
    document.removeEventListener('pointerdown', onPointerdown)
    document.removeEventListener('focusin', captureOnFocus)
    document.removeEventListener('keydown', captureOnKeydown)

    if (--subscribers < 1) {
      document.removeEventListener('keydown', onKeydown)
    }
  })
}
