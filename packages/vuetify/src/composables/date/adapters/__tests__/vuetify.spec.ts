// Utilities
import { Vuetify0DateAdapter } from '@vuetify/v0/date'
import { VuetifyDateBridge } from '../../bridge'

function createAdapter (locale: string) {
  return new VuetifyDateBridge(new Vuetify0DateAdapter(locale))
}

describe('vuetify date adapter (via VuetifyDateBridge)', () => {
  it('returns weekdays based on locale', () => {
    let instance = createAdapter('en-us')

    expect(instance.getWeekdays()).toStrictEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S'])

    instance = createAdapter('sv-se')

    expect(instance.getWeekdays()).toStrictEqual(['M', 'T', 'O', 'T', 'F', 'L', 'S'])
  })

  it('formats dates', () => {
    let instance = createAdapter('en-gb')
    expect(instance.format(instance.parseISO('2000-01-01'), 'fullTime')).toBe('00:00')

    instance = createAdapter('en-us')
    expect(instance.format(instance.parseISO('2000-01-01'), 'fullTime')).toBe('12:00 AM')
    expect(instance.format(instance.parseISO('2000-01-01'), 'fullTime12h')).toBe('12:00 AM')
    expect(instance.format(instance.parseISO('2000-01-01'), 'fullTime24h')).toBe('00:00')

    expect(instance.format(instance.parseISO('2000-01-01'), 'fullDateWithWeekday')).toBe('Saturday, January 1, 2000')

    instance = createAdapter('sv-SE')

    expect(instance.format(instance.parseISO('2000-01-01'), 'fullDateWithWeekday')).toBe('lördag 1 januari 2000')
  })

  it('handles parsing date without time', () => {
    const instance = createAdapter('en-us')

    const str = '2001-01-01'
    const date = instance.date(str)

    expect(date).not.toBeNull()
    expect(instance.getYear(date!)).toBe(2001)
    expect(instance.getDate(date!)).toBe(1)
    expect(instance.getMonth(date!)).toBe(0)
  })

  describe('isAfterDay', () => {
    const dateUtils = createAdapter('en-us')

    it.each([
      ['2024-01-02', '2024-01-01', true],
      ['2024-02-29', '2024-02-28', true],
      ['2024-01-01', '2024-01-01', false],
      ['2024-01-01', '2024-01-02', false],
    ])('returns %s when comparing %s and %s', (dateStr, comparingStr, expected) => {
      expect(dateUtils.isAfterDay(
        dateUtils.parseISO(dateStr),
        dateUtils.parseISO(comparingStr),
      )).toBe(expected)
    })
  })

  // TODO: why do these only fail locally
  describe.todo('getPreviousMonth')

  // TODO: why do these only fail locally
  describe.todo('isSameYear')

  it('returns correct start of week', () => {
    let instance = createAdapter('en-US')

    let date = instance.startOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)
    let jsDate = instance.toJsDate(date)

    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(7)
    expect(jsDate.getDay()).toBe(0)

    instance = createAdapter('sv-SE')

    date = instance.startOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)
    jsDate = instance.toJsDate(date)

    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(8)
    expect(jsDate.getDay()).toBe(1)
  })

  it('returns correct end of week', () => {
    let instance = createAdapter('en-US')

    let date = instance.endOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)
    let jsDate = instance.toJsDate(date)

    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(13)
    expect(jsDate.getDay()).toBe(6)

    instance = createAdapter('sv-SE')

    date = instance.endOfWeek(instance.date(new Date(2024, 3, 10, 12, 0, 0))!)
    jsDate = instance.toJsDate(date)

    expect(jsDate.getFullYear()).toBe(2024)
    expect(jsDate.getMonth()).toBe(3)
    expect(jsDate.getDate()).toBe(14)
    expect(jsDate.getDay()).toBe(0)
  })
})
