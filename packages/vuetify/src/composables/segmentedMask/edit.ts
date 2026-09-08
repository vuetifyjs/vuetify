// Utilities
import { shallowRef, toValue } from 'vue'
import { clamp } from '@/util'

// Types
import type { MaybeRefOrGetter } from 'vue'
import type { MaskEdit } from './types'

// sections have a fixed width, so typing inside one overwrites instead of shifting
export function overtype (text: string, start: number, typed: string, rtl = false, moved = false) {
  const chars = [...text]
  const isDigit = (index: number) => /\d/.test(chars[index] ?? '')
  let caret = start
  let wrote = -1

  // a caret the user put between sections is typed into the one it follows, an rtl field fills those in front
  if (rtl && moved && caret && !isDigit(caret) && isDigit(caret - 1)) caret--

  for (const char of typed) {
    // the period is not a section, typing a or p flips it in place
    const period = chars.length - 2
    if (/[ap]/i.test(char) && /[ap]/i.test(chars[period] ?? '') && chars[period + 1]?.toLowerCase() === 'm') {
      chars[period] = char.toUpperCase()
      caret = chars.length
      continue
    }

    while (caret < chars.length && !isDigit(caret)) {
      caret++
    }

    if (!/\d/.test(char)) {
      // a typed separator jumps to the next section, from the start of one it has nothing to close
      if (caret && isDigit(caret - 1)) {
        while (caret < chars.length && isDigit(caret)) {
          caret++
        }
      }
    } else if (caret < chars.length) {
      chars[caret] = char
      wrote = caret++
    }
  }

  // the caret steps over the separator on its own, unless the mask is the one handing it
  if (!rtl) {
    while (caret < chars.length && !isDigit(caret)) {
      caret++
    }
  }

  return {
    value: chars.join(''),
    caret,
    wrote,
  }
}

function sectionAt (text: string, at: number) {
  let start = at
  let end = at

  while (start && /\d/.test(text[start - 1])) start--
  while (end < text.length && /\d/.test(text[end])) end++

  return {
    start,
    end,
  }
}

// deleting takes out digits but leaves the separators, so the sections keep their place
function keepSeparators (previous: string, start: number, removed: number, after: boolean) {
  const cut = previous.slice(start, start + removed)
  const tail = previous.slice(start + removed)
  const kept = /\d/.test(tail) ? cut.replace(/\d/g, '') : ''
  const value = previous.slice(0, start) + kept + tail

  return {
    value: /\d/.test(value) ? value : '',
    // a separator that survived the delete is stepped over instead of removed
    caret: after ? start + kept.length : start,
  }
}

// an emptied section is retyped from its start, which an rtl value only reads back for a whole one
function canReplay (value: string, start: number, end: number, rtl: boolean) {
  return !rtl || !(/\d/.test(value[start - 1] ?? '') || /\d/.test(value[end] ?? ''))
}

