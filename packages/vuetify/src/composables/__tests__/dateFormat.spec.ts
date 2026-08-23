// Composables
import { useDateFormat } from '@/composables/dateFormat'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { DateFormatProps } from '@/composables/dateFormat'

type DateFormat = ReturnType<typeof useDateFormat>
type MaskDate = DateFormat['maskDate']

function useDateFormatIn (props: DateFormatProps, locale: string, isRtl: boolean, assert: (format: DateFormat) => void) {
  mount(defineComponent({
    setup () {
      assert(useDateFormat(props, ref(locale), ref(isRtl)))
      return () => {}
    },
  }), {
    global: { plugins: [createVuetify()] },
  })
}

function useMaskDate (props: DateFormatProps, assert: (maskDate: MaskDate) => void) {
  useDateFormatIn(props, 'en-US', false, ({ maskDate }) => assert(maskDate))
}

// the input handler re-masks after every keystroke, with the caret behind the last one
function typing (maskDate: MaskDate, keys: string) {
  return [...keys].reduce((value, key) => maskDate(value + key, value.length + 1).value, '')
}

const formats: Record<string, [string, string][]> = {
  'mm/dd/yyyy': [
    ['', ''],
    ['1', '1'],
    ['12', '12/'],
    ['123', '12/3'],
    ['12252025', '12/25/2025'],
    ['12/25/2025', '12/25/2025'],
    ['4', '04/'],
    ['45', '04/05/'],
    ['452026', '04/05/2026'],
    ['4/15/26', '04/15/26'],
    ['4.15.26', '04/15/26'],
    ['2/3/2025', '02/03/2025'],
    // a digit that does not fit caps the section it was typed into
    ['13', '12/'],
    ['19', '12/'],
    ['333', '03/31/'],
    ['23', '02/03/'],
    // April has no 31st, so the day stops at the 30th
    ['431985', '04/30/985'],
    ['2292024', '02/29/2024'],
    // the year caps a February that was accepted while it was still open
    ['2292026', '02/28/2026'],
    // no section can be left holding a zero, so nothing but zeros gets nowhere
    ['00000000', '0'],
    ['0102026', '01/02/026'],
    ['1225202599', '12/25/2025'],
    ['1a2', '12/'],
    ['abc', ''],
  ],
  'yyyy-mm-dd': [
    ['2', '2'],
    ['5', '5'],
    ['20251225', '2025-12-25'],
    ['2025-12-25', '2025-12-25'],
    ['2026-4-15', '2026-04-15'],
    // a closed year is expanded the same way parsing does it
    ['26-4-15', '2026-04-15'],
  ],
  'dd.mm.yyyy': [
    ['3', '3'],
    ['4', '04.'],
    ['25122025', '25.12.2025'],
    ['25.12.2025', '25.12.2025'],
    ['31122025', '31.12.2025'],
    ['5.1.26', '05.01.26'],
    // the day is capped once the month that narrows it is typed
    ['314', '30.04.'],
    ['3102', '29.02.'],
    ['31022025', '28.02.2025'],
    ['31022024', '29.02.2024'],
  ],
}

