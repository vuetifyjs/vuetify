// Utilities
import { getCurrentInstanceName, propsFactory } from '@/util'

// Types
export interface KeyboardProps {
  disableKeys: boolean
}

// Composables
export const makeKeyboardProps = propsFactory({
  disableKeys: Boolean,
}, 'keyboard')

export function useKeyboard (
  props: KeyboardProps,
  name = getCurrentInstanceName(),
) {
  return {
    onKeydown (e: KeyboardEvent) {
      if (props.disableKeys || e.key === 'Tab') {
        return
      }

      const target = e.target as HTMLElement

      if (!target) return

      if (e.key === 'ArrowDown') {
        getNext(target)
      }

      if (e.key === 'ArrowUp') {
        getPrev(target)
      }

      if (e.key === 'Enter') {
        target.click()
      }

      if (e.key === 'Escape') {
        target.blur()
      }

      e.preventDefault()
    },
  }
}

export function getNext (el: HTMLElement): void {
  const sibling = (el.nextElementSibling ?? el.parentElement?.firstElementChild) as HTMLElement | undefined

  if (!sibling) return

  if (sibling.tabIndex !== 0) return getNext(sibling)

  sibling.focus()
}

export function getPrev (el: HTMLElement): void {
  const sibling = (el.previousElementSibling ?? el.parentElement?.lastElementChild) as HTMLElement | undefined

  if (!sibling) return

  if (sibling.tabIndex !== 0) return getPrev(sibling)

  sibling.focus()
}
