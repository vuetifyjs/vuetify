// to be replaced by v0 implementation in v5.0

// Utilities
import { computed, shallowRef, toRef, toValue } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'

export interface OtpSlotData {
  char: string | null
  compositionChar: string | null
  placeholderChar: string | null
  isActive: boolean
  hasFakeCaret: boolean
}

export interface OtpSelection {
  start: number
  end: number
  direction: 'forward' | 'backward' | 'none'
}

export interface OtpSelectionInput {
  value: string
  selectionStart: number | null
  selectionEnd: number | null
  selectionDirection: 'forward' | 'backward' | 'none' | null
  maxLength: number
}

export const OtpInputPatterns = {
  numeric: /[0-9]/,
  alpha: /[a-zA-Z]/,
  alphanumeric: /[a-zA-Z0-9]/,
  'unicode-alpha': /\p{L}/u,
  'unicode-alphanumeric': /[\p{L}\p{N}]/u,
} as const

export type OtpInputPattern = keyof typeof OtpInputPatterns

const IME_SCRIPT_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Bopomofo}]/u

export interface OtpInputOptions {
  value: Ref<string>
  length?: MaybeRefOrGetter<number>
  pattern?: MaybeRefOrGetter<OtpInputPattern | RegExp | null | undefined>
  type?: MaybeRefOrGetter<'text' | 'password' | 'number'>
  masked?: MaybeRefOrGetter<boolean>
  placeholder?: MaybeRefOrGetter<string | null | undefined>
  isFocused?: Ref<boolean>
}

export interface OtpInputContext {
  value: Ref<string>
  length: Readonly<Ref<number>>
  slots: Readonly<Ref<OtpSlotData[]>>
  selection: Readonly<Ref<OtpSelection | null>>
  composition: Readonly<Ref<string>>
  isComposing: Readonly<Ref<boolean>>
  isFocused: Ref<boolean>
  effectivePattern: Readonly<Ref<RegExp | null>>
  inputMode: Readonly<Ref<'numeric' | 'text'>>

  filter: (text: string) => string
  isImeText: (text: string) => boolean

  setValue: (text: string) => string
  insert: (text: string, range?: { start: number, end: number }) => string
  deleteRange: (start: number, end: number) => string
  bulkDelete: (isBackward: boolean) => string

  syncSelection: (raw: OtpSelectionInput) => OtpSelection | null
  setSelection: (start: number | null, end: number | null, direction?: 'forward' | 'backward' | 'none') => void
  clearSelection: () => void
  selectAtEnd: () => OtpSelection
  selectSlot: (index: number) => OtpSelection

  startComposition: () => void
  updateComposition: (data: string) => void
  endComposition: () => void

  reset: () => void
}

