import sanitizeDateString from '../sanitizeDateString'

describe('VDatePicker/util/sanitizeDateString.ts', () => {
  it('should sanitize date string based upon type', () => {
    expect(sanitizeDateString('2000-01-02T14:48:00.000Z', 'date')).toBe('2000-01-02')
    expect(sanitizeDateString('2000-01-02T14:48:00.000Z', 'month')).toBe('2000-01')
    expect(sanitizeDateString('2000-01-02T14:48:00.000Z', 'year')).toBe('2000')
    expect(sanitizeDateString('2000-1-2', 'date')).toBe('2000-01-02')
  })
})
