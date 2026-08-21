// Composables
import { useTimeFormat } from '../timeFormat'

function typing (maskTime: (value: string) => string, keys: string) {
  return [...keys].reduce((value, key) => maskTime(value + key), '')
}

describe('timeFormat', () => {
  it.each([
    ['', ''],
    ['1', '1'],
    ['13', '13:'],
    ['1330', '13:30'],
    ['9', '09:'],
    ['930', '09:30'],
    ['12:34', '12:34'],
  ])('should mask %s as %s', (input, expected) => {
    const { maskTime } = useTimeFormat({ format: '24hr' })
    expect(typing(maskTime, input)).toBe(expected)
  })

  it.each([
    ['13:30', '13:30'],
    ['9:05', '09:05'],
    ['24:00', null],
    ['12:60', null],
    ['', null],
  ])('should parse %s as %s', (input, expected) => {
    const { parseTime } = useTimeFormat({ format: '24hr' })
    expect(parseTime(input)).toBe(expected)
  })

  it('should parse 12-hour times', () => {
    const { parseTime, formatTime } = useTimeFormat({ format: 'ampm' })
    expect(parseTime('1:30 pm')).toBe('13:30')
    expect(parseTime('12:05 am')).toBe('00:05')
    expect(formatTime('13:30')).toBe('01:30 PM')
    expect(formatTime('00:05')).toBe('12:05 AM')
  })

  it('should mask a typed period in 12-hour mode', () => {
    const { maskTime } = useTimeFormat({ format: 'ampm' })
    expect(typing(maskTime, '0130p')).toBe('01:30 PM')
    expect(maskTime('01:30 PMa')).toBe('01:30 AM')
    expect(maskTime('01:3p')).toBe('01:3')
  })

  it('should include seconds when enabled', () => {
    const { maskTime, parseTime, formatTime } = useTimeFormat({ format: '24hr', useSeconds: true })
    expect(typing(maskTime, '133045')).toBe('13:30:45')
    expect(parseTime('13:30:45')).toBe('13:30:45')
    expect(formatTime('13:30:45')).toBe('13:30:45')
  })
})
