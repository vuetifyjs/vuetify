// Composables
import { dateSegments, maskSegments, overtype } from '../segmentedMask'

// the input handler re-masks after every keystroke
function typing (segments: Parameters<typeof maskSegments>[0], keys: string) {
  return [...keys].reduce((value, key) => maskSegments(segments, value + key), '')
}

describe('segmentedMask', () => {
  describe('maskSegments', () => {
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

    it('should start the next section with a digit that does not fit', () => {
      expect(typing(dateSegments('mdy', '/'), '19')).toBe('01/09/')
      expect(typing(dateSegments('ymd', '-'), '202519')).toBe('2025-01-09')
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
  })
})
