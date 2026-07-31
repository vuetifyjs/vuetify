// Composables
import { useDateFormat } from '@/composables/dateFormat'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { createVuetify } from '@/framework'

type MaskDate = (text: string, multiple?: boolean | 'range') => string

function useMaskDate (inputFormat: string | undefined, assert: (maskDate: MaskDate) => void) {
  mount(defineComponent({
    setup () {
      const { maskDate } = useDateFormat({ inputFormat }, ref('en-US'))
      assert(maskDate)
      return () => {}
    },
  }), {
    global: { plugins: [createVuetify()] },
  })
}

// the input handler re-masks after every keystroke
function typing (maskDate: MaskDate, keys: string) {
  return [...keys].reduce((value, key) => maskDate(value + key), '')
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
    // out of range sections are left to parseDate, overflowing input is dropped
    ['13252025', '13/25/2025'],
    ['00000000', '00/00/0000'],
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
    ['26-4-15', '26-04-15'],
  ],
  'dd.mm.yyyy': [
    ['3', '3'],
    ['4', '04.'],
    ['25122025', '25.12.2025'],
    ['25.12.2025', '25.12.2025'],
    ['31122025', '31.12.2025'],
    ['5.1.26', '05.01.26'],
  ],
}

describe('dateFormat', () => {
  describe.each(Object.entries(formats))('maskDate with %s', (format, cases) => {
    it.each(cases)('should mask %s as %s', (keys, expected) => {
      useMaskDate(format, maskDate => expect(typing(maskDate, keys)).toBe(expected))
    })

    it('should leave a complete date untouched', () => {
      useMaskDate(format, maskDate => {
        const complete = typing(maskDate, '11122023')
        expect(maskDate(complete)).toBe(complete)
      })
    })
  })

  it('should mask with the format inferred from locale', () => {
    useMaskDate(undefined, maskDate => expect(typing(maskDate, '12252025')).toBe('12/25/2025'))
  })

  describe('maskDate for a range', () => {
    function typingRange (maskDate: MaskDate, keys: string) {
      return [...keys].reduce((value, key) => maskDate(value + key, 'range'), '')
    }

    it.each([
      ['1225', '12/25/'],
      ['12252025', '12/25/2025'],
      // the second date starts on a typed separator or on its first digit
      ['12252025-', '12/25/2025 - '],
      ['122520251', '12/25/2025 - 1'],
      ['1225202512262025', '12/25/2025 - 12/26/2025'],
      ['12/25/2025 - 12/26/2025', '12/25/2025 - 12/26/2025'],
      ['4/15/26 - 5/1/26', '04/15/26 - 05/01/26'],
      ['1225202512262025999', '12/25/2025 - 12/26/2025'],
    ])('should mask %s as %s', (keys, expected) => {
      useMaskDate('mm/dd/yyyy', maskDate => expect(typingRange(maskDate, keys)).toBe(expected))
    })

    it('should mask a range with a dash separator format', () => {
      useMaskDate('yyyy-mm-dd', maskDate => {
        expect(typingRange(maskDate, '2025-12-25 - 2025-12-26')).toBe('2025-12-25 - 2025-12-26')
      })
    })
  })

  describe('maskDate for a list', () => {
    function typingList (maskDate: MaskDate, keys: string) {
      return [...keys].reduce((value, key) => maskDate(value + key, true), '')
    }

    it.each([
      ['12252025', '12/25/2025'],
      ['1225202512262025', '12/25/2025, 12/26/2025'],
      ['122520251226202512272025', '12/25/2025, 12/26/2025, 12/27/2025'],
      ['12/25/2025 12/26/2025', '12/25/2025, 12/26/2025'],
      // a space ends a section, so short years can be listed too
      ['4/15/26 5/1/26', '04/15/26, 05/01/26'],
      ['121225 121325', '12/12/25, 12/13/25'],
    ])('should mask %s as %s', (keys, expected) => {
      useMaskDate('mm/dd/yyyy', maskDate => expect(typingList(maskDate, keys)).toBe(expected))
    })
  })
})
