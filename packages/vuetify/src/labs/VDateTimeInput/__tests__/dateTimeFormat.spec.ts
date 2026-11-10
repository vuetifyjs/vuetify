// Composables
import { normalize, useDateTimeFormat } from '../dateTimeFormat'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { DateFormatProps } from '@/composables/dateFormat'
import type { TimeFormatProps } from '@/composables/timeFormat'

type DateTimeFormat = ReturnType<typeof useDateTimeFormat>

function useFormatIn (props: DateFormatProps & TimeFormatProps, locale: string, assert: (format: DateTimeFormat) => void) {
  mount(defineComponent({
    setup () {
      assert(useDateTimeFormat(props, ref(locale)))
      return () => {}
    },
  }), {
    global: {
      plugins: [createVuetify({ locale: { locale: locale.split('-')[0] } })],
    },
  })
}

// the input handler re-masks after every keystroke, with the caret behind the last one
function typing (mask: DateTimeFormat['mask'], keys: string) {
  return [...keys].reduce((value, key) => mask(value + key, value.length + 1).value, '')
}

describe('dateTimeFormat', () => {
  it.each([
    ['en-US', '111020261430', '11/10/2026 14:30'],
    ['en-US', '1/2/26 9', '01/02/2026 09:'],
    ['en-US', '11102026', '11/10/2026 '],
    ['de-DE', '101120261430', '10.11.2026 14:30'],
    ['en-US', '02292025', '02/28/2025 '],
  ])('should mask typing in %s: %s → %s', (locale, keys, expected) => {
    useFormatIn({ format: '24hr' }, locale, ({ mask }) => {
      expect(typing(mask, keys)).toBe(expected)
    })
  })

  it('should keep the caret in the date when editing it', () => {
    useFormatIn({ format: '24hr' }, 'en-US', ({ mask }) => {
      expect(mask('11/10/2026 14:30', 2)).toMatchObject({ value: '11/10/2026 14:30', caret: 3 })
    })
  })

  it('should hint the date and the time until the date is done', () => {
    useFormatIn({ format: 'ampm' }, 'en-US', ({ getHint, placeholder }) => {
      expect(placeholder.value).toBe('mm/dd/yyyy --:-- --')
      expect(getHint('11/1')).toBe('d/yyyy --:-- --')
      expect(getHint('11/10/2026 0')).toBe('-:-- --')
    })
  })

  it('should parse a typed value and fill in the default time', () => {
    useFormatIn({ format: 'ampm' }, 'en-US', ({ parse }) => {
      expect(parse('11/10/2026 02:30 PM', '00:00')).toBe('2026-11-10T14:30')
      expect(parse('11/10/2026 ', '09:15')).toBe('2026-11-10T09:15')
      expect(parse('11/10/2026 02:30', '00:00')).toBeNull()
      expect(parse('11/10', '00:00')).toBeNull()
    })
  })

  it('should format in the locale order', () => {
    useFormatIn({}, 'de-DE', ({ format }) => {
      expect(format('2026-11-10T14:05')).toBe('10.11.2026 14:05')
    })
  })

  it.each([
    ['2026-11-10T14:05', '2026-11-10T14:05'],
    ['2026-11-10 14:05:59.123', '2026-11-10T14:05'],
    ['2026-11-10', '2026-11-10T23:59'],
    ['2026-11-10T14:05:00Z', null],
    ['2026-11-10T14:05:00+03:00', null],
    ['2026-11-10T14:05:00+03:00[Europe/Istanbul]', null],
    ['11/10/2026', null],
    [new Date(), null],
  ])('should normalize %s to %s', (value, expected) => {
    expect(normalize(value, '23:59')).toBe(expected)
  })
})
