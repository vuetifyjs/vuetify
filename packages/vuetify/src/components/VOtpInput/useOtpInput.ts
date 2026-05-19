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

const graphemeSegmenter = /* @__PURE__ */ new Intl.Segmenter(undefined, { granularity: 'grapheme' })

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

  // Selection is kept in code units to line up with `setSelectionRange` and
  // `selectionStart`, but slot count, length, and boundary checks all work in
  // grapheme-cluster space so each rendered glyph occupies one slot. This
  // handles emoji (surrogate pairs), flag sequences (regional indicator pairs),
  // ZWJ sequences (👨‍👩‍👧), skin-tone modifiers, and keycap sequences uniformly.
  function graphemes (s: string): string[] {
    return Array.from(graphemeSegmenter.segment(s), seg => seg.segment)
  }

  function codeUnitsToGraphemeIndex (s: string, pos: number): number {
    let count = 0
    for (const seg of graphemeSegmenter.segment(s)) {
      if (seg.index >= pos) break
      count++
    }
    return count
  }

  function graphemeIndexToCodeUnits (s: string, gIndex: number): number {
    if (gIndex <= 0) return 0
    let count = 0
    for (const seg of graphemeSegmenter.segment(s)) {
      if (count === gIndex) return seg.index
      count++
    }
    return s.length
  }

  const slots = computed((): OtpSlotData[] => {
    const chars = graphemes(value.value)
    const compChars = graphemes(composition.value)
    const place = toValue(placeholder) ?? null
    const sel = selection.value
    const startG = sel ? codeUnitsToGraphemeIndex(value.value, sel.start) : null
    const endG = sel ? codeUnitsToGraphemeIndex(value.value, sel.end) : null
    const compStart = startG ?? chars.length

    return Array.from({ length: length.value }, (_, i) => {
      const char = chars[i] ?? null
      const displayChar = char !== null && isMasked.value ? '•' : char

      let compositionChar: string | null = null
      if (composition.value && i >= compStart) {
        const offset = i - compStart
        const c = compChars[offset]
        if (c != null) compositionChar = isMasked.value ? '•' : c
      }

      const isActive =
        isFocused.value &&
        startG !== null &&
        endG !== null &&
        (
          (startG === endG && i === startG) ||
          (i >= startG && i < endG)
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
    return graphemes(text).filter(c => re.test(c)).join('')
  }

  function clampGraphemes (text: string, max: number): string {
    const chars = graphemes(text)
    if (chars.length <= max) return text
    return chars.slice(0, max).join('')
  }

  function isImeText (text: string): boolean {
    return IME_SCRIPT_RE.test(text)
  }

  function setValue (text: string): string {
    const next = clampGraphemes(filter(text), length.value)
    value.value = next
    return next
  }

  function insert (text: string, range?: { start: number, end: number }): string {
    const current = value.value
    const start = range?.start ?? current.length
    const end = range?.end ?? current.length
    const filtered = filter(text)
    const next = clampGraphemes(current.slice(0, start) + filtered + current.slice(end), length.value)
    value.value = next

    const insertEnd = Math.min(start + filtered.length, next.length)
    const insertEndG = codeUnitsToGraphemeIndex(next, insertEnd)
    const cursorG = Math.min(insertEndG, length.value - 1)
    const cursor = graphemeIndexToCodeUnits(next, cursorG)
    setSelection(cursor, insertEnd, 'forward')
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
    const value_ = value.value
    const graphemeCount = graphemes(value_).length
    let start: number
    let end: number
    if (graphemeCount >= length.value) {
      // Full: range over the last slot (so it renders as active).
      start = graphemeIndexToCodeUnits(value_, length.value - 1)
      end = value_.length
    } else {
      // Partial: single caret at the end of the typed content.
      start = value_.length
      end = value_.length
    }
    const next: OtpSelection = { start, end, direction: 'forward' }
    selection.value = next
    prevSelection = next
    return next
  }

  function selectSlot (index: number): OtpSelection {
    const value_ = value.value
    const graphemeCount = graphemes(value_).length
    const clamped = Math.min(index, graphemeCount)
    // Caller passes a slot/grapheme index; convert to code-unit positions so
    // the selection range covers the right glyph (not a slice mid-grapheme).
    const start = graphemeIndexToCodeUnits(value_, clamped)
    const end = clamped < graphemeCount
      ? graphemeIndexToCodeUnits(value_, clamped + 1)
      : value_.length
    const next: OtpSelection = { start, end, direction: 'forward' }
    selection.value = next
    prevSelection = next
    return next
  }

  // Selection synthesis: forces the rendered selection to always cover at least
  // one slot, so a slot is "active" when a caret would otherwise be between two.
  // All boundary checks run in grapheme space (= slot space) so each rendered
  // glyph is one slot; the final selection is returned in code units to match
  // `setSelectionRange`.
  function syncSelection (raw: OtpSelectionInput): OtpSelection | null {
    if (isComposing.value) return selection.value

    const { value: inputValue, selectionStart, selectionEnd, selectionDirection, maxLength } = raw

    if (selectionStart === null || selectionEnd === null) {
      selection.value = null
      prevSelection = null
      return null
    }

    const valueG = graphemes(inputValue).length
    const startG = codeUnitsToGraphemeIndex(inputValue, selectionStart)
    const endG = codeUnitsToGraphemeIndex(inputValue, selectionEnd)

    let outStartG = -1
    let outEndG = -1
    let direction: 'forward' | 'backward' | 'none' | undefined

    if (valueG !== 0) {
      const isSingleCaret = startG === endG
      const isInsertMode = startG === valueG && valueG < maxLength

      if (isSingleCaret && !isInsertMode) {
        if (startG === 0) {
          outStartG = 0
          outEndG = 1
          direction = 'forward'
        } else if (startG === maxLength) {
          outStartG = startG - 1
          outEndG = startG
          direction = 'backward'
        } else if (maxLength > 1 && valueG > 1) {
          let offset = 0
          if (prevSelection !== null) {
            const prevStartG = codeUnitsToGraphemeIndex(inputValue, prevSelection.start)
            const prevEndG = codeUnitsToGraphemeIndex(inputValue, prevSelection.end)
            direction = startG < prevEndG ? 'backward' : 'forward'
            const wasPreviouslyInserting = prevStartG === prevEndG && prevStartG < maxLength
            if (direction === 'backward' && !wasPreviouslyInserting) {
              offset = -1
            }
          }
          outStartG = offset + startG
          outEndG = offset + startG + 1
        }
      }
    }

    const finalStartG = outStartG !== -1 ? outStartG : startG
    const finalEndG = outEndG !== -1 ? outEndG : endG
    const finalStart = graphemeIndexToCodeUnits(inputValue, finalStartG)
    const finalEnd = graphemeIndexToCodeUnits(inputValue, finalEndG)
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