export function useOtpInput (options: OtpInputOptions): OtpInputContext {
  const {
    value,
    length: _length = 6,
    pattern,
    type = 'number',
    masked = false,
    placeholder,
    isFocused = shallowRef(false),
  } = options

  const selection = shallowRef<OtpSelection | null>(null)
  const composition = shallowRef('')
  const isComposing = shallowRef(false)
  let prevSelection: OtpSelection | null = null

  const length = toRef(() => Number(toValue(_length)))
  const isMasked = toRef(() => toValue(masked) || toValue(type) === 'password')
  const effectivePattern = toRef((): RegExp | null => {
    const p = toValue(pattern)
    if (p instanceof RegExp) return p
    if (p != null) return OtpInputPatterns[p as OtpInputPattern] ?? null
    if (toValue(type) === 'number') return OtpInputPatterns.numeric
    return null
  })
  const inputMode = toRef(() =>
    effectivePattern.value === OtpInputPatterns.numeric ? 'numeric' as const : 'text' as const
  )

  const slots = computed((): OtpSlotData[] => {
    const compStart = selection.value?.start ?? value.value.length
    const place = toValue(placeholder) ?? null
    return Array.from({ length: length.value }, (_, i) => {
      const char = value.value[i] ?? null
      const displayChar = char !== null && isMasked.value ? '•' : char

      let compositionChar: string | null = null
      if (composition.value && i >= compStart) {
        const offset = i - compStart
        const c = composition.value[offset]
        if (c != null) compositionChar = isMasked.value ? '•' : c
      }

      const sel = selection.value
      const isActive =
        isFocused.value &&
        sel !== null &&
        (
          (sel.start === sel.end && i === sel.start) ||
          (i >= sel.start && i < sel.end)
        )

      return {
        char: displayChar,
        compositionChar,
        placeholderChar: place,
        isActive,
        hasFakeCaret: isActive && char === null && compositionChar === null,
      }
    })
  })

  function filter (text: string): string {
    const re = effectivePattern.value
    if (!re) return text
    return text.split('').filter(c => re.test(c)).join('')
  }

  function isImeText (text: string): boolean {
    return IME_SCRIPT_RE.test(text)
  }

  function setValue (text: string): string {
    const next = filter(text).slice(0, length.value)
    value.value = next
    return next
  }

  function insert (text: string, range?: { start: number, end: number }): string {
    const current = value.value
    const start = range?.start ?? current.length
    const end = range?.end ?? current.length
    const filtered = filter(text)
    const next = (current.slice(0, start) + filtered + current.slice(end)).slice(0, length.value)
    value.value = next

    const insertEnd = start + filtered.length
    const cursor = Math.min(insertEnd, length.value - 1)
    const newEnd = Math.min(insertEnd, next.length)
    setSelection(cursor, newEnd, 'forward')
    return next
  }

  function deleteRange (start: number, end: number): string {
    const current = value.value
    const next = current.slice(0, start) + current.slice(end)
    value.value = next
    const newEnd = Math.min(start + 1, next.length)
    setSelection(start, newEnd, 'forward')
    return next
  }

  function bulkDelete (isBackward: boolean): string {
    const current = value.value
    const sel = selection.value
    const next = isBackward
      ? current.slice(sel?.end ?? current.length)
      : current.slice(0, sel?.start ?? 0)
    value.value = next

    if (next.length === 0) setSelection(0, 0, 'none')
    else if (isBackward) setSelection(0, 1, 'forward')
    else setSelection(next.length, next.length, 'none')
    return next
  }

  function setSelection (
    start: number | null,
    end: number | null,
    direction: 'forward' | 'backward' | 'none' = 'none'
  ): void {
    if (start === null || end === null) {
      selection.value = null
      return
    }
    const next: OtpSelection = { start, end, direction }
    selection.value = next
    prevSelection = next
  }

  function clearSelection (): void {
    selection.value = null
  }

  function selectAtEnd (): OtpSelection {
    const start = Math.min(value.value.length, length.value - 1)
    const end = value.value.length
    const next: OtpSelection = { start, end, direction: 'forward' }
    selection.value = next
    prevSelection = next
    return next
  }

  function selectSlot (index: number): OtpSelection {
    const clamped = Math.min(index, value.value.length)
    const end = Math.min(clamped + 1, value.value.length)
    const next: OtpSelection = { start: clamped, end, direction: 'forward' }
    selection.value = next
    prevSelection = next
    return next
  }

  // Selection synthesis: forces the rendered selection to always cover at least
  // one character so a slot is "active" when a caret would otherwise be between two.
  function syncSelection (raw: OtpSelectionInput): OtpSelection | null {
    if (isComposing.value) return selection.value

    const { value: inputValue, selectionStart, selectionEnd, selectionDirection, maxLength } = raw

    let start = -1
    let end = -1
    let direction: 'forward' | 'backward' | 'none' | undefined

    if (inputValue.length !== 0 && selectionStart !== null && selectionEnd !== null) {
      const isSingleCaret = selectionStart === selectionEnd
      const isInsertMode = selectionStart === inputValue.length && inputValue.length < maxLength

      if (isSingleCaret && !isInsertMode) {
        if (selectionStart === 0) {
          start = 0
          end = 1
          direction = 'forward'
        } else if (selectionStart === maxLength) {
          start = selectionStart - 1
          end = selectionStart
          direction = 'backward'
        } else if (maxLength > 1 && inputValue.length > 1) {
          let offset = 0
          if (prevSelection !== null) {
            direction = selectionStart < prevSelection.end ? 'backward' : 'forward'
            const wasPreviouslyInserting = prevSelection.start === prevSelection.end && prevSelection.start < maxLength
            if (direction === 'backward' && !wasPreviouslyInserting) {
              offset = -1
            }
          }
          start = offset + selectionStart
          end = offset + selectionStart + 1
        }
      }
    }

    if (selectionStart === null || selectionEnd === null) {
      selection.value = null
      prevSelection = null
      return null
    }

    const finalStart = start !== -1 ? start : selectionStart
    const finalEnd = end !== -1 ? end : selectionEnd
    const finalDirection = direction ?? selectionDirection ?? 'none'

    const next: OtpSelection = { start: finalStart, end: finalEnd, direction: finalDirection }
    selection.value = next
    prevSelection = next
    return next
  }

  function startComposition (): void {
    isComposing.value = true
    composition.value = ''
  }

  function updateComposition (data: string): void {
    composition.value = IME_SCRIPT_RE.test(data) ? data : ''
  }

  function endComposition (): void {
    isComposing.value = false
    composition.value = ''
  }

  function reset (): void {
    value.value = ''
    selection.value = null
    composition.value = ''
    isComposing.value = false
    prevSelection = null
  }

  return {
    value,
    length,
    slots,
    selection,
    composition,
    isComposing,
    isFocused,
    effectivePattern,
    inputMode,

    filter,
    isImeText,

    setValue,
    insert,
    deleteRange,
    bulkDelete,

    syncSelection,
    setSelection,
    clearSelection,
    selectAtEnd,
    selectSlot,

    startComposition,
    updateComposition,
    endComposition,

    reset,
  }
}
