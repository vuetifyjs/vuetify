// Utilities
import { shallowRef, toValue } from 'vue'
import { clamp, isUndefined, useRovingFocus } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'

export interface ColumnFocusOptions {
  disabled?: MaybeRefOrGetter<boolean>
  rtl?: MaybeRefOrGetter<boolean>
}

export function useColumnFocus (lengths: () => readonly number[], options: ColumnFocusOptions = {}) {
  const containerEl = shallowRef<HTMLElement>()
  const elements = new Map<string, HTMLElement>()
  const rovingFocus = useRovingFocus(() => lengths().flatMap((length, column) => Array.from({ length }, (_, row) => {
    const id = `${column}-${row}`

    return {
      id,
      el: elements.get(id),
      disabled: toValue(options.disabled),
    }
  })))

  function focus (column: number, row: number) {
    const length = lengths()[column]
    if (length) rovingFocus.focus(`${column}-${clamp(row, 0, length - 1)}`)
  }

  // Columns flex-wrap, so lines are only known from layout
  function closestColumnOnLine (column: number, direction: 1 | -1) {
    const columns = Array.from(containerEl.value!.children) as HTMLElement[]
    const current = columns[column]
    const center = (el: HTMLElement) => el.offsetLeft + el.offsetWidth / 2
    const closest = columns
      .filter(el => Math.sign(el.offsetTop - current.offsetTop) === direction)
      .sort((a, b) =>
        Math.abs(a.offsetTop - current.offsetTop) - Math.abs(b.offsetTop - current.offsetTop) ||
        Math.abs(center(a) - center(current)) - Math.abs(center(b) - center(current))
      )[0]

    return closest ? columns.indexOf(closest) : -1
  }

  function onKeydown (e: KeyboardEvent) {
    const id = rovingFocus.focusedId.value
    if (isUndefined(id)) return

    const [column, row] = String(id).split('-').map(Number)
    const length = lengths()[column]

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowRight': {
        const step = (e.key === 'ArrowRight') === !!toValue(options.rtl) ? -1 : 1
        focus(column + step, row)
        break
      }
      case 'ArrowUp':
        if (row > 0) focus(column, row - 1)
        else focus(closestColumnOnLine(column, -1), Infinity)
        break
      case 'ArrowDown':
        if (row < length - 1) focus(column, row + 1)
        else focus(closestColumnOnLine(column, 1), 0)
        break
      case 'Home': rovingFocus.first(); break
      case 'End': rovingFocus.last(); break
      default: return
    }

    e.preventDefault()
  }

  function isTabbable (column: number, row: number) {
    return rovingFocus.isTabbable(`${column}-${row}`)
  }

  function onFocus (column: number, row: number) {
    rovingFocus.focusedId.value = `${column}-${row}`
  }

  function register (column: number, row: number) {
    return (el: unknown) => {
      if (el instanceof HTMLElement) elements.set(`${column}-${row}`, el)
      else elements.delete(`${column}-${row}`)
    }
  }

  return { containerEl, onKeydown, isTabbable, onFocus, register }
}
