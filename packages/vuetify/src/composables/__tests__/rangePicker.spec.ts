// Composables
import { useRangePicker } from '../rangePicker'

// Utilities
import { nextTick, ref } from 'vue'

const cmp = (a: number, b: number) => a - b

function make (multiple: boolean | 'range' | undefined = 'range', initial: number[] = []) {
  const model = ref<number[]>(initial)
  const picker = useRangePicker({ multiple: ref(multiple), model, compare: cmp })
  return { model, ...picker }
}

describe('useRangePicker', () => {
  it('isSelected covers the interior of a range, not just endpoints', () => {
    // a Set-based implementation would miss intermediate values
    const { isSelected } = make('range', [2, 8])
    expect(isSelected(2)).toBe(true)
    expect(isSelected(5)).toBe(true) // interior
    expect(isSelected(8)).toBe(true)
    expect(isSelected(9)).toBe(false)
  })

  it('selecting "end" before "start" gets reordered in the model', () => {
    const { model, select } = make()
    select(8)
    select(3)
    expect(model.value).toEqual([3, 8])
  })

  it('clicking the active rangeStart again clears the selection', () => {
    const { model, select } = make()
    select(5)
    select(5)
    expect(model.value).toEqual([])
  })

  it('a third click discards the existing range and starts fresh', () => {
    const { model, select } = make()
    select(2)
    select(8)
    select(5)
    expect(model.value).toEqual([5])
  })

  it('isRangeStart and isRangeEnd require 2+ items in model', () => {
    const { isRangeStart, isRangeEnd, select } = make()
    select(5)
    // single selection in range mode — neither marker should activate
    expect(isRangeStart(5)).toBe(false)
    expect(isRangeEnd(5)).toBe(false)
  })

  it('isRangeMiddle is false for boundary values', () => {
    const { isRangeStart, isRangeEnd, isRangeMiddle } = make('range', [2, 8])
    expect(isRangeMiddle(2)).toBe(false)
    expect(isRangeMiddle(8)).toBe(false)
    expect(isRangeMiddle(5)).toBe(true)
    // verify boundaries are classified correctly
    expect(isRangeStart(2)).toBe(true)
    expect(isRangeEnd(8)).toBe(true)
  })

  it('preview with a value before the anchor normalizes to [preview, start]', () => {
    const { isPreviewStart, isPreviewEnd, isPreviewMiddle, select, setPreview } = make()
    select(7)
    setPreview(3)
    expect(isPreviewStart(3)).toBe(true)
    expect(isPreviewEnd(7)).toBe(true)
    expect(isPreviewMiddle(5)).toBe(true)
  })

  it('external model mutation syncs rangeStart so preview activates', async () => {
    const { model, isPreviewStart, isPreviewEnd, setPreview } = make()
    model.value = [5]
    await nextTick() // watch flush
    setPreview(9)
    expect(isPreviewStart(5)).toBe(true)
    expect(isPreviewEnd(9)).toBe(true)
  })

  it('multiple-mode deselects by comparator, not reference equality', () => {
    const objCmp = (a: { n: number }, b: { n: number }) => a.n - b.n
    const model = ref<{ n: number }[]>([])
    const { select } = useRangePicker({ multiple: ref(true), model, compare: objCmp })
    select({ n: 3 })
    select({ n: 3 }) // different reference, same comparator value
    expect(model.value).toEqual([])
  })

  it('isSelected in single mode uses comparator for object values', () => {
    const objCmp = (a: { n: number }, b: { n: number }) => a.n - b.n
    const model = ref<{ n: number }[]>([{ n: 3 }])
    const { isSelected } = useRangePicker({ multiple: ref(false), model, compare: objCmp })
    expect(isSelected({ n: 3 })).toBe(true) // different ref, same value
    expect(isSelected({ n: 4 })).toBe(false)
  })
})
