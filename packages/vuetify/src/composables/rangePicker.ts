// Utilities
import { computed, shallowRef, watch } from 'vue'

// Types
import type { Ref } from 'vue'

/**
 * useRangePicker — a reusable composable for range and multi-selection
 * in picker components (month picker, date picker, etc.).
 *
 * Compatible with v0's createSelection pattern: Set-based selection
 * checks and ticket-like item operations.
 *
 * @param options.multiple - Selection mode: false for single, true for multi, 'range' for range
 * @param options.model - Proxied model ref (array of selected values)
 * @param options.compare - Comparator for range ordering. Negative if a < b, positive if a > b, 0 if equal.
 */
export function useRangePicker <T> (options: {
  multiple: Ref<boolean | 'range' | undefined>
  model: Ref<T[]>
  compare: (a: T, b: T) => number
}) {
  const { multiple, model, compare } = options

  const rangeStart = shallowRef<T>()
  const rangeStop = shallowRef<T>()

  // Preview: tracks the hovered/focused item while building a range
  const previewValue = shallowRef<T>()

  // The effective preview range [start, end] when one anchor is set and user is hovering
  const previewRange = computed<[T, T] | null>(() => {
    if (multiple.value !== 'range') return null
    if (!rangeStart.value || rangeStop.value) return null
    if (!previewValue.value) return null
    const start = rangeStart.value
    const preview = previewValue.value
    if (compare(start, preview) === 0) return null
    return compare(start, preview) < 0
      ? [start, preview]
      : [preview, start]
  })

  // Sync range anchors when model changes externally
  watch(model, val => {
    if (multiple.value !== 'range') return
    if (val.length === 0) {
      rangeStart.value = undefined
      rangeStop.value = undefined
    } else if (val.length === 1) {
      rangeStart.value = val[0]
      rangeStop.value = undefined
    } else if (val.length >= 2) {
      rangeStart.value = val[0]
      rangeStop.value = val[val.length - 1]
    }
  }, { immediate: true })

  const selectedSet = computed(() => new Set(model.value))

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
    const [start, stop] = [model.value[0], model.value[model.value.length - 1]]
    return compare(value, start) >= 0 && compare(value, stop) <= 0
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
      rangeStart.value = undefined
    } else if (model.value.length === 1) {
      rangeStart.value = model.value[0]
      rangeStop.value = undefined
    }

    if (!rangeStart.value) {
      rangeStart.value = value
      model.value = [value]
    } else if (!rangeStop.value) {
      if (compare(value, rangeStart.value as T) === 0) {
        rangeStart.value = undefined
        model.value = []
        return
      } else if (compare(value, rangeStart.value as T) < 0) {
        rangeStop.value = rangeStart.value
        rangeStart.value = value
      } else {
        rangeStop.value = value
      }
      model.value = [rangeStart.value as T, rangeStop.value as T]
    } else {
      // Reset — start new range
      rangeStart.value = value
      rangeStop.value = undefined
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

  function isPreviewedRange (value: T): boolean {
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
    selectedSet,
    isSelected,
    isWithinRange,
    isRangeStart,
    isRangeEnd,
    isRangeMiddle,
    select,
    setPreview,
    clearPreview,
    isPreviewStart,
    isPreviewEnd,
    isPreviewMiddle,
    isPreviewedRange,
  }
}