describe('dateFormat', () => {
  describe.each(Object.entries(formats))('maskDate with %s', (format, cases) => {
    it.each(cases)('should mask %s as %s', (keys, expected) => {
      useMaskDate({ inputFormat: format }, maskDate => expect(typing(maskDate, keys)).toBe(expected))
    })

    it('should leave a complete date untouched', () => {
      useMaskDate({ inputFormat: format }, maskDate => {
        const complete = typing(maskDate, '11122023')
        expect(maskDate(complete).value).toBe(complete)
      })
    })
  })

  it('should cap the day of a pasted date instead of rolling it over', () => {
    useMaskDate({ inputFormat: 'mm/dd/yyyy' }, maskDate => expect(maskDate('04/31/2025').value).toBe('04/30/2025'))
  })

  it('should mask with the format inferred from locale', () => {
    useMaskDate({}, maskDate => expect(typing(maskDate, '12252025')).toBe('12/25/2025'))
  })

  describe('a field that reads the other way round', () => {
    // CLDR gives arabic a day-first pattern that renders year-first, so typing runs against the format
    function useArabic (assert: (maskDate: MaskDate, format: string) => void) {
      useDateFormatIn({}, 'ar', true, ({ maskDate, parserFormat }) => assert(maskDate, parserFormat.value))
    }

    // the caret stays where the typing left it, the value grows towards the front
    function typeInto (maskDate: MaskDate, keys: string) {
      let value = ''
      let caret = 0

      for (const key of keys) {
        ({ value, caret } = maskDate(value.slice(0, caret) + key + value.slice(caret), caret + 1))
      }

      return { value, caret }
    }

    it('should show the sections in locale order', () => {
      useArabic((maskDate, format) => expect(format).toBe('yyyy/mm/dd'))
    })

    it('should fill the day first and the year last', () => {
      useArabic(maskDate => {
        expect(typeInto(maskDate, '1')).toMatchObject({ value: '1', caret: 1 })
        expect(typeInto(maskDate, '12')).toMatchObject({ value: '/12', caret: 0 })
        expect(typeInto(maskDate, '121')).toMatchObject({ value: '1/12', caret: 1 })
        expect(typeInto(maskDate, '1212')).toMatchObject({ value: '/12/12', caret: 0 })
        expect(typeInto(maskDate, '121220')).toMatchObject({ value: '20/12/12', caret: 2 })
        expect(typeInto(maskDate, '12122026')).toMatchObject({ value: '2026/12/12' })
      })
    })

    it('should close a section that cannot take another digit', () => {
      useArabic(maskDate => {
        // 4 is the 4th, 2 could still be the 24th, and a month cannot start with 2
        expect(typeInto(maskDate, '4').value).toBe('/04')
        expect(typeInto(maskDate, '2').value).toBe('2')
        expect(typeInto(maskDate, '24').value).toBe('/24')
        expect(typeInto(maskDate, '42').value).toBe('/02/04')
      })
    })

    it('should leave a complete date untouched', () => {
      useArabic(maskDate => expect(maskDate('2026/12/25').value).toBe('2026/12/25'))
    })

    it('should fill a range from the date it starts at', () => {
      useDateFormatIn({ inputFormat: 'mm/dd/yyyy', multiple: 'range' }, 'en-US', true, ({ maskDate }) => {
        expect(typeInto(maskDate, '20251205')).toMatchObject({ value: '05/12/2025', caret: 2 })
        // the second date is typed in front of the first one, the same way its sections are
        expect(typeInto(maskDate, '2025120520251405')).toMatchObject({ value: '05/14/2025 - 05/12/2025', caret: 0 })
        expect(maskDate('05/14/2025 - 05/12/2025').value).toBe('05/14/2025 - 05/12/2025')
      })
    })

    it('should fill a list from the date it starts at', () => {
      useDateFormatIn({ multiple: true }, 'ar', true, ({ maskDate }) => {
        // the date just closed keeps the separator that opens the next one
        expect(maskDate(', 2025/12/25').value).toBe(', 2025/12/25')
        expect(maskDate('2026/12/26, 2025/12/25').value).toBe('2026/12/26, 2025/12/25')
      })
    })

    it('should fill any format from the end the field starts at', () => {
      // the same locale left to right types the sections in the order it shows them
      useDateFormatIn({ inputFormat: 'mm/dd/yyyy' }, 'en-US', true, ({ maskDate }) => {
        // the year is typed first because the format shows it last
        expect(typeInto(maskDate, '2026').value).toBe('/2026')
        expect(typeInto(maskDate, '20262512').value).toBe('12/25/2026')
      })
    })
  })

  describe('maskDate for a range', () => {
    it.each([
      ['1225', '12/25/'],
      ['12252025', '12/25/2025'],
      // the second date starts on a typed separator or on its first digit
      ['12252025-', '12/25/2025 - '],
      ['122520251', '12/25/2025 - 1'],
      ['1225202512262025', '12/25/2025 - 12/26/2025'],
      ['12/25/2025 - 12/26/2025', '12/25/2025 - 12/26/2025'],
      ['4/15/26 - 5/1/26', '04/15/2026 - 05/01/26'],
      ['1225202512262025999', '12/25/2025 - 12/26/2025'],
    ])('should mask %s as %s', (keys, expected) => {
      useMaskDate({ inputFormat: 'mm/dd/yyyy', multiple: 'range' }, maskDate => expect(typing(maskDate, keys)).toBe(expected))
    })

    it('should mask a range with a dash separator format', () => {
      useMaskDate({ inputFormat: 'yyyy-mm-dd', multiple: 'range' }, maskDate => {
        expect(typing(maskDate, '2025-12-25 - 2025-12-26')).toBe('2025-12-25 - 2025-12-26')
      })
    })
  })

  it('should not let a later date shift the caret', () => {
    useMaskDate({ inputFormat: 'mm/dd/yyyy', multiple: true }, maskDate => {
      expect(maskDate('03/1/2024', 4)).toMatchObject({ value: '03/1/2024', caret: 4 })
      expect(maskDate('03/1/2024, 03/15/2024', 4)).toMatchObject({ value: '03/1/2024, 03/15/2024', caret: 4 })
    })
  })

  describe('maskDate for a list', () => {
    it.each([
      ['12252025', '12/25/2025'],
      ['1225202512262025', '12/25/2025, 12/26/2025'],
      ['122520251226202512272025', '12/25/2025, 12/26/2025, 12/27/2025'],
      ['12/25/2025 12/26/2025', '12/25/2025, 12/26/2025'],
      // a space ends the date, so the year is expanded before the next one starts
      ['4/15/26 5/1/26', '04/15/2026, 05/01/26'],
      ['121225 121325', '12/12/2025, 12/13/25'],
    ])('should mask %s as %s', (keys, expected) => {
      useMaskDate({ inputFormat: 'mm/dd/yyyy', multiple: true }, maskDate => expect(typing(maskDate, keys)).toBe(expected))
    })
  })

  describe('the format left to type', () => {
    it.each<[DateFormatProps, string, string]>([
      [{ inputFormat: 'mm/dd/yyyy' }, '', 'mm/dd/yyyy'],
      [{ inputFormat: 'mm/dd/yyyy' }, '1225', 'yyyy'],
      [{ inputFormat: 'mm/dd/yyyy', multiple: 'range' }, '', 'mm/dd/yyyy - mm/dd/yyyy'],
      [{ inputFormat: 'mm/dd/yyyy', multiple: 'range' }, '1225202501', 'dd/yyyy'],
      [{ inputFormat: 'mm/dd/yyyy', multiple: true }, '122520250', 'm/dd/yyyy'],
    ])('should be %o after typing %s', (props, keys, expected) => {
      useMaskDate(props, maskDate => expect(maskDate(typing(maskDate, keys)).hint).toBe(expected))
    })

    it('should be asked for on the end an rtl field grows towards', () => {
      useDateFormatIn({}, 'ar', true, ({ maskDate }) => {
        expect(maskDate('').hint).toBe('yyyy/mm/dd')
        expect(maskDate('/12').hint).toBe('yyyy/mm')
        expect(maskDate('2026/12/12').hint).toBe('')
      })
    })

    it('should ask for the next date of an rtl list in front of the ones typed', () => {
      useDateFormatIn({ multiple: true }, 'ar', true, ({ maskDate }) => {
        expect(maskDate(', 2025/12/25').hint).toBe('yyyy/mm/dd')
      })
    })
  })
})
