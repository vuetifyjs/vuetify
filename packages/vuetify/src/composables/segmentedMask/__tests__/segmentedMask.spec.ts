// Composables
import { overtype } from '../edit'
import { dateSegments, dateTimeSegments, timeSegments } from '../presets'
import { maskSegmentsFrom } from '../segmentedMask'

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
      expect(typing(timeSegments(), '00')).toBe('00:')
    })

    it('should cap a section at its limit', () => {
      expect(typing(dateSegments('mdy', '/'), '19')).toBe('12/')
      expect(typing(dateSegments('mdy', '/'), '1239')).toBe('12/31/')
      expect(typing(dateSegments('ymd', '-'), '20250229')).toBe('2025-02-28')
      expect(typing(timeSegments(), '2965')).toBe('23:06')
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
      expect(overtype('12/31/2030', 0, '02')).toMatchObject({ value: '02/31/2030', caret: 3 })
      expect(overtype('12/31/2030', 1, '1')).toMatchObject({ value: '11/31/2030', caret: 3 })
      expect(overtype('12/31/2030', 3, '15')).toMatchObject({ value: '12/15/2030', caret: 6 })
    })

    it('should treat typed separators as section jumps', () => {
      expect(overtype('12/31/2030', 0, '1/2')).toMatchObject({ value: '12/21/2030', caret: 4 })
    })

    it('should flip an existing period in place', () => {
      expect(overtype('01:30 PM', 0, 'a')).toMatchObject({ value: '01:30 AM', caret: 8 })
      expect(overtype('09:30 PM', 0, '1a')).toMatchObject({ value: '19:30 AM', caret: 8 })
    })
  })

  describe('timeSegments', () => {
    it('should mask a 24-hour time', () => {
      expect(typing(timeSegments(), '1330')).toBe('13:30')
      expect(typing(timeSegments(), '9')).toBe('09:')
    })

    it('should mask seconds when enabled', () => {
      expect(typing(timeSegments({ useSeconds: true }), '133045')).toBe('13:30:45')
    })
  })

  describe('dateTimeSegments', () => {
    it('should carry on from the date into the time', () => {
      expect(typing(dateTimeSegments('mdy', '/'), '122520251430')).toBe('12/25/2025 14:30')
      expect(typing(dateTimeSegments('mdy', '/', {}, year => 2000 + year), '4/5/26 9:30')).toBe('04/05/2026 09:30')
    })
  })
})
