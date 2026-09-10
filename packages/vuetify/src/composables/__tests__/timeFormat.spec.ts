// Composables
import { useTimeFormat } from '../timeFormat'

type MaskTime = ReturnType<typeof useTimeFormat>['maskTime']

// the input handler re-masks after every keystroke
function typing (maskTime: MaskTime, keys: string) {
  return [...keys].reduce((value, key) => maskTime(value + key).value, '')
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
    expect(maskTime('01:30 PMa').value).toBe('01:30 AM')
    expect(maskTime('01:3p').value).toBe('01:3')
  })

  it.each([
    ['', '--:--'],
    ['1', '-:--'],
    ['13', ':--'],
    ['13:', '--'],
    ['13:3', '-'],
    ['13:30', ''],
  ])('should hint %s with %s', (input, expected) => {
    const { getHint } = useTimeFormat({ format: '24hr' })
    expect(getHint(input)).toBe(expected)
  })

  it.each([
    ['', '--:-- --'],
    ['01:30', ' --'],
    ['01:30 PM', ''],
  ])('should hint the period after %s with %s', (input, expected) => {
    const { getHint } = useTimeFormat({ format: 'ampm' })
    expect(getHint(input)).toBe(expected)
  })

  it('should hint the seconds when enabled', () => {
    const { getHint } = useTimeFormat({ format: '24hr', useSeconds: true })
    expect(getHint('')).toBe('--:--:--')
    expect(getHint('13:30')).toBe(':--')
    expect(getHint('13:30:45')).toBe('')
  })

  it('should include seconds when enabled', () => {
    const { maskTime, parseTime, formatTime } = useTimeFormat({ format: '24hr', useSeconds: true })
    expect(typing(maskTime, '133045')).toBe('13:30:45')
    expect(parseTime('13:30:45')).toBe('13:30:45')
    expect(formatTime('13:30:45')).toBe('13:30:45')
  })
})
