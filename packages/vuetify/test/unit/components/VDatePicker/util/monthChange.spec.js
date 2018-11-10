import monthChange from '@/components/VDatePicker/util/monthChange'
import { test } from '@/test'

test('VDatePicker/util/monthChange.js', ({ mount }) => {
  it('should change month', () => {
    expect(monthChange('2000-01', -1)).toBe('1999-12')
    expect(monthChange('2000-01', +1)).toBe('2000-02')
    expect(monthChange('2000-12', -1)).toBe('2000-11')
    expect(monthChange('2000-12', +1)).toBe('2001-01')
  })
})
