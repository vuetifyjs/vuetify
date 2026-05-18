// Utilities
import { computed, shallowRef } from 'vue'

// Types
import type { Ref } from 'vue'

export interface RangePickerOptions<T> {
  multiple: Readonly<Ref<boolean | 'range' | undefined>>
  model: Ref<readonly T[]>
  compare: (a: T, b: T) => number
  normalizeEnd?: (value: T) => T
}

export function useRangePicker <T> ({ multiple, model, compare, normalizeEnd = (v: T) => v }: RangePickerOptions<T>) {
  const rangeStart = computed(() => model.value.length >= 1 ? model.value[0] : undefined)
  const rangeEnd = computed(() => model.value.length >= 2 ? model.value[model.value.length - 1] : undefined)
  const previewValue = shallowRef<T>()

  const previewRange = computed<[T, T] | null>(() => {
    if (multiple.value !== 'range') return null
    if (!rangeStart.value || rangeEnd.value) return null
    if (!previewValue.value) return null
    const start = rangeStart.value
    const preview = previewValue.value
    if (compare(start, preview) === 0) return null
    return compare(start, preview) < 0
      ? [start, preview]
      : [preview, start]
  })

  function isSelected (value: T): boolean {
    if (multiple.value === 'range' && model.value.length === 2) {
      return isWithinRange(value)
    }
    for (const v of model.value) {
      if (compare(v, value) === 0) return true
    }
    return false
  }

  function isWithinRange (value: T): boolean {
    if (multiple.value !== 'range' || model.value.length < 2) return false
    const [start, end] = [model.value[0], model.value[model.value.length - 1]]
    return compare(value, start) >= 0 && compare(value, end) <= 0
  }

  function isRangeStart (value: T): boolean {
    if (multiple.value !== 'range' || model.value.length < 2) return false
    return compare(value, model.value[0]) === 0
  }

  function isRangeEnd (value: T): boolean {
    if (multiple.value !== 'range' || model.value.length < 2) return false
    return compare(value, model.value[model.value.length - 1]) === 0
  }

  function isRangeMiddle (value: T): boolean {
    return isWithinRange(value) && !isRangeStart(value) && !isRangeEnd(value)
  }

  function select (value: T): void {
    if (multiple.value === 'range') {
      onRangeSelect(value)
    } else if (multiple.value) {
      onMultipleSelect(value)
    } else {
      model.value = [value]
    }
  }

  function onRangeSelect (value: T): void {
    if (model.value.length === 0) {
      model.value = [value]
    } else if (model.value.length === 1) {
      const start = model.value[0]
      if (compare(value, start) === 0) {
        model.value = []
      } else if (compare(value, start) < 0) {
        model.value = [value, normalizeEnd(start)]
      } else {
        model.value = [start, normalizeEnd(value)]
      }
    } else {
      model.value = [value]
    }
  }

  function setPreview (value: T | undefined): void {
    previewValue.value = value
  }

  function clearPreview (): void {
    previewValue.value = undefined
  }

  function isPreviewStart (value: T): boolean {
    const range = previewRange.value
    if (!range) return false
    return compare(value, range[0]) === 0
  }

  function isPreviewEnd (value: T): boolean {
    const range = previewRange.value
    if (!range) return false
    return compare(value, range[1]) === 0
  }

  function isPreviewMiddle (value: T): boolean {
    const range = previewRange.value
    if (!range) return false
    return compare(value, range[0]) > 0 && compare(value, range[1]) < 0
  }

  function isInPreviewRange (value: T): boolean {
    return isPreviewStart(value) || isPreviewEnd(value) || isPreviewMiddle(value)
  }

  function onMultipleSelect (value: T): void {
    const index = model.value.findIndex(v => compare(v, value) === 0)
    if (index === -1) {
      model.value = [...model.value, value]
    } else {
      const copy = [...model.value]
      copy.splice(index, 1)
      model.value = copy
    }
  }

  return {
    isSelected,
    isRangeStart,
    isRangeEnd,
    isRangeMiddle,
    select,
    setPreview,
    clearPreview,
    isPreviewStart,
    isPreviewEnd,
    isPreviewMiddle,
    isInPreviewRange,
  }
}
