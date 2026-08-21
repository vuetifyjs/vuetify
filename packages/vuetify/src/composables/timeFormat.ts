// Composables
import { maskSegments, timeSegments } from '@/composables/segmentedMask'

// Utilities
import { toRef, toValue } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { MaybeRefOrGetter, PropType } from 'vue'
import type { Segment } from '@/composables/segmentedMask'

export interface TimeFormatProps {
  useSeconds?: boolean
  format?: 'ampm' | '24hr'
}

export const makeTimeFormatProps = propsFactory({
  useSeconds: Boolean,
  format: {
    type: String as PropType<'ampm' | '24hr'>,
    default: '24hr',
  },
}, 'time-format')

function pad (value: number) {
  return String(value).padStart(2, '0')
}

export function withPeriod (masked: string, raw: string, hour12: boolean) {
  if (!hour12 || !/\d\d:\d\d(:\d\d)?$/.test(masked)) return masked
  const period = raw.match(/([ap])[^ap]*$/i)
  return period ? `${masked} ${period[1].toUpperCase()}M` : masked
}

export function useTimeFormat (props: MaybeRefOrGetter<TimeFormatProps>) {
  const options = toRef(() => {
    const value = toValue(props)
    return {
      useSeconds: !!value.useSeconds,
      hour12: value.format === 'ampm',
    }
  })

  const segments = toRef((): Segment[] => timeSegments(options.value))

  const parserFormat = toRef(() => {
    let format = 'hh:mm'
    if (options.value.useSeconds) format += ':ss'
    if (options.value.hour12) format += ' aa'
    return format
  })

  function maskTime (input: string) {
    const text = input.trimStart()
    return withPeriod(maskSegments(segments.value, text.replace(/[^\d:]/g, '')), text, options.value.hour12)
  }

  function parseTime (text: string): string | null {
    const match = text.trim().match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?(?:\s*([ap])m?)?$/i)
    if (!match) return null

    let hours = Number(match[1])
    const minutes = Number(match[2])
    const seconds = match[3] != null ? Number(match[3]) : 0
    const period = match[4]?.toLowerCase()

    if (options.value.hour12) {
      if (hours < 1 || hours > 12) return null
      if (period === 'p' && hours < 12) hours += 12
      if (period === 'a' && hours === 12) hours = 0
    } else if (hours > 23) {
      return null
    }

    if (minutes > 59 || seconds > 59) return null
    if (options.value.useSeconds) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
    return `${pad(hours)}:${pad(minutes)}`
  }

  function formatTime (value: string | null | undefined) {
    if (!value) return ''
    const [hoursText, minutes = '00', seconds = '00'] = value.split(':')
    let hours = Number(hoursText)
    if (Number.isNaN(hours)) return ''

    if (options.value.hour12) {
      const period = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12
      const body = options.value.useSeconds
        ? `${pad(hours)}:${minutes}:${seconds}`
        : `${pad(hours)}:${minutes}`
      return `${body} ${period}`
    }

    return options.value.useSeconds
      ? `${pad(hours)}:${minutes}:${seconds}`
      : `${pad(hours)}:${minutes}`
  }

  function isValid (text: string) {
    return !!parseTime(text)
  }

  return {
    segments,
    parserFormat,
    maskTime,
    parseTime,
    formatTime,
    isValid,
  }
}
