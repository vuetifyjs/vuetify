// Components
import { convert12to24, convert24to12, pad } from '@/components/VTimePicker/util'

// Composables
import { useLocale } from '@/composables/locale'
import { maskSegmentsFrom, remainingHint, timeSegments, toMaskSource } from '@/composables/segmentedMask'

// Utilities
import { shallowRef, toRef, toValue } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Period } from '@/components/VTimePicker/shared'
import type { Segment } from '@/composables/segmentedMask'

const rtlScript = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thaana}]/u

export interface TimeFormatProps {
  format?: 'ampm' | '24hr'
  useSeconds?: boolean
}

export interface TimeFormatPrefix {
  segments: Segment[]
  hint: string
}

export function useTimeFormat (
  props: TimeFormatProps,
  locale: Ref<string>,
  // sections typed in front of the time, e.g. the date of VDateTimeInput
  prefix?: MaybeRefOrGetter<TimeFormatPrefix | undefined>,
) {
  const { t } = useLocale()

  const period = shallowRef<Period | null>(null)

  const hour12 = toRef(() => {
    if (props.format) return props.format === 'ampm'

    try {
      return !!new Intl.DateTimeFormat(locale.value || 'en-US', { hour: 'numeric' }).resolvedOptions().hour12
    } catch {
      return true
    }
  })

  const periodFormat = toRef(() => {
    const labels: Record<Period, string> = {
      am: t('$vuetify.timePicker.am'),
      pm: t('$vuetify.timePicker.pm'),
    }
    let leading = false
    let gap = ' '

    try {
      const parts = new Intl.DateTimeFormat(locale.value || 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        .formatToParts(new Date(2000, 0, 1, 13))
      const at = parts.findIndex(part => part.type === 'dayPeriod')

      leading = at < parts.findIndex(part => part.type === 'hour')

      const literal = parts[leading ? at + 1 : at - 1]

      gap = literal?.type === 'literal' ? literal.value.replace(/[\u200e\u200f]/g, '').replace(/\s/g, ' ') : ''
    } catch {}

    // the input runs left to right, a right-to-left label lands on the other side of the digits
    if (rtlScript.test(labels.am + labels.pm)) leading = !leading

    const [am, pm] = [labels.am, labels.pm].map(label => [...label.toLowerCase()][0])
    const keys: Record<string, Period> = { a: 'am', p: 'pm', ...am !== pm ? { [am]: 'am', [pm]: 'pm' } : {} }

    return { labels, leading, gap, keys }
  })

  const timeOnly = toRef(() => timeSegments({ hour12: hour12.value, useSeconds: props.useSeconds }))

  // unlike the date hint, the native time input does not name its fields
  const timeHint = toRef(() => timeOnly.value
    .map(segment => segment.type === 'separator' ? segment.value : '-'.repeat(segment.size))
    .join(''))

  const front = toRef(() => toValue(prefix))

  const segments = toRef((): Segment[] => front.value
    ? [...front.value.segments, { type: 'separator', value: ' ' }, ...timeOnly.value]
    : timeOnly.value)

  const digitsHint = toRef(() => front.value ? `${front.value.hint} ${timeHint.value}` : timeHint.value)

  // the prefix keeps its separators and the period labels go, even when they sit between the date and the time
  const noise = toRef(() => front.value ? /\s*\p{L}[^\d\s]*|[^\d\s:/.-]/gu : /[^\d:]/g)

  const placeholder = toRef(() => {
    const digits = timeHint.value
    const time = !hour12.value ? digits : periodFormat.value.leading ? `-- ${digits}` : `${digits} --`

    return front.value ? `${front.value.hint} ${time}` : time
  })

  function withPeriod (digits: string, value: Period) {
    const { labels, leading, gap } = periodFormat.value

    return leading ? labels[value] + gap + digits : digits + gap + labels[value]
  }

  // a period letter typed anywhere wins over the label already in the text
  function readPeriod (text: string): Period | null {
    const { labels, keys } = periodFormat.value
    const lower = text.toLowerCase()
    const rest = lower.replaceAll(labels.am.toLowerCase(), '').replaceAll(labels.pm.toLowerCase(), '')
    const typed = [...rest].findLast(char => keys[char])

    if (typed) return keys[typed]
    if (lower.includes(labels.pm.toLowerCase())) return 'pm'
    if (lower.includes(labels.am.toLowerCase())) return 'am'

    return null
  }

  function maskTime (input: string, caret = -1) {
    const source = toMaskSource(input, noise.value, caret)
    const masked = maskSegmentsFrom(segments.value, source.text, 0, source.caret)
    const at = masked.caret < 0 ? masked.value.length : masked.caret
    const tokens = digitsHint.value.slice(masked.width)

    if (!hour12.value) {
      return { ...masked, caret: at, hint: tokens }
    }

    const { labels, leading, gap } = periodFormat.value

    // the period joins the text once the digits are done, until then typing grows at the end
    if (masked.complete && period.value) {
      const split = masked.value.length - timeHint.value.length

      return {
        ...masked,
        value: masked.value.slice(0, split) + withPeriod(masked.value.slice(split), period.value),
        caret: leading && at >= split ? at + labels[period.value].length + gap.length : at,
        hint: '',
      }
    }

    const known = period.value && !leading ? labels[period.value] : period.value ? '' : '--'

    return { ...masked, caret: at, hint: tokens + (known && (gap || ' ') + known) }
  }

  function getHint (text: string) {
    const { value, hint } = maskTime(text)

    return remainingHint(value, hint, text)
  }

  function parseTime (text: string) {
    const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(text.replace(/[^\d:]/g, ''))

    if (!match) return null

    const [hour, minute, second] = match.slice(1).map(Number)
    const current = readPeriod(text) ?? period.value

    if (hour12.value ? !current || hour < 1 || hour > 12 : hour > 23) return null
    if (minute > 59 || second > 59) return null

    const hours = hour12.value ? convert12to24(hour, current!) : hour

    return [hours, minute, ...props.useSeconds ? [second || 0] : []].map(v => pad(v)).join(':')
  }

  function formatTime (value: string) {
    const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value)

    if (!match) return ''

    const [hour, minute, second] = match.slice(1).map(Number)
    const digits = [hour12.value ? convert24to12(hour) : hour, minute, ...props.useSeconds ? [second || 0] : []]
      .map(v => pad(v))
      .join(':')

    return hour12.value ? withPeriod(digits, hour < 12 ? 'am' : 'pm') : digits
  }

  return {
    hour12,
    period,
    placeholder,
    formatTime,
    getHint,
    maskTime,
    parseTime,
    readPeriod,
  }
}
