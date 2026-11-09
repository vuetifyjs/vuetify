// Composables
import { useTimeFormat } from '@/composables/timeFormat'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { createVuetify } from '@/framework'
import { ar, ko } from '@/locale'

// Types
import type { TimeFormatProps } from '@/composables/timeFormat'

type TimeFormat = ReturnType<typeof useTimeFormat>

function useTimeFormatIn (props: TimeFormatProps, locale: string, assert: (format: TimeFormat) => void) {
  mount(defineComponent({
    setup () {
      assert(useTimeFormat(props, ref(locale)))
      return () => {}
    },
  }), {
    global: {
      plugins: [createVuetify({ locale: { locale: locale.split('-')[0], messages: { ar, ko } } })],
    },
  })
}

// the input handler re-masks after every keystroke, with the caret behind the last one
function typing (maskTime: TimeFormat['maskTime'], keys: string) {
  return [...keys].reduce((value, key) => maskTime(value + key, value.length + 1).value, '')
}

describe('timeFormat', () => {
  it.each([
    ['1330', '13:30'],
    ['9', '09:'],
    ['930', '09:30'],
    ['2965', '23:06'],
    ['12:3a', '12:3'],
  ])('should mask %s as %s in 24-hour time', (keys, expected) => {
    useTimeFormatIn({ format: '24hr' }, 'en-US', ({ maskTime }) => {
      expect(typing(maskTime, keys)).toBe(expected)
    })
  })

  it('should follow the hour cycle of the locale', () => {
    useTimeFormatIn({}, 'en-US', ({ hour12, placeholder }) => {
      expect(hour12.value).toBe(true)
      expect(placeholder.value).toBe('--:-- --')
    })
    useTimeFormatIn({}, 'en-GB', ({ hour12, placeholder }) => {
      expect(hour12.value).toBe(false)
      expect(placeholder.value).toBe('--:--')
    })
  })

  it('should add the period once the digits are done', () => {
    useTimeFormatIn({ format: 'ampm' }, 'en-US', ({ maskTime, period, getHint }) => {
      expect(getHint('02:30')).toBe(' --')

      period.value = 'pm'
      expect(maskTime('02:3').value).toBe('02:3')
      expect(getHint('02:3')).toBe('- PM')
      expect(maskTime('02:30').value).toBe('02:30 PM')
    })
  })

  it('should read the period off the text', () => {
    useTimeFormatIn({ format: 'ampm' }, 'en-US', ({ readPeriod }) => {
      expect(readPeriod('02:30')).toBeNull()
      expect(readPeriod('02:30 PM')).toBe('pm')
      expect(readPeriod('02:30 PMa')).toBe('am')
      expect(readPeriod('p02:30 AM')).toBe('pm')
    })
  })

  it('should parse and format 12-hour time', () => {
    useTimeFormatIn({ format: 'ampm' }, 'en-US', ({ parseTime, formatTime }) => {
      expect(parseTime('02:30')).toBeNull()
      expect(parseTime('02:30 PM')).toBe('14:30')
      expect(parseTime('12:05 AM')).toBe('00:05')
      expect(parseTime('13:05 PM')).toBeNull()
      expect(formatTime('00:05')).toBe('12:05 AM')
      expect(formatTime('13:30')).toBe('01:30 PM')
    })
  })

  it('should include seconds', () => {
    useTimeFormatIn({ format: '24hr', useSeconds: true }, 'en-US', ({ maskTime, parseTime, formatTime, placeholder }) => {
      expect(placeholder.value).toBe('--:--:--')
      expect(typing(maskTime, '133045')).toBe('13:30:45')
      expect(parseTime('13:30:45')).toBe('13:30:45')
      expect(formatTime('13:30')).toBe('13:30:00')
    })
  })

  it('should place a localized period where the locale reads it', () => {
    useTimeFormatIn({ format: 'ampm' }, 'ko-KR', ({ formatTime, maskTime, parseTime, period, placeholder }) => {
      expect(placeholder.value).toBe('-- --:--')
      expect(formatTime('14:30')).toBe('오후 02:30')
      expect(parseTime('오후 02:30')).toBe('14:30')

      period.value = 'am'
      expect(maskTime('0230', 4)).toMatchObject({ value: '오전 02:30', caret: 8 })
    })

    useTimeFormatIn({ format: 'ampm' }, 'ar', ({ formatTime, parseTime }) => {
      expect(formatTime('14:30')).toBe('مساءً 02:30')
      expect(parseTime('مساءً 02:30')).toBe('14:30')
    })
  })
})
