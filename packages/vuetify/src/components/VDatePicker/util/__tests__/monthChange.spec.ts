import monthChange from '../monthChange'

describe('VDatePicker/util/monthChange.ts', () => {
  it('should change month', () => {
    expect(monthChange('2000-01', -1)).toBe('1999-12')
    expect(monthChange('2000-01', +1)).toBe('2000-02')
    expect(monthChange('2000-12', -1)).toBe('2000-11')
    expect(monthChange('2000-12', +1)).toBe('2001-01')
  })
})
