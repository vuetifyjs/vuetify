// Composables
import { overtype } from '../edit'
import { dateSegments } from '../presets'
import { maskSegmentsFrom } from '../segmentedMask'

// the input handler re-masks after every keystroke, with the caret behind the last one
function typing (segments: Parameters<typeof maskSegmentsFrom>[0], keys: string) {
  return [...keys].reduce((value, key) => maskSegmentsFrom(segments, value + key, 0, value.length + 1).value, '')
}

describe('segmentedMask', () => {
  describe('maskSegmentsFrom', () => {
    it('should follow the segment order', () => {
      expect(typing(dateSegments('mdy', '/'), '12252025')).toBe('12/25/2025')
      expect(typing(dateSegments('ymd', '-'), '20251225')).toBe('2025-12-25')
      expect(typing(dateSegments('dmy', '.'), '25122025')).toBe('25.12.2025')
    })

    it('should close a section that cannot take another digit', () => {
      expect(typing(dateSegments('mdy', '/'), '4')).toBe('04/')
      expect(typing(dateSegments('mdy', '/'), '1')).toBe('1')
      expect(typing(dateSegments('ymd', '-'), '2025')).toBe('2025-')
    })

    it('should stay on a section it cannot be left with', () => {
      expect(typing(dateSegments('mdy', '/'), '00')).toBe('0')
      expect(typing(dateSegments('mdy', '/'), '0/')).toBe('01/')
      expect(typing(dateSegments('mdy', '/'), '005')).toBe('05/')
    })

    it('should cap a section at its limit', () => {
      expect(typing(dateSegments('mdy', '/'), '19')).toBe('12/')
      expect(typing(dateSegments('mdy', '/'), '1239')).toBe('12/31/')
      expect(typing(dateSegments('ymd', '-'), '20250229')).toBe('2025-02-28')
    })

    it('should limit the day to the length of the month', () => {
      expect(typing(dateSegments('ymd', '-'), '2025023')).toBe('2025-02-03')
      expect(typing(dateSegments('ymd', '-'), '2025012')).toBe('2025-01-2')
    })

    it('should drop input past the last section', () => {
      expect(typing(dateSegments('mdy', '/'), '1225202599')).toBe('12/25/2025')
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

    it('should flip an existing period in place', () => {
      expect(overtype('01:30 PM', 0, 'a')).toEqual(['01:30 AM', 8])
    })
  })
})
