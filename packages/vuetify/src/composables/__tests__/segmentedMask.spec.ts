// Composables
import {
  dateSegments,
  dateTimeSegments,
  maskSegments,
  overtype,
  timeSegments,
} from '../segmentedMask'

function typing (segments: Parameters<typeof maskSegments>[0], keys: string) {
  return [...keys].reduce((value, key) => maskSegments(segments, value + key), '')
}

describe('segmentedMask', () => {
  describe('maskSegments', () => {
    const date = dateSegments('mdy', '/')
    const time = timeSegments()
    const timeWithSeconds = timeSegments({ useSeconds: true })
    const dateTime = dateTimeSegments('mdy', '/')

    it.each([
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
      ['13252025', '13/25/2025'],
      ['00000000', '00/00/0000'],
      ['1225202599', '12/25/2025'],
    ])('should mask date %s as %s', (keys, expected) => {
      expect(typing(date, keys)).toBe(expected)
    })

    it.each([
      ['2', '2'],
      ['23', '23:'],
      ['2359', '23:59'],
      ['9', '09:'],
      ['930', '09:30'],
      ['12:34', '12:34'],
      ['123456', '12:34'],
    ])('should mask time %s as %s', (keys, expected) => {
      expect(typing(time, keys)).toBe(expected)
    })

    it.each([
      ['235959', '23:59:59'],
      ['9:3:5', '09:03:5'],
      ['9:3:05', '09:03:05'],
    ])('should mask time with seconds %s as %s', (keys, expected) => {
      expect(typing(timeWithSeconds, keys)).toBe(expected)
    })

    it.each([
      ['122520251430', '12/25/2025 14:30'],
      ['4/5/26 9:30', '04/05/26 09:30'],
    ])('should mask datetime %s as %s', (keys, expected) => {
      expect(typing(dateTime, keys)).toBe(expected)
    })

    it('should follow ymd order', () => {
      expect(typing(dateSegments('ymd', '-'), '20251225')).toBe('2025-12-25')
    })

    it('should follow dmy order', () => {
      expect(typing(dateSegments('dmy', '.'), '25122025')).toBe('25.12.2025')
    })
  })

  describe('overtype', () => {
    it('should overwrite digits and skip separators', () => {
      expect(overtype('12/31/2030', 0, '02')).toEqual(['02/31/2030', 3])
      expect(overtype('12/31/2030', 1, '1')).toEqual(['11/31/2030', 3])
      expect(overtype('12/31/2030', 3, '15')).toEqual(['12/15/2030', 6])
    })

    it('should treat typed separators as section jumps', () => {
      expect(overtype('12/31/2030', 0, '1/2')).toEqual(['12/21/2030', 4])
    })
  })
})