export function createSegmentedEdit (
  mask: MaskEdit,
  separator: MaybeRefOrGetter<string>,
  isRtl?: MaybeRefOrGetter<boolean>,
) {
  const text = shallowRef('')
  let edit: { value: string, start: number, end: number } | undefined
  // the caret the mask handed over last, anywhere else the user put it there
  let placed: number | undefined

  function onBeforeinput (e: InputEvent) {
    const inputElement = e.target as HTMLInputElement

    edit = { value: inputElement.value, start: inputElement.selectionStart ?? 0, end: inputElement.selectionEnd ?? 0 }
  }

  function apply (el: HTMLInputElement, next: { value: string, caret: number }) {
    if (next.value !== el.value) el.value = next.value
    if (next.caret !== el.selectionStart) el.setSelectionRange(next.caret, next.caret)

    placed = next.caret
    text.value = el.value
  }

  // the arrow the value grows towards closes the section being typed, like the separator key does
  function onKeydown (e: KeyboardEvent) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    const inputElement = e.target as HTMLInputElement
    const caret = inputElement.selectionStart ?? 0

    if (!step || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || caret !== inputElement.selectionEnd) {
      return
    }

    const rtl = !!toValue(isRtl)
    // an rtl section grows in front of its separator, with the caret still behind its digits
    const ahead = rtl ? inputElement.value.slice(0, caret) : inputElement.value.slice(caret)
    const grows = (rtl ? step < 0 : step > 0) && !(rtl ? /\D/ : /\d/).test(ahead)
    const at = rtl ? 0 : caret

    const next = grows
      ? mask(inputElement.value.slice(0, at) + toValue(separator) + inputElement.value.slice(at), rtl ? 0 : caret + 1)
      // elsewhere the caret only moves, the mask settles the section it leaves behind
      : mask(inputElement.value, clamp(caret + step, 0, inputElement.value.length))

    if (next.value === inputElement.value) {
      return // with nothing to close or settle the caret moves on its own
    }

    e.preventDefault()
    apply(inputElement, next)
  }

  function typeIn (state: { value: string, caret: number }, char: string, moved = false) {
    const { value, caret } = state
    const shaped = mask(value)
    const rtl = !!toValue(isRtl)

    // sections of an rtl field fill towards the front, where the mask parks the caret
    // with every section filled nothing grows, and what is typed overwrites wherever the caret sits
    const grows = !rtl ? value.length : shaped.complete ? -1 : shaped.caret
    // a value the mask would rewrite has no sections to overwrite, e.g. after a backspace
    // and one that can still take another digit is edited by inserting, e.g. after a delete
    const isInside = caret !== grows &&
      // an emptied section is typed into, only the digits around it are overwritten
      (!shaped.gaps || /\d/.test(value[caret])) &&
      shaped.value === value &&
      mask(value + '0').value !== value + '0'

    if (isInside) {
      // an rtl field hands the caret to the section in front of the value, which the mask knows
      const { value: overtyped, caret: at, wrote } = overtype(value, caret, char, rtl, moved)

      // the mask has the last word on the sections the overwrite made invalid, e.g. February 31st
      const next = mask(overtyped, at, true)

      if (wrote < 0 || next.value.length !== overtyped.length || next.value[wrote] === overtyped[wrote]) {
        return next
      }

      // a section that cannot hold what was typed into it starts over with it, e.g. 9 over a 12 is September
      const { start, end } = sectionAt(overtyped, wrote)

      return mask(overtyped.slice(0, start) + overtyped[wrote] + overtyped.slice(end), start + 1, true)
    }

    const insert = (at: number) => mask(value.slice(0, at) + char + value.slice(at), at + char.length)
    const digits = (text: string) => text.replace(/\D/g, '').length
    const inPlace = insert(caret)

    // two separators in a row hold an empty section, what the section behind it cannot take goes inside
    return shaped.gaps && /^\D\D/.test(value.slice(caret)) && digits(inPlace.value) <= digits(value)
      ? insert(caret + 1)
      : inPlace
  }

  function onInput (e: InputEvent) {
    const inputElement = e.target as HTMLInputElement
    const previous = edit?.value ?? ''
    const removed = previous.length - inputElement.value.length

    if (e.isComposing) {
      text.value = inputElement.value
      return
    }

    if (e.inputType?.startsWith('delete') && edit && removed > 0) {
      const collapsed = edit.start === edit.end
      const forward = collapsed && !!e.inputType.includes('Forward')

      apply(inputElement, keepSeparators(previous, collapsed && !forward ? edit.start - removed : edit.start, removed, forward))
      return
    }

    // what the browser has put in, read back out of the value it landed in
    const typed = edit
      ? inputElement.value.slice(edit.start, inputElement.value.length - previous.length + edit.end)
      : ''

    if (edit &&
      edit.start !== edit.end &&
      e.inputType?.startsWith('insert') &&
      canReplay(previous, edit.start, edit.end, !!toValue(isRtl))
    ) {
      // a substitution empties the sections it covers first, then takes the characters one at a time
      const emptied = keepSeparators(previous, edit.start, edit.end - edit.start, false)
      const next = [...typed].reduce((state, char) => typeIn(state, char), emptied)
      apply(inputElement, next)
      return
    }

    const state = { value: previous, caret: edit?.start ?? previous.length }
    const next = typeIn(state, typed, edit?.start !== placed)
    apply(inputElement, next)
  }

  return {
    onBeforeinput,
    onInput,
    onKeydown,
    text,
  }
}
