// Components
import { incrementMinuteOrSecond, pad } from '@/components/VTimePicker/util'

// Utilities
import { computed, nextTick, ref, watch } from 'vue'

// Types
import type { Ref } from 'vue'
import type { Period } from '@/components/VTimePicker/shared'

type TimeSegment = 'hours' | 'minutes' | 'seconds' | 'period'

export interface UseTimeInputProps {
  modelValue?: string | null
  format?: 'ampm' | '24hr'
  useSeconds?: boolean
  period?: Period
  readonly?: boolean
  disabled?: boolean
  'onUpdate:modelValue'?: ((val: string | null) => void) | undefined
  'onUpdate:period'?: ((val: Period) => void) | undefined
}

export interface UseTimeInputOptions {
  controlRef: Ref<HTMLInputElement | undefined>
}

interface TimeState {
  hours: number | null
  minutes: number | null
  seconds: number | null
}

export function useTimeInput (
  props: UseTimeInputProps,
  options: UseTimeInputOptions
) {
  const { controlRef } = options

  const model = ref(props.modelValue)
  const period = ref(props.period)

  const activeSegment = ref<TimeSegment>('hours')
  const pendingInput = ref<string>('')

  const is12Hour = computed(() => props.format === 'ampm')
  const hasSeconds = computed(() => props.useSeconds)

  const segments = computed<TimeSegment[]>(() => {
    const base: TimeSegment[] = ['hours', 'minutes']
    if (hasSeconds.value) base.push('seconds')
    if (is12Hour.value) base.push('period')
    return base
  })

  // Parse HH:MM:SS format from model value
  const timeState = computed<TimeState>(() => {
    if (!model.value) {
      return { hours: null, minutes: null, seconds: null }
    }

    const parts = model.value.split(':')
    return {
      hours: parts[0] ? parseInt(parts[0], 10) : null,
      minutes: parts[1] ? parseInt(parts[1], 10) : null,
      seconds: parts[2] ? parseInt(parts[2], 10) : null,
    }
  })

  // Display hours (12hr or 24hr format)
  const displayHours = computed(() => {
    const h = timeState.value.hours
    if (h === null) return '--'
    if (is12Hour.value) {
      const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h
      return pad(h12)
    }
    return pad(h)
  })

  const displayMinutes = computed(() => {
    const m = timeState.value.minutes
    return m === null ? '--' : pad(m)
  })

  const displaySeconds = computed(() => {
    const s = timeState.value.seconds
    return s === null ? '--' : pad(s)
  })

  const displayPeriod = computed(() => {
    return period.value?.toUpperCase() ?? '--'
  })

  // Full display value for the input
  const displayValue = computed(() => {
    let value = `${displayHours.value}:${displayMinutes.value}`
    if (hasSeconds.value) {
      value += `:${displaySeconds.value}`
    }
    if (is12Hour.value) {
      value += ` ${displayPeriod.value}`
    }
    return value
  })

  // Get selection range for a segment
  function getSegmentRange (segment: TimeSegment) {
    switch (segment) {
      case 'hours':
        return { start: 0, end: 2 }
      case 'minutes':
        return { start: 3, end: 5 }
      case 'seconds':
        return { start: 6, end: 8 }
      case 'period':
        return {
          start: (hasSeconds.value ? 9 : 6),
          end: (hasSeconds.value ? 11 : 8),
        }
    }
  }

  // Select the active segment in the input
  function selectSegment (segment: TimeSegment) {
    if (activeSegment.value !== segment) {
      pendingInput.value = ''
    }
    activeSegment.value = segment

    nextTick(() => {
      const input = controlRef.value
      if (!input) return

      const range = getSegmentRange(segment)
      input.setSelectionRange(range.start, range.end)
    })
  }

  // Get segment from cursor position
  function getSegmentFromPosition (pos: number): TimeSegment {
    const secondsStart = hasSeconds.value ? 6 : Infinity
    const periodStart = is12Hour.value ? (hasSeconds.value ? 9 : 6) : Infinity

    if (pos < 3) return 'hours'
    if (pos < 6) return 'minutes'
    if (pos < secondsStart + 3 && hasSeconds.value) return 'seconds'
    if (pos >= periodStart && is12Hour.value) return 'period'

    return 'minutes'
  }

  // Move to next/previous segment
  function moveSegment (direction: 'next' | 'prev') {
    const idx = segments.value.indexOf(activeSegment.value)
    if (direction === 'next' && idx < segments.value.length - 1) {
      selectSegment(segments.value[idx + 1])
    } else if (direction === 'prev' && idx > 0) {
      selectSegment(segments.value[idx - 1])
    }
  }

  // Update the model value
  function updateTime (hours: number | null, minutes: number | null, seconds: number | null) {
    if (hours === null || minutes === null) {
      model.value = null
      return
    }

    let value = `${pad(hours)}:${pad(minutes)}`
    if (hasSeconds.value) {
      value += `:${pad(seconds ?? 0)}`
    }
    model.value = value
  }

  // Increment/decrement the active segment
  function increment (direction: 'up' | 'down') {
    const state = timeState.value
    let hours = state.hours
    let minutes = state.minutes ?? 0
    let seconds = state.seconds ?? 0

    switch (activeSegment.value) {
      case 'hours': {
        hours = hours === null ? 0 : hours + (direction === 'up' ? 1 : -1)
        if (hours < 0) hours = 23
        if (hours >= 24) hours = 0
        break
      }
      case 'minutes':
        minutes = incrementMinuteOrSecond(minutes, direction === 'up')
        break
      case 'seconds':
        seconds = incrementMinuteOrSecond(seconds, direction === 'up')
        break
      case 'period':
        period.value = period.value === 'am' ? 'pm' : 'am'
        // Update hours to reflect period change
        if (hours !== null) {
          if (period.value === 'pm' && hours < 12) {
            hours += 12
          } else if (period.value === 'am' && hours >= 12) {
            hours -= 12
          }
        }
        break
    }

    updateTime(hours, minutes, seconds)
    selectSegment(activeSegment.value)
  }

  // Handle numeric input
  function handleNumericInput (digit: string) {
    if (activeSegment.value === 'period') {
      // For period, a/A or p/P toggles
      const lower = digit.toLowerCase()
      if (lower === 'a') {
        period.value = 'am'
        updatePeriodInTime('am')
      } else if (lower === 'p') {
        period.value = 'pm'
        updatePeriodInTime('pm')
      }
      selectSegment('period')
      return
    }

    const num = parseInt(digit, 10)
    if (isNaN(num)) return

    const state = timeState.value
    let hours = state.hours ?? (is12Hour.value ? 12 : 0)
    let minutes = state.minutes ?? 0
    let seconds = state.seconds ?? 0

    const pending = pendingInput.value + digit

    switch (activeSegment.value) {
      case 'hours': {
        const maxFirst = is12Hour.value ? 1 : 2
        const max = is12Hour.value ? 12 : 23

        if (pending.length === 1) {
          if (num > maxFirst) {
            // Single digit that can't have another digit (e.g., 3-9 for 12hr)
            hours = setHours(num)
            pendingInput.value = ''
            moveSegment('next')
          } else {
            pendingInput.value = pending
            hours = setHours(num)
          }
        } else {
          const value = parseInt(pending, 10)
          hours = setHours(Math.min(value, max))
          pendingInput.value = ''
          moveSegment('next')
        }
        break
      }
      case 'minutes':
      case 'seconds': {
        const isMinutes = activeSegment.value === 'minutes'

        if (pending.length === 1) {
          const num = parseInt(pending, 10)
          if (num > 5) {
            // Single digit > 5 auto-advances
            if (isMinutes) minutes = num
            else seconds = num
            pendingInput.value = ''
            moveSegment('next')
          } else {
            pendingInput.value = pending
            if (isMinutes) minutes = num
            else seconds = num
          }
        } else {
          const value = Math.min(parseInt(pending, 10), 59)
          if (isMinutes) minutes = value
          else seconds = value
          pendingInput.value = ''
          moveSegment('next')
        }
        break
      }
    }

    updateTime(hours, minutes, seconds)
    selectSegment(activeSegment.value)
  }

  function setHours (value: number): number {
    if (!is12Hour.value) return value// Single digit
    // Convert 12hr input to 24hr storage
    if (value === 12) {
      return period.value === 'am' ? 0 : 12
    }
    return period.value === 'pm' ? value + 12 : value
  }

  function updatePeriodInTime (newPeriod: Period) {
    const state = timeState.value
    if (state.hours === null) return

    let hours = state.hours
    if (newPeriod === 'pm' && hours < 12) {
      hours += 12
    } else if (newPeriod === 'am' && hours >= 12) {
      hours -= 12
    }
    updateTime(hours, state.minutes ?? 0, state.seconds ?? 0)
  }

  // Event handlers
  function onKeydown (e: KeyboardEvent) {
    if (props.readonly || props.disabled) return

    const input = controlRef.value
    if (!input) return

    if (['Backspace', 'Delete', 'a', 'p', 'A', 'P'].includes(e.key) || e.key.startsWith('Arrow') || /^\d$/.test(e.key)) {
      e.preventDefault()
      e.stopPropagation()
    }

    switch (e.key) {
      case 'ArrowUp': return increment('up')
      case 'ArrowDown': return increment('down')
      case 'ArrowLeft': return moveSegment('prev')
      case 'ArrowRight': return moveSegment('next')
      case 'Tab':
        // Allow natural tab behavior but reset pending
        pendingInput.value = ''
        break
      case 'Backspace':
      case 'Delete': return clearSegment()
      case 'a':
      case 'A':
      case 'p':
      case 'P':
        if (is12Hour.value) {
          handleNumericInput(e.key)
        }
        break
      default:
        if (/^\d$/.test(e.key)) {
          handleNumericInput(e.key)
        }
        break
    }
  }

  function clearSegment () {
    const state = timeState.value
    let hours = state.hours
    let minutes = state.minutes
    let seconds = state.seconds

    switch (activeSegment.value) {
      case 'hours':
        hours = null
        break
      case 'minutes':
        minutes = null
        break
      case 'seconds':
        seconds = null
        break
    }

    pendingInput.value = ''
    updateTime(hours, minutes, seconds)
    selectSegment(activeSegment.value)
  }

  function onClick (_e: MouseEvent) {
    const input = controlRef.value
    if (!input || props.readonly || props.disabled) return

    // Determine which segment was clicked based on cursor position
    nextTick(() => {
      const pos = input.selectionStart ?? 0
      const segment = getSegmentFromPosition(pos)
      selectSegment(segment)
    })
  }

  function onFocus () {
    selectSegment(activeSegment.value)
  }

  function onBlur () {
    pendingInput.value = ''
  }

  // Prevent default input behavior - we handle everything manually
  function onInput (e: Event) {
    e.preventDefault()
    const input = controlRef.value
    if (input) {
      input.value = displayValue.value
      selectSegment(activeSegment.value)
    }
  }

  // Sync period from model value
  watch(() => timeState.value.hours, hours => {
    if (hours !== null && is12Hour.value) {
      period.value = hours >= 12 ? 'pm' : 'am'
    }
  }, { immediate: true })

  return {
    model,
    displayValue,
    activeSegment,
    timeState,
    period,
    onKeydown,
    onClick,
    onFocus,
    onBlur,
    onInput,
    selectSegment,
  }
}

export type UseTimeInput = ReturnType<typeof useTimeInput>
